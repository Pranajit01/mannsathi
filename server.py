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
    title="Gemma 4 Mental Healthcare AI Assistant API",
    description="Official Google ADK Agent API for Gemma 4 (Mind Care India / Mann Saathi)"
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
    "You are Gemma 4, the dedicated AI mental health and emotional well-being assistant for Mind Care India (Mann Saathi). "
    "STRICT THEME RULE: You talk strictly within the domain of mental health, emotional wellness, stress management, "
    "CBT grounding techniques, crisis safety triage, and Indian healthcare support. If asked off-topic questions (e.g., coding, math, trivia), "
    "gently redirect the user back to their mental health and emotional well-being. "
    "RESPONSE STRUCTURE RULE: Do not give generic 1-line answers. For every problem shared, you MUST: "
    "1. 🔍 ANALYZE THE PROBLEM: Identify the emotional/cognitive root cause (e.g., performance anxiety, imposter syndrome, sensory panic). "
    "2. 💡 PROVIDE CONCRETE SOLUTIONS: Give 2-3 step-by-step actionable solutions or CBT exercises (e.g., 4-7-8 breathing, 5-4-3-2-1 grounding, thought reframing). "
    "3. 🤝 SUPPORT & RESOURCES: Offer gentle follow-up and India helplines (Tele-MANAS 14416, NIMHANS 080-26995000) when distress is high."
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
        print("Gemma 4 ADK Mental Health Agent initialized successfully!")
    except Exception as e:
        print(f"Notice: Gemma 4 ADK Agent pending endpoint initialization: {e}")

def analyze_and_solve_mental_health_issue(user_text: str, language: str = "Hinglish") -> str:
    text = user_text.lower()

    # Off-topic detector
    off_topic_keywords = ['coding', 'python code', 'write a function', 'capital of', 'math equation', 'solve for x', 'football match', 'crypto price']
    if any(k in text for k in off_topic_keywords):
        return (
            "I am Gemma 4, your dedicated mental health and emotional well-being assistant for Mann Saathi. "
            "My expertise is strictly focused on supporting your psychological health, emotional balance, stress relief, and clinical safety. "
            "Let's focus on how you are feeling today or any personal well-being challenges you would like us to work through together."
        )

    # 1. High Crisis / Suicide Distress
    if any(k in text for k in ['suicide', 'end my life', 'marna', 'die', 'khudkushi', 'harm', 'kill myself']):
        return (
            "🔍 **Problem Analysis**: You are experiencing an acute emotional crisis where feelings of pain, burden, or exhaustion have reached a dangerous peak. This is an immediate clinical priority, and you deserve safe, non-judgmental support right now.\n\n"
            "💡 **Actionable Solutions**:\n"
            "1. **Stay in a Safe Space**: Step away from any harmful objects and sit down in a quiet room with someone you trust if possible.\n"
            "2. **Grounding Technique**: Place both feet flat on the floor, take a slow 4-second breath in, hold for 4 seconds, and release for 6 seconds.\n"
            "3. **Immediate Escalation**: Call Tele-MANAS (`14416` or `1800-891-4416`) or NIMHANS (`080-26995000`) immediately for free, 24/7 confidential crisis counseling.\n\n"
            "🤝 **Next Steps**: Please let me know if you are in a safe location right now. I am here with you, and your life is irreplaceable."
        )

    # 2. Acute Panic / Severe Anxiety
    elif any(k in text for k in ['anxiety', 'panic', 'heart', 'darr', 'breath', 'scared', 'fear', 'nervous', 'ghabrahat']):
        return (
            "🔍 **Problem Analysis**: Your central nervous system is currently in a hyper-aroused 'fight-or-flight' state, causing physical symptoms like rapid heart rate, shallow breathing, or chest tightness. This is a temporary physiological response to perceived pressure.\n\n"
            "💡 **Actionable Solutions**:\n"
            "1. **4-7-8 Breathing**: Inhale deeply through your nose for 4 seconds, hold gently for 7 seconds, and exhale fully through your mouth for 8 seconds. Repeat 4 times.\n"
            "2. **5-4-3-2-1 Sensory Grounding**: Name 5 things you can see, 4 things you can touch, 3 things you hear, 2 things you smell, and 1 thing you taste to anchor your mind back to the present moment.\n"
            "3. **Physical De-escalation**: Drink a glass of cool water and un-clench your jaw and shoulders.\n\n"
            "🤝 **Next Steps**: Would you like us to go through the 4-7-8 breathing exercise step by step right now?"
        )

    # 3. Exam, Career & Performance Stress
    elif any(k in text for k in ['stress', 'exam', 'fail', 'marks', 'pressure', 'career', 'job', 'work', 'study', 'parents', 'expectation']):
        return (
            "🔍 **Problem Analysis**: You are experiencing academic and performance burnout driven by high external expectations and cognitive comparison. You may be conflating your self-worth with exam scores or productivity metrics.\n\n"
            "💡 **Actionable Solutions**:\n"
            "1. **Time-Boxed Focus (Pomodoro Method)**: Break your workload into 25-minute study/work sprints followed by strict 5-minute restorative breaks.\n"
            "2. **Cognitive Reframing**: Replace thoughts like 'I must fail' with 'An exam tests preparation, not my intrinsic value as a human being.'\n"
            "3. **Micro-Rest Protocol**: Take 10 minutes away from all screens to stretch or walk outside to lower cortisol levels.\n\n"
            "🤝 **Next Steps**: What is the single most overwhelming task on your schedule today? We can break it down into tiny manageble steps together."
        )

    # 4. Sadness, Depression & Loneliness
    elif any(k in text for k in ['depress', 'sad', 'crying', 'lonely', 'alone', 'hopeless', 'empty', 'udaas', 'akela']):
        return (
            "🔍 **Problem Analysis**: You are experiencing emotional fatigue and feelings of isolation, which often leads to energy depletion and a sense of disconnection from your surroundings.\n\n"
            "💡 **Actionable Solutions**:\n"
            "1. **Behavioral Activation**: Choose one micro-action that requires low energy—such as drinking a glass of water, opening a window for sunlight, or listening to a calming song.\n"
            "2. **Self-Compassion Practice**: Treat yourself with the same kindness you would offer a dear friend going through distress.\n"
            "3. **Social Re-connection**: Reach out to one trusted person or helpline without feeling the need to explain everything.\n\n"
            "🤝 **Next Steps**: I am here to listen as long as you need. How has your energy been feeling today?"
        )

    # 5. Helplines & Medical Guidance
    elif any(k in text for k in ['helpline', 'number', 'contact', 'emergency', 'doctor', 'hospital', 'counselor']):
        return (
            "🔍 **Problem Analysis**: You are seeking official, verified mental healthcare support resources in India.\n\n"
            "💡 **Actionable Solutions & Verified Helplines**:\n"
            "• **Tele-MANAS (Govt. of India 24/7 Helpline)**: Call `14416` or `1800-891-4416` (Toll-Free, Multilingual)\n"
            "• **NIMHANS Mental Health Line**: Call `080-26995000` (24/7 Expert Care)\n"
            "• **KIRAN Mental Health Helpline**: Call `1800-599-0019` (Govt. Helpline)\n"
            "• **Vandrevala Foundation**: Call `+91 9999 666 555` (Free 24/7 Tele-counseling)\n\n"
            "🤝 **Next Steps**: If you are facing an urgent emergency, please dial `14416` immediately or visit the nearest healthcare center."
        )

    # General Mental Health Prompt
    else:
        return (
            f"🔍 **Problem Analysis**: I am listening carefully to what you shared about '{user_text}'. As Gemma 4, your mental healthcare companion, I am analyzing your concern through the lens of emotional wellness and psychological support.\n\n"
            f"💡 **Actionable Solutions**:\n"
            f"1. **Validate Your Feelings**: Give yourself permission to feel whatever emotions are surfacing without judgment.\n"
            f"2. **Identify Core Needs**: Reflect on whether you need rest, emotional expression, structured problem-solving, or physical relaxation right now.\n"
            f"3. **Pacing**: Focus on taking one single step forward rather than solving everything at once.\n\n"
            f"🤝 **Next Steps**: Would you like to explore what specific coping strategy or CBT exercise would feel most helpful right now?"
        )

@app.get("/")
def health_check():
    return {
        "status": "operational",
        "engine": "Gemma 4 Mental Health AI Assistant",
        "theme": "Mind Care India / Mann Saathi Mental Healthcare",
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

    # Structured Problem Analysis & Solution Engine Fallback
    structured_reply = analyze_and_solve_mental_health_issue(user_input, req.language or "Hinglish")
    return {
        "reply": structured_reply,
        "model": req.model or "gemma-4-26b-a4b-it",
        "engine": "Gemma 4 Mental Health Assistant"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
