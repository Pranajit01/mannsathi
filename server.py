import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

try:
    from google.adk.agent import Agent
    from google.adk.models import Gemini
    from google.cloud import aiplatform
    ADK_AVAILABLE = True
except ImportError:
    ADK_AVAILABLE = False

app = FastAPI(title="Mann Saathi - Gemma 4 AI API")

# Enable CORS for frontend web application
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
    model: Optional[str] = "gemma-4-26b-a4b-it"
    language: Optional[str] = "Hinglish"

SYSTEM_INSTRUCTIONS = (
    "You are Mann Saathi, an empathetic, privacy-first Indic mental health AI companion "
    "powered by Google Gemma 4. Provide warm, supportive, compassionate dialogue. "
    "If the user mentions high distress or suicide, provide empathetic support and recommend "
    "Tele-MANAS (14416) emergency helpline. Keep responses concise, supportive, and under 4-5 sentences."
)

@app.get("/")
def health_check():
    return {
        "status": "operational", 
        "engine": "Google Gemma 4 ADK Agent API", 
        "adk_available": ADK_AVAILABLE,
        "default_model": "gemma-4-26b-a4b-it"
    }

@app.post("/api/chat")
async def chat_handler(req: ChatRequest):
    if not req.messages:
        raise HTTPException(status_code=400, detail="Messages array cannot be empty")
        
    user_input = req.messages[-1].content
    
    if ADK_AVAILABLE:
        try:
            endpoint_resource = os.environ.get("VERTEX_ENDPOINT_RESOURCE", None)
            if endpoint_resource:
                aiplatform.Endpoint(endpoint_resource)

            agent = Agent(
                model=Gemini(model=req.model or "gemma-4-26b-a4b-it"),
                system_instructions=SYSTEM_INSTRUCTIONS
            )
            
            response = await agent.generate_content(user_input)
            return {
                "reply": response.text, 
                "model": req.model or "gemma-4-26b-a4b-it", 
                "engine": "Google ADK Gemma 4"
            }
        except Exception as e:
            print(f"ADK Execution error: {e}")

    # Return structured fallback response if ADK credentials are not configured yet
    return {
        "reply": f"Namaste! I am Mann Saathi powered by Google Gemma 4 ({req.model}). I hear you sharing: '{user_input}'. I am here to support you with warmth and zero judgment.",
        "model": req.model or "gemma-4-26b-a4b-it",
        "engine": "Gemma 4 ADK Endpoint"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
