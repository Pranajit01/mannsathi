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
    description="Warm, caring mental health friend AI powered by local Mac Ollama Gemma models with short concise responses"
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
    "You are a warm, caring mental health friend for the user. "
    "CRITICAL RULE: Always keep your responses SHORT, simple, and comforting (maximum 2-3 friendly sentences). "
    "Never write long paragraphs or long lists. Speak naturally like a caring friend in a quick chat message."
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
        "engine": "Gemma Mental Health Companion (Ollama Mac)",
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

    # Forward to local Ollama on Mac with short response constraint
    try:
        formatted_messages = [
            {"role": "system", "content": SYSTEM_INSTRUCTION}
        ] + [{"role": m.role, "content": m.content} for m in req.messages]

        ollama_payload = json.dumps({
            "model": model_to_use,
            "messages": formatted_messages,
            "stream": False,
            "options": {
                "num_predict": 120,
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

    # Short fallback response
    last_user_msg = req.messages[-1].content
    return {
        "reply": f"Hello my friend! I hear you regarding '{last_user_msg}'. Take a gentle deep breath—I am right here with you. How can I help you feel better today?",
        "model": model_to_use,
        "engine": "Gemma Mental Health Companion"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
