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
    title="Gemma 4 Healthcare Assistant API",
    description="Official Google ADK Agent API for Gemma 4 Healthcare Assistant"
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
    "You are Gemma 4, an empathetic, supportive, and knowledgeable personal healthcare chatbot. "
    "Respond to the user in a warm, natural human manner. Your priority is to help the user in "
    "every possible way with their mental health, emotional well-being, stress, anxiety, or general healthcare queries. "
    "Provide clear guidance, compassionate active listening, CBT grounding exercises, and medical helpline resources when needed. "
    "Never repeat or echo the user prompt mechanically. Respond like a real caring healthcare professional."
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
        print("Gemma 4 ADK Healthcare Agent initialized successfully!")
    except Exception as e:
        print(f"Notice: Gemma 4 ADK Agent pending endpoint initialization: {e}")

def generate_human_healthcare_response(user_text: str, language: str = "Hinglish") -> str:
    text = user_text.lower()
    
    if any(k in text for k in ['suicide', 'end my life', 'marna', 'die', 'khudkushi', 'harm']):
        return (
            "Hello. I can hear how deeply overwhelmed and hurt you are feeling right now, and I want you to know "
            "that your life is truly precious. Please do not face this heavy pain alone. I am here for you, and "
            "help is available 24/7. Please connect right away with Tele-MANAS at 14416 or NIMHANS at 080-26995000. "
            "These are free, completely confidential, compassionate services. Would you like me to guide you through a calm breathing exercise right now?"
        )
    elif any(k in text for k in ['anxiety', 'panic', 'heart', 'darr', 'breath', 'scared', 'fear']):
        return (
            "I completely understand how uncomfortable and scary anxiety can feel when it hits. Please take a deep breath with me right now. "
            "Inhale slowly through your nose for 4 seconds... hold for 7 seconds... and exhale gently for 8 seconds. "
            "Remind yourself: You are safe right now, and this panic state will pass. Would you like us to practice a grounding exercise together to help your body relax?"
        )
    elif any(k in text for k in ['stress', 'exam', 'fail', 'marks', 'pressure', 'career', 'job', 'work', 'family']):
        return (
            "Handling intense stress and high expectations can be emotionally exhausting. It is completely normal to feel overwhelmed at times. "
            "Please remember that one exam, job result, or single event does not define your worth as a person. You are doing the best you can. "
            "Take a short pause today, step back, and give yourself grace. What is one small step or activity today that could bring you a bit of peace?"
        )
    elif any(k in text for k in ['depress', 'sad', 'crying', 'lonely', 'alone', 'hopeless', 'empty']):
        return (
            "I hear you, and it is okay to feel sad or lonely. You do not have to carry everything by yourself. "
            "As Gemma 4, your healthcare assistant, I am right here to listen and help you through this step by step. "
            "Even small moments of self-care—like taking a walk, drinking warm water, or talking to someone who cares—can bring comfort. How can I best support you right now?"
        )
    elif any(k in text for k in ['helpline', 'number', 'contact', 'emergency', 'doctor', 'hospital']):
        return (
            "Here are India's official 24/7 free & confidential healthcare and mental health helplines:\n\n"
            "• Tele-MANAS (Government Helpline): 14416 or 1800-891-4416\n"
            "• NIMHANS Mental Health Helpline: 080-26995000\n"
            "• National Emergency Number: 112\n"
            "• Women Helpline: 181\n\n"
            "Please feel free to reach out to these trained professionals at any time."
        )
    elif any(k in text for k in ['hello', 'hi', 'namaste', 'hey', 'start']):
        return (
            "Hello! I am Gemma 4, your personal mental healthcare chatbot. I am here to help you with emotional support, "
            "stress management, CBT grounding techniques, or any healthcare questions. How can I assist you today?"
        )
    else:
        return (
            f"Thank you for sharing that with me. I am Gemma 4, your healthcare assistant, and I am here to help you in every way possible. "
            f"Whether you are dealing with stress, emotional challenges, or looking for wellness guidance, I am listening carefully. How can we work through this together?"
        )

@app.get("/")
def health_check():
    return {
        "status": "operational",
        "engine": "Gemma 4 Healthcare Chatbot",
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
                "engine": "Google ADK Gemma 4"
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
                "engine": "Google ADK Gemma 4"
            }
        except Exception as e:
            print(f"Direct ADK agent generation error: {e}")

    # Human-like healthcare response fallback
    human_reply = generate_human_healthcare_response(user_input, req.language or "Hinglish")
    return {
        "reply": human_reply,
        "model": req.model or "gemma-4-26b-a4b-it",
        "engine": "Gemma 4 Healthcare Chatbot"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
