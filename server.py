import os
import json
import urllib.request
import urllib.error
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="Gemma Mental Health Companion API",
    description="Intelligent Level-Based Mental Health AI powered by local Mac Ollama Gemma models"
)

# Enable CORS for web frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: Optional[str] = "gemma4:latest"
    language: Optional[str] = "English"

OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://localhost:11434")

SYSTEM_INSTRUCTION = (
    "You are Gemma 4, a warm, empathetic, and intelligent mental health companion for the user.\n\n"
    "STEP 1: Carefully analyze the user's emotional state and state their level at the start of your response:\n"
    "• [Level 1: Mild Stress] (daily worries, mild pressure)\n"
    "• [Level 2: Moderate Anxiety] (panic, overwhelm, fear)\n"
    "• [Level 3: Severe Distress] (deep pain, exhaustion)\n"
    "• [Level 4: Critical Emergency] (crisis, self-harm thoughts, emergency)\n\n"
    "STEP 2: Treat the user according to their level:\n"
    "- Level 1 & 2: Provide simple, comforting guidance and gentle grounding advice in 2 to 3 friendly sentences.\n"
    "- Level 3: Offer deep empathy, active listening, and gentle coping steps.\n"
    "- Level 4 (Critical Emergency): Urgently and warmly guide the user to immediate safety. Suggest reaching out to surrounding doctors/hospitals, emergency numbers (108 / 112), and India's Tele-MANAS helpline (14416 / 1800-891-4416) right away.\n\n"
    "DO NOT quote or copy-paste the user's exact sentence. Speak naturally like a caring friend."
)

def get_installed_ollama_models() -> List[str]:
    try:
        req = urllib.request.Request(f"{OLLAMA_HOST}/api/tags")
        with urllib.request.urlopen(req, timeout=3) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                return [m.get("name") for m in data.get("models", [])]
    except Exception:
        pass
    return []

def resolve_best_model_name(requested_model: str, installed_models: List[str]) -> str:
    if not installed_models:
        return requested_model or "gemma4:latest"
    
    # Direct match
    if requested_model in installed_models:
        return requested_model
    
    # Match gemma models
    req_lower = (requested_model or "").lower()
    for model in installed_models:
        if "gemma4:latest" in model.lower() or "gemma4" in model.lower():
            return model
    for model in installed_models:
        if "gemma" in model.lower():
            return model
            
    return installed_models[0]

@app.get("/")
def health_check():
    installed = get_installed_ollama_models()
    ollama_online = len(installed) > 0
    default_model = resolve_best_model_name("gemma4:latest", installed)

    return {
        "status": "operational",
        "engine": "Gemma Level-Based Mental Health AI (Ollama Mac)",
        "ollama_online": ollama_online,
        "available_models": installed,
        "active_model": default_model
    }

@app.post("/api/chat")
def chat_handler(req: ChatRequest):
    if not req.messages:
        raise HTTPException(status_code=400, detail="Messages array cannot be empty")

    installed_models = get_installed_ollama_models()
    model_to_use = resolve_best_model_name(req.model or "gemma4:latest", installed_models)

    # Forward to local Ollama on Mac with Level-Based System Instruction
    try:
        formatted_messages = [
            {"role": "system", "content": SYSTEM_INSTRUCTION}
        ] + [{"role": m.role, "content": m.content} for m in req.messages]

        ollama_payload = json.dumps({
            "model": model_to_use,
            "messages": formatted_messages,
            "stream": False,
            "options": {
                "num_predict": 300,
                "temperature": 0.7
            }
        }).encode('utf-8')

        ollama_req = urllib.request.Request(
            f"{OLLAMA_HOST}/api/chat",
            data=ollama_payload,
            headers={"Content-Type": "application/json"}
        )

        with urllib.request.urlopen(ollama_req, timeout=120) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                reply_text = data.get("message", {}).get("content", "")
                if reply_text:
                    return {
                        "reply": reply_text,
                        "model": model_to_use,
                        "engine": f"Ollama Local Mac ({model_to_use})"
                    }
    except Exception as e:
        print(f"Ollama execution notice: {e}")

    # Level-based fallback
    last_user_msg = (req.messages[-1].content or "").lower()
    if any(k in last_user_msg for k in ["suicide", "end my life", "die", "marna", "mar jau", "kill myself"]):
        fallback_reply = (
            "[Level 4: Critical Emergency]\n"
            "I can hear how deeply exhausted and hurt you are feeling, but please know your life is irreplaceable. "
            "Please connect immediately with Tele-MANAS Helpline at 14416 (or 1800-891-4416) or call emergency medical assistance (108 / 112) for surrounding doctors and immediate support right now. "
            "Please stay safe—we care about you."
        )
    elif any(k in last_user_msg for k in ["panic", "anxious", "fear", "heart", "darr"]):
        fallback_reply = (
            "[Level 2: Moderate Anxiety]\n"
            "Take a slow breath in... and blow it out gently. "
            "What you are experiencing right now is panic, but you are safe and this feeling will pass soon. "
            "Try drinking a small glass of water and resting comfortably."
        )
    else:
        fallback_reply = (
            "[Level 1: Mild Stress]\n"
            "I hear you, and it is completely normal to feel stressed when facing daily pressures. "
            "Take one small step at a time, take a short break, and remember that you are capable of handling this."
        )

    return {
        "reply": fallback_reply,
        "model": model_to_use,
        "engine": "Gemma Level-Based Companion"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
