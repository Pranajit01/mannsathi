import os
import json
import urllib.request
import urllib.error
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="Gemma Fast Mental Health Companion API",
    description="Accelerated, low-latency mental health AI companion powered by local Ollama Gemma model"
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
    model: Optional[str] = "gemma4b"
    language: Optional[str] = "English"

OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://localhost:11434")

SYSTEM_INSTRUCTION = (
    "You are a warm, caring mental health friend for the user. "
    "Listen attentively and give thoughtfully evaluated, helpful responses to benefit the user's well-being. "
    "Use simple, comforting, and friendly words to make the user feel completely safe, comfortable, and understood. "
    "Keep your response concise, comforting, and focused (under 3-4 sentences)."
)

@app.get("/")
def health_check():
    ollama_online = False
    models = []
    try:
        req = urllib.request.Request(f"{OLLAMA_HOST}/api/tags")
        with urllib.request.urlopen(req, timeout=3) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                models = [m.get("name") for m in data.get("models", [])]
                ollama_online = True
    except Exception:
        ollama_online = False

    return {
        "status": "operational",
        "engine": "Gemma Fast Mental Health Companion (Ollama Accelerated)",
        "ollama_online": ollama_online,
        "available_models": models,
        "default_model": "gemma4b"
    }

@app.post("/api/chat")
def chat_handler(req: ChatRequest):
    if not req.messages:
        raise HTTPException(status_code=400, detail="Messages array cannot be empty")

    model_to_use = req.model or "gemma4b"

    # Forward to local Ollama on Mac with speed acceleration options
    try:
        formatted_messages = [
            {"role": "system", "content": SYSTEM_INSTRUCTION}
        ] + [{"role": m.role, "content": m.content} for m in req.messages]

        ollama_payload = json.dumps({
            "model": model_to_use,
            "messages": formatted_messages,
            "options": {
                "num_predict": 180,
                "num_ctx": 2048,
                "temperature": 0.6,
                "top_k": 20,
                "top_p": 0.8
            },
            "stream": False
        }).encode('utf-8')

        ollama_req = urllib.request.Request(
            f"{OLLAMA_HOST}/api/chat",
            data=ollama_payload,
            headers={"Content-Type": "application/json"}
        )

        with urllib.request.urlopen(ollama_req, timeout=60) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                reply_text = data.get("message", {}).get("content", "")
                if reply_text:
                    return {
                        "reply": reply_text,
                        "model": model_to_use,
                        "engine": "Ollama Accelerated Gemma Engine"
                    }
    except Exception as e:
        print(f"Ollama connection notice: {e}")

    # Low-latency fallback
    return {
        "reply": "Hello! I am your mental health friend. I'm right here with you to listen closely and help you with simple, comforting guidance. How can I best support you today?",
        "model": model_to_use,
        "engine": "Gemma Fast Mental Health Companion"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
