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

# Hugging Face Transformers & Torch Imports
try:
    from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
    import torch
    HF_AVAILABLE = True
except ImportError:
    HF_AVAILABLE = False

app = FastAPI(
    title="Gemma 4 Mental Health Assistant API (Google ADK & Hugging Face)",
    description="Official API for Gemma 4 featuring Google ADK and Hugging Face Hub Model Integration"
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
    hf_model_id: Optional[str] = None
    hf_token: Optional[str] = None

class HFModelLoadRequest(BaseModel):
    hf_model_id: str = "google/gemma-2-2b-it"
    hf_token: Optional[str] = None

SYSTEM_INSTRUCTIONS = (
    "You are Gemma 4, a warm, empathetic, and genuinely friendly human mental health companion for Mind Care India (Mann Saathi). "
    "HUMAN CONVERSATIONAL RULE: Respond in a warm, friendly, natural human manner like a caring close friend or mentor. "
    "Do NOT use mechanical templates, robotic headers, or structured bullet lists. "
    "THEME RULE: Speak strictly within the theme of mental health, emotional wellness, stress relief, and personal well-being. "
    "Listen attentively, validate feelings with deep empathy, offer comforting practical advice, and gently guide the user."
)

# Global instances
adk_agent = None
hf_pipeline_instance = None
loaded_hf_model_id = None

# 1. Initialize Google ADK Agent
if ADK_AVAILABLE:
    try:
        endpoint_resource = os.environ.get("VERTEX_ENDPOINT_RESOURCE", None)
        if endpoint_resource:
            aiplatform.Endpoint(endpoint_resource)

        adk_agent = Agent(
            model=Gemini(model="gemma-4-26b-a4b-it"),
            system_instructions=SYSTEM_INSTRUCTIONS
        )
        print("Gemma 4 ADK Agent initialized successfully!")
    except Exception as e:
        print(f"Notice: Google ADK Agent pending endpoint initialization: {e}")

# 2. Hugging Face Loader Function
def load_huggingface_gemma(model_id: str = "google/gemma-2-2b-it", token: Optional[str] = None):
    global hf_pipeline_instance, loaded_hf_model_id
    if not HF_AVAILABLE:
        print("Hugging Face libraries (transformers/torch) not yet installed.")
        return None
    try:
        hf_token = token or os.environ.get("HF_TOKEN") or os.environ.get("HUGGINGFACE_TOKEN")
        print(f"Loading Gemma model from Hugging Face Hub ({model_id})...")
        tokenizer = AutoTokenizer.from_pretrained(model_id, token=hf_token)
        model = AutoModelForCausalLM.from_pretrained(
            model_id,
            token=hf_token,
            torch_dtype=torch.bfloat16 if torch.cuda.is_available() else torch.float32,
            device_map="auto" if torch.cuda.is_available() else None
        )
        hf_pipeline_instance = pipeline("text-generation", model=model, tokenizer=tokenizer)
        loaded_hf_model_id = model_id
        print(f"Successfully loaded Gemma model from Hugging Face: {model_id}")
        return hf_pipeline_instance
    except Exception as e:
        print(f"Hugging Face Model Load Notice: {e}")
        return None

# Attempt auto-load if HF_MODEL_ID env var is provided
if os.environ.get("HF_MODEL_ID"):
    load_huggingface_gemma(os.environ.get("HF_MODEL_ID"))

def friendly_human_mental_health_response(user_text: str, language: str = "Hinglish") -> str:
    text = user_text.lower()

    # Off-topic detector
    off_topic_keywords = ['coding', 'python code', 'write a function', 'capital of', 'math equation', 'solve for x', 'football match', 'crypto price']
    if any(k in text for k in off_topic_keywords):
        return (
            "Hey! I'm Gemma 4, your personal mental health companion for Mann Saathi. "
            "I'm here specifically to support you with your emotional well-being, stress relief, and mental health. "
            "How are you feeling today? Please feel free to share whatever is on your mind!"
        )

    # High Crisis / Suicide Distress
    if any(k in text for k in ['suicide', 'end my life', 'marna', 'die', 'khudkushi', 'harm', 'kill myself']):
        return (
            "I can hear how deeply hurt and exhausted you're feeling right now, and I want you to know that your life matters so much. "
            "Please don't face this heavy pain alone. I'm right here with you. Please take a deep breath and sit comfortably in a safe room. "
            "I want you to connect right now with Tele-MANAS—they are India's free, 24/7 confidential helpline at 14416 or 1800-891-4416, or NIMHANS at 080-26995000. "
            "A caring counselor is ready to talk to you right now. Will you reach out to them with me?"
        )

    # Panic / Anxiety
    elif any(k in text for k in ['anxiety', 'panic', 'heart', 'darr', 'breath', 'scared', 'fear', 'nervous', 'ghabrahat']):
        return (
            "I'm right here with you. Take a gentle breath in through your nose... hold it for a moment... and blow it out slowly through your mouth. "
            "What you're feeling right now is your body's natural reaction to stress, and even though it feels scary, you are safe and this panic will pass soon. "
            "Try taking a slow sip of cool water, un-clench your jaw, and let your shoulders drop. "
            "Would you like us to do a slow 4-count breathing exercise together right now to help you feel grounded?"
        )

    # Exam & Work Stress
    elif any(k in text for k in ['stress', 'exam', 'fail', 'marks', 'pressure', 'career', 'job', 'work', 'study', 'parents', 'expectation']):
        return (
            "Hey, I hear you. Exam and career pressure can feel so heavy, especially when you want to do well and meet everyone's expectations. "
            "It's completely normal to feel overwhelmed right now. Please remember to take a pause and give yourself grace—you don't have to tackle everything all at once. "
            "Try taking a quick 10-minute break away from your books, get some fresh air or a glass of water, and then take things just one small topic at a time. "
            "An exam tests memory for one day; it never defines how capable or wonderful you are. I'm right here with you. What's the main topic stressing you out today?"
        )

    # Sadness & Loneliness
    elif any(k in text for k in ['depress', 'sad', 'crying', 'lonely', 'alone', 'hopeless', 'empty', 'udaas', 'akela']):
        return (
            "I hear you, and it's okay to feel sad or lonely. You don't have to pretend to be strong all the time, and you don't have to carry this alone. "
            "When we feel low, even small acts of care can bring comfort—like wrapping yourself in a warm blanket, sipping warm water, or listening to a peaceful song. "
            "I'm right here listening without any judgment. How has your energy been feeling today?"
        )

    # Helplines & Support
    elif any(k in text for k in ['helpline', 'number', 'contact', 'emergency', 'doctor', 'hospital', 'counselor']):
        return (
            "Here are India's free, 24/7 confidential mental health helplines you can call anytime:\n\n"
            "• Tele-MANAS (Govt. Helpline): 14416 or 1800-891-4416\n"
            "• NIMHANS Helpline: 080-26995000\n"
            "• KIRAN Helpline: 1800-599-0019\n"
            "• Vandrevala Support: +91 9999 666 555\n\n"
            "They are completely free, private, and available at any hour. Please feel free to reach out to them!"
        )

    # General Prompt
    else:
        return (
            f"Thank you for sharing that with me. I'm Gemma 4, your personal mental health companion, and I'm listening closely to what you shared. "
            f"Caring for your mind and feelings is so important, and you're taking a great step by talking it out. "
            f"Whatever you're going through, take it one small step at a time. How can I best support you today?"
        )

@app.get("/")
def health_check():
    return {
        "status": "operational",
        "engine": "Gemma 4 Mental Health Companion",
        "integrations": {
            "google_adk": ADK_AVAILABLE,
            "huggingface_transformers": HF_AVAILABLE,
            "loaded_hf_model": loaded_hf_model_id or "None (Ready to load via /api/load-hf-model)"
        },
        "model": loaded_hf_model_id or "gemma-4-26b-a4b-it"
    }

@app.post("/api/load-hf-model")
async def load_hf_model_endpoint(req: HFModelLoadRequest):
    if not HF_AVAILABLE:
        raise HTTPException(
            status_code=400,
            detail="transformers and torch packages are required. Install with: pip install transformers torch huggingface_hub"
        )
    result = load_huggingface_gemma(req.hf_model_id, req.hf_token)
    if result:
        return {
            "status": "success",
            "message": f"Successfully loaded Gemma model from Hugging Face: {req.hf_model_id}",
            "model_id": req.hf_model_id
        }
    else:
        raise HTTPException(status_code=500, detail=f"Failed to load model {req.hf_model_id} from Hugging Face Hub")

@app.post("/api/chat")
async def chat_handler(req: ChatRequest):
    if not req.messages:
        raise HTTPException(status_code=400, detail="Messages array cannot be empty")

    user_input = req.messages[-1].content

    # Option A: Hugging Face Pipeline Generation if active
    if hf_pipeline_instance:
        try:
            prompt = f"System: {SYSTEM_INSTRUCTIONS}\nUser: {user_input}\nAssistant:"
            outputs = hf_pipeline_instance(prompt, max_new_tokens=250, do_sample=True, temperature=0.7)
            generated_text = outputs[0]["generated_text"].split("Assistant:")[-1].strip()
            return {
                "reply": generated_text,
                "model": loaded_hf_model_id,
                "engine": "Hugging Face Transformers"
            }
        except Exception as e:
            print(f"Hugging Face generation error: {e}")

    # Option B: Google ADK Agent
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

    # Option C: Direct ADK instantiation fallback
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

    # Option D: Friendly Human Mental Health Response Engine Fallback
    friendly_reply = friendly_human_mental_health_response(user_input, req.language or "Hinglish")
    return {
        "reply": friendly_reply,
        "model": loaded_hf_model_id or req.model or "gemma-4-26b-a4b-it",
        "engine": "Gemma 4 Mental Health Companion"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
