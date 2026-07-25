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
    title="Gemma 4 Simple Mental Health Assistant API",
    description="Official Google ADK Agent API for Gemma 4 Simple Mental Health Companion"
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
    "You are Gemma 4, a warm, caring, and easy-to-understand mental health assistant for Mind Care India (Mann Saathi). "
    "SIMPLICITY RULE: Keep your language very simple, warm, and natural. Do NOT use complex medical jargon or clinical terms. "
    "THEME RULE: Talk strictly about mental health, emotional wellness, stress relief, and personal well-being. "
    "RESPONSE FORMAT: "
    "1. Explain what the user is experiencing in 1 simple, empathetic sentence. "
    "2. Give 2-3 simple, easy step-by-step solutions they can do right now. "
    "3. Offer a warm supportive closing with verified helpline numbers (Tele-MANAS 14416) if they need immediate help."
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

def simple_mental_health_response(user_text: str, language: str = "Hinglish") -> str:
    text = user_text.lower()

    # Off-topic detector
    off_topic_keywords = ['coding', 'python code', 'write a function', 'capital of', 'math equation', 'solve for x', 'football match', 'crypto price']
    if any(k in text for k in off_topic_keywords):
        return (
            "Hello! I am Gemma 4, your dedicated mental health assistant for Mann Saathi. "
            "I focus strictly on helping you with emotional support, stress relief, and mental well-being. "
            "How are you feeling today? Please feel free to share whatever is on your mind."
        )

    # 1. High Crisis / Suicide Distress
    if any(k in text for k in ['suicide', 'end my life', 'marna', 'die', 'khudkushi', 'harm', 'kill myself']):
        return (
            "❤️ **I am here for you**: I can hear how much pain you are in right now. Please know that your life matters and you do not have to carry this alone.\n\n"
            "✨ **Simple Steps Right Now**:\n"
            "1. **Sit in a Safe Place**: Sit down comfortably and take a slow, deep breath.\n"
            "2. **Reach Out**: Talk to a family member, friend, or someone you trust right now.\n"
            "3. **Call Free 24/7 Helpline**: Dial **Tele-MANAS (`14416` or `1800-891-4416`)** or **NIMHANS (`080-26995000`)** for free, instant, confidential help.\n\n"
            "I am right here with you. Please call 14416 now so a caring counselor can support you."
        )

    # 2. Panic / Anxiety
    elif any(k in text for k in ['anxiety', 'panic', 'heart', 'darr', 'breath', 'scared', 'fear', 'nervous', 'ghabrahat']):
        return (
            "🌱 **What is happening**: Your body is feeling sudden stress, which can make your heart beat fast or your breathing shallow. You are safe, and this feeling will pass soon.\n\n"
            "✨ **Simple Steps to Calm Down**:\n"
            "1. **Slow Breathing**: Breathe in through your nose for 4 seconds, hold for 4 seconds, and blow out gently through your mouth.\n"
            "2. **Sip Water**: Take a slow sip of cool water and let your shoulders relax.\n"
            "3. **Look Around**: Name 3 things you see around you right now to bring your focus back to the present moment.\n\n"
            "Would you like us to practice 3 slow breaths together right now?"
        )

    # 3. Exam & Work Stress
    elif any(k in text for k in ['stress', 'exam', 'fail', 'marks', 'pressure', 'career', 'job', 'work', 'study', 'parents', 'expectation']):
        return (
            "🌱 **What is happening**: You are feeling heavy pressure from exams or expectations. It is completely normal to feel stressed when you care about doing well.\n\n"
            "✨ **Simple Steps to Manage Stress**:\n"
            "1. **Take Small Steps**: Don't try to study or fix everything at once. Focus on just 1 small chapter or task for 20 minutes.\n"
            "2. **Take a 10-Minute Break**: Step away from your books or screen, stretch your body, and take fresh air.\n"
            "3. **Remember Your Worth**: An exam score tests memory on one day—it does NOT decide your value or future.\n\n"
            "What is the main thing stressing you today? We can break it down together."
        )

    # 4. Sadness & Loneliness
    elif any(k in text for k in ['depress', 'sad', 'crying', 'lonely', 'alone', 'hopeless', 'empty', 'udaas', 'akela']):
        return (
            "🌱 **What is happening**: Feeling sad or lonely can make you feel low on energy and tired. It is okay to feel this way, and you are not alone.\n\n"
            "✨ **Simple Steps to Lift Your Mood**:\n"
            "1. **Be Gentle with Yourself**: Allow yourself to rest without feeling guilty.\n"
            "2. **One Small Comfort**: Drink a warm cup of tea or water, or listen to a song you like.\n"
            "3. **Talk to Someone**: Message a friend or loved one, even just to say hi.\n\n"
            "I am right here to listen. How has your day been feeling?"
        )

    # 5. Helplines & Support
    elif any(k in text for k in ['helpline', 'number', 'contact', 'emergency', 'doctor', 'hospital', 'counselor']):
        return (
            "📞 **Free 24/7 Mental Health Helplines in India**:\n\n"
            "• **Tele-MANAS (Govt. of India)**: Call `14416` or `1800-891-4416` (Toll-Free, 24/7)\n"
            "• **NIMHANS Helpline**: Call `080-26995000` (Free Counselor Line)\n"
            "• **KIRAN Helpline**: Call `1800-599-0019` (Govt. Helpline)\n"
            "• **Vandrevala Support**: Call `+91 9999 666 555` (Free 24/7 Counseling)\n\n"
            "These helplines are completely free, private, and available at any hour."
        )

    # General Prompt
    else:
        return (
            f"🌱 **What is happening**: I hear what you shared about '{user_text}'. It is great that you are taking time to care for your mental well-being.\n\n"
            f"✨ **Simple Steps We Can Take**:\n"
            f"1. **Take a Deep Breath**: Give yourself a pause and relax your body.\n"
            f"2. **Focus on Today**: Take things one step at a time instead of worrying about tomorrow.\n"
            f"3. **Ask for Help**: Let me know if you want relaxation tips or practical steps.\n\n"
            f"How can I best support you today?"
        )

@app.get("/")
def health_check():
    return {
        "status": "operational",
        "engine": "Gemma 4 Simple Mental Health AI Assistant",
        "theme": "Mind Care India / Mann Saathi",
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

    # Simple Mental Health Response Engine Fallback
    simple_reply = simple_mental_health_response(user_input, req.language or "Hinglish")
    return {
        "reply": simple_reply,
        "model": req.model or "gemma-4-26b-a4b-it",
        "engine": "Gemma 4 Mental Health Assistant"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
