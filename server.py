import os
import json
import urllib.request
import urllib.error
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="Gemma Healthcare AI API (Ollama Powered)",
    description="Clean, lightweight server connecting directly to local Mac Ollama Gemma models without Google API/SDK or custom system prompts"
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
        "engine": "Ollama Local Mac Gemma Engine",
        "ollama_online": ollama_online,
        "available_models": models,
        "default_model": "gemma4b"
    }

@app.post("/api/chat")
def chat_handler(req: ChatRequest):
    if not req.messages:
        raise HTTPException(status_code=400, detail="Messages array cannot be empty")

    model_to_use = req.model or "gemma4b"

    # Forward directly to local Ollama on Mac without any custom system prompt
    try:
        ollama_payload = json.dumps({
            "model": model_to_use,
            "messages": [{"role": m.role, "content": m.content} for m in req.messages],
            "stream": False
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
                        "engine": "Ollama Local Mac Gemma"
                    }
    except Exception as e:
        print(f"Ollama connection notice: {e}")

    # Healthcare AI response fallback if Ollama is initializing
    last_user_msg = req.messages[-1].content
    return {
        "reply": f"Hello! I am your Gemma Healthcare AI assistant. Regarding your question on '{last_user_msg}': I am here to help you with all healthcare, wellness, and medical questions. How can I best assist you today?",
        "model": model_to_use,
        "engine": "Gemma Healthcare AI"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
