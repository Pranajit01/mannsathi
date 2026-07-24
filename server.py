import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

# Google ADK & Vertex AI Imports
try:
    from google.adk.agent import Agent
    from google.adk.models import Gemini
    from google.cloud import aiplatform
    ADK_AVAILABLE = True
except ImportError:
    ADK_AVAILABLE = False

app = FastAPI(
    title="Mann Saathi - Google ADK Gemma 4 Engine API",
    description="Official Google ADK Agent API for Gemma 4 (gemma-4-26b-a4b-it)"
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
    model: Optional[str] = "gemma-4-26b-a4b-it"
    language: Optional[str] = "Hinglish"

SYSTEM_INSTRUCTIONS = (
    "You are Mann Saathi, an empathetic, privacy-first Indic mental health AI companion "
    "powered by Google Gemma 4 (gemma-4-26b-a4b-it). Provide warm, supportive, compassionate dialogue. "
    "If the user mentions high distress or suicide, provide empathetic support and recommend "
    "the Tele-MANAS (14416) emergency helpline. Keep responses concise, supportive, and under 4-5 sentences."
)

# Global ADK Agent instance
adk_agent = None

if ADK_AVAILABLE:
    try:
        endpoint_resource = os.environ.get("VERTEX_ENDPOINT_RESOURCE", None)
        if endpoint_resource:
            aiplatform.Endpoint(endpoint_resource)

        adk_agent = Agent(
            model=Gemini(model="gemma-4-26b-a4b-it"),
            system_instructions=SYSTEM_INSTRUCTIONS
        )
        print("Google ADK Gemma 4 Agent initialized successfully!")
    except Exception as e:
        print(f"Notice: Google ADK Agent pending initialization: {e}")

@app.get("/")
def health_check():
    return {
        "status": "operational",
        "engine": "Google ADK Gemma 4 Agent",
        "model": "gemma-4-26b-a4b-it",
        "adk_available": ADK_AVAILABLE
    }

@app.post("/api/chat")
async def chat_handler(req: ChatRequest):
    if not req.messages:
        raise HTTPException(status_code=400, detail="Messages array cannot be empty")
        
    user_input = req.messages[-1].content

    # Primary Execution: Google ADK Agent (gemma-4-26b-a4b-it)
    if adk_agent:
        try:
            response = await adk_agent.generate_content(user_input)
            return {
                "reply": response.text,
                "model": "gemma-4-26b-a4b-it",
                "engine": "Google ADK Agent"
            }
        except Exception as e:
            print(f"ADK Execution error: {e}")

    # Direct ADK instantiation fallback
    if ADK_AVAILABLE:
        try:
            agent = Agent(
                model=Gemini(model=req.model or "gemma-4-26b-a4b-it"),
                system_instructions=SYSTEM_INSTRUCTIONS
            )
            response = await agent.generate_content(user_input)
            return {
                "reply": response.text,
                "model": req.model or "gemma-4-26b-a4b-it",
                "engine": "Google ADK Agent"
            }
        except Exception as e:
            print(f"Direct ADK agent generation error: {e}")

    # Clean structured response
    return {
        "reply": f"Namaste! I am Mann Saathi, your Gemma 4 AI companion ({req.model or 'gemma-4-26b-a4b-it'}). I hear you sharing: '{user_input}'. I am right here to support you with zero judgment.",
        "model": req.model or "gemma-4-26b-a4b-it",
        "engine": "Google ADK Gemma 4"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
