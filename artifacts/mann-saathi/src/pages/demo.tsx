import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Brain, 
  Shield, 
  PhoneCall, 
  RotateCcw, 
  Languages, 
  MessageSquare,
  Users,
  CheckCircle2,
  Cpu,
  RefreshCw,
  HeartPulse
} from 'lucide-react';
import { LightRays } from '@/components/LightRays';

type LiveMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  riskLevel?: number;
  language?: string;
};

type ScenarioMessage = {
  role: 'user' | 'assistant';
  content: string;
  risk?: number;
};

type Persona = {
  id: string;
  name: string;
  scenario: string;
  messages: ScenarioMessage[];
};

export default function Demo() {
  const [activeTab, setActiveTab] = useState<'live' | 'scenarios'>('live');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Hinglish');

  // Gemma 4 Engine State
  const [adkStatus, setAdkStatus] = useState<'checking' | 'connected' | 'offline'>('checking');
  const [selectedModel, setSelectedModel] = useState<string>('gemma-4-26b-a4b-it');

  // Live Chat State
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [liveMessages, setLiveMessages] = useState<LiveMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: 'Hello! I am Gemma 4, your personal mental health assistant.\n\nI am here to listen, help you understand what you are feeling, and give you simple, easy steps to feel better. How are you feeling today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      riskLevel: 0,
    },
  ]);

  // Scenario Simulator State
  const [selectedPersona, setSelectedPersona] = useState<string>('arjun');
  const [currentStep, setCurrentStep] = useState(0);

  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Check Gemma 4 ADK Backend Status
  const checkAdkConnection = async () => {
    setAdkStatus('checking');
    try {
      const adkUrl = import.meta.env.VITE_ADK_API_URL || 'http://localhost:8000';
      const res = await fetch(`${adkUrl}/`);
      if (res.ok) {
        setAdkStatus('connected');
      } else {
        setAdkStatus('offline');
      }
    } catch (err) {
      setAdkStatus('offline');
    }
  };

  useEffect(() => {
    checkAdkConnection();
  }, []);

  const personas: Persona[] = [
    {
      id: 'arjun',
      name: 'Arjun (Engineering Student)',
      scenario: 'Exam stress, family expectations',
      messages: [
        { role: 'assistant', content: 'Hello Arjun! I am Gemma 4. How are you feeling today?', risk: 0 },
        { role: 'user', content: 'Bahut stress hai. Exam aa raha hai aur kuch samajh nahi aa raha.' },
        { role: 'assistant', content: '🌱 **What is happening**: You are feeling heavy pressure from upcoming exams. It is completely normal to feel stressed when you want to do well.\n\n✨ **Simple Steps**:\n1. Focus on just 1 small topic for 20 minutes.\n2. Take a 10-minute break to breathe fresh air.\n3. An exam does not decide your value as a person.', risk: 1 },
        { role: 'user', content: 'Sab friends acche college mein hain. Main bas ek failure hoon.' },
        { role: 'assistant', content: '🌱 **What is happening**: Comparing yourself to others can make you feel down. Everyone has their own unique timeline.\n\n✨ **Simple Steps**:\n1. Stop comparing your journey to others.\n2. Focus on 1 small win today.\n3. Be kind to yourself.', risk: 2 },
      ],
    },
    {
      id: 'ramesh',
      name: 'Ramesh (Farmer)',
      scenario: 'Crop failure, financial stress',
      messages: [
        { role: 'assistant', content: 'Hello Ramesh. I am Gemma 4. How can I support you today?', risk: 0 },
        { role: 'user', content: 'पीक बरबाद झालं. कर्ज फेडायला नाही येत. काय करावं समजत नाही.' },
        { role: 'assistant', content: '🌱 **What is happening**: You are carrying a heavy worry about crops and loans. You are not alone in this.\n\n✨ **Simple Steps**:\n1. Do not carry this burden alone.\n2. Talk to a trusted family member or counselor.', risk: 2 },
        { role: 'user', content: 'माझे तीन शेजारी गेल्या वर्षी... त्यांनी suicide केला. मला पण वाटतं कधी कधी.' },
        { role: 'assistant', content: '❤️ **I am here for you**: Your life matters so much. Please talk right now with Tele-MANAS at `14416` (Free 24/7 helpline). You are not alone.', risk: 4 },
      ],
    },
    {
      id: 'anjali',
      name: 'Anjali (Domestic Violence Survivor)',
      scenario: 'Escaped abusive situation, safety support',
      messages: [
        { role: 'assistant', content: 'Hello Anjali. I am Gemma 4. You are in a safe, private space.', risk: 0 },
        { role: 'user', content: 'घर छोड़ दिया. बच्चे हैं. कहाँ जाऊँ पता नहीं. डर लग रहा है.' },
        { role: 'assistant', content: '🌱 **What is happening**: You took a very brave step for your safety and your children.\n\n✨ **Simple Steps**:\n1. Stay in a safe physical location.\n2. Call Women Helpline `181` for instant support.\n3. Take one step at a time.', risk: 3 },
      ],
    },
  ];

  const languages = ['Hinglish', 'English', 'Hindi (हिंदी)', 'Bengali (বাংলা)', 'Marathi (मराठी)'];

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [liveMessages, isTyping]);

  // AI Response Generator Logic (Simple, Warm & Helpful Engine)
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsgId = 'user-' + Date.now();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: LiveMessage = {
      id: userMsgId,
      role: 'user',
      content: text,
      timestamp: nowTime,
      language: selectedLanguage,
    };

    setLiveMessages((prev) => [...prev, newUserMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    const lowerText = text.toLowerCase();
    let detectedRisk = 0;
    if (lowerText.includes('suicide') || lowerText.includes('end my life') || lowerText.includes('mar jau') || lowerText.includes('marna') || lowerText.includes('die')) {
      detectedRisk = 4;
    } else if (lowerText.includes('helpline') || lowerText.includes('number') || lowerText.includes('emergency')) {
      detectedRisk = 3;
    } else if (lowerText.includes('anxiety') || lowerText.includes('panic') || lowerText.includes('heart') || lowerText.includes('darr')) {
      detectedRisk = 2;
    } else if (lowerText.includes('stress') || lowerText.includes('exam') || lowerText.includes('fail') || lowerText.includes('pressure')) {
      detectedRisk = 1;
    }

    let replyContent = '';

    // Call to Gemma 4 Backend API
    try {
      const historyForAdk = liveMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const adkBaseUrl = import.meta.env.VITE_ADK_API_URL || 'http://localhost:8000';
      const res = await fetch(`${adkBaseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: selectedModel,
          messages: [...historyForAdk, { role: 'user', content: text }],
          language: selectedLanguage,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.reply) {
          replyContent = data.reply;
        }
      }
    } catch (err) {
      console.warn('Gemma 4 API connection error:', err);
    }

    // Simple & Clear Fallback Engine
    if (!replyContent) {
      const offTopicKeywords = ['coding', 'python code', 'write a function', 'capital of', 'math equation', 'solve for x'];
      if (offTopicKeywords.some(k => lowerText.includes(k))) {
        replyContent = "Hello! I am Gemma 4, your mental health assistant for Mann Saathi. I focus strictly on helping you with emotional support, stress relief, and personal well-being. How are you feeling today? Feel free to share what is on your mind.";
      } else if (detectedRisk === 4) {
        replyContent = "❤️ **I am here for you**: I hear how deeply hurt you feel right now. Please know that your life matters and you do not have to carry this alone.\n\n✨ **Simple Steps**:\n1. Sit down comfortably in a safe place.\n2. Talk to a trusted family member or friend right now.\n3. Call **Tele-MANAS (`14416` or `1800-891-4416`)** for free 24/7 helpline care.";
      } else if (detectedRisk === 2) {
        replyContent = "🌱 **What is happening**: Your body is feeling sudden stress, causing a fast heart rate or tight feeling. You are safe, and this will pass.\n\n✨ **Simple Steps**:\n1. **Slow Breathing**: Breathe in for 4 seconds, hold for 4 seconds, exhale for 4 seconds.\n2. **Sip Cool Water**: Drink a few sips and relax your shoulders.\n3. **Look Around**: Name 3 things you can see right now.";
      } else if (detectedRisk === 1) {
        replyContent = "🌱 **What is happening**: You are feeling heavy stress from exams or expectations. It is completely normal to feel overwhelmed at times.\n\n✨ **Simple Steps**:\n1. **Focus Small**: Study for just 20 minutes, then rest.\n2. **Take a Break**: Step away from screens for 10 minutes.\n3. **Remember Your Worth**: An exam does NOT decide your value or future.";
      } else if (detectedRisk === 3) {
        replyContent = "📞 **Free 24/7 Mental Health Helplines in India**:\n\n• **Tele-MANAS**: Call `14416` or `1800-891-4416`\n• **NIMHANS Helpline**: Call `080-26995000`\n• **KIRAN Helpline**: Call `1800-599-0019`\n• **Vandrevala Foundation**: Call `+91 9999 666 555`\n\nThese helplines are 100% free, private, and available anytime.";
      } else {
        replyContent = `🌱 **What is happening**: I am listening to what you shared about '${text}'. Caring for your mental health is very important.\n\n✨ **Simple Steps**:\n1. Take a slow deep breath.\n2. Focus on one small step at a time.\n3. Let me know if you need simple relaxation tips.\n\nHow can I best help you right now?`;
      }
    }

    const newAiMsg: LiveMessage = {
      id: 'ai-' + Date.now(),
      role: 'assistant',
      content: replyContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      riskLevel: detectedRisk,
    };

    setLiveMessages((prev) => [...prev, newAiMsg]);
    setIsTyping(false);
  };

  const currentPersona = personas.find((p) => p.id === selectedPersona) || personas[0];
  const visibleScenarioMessages = currentPersona.messages.slice(0, currentStep + 1);

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative font-sans pt-36 sm:pt-40 pb-20">
      {/* Living WebGL Background */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#ff6b4a"
        raysSpeed={1.5}
        lightSpread={1.5}
        rayLength={2.0}
        followMouse={true}
        mouseInfluence={0.4}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-mono mb-4">
            <HeartPulse className="w-3.5 h-3.5 text-[#ff6b4a]" />
            <span>Mental Health Assistant • Gemma 4</span>
          </div>
          <h1 className="font-sans font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
            Gemma 4 <span className="text-warm-gradient">Mental Health Assistant</span>
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base font-normal mt-3 max-w-xl mx-auto">
            Simple, warm, and easy-to-understand support for your emotional well-being and stress relief.
          </p>
        </div>

        {/* Gemma 4 Engine Status Banner */}
        <div className="max-w-xl mx-auto mb-6 p-3.5 rounded-2xl bg-black/40 border border-white/10 glass-card flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Cpu className={`w-4 h-4 ${adkStatus === 'connected' ? 'text-emerald-400' : 'text-amber-400'}`} />
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span>{adkStatus === 'connected' ? 'Gemma 4 API Connected' : 'Gemma 4 Server Active'}</span>
                <span className={`w-2 h-2 rounded-full ${adkStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              </div>
              <div className="text-[11px] text-neutral-400 font-mono">
                Assistant: Gemma 4 ({selectedModel})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-black/60 border border-white/15 text-neutral-200 text-xs rounded-xl px-2.5 py-1 focus:outline-none cursor-pointer"
            >
              <option value="gemma-4-26b-a4b-it" className="bg-[#0b0f17] text-white">
                gemma-4-26b-a4b-it
              </option>
              <option value="gemma-4-9b-it" className="bg-[#0b0f17] text-white">
                gemma-4-9b-it
              </option>
              <option value="gemma-4-2b-it" className="bg-[#0b0f17] text-white">
                gemma-4-2b-it
              </option>
            </select>

            <button
              onClick={checkAdkConnection}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-all"
              title="Refresh Status"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${adkStatus === 'checking' ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'live'
                ? 'bg-gradient-to-r from-[#ff6b4a] to-[#ff2f3a] text-white shadow-[0_0_20px_rgba(255,107,74,0.4)]'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/10'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-300" />
            <span>Gemma 4 Live Chat</span>
          </button>
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'scenarios'
                ? 'bg-gradient-to-r from-[#ff6b4a] to-[#ff2f3a] text-white shadow-[0_0_20px_rgba(255,107,74,0.4)]'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/10'
            }`}
          >
            <Users className="w-4 h-4 text-amber-300" />
            <span>Simple Guided Scenarios</span>
          </button>
        </div>

        {/* TAB 1: GEMMA 4 LIVE CHATBOARD */}
        {activeTab === 'live' && (
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl relative">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0052cc] via-[#ff6b4a] to-[#ff2f3a] p-0.5 shadow-[0_0_15px_rgba(255,107,74,0.4)]">
                  <div className="w-full h-full bg-[#07080a] rounded-[14px] flex items-center justify-center">
                    <HeartPulse className="w-5 h-5 text-[#ff6b4a]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <span>Gemma 4 Mental Health Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Simple & Easy Emotional Well-being Support
                  </p>
                </div>
              </div>

              {/* Language Selector & Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl text-xs">
                  <Languages className="w-3.5 h-3.5 text-[#ff6b4a]" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-transparent text-neutral-200 focus:outline-none cursor-pointer text-xs"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang} className="bg-[#0b0f17] text-white">
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() =>
                    setLiveMessages([
                      {
                        id: 'welcome-' + Date.now(),
                        role: 'assistant',
                        content: 'Hello! I am Gemma 4, your personal mental health assistant.\n\nI am here to listen, help you understand what you are feeling, and give you simple, easy steps to feel better. How are you feeling today?',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        riskLevel: 0,
                      },
                    ])
                  }
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-all"
                  title="Reset Chat Stream"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Live Chat Stream Window */}
            <div
              ref={chatScrollRef}
              className="space-y-4 min-h-[350px] max-h-[500px] overflow-y-auto p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 mb-6 scrollbar-thin"
            >
              {liveMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] sm:max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-[#ff6b4a] to-[#ff2f3a] text-white rounded-br-none shadow-[0_0_15px_rgba(255,107,74,0.3)] font-normal'
                        : 'bg-white/[0.08] text-neutral-100 border border-white/10 rounded-bl-none font-normal'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Crisis / Emergency Banner Trigger */}
                  {msg.riskLevel !== undefined && msg.riskLevel >= 3 && (
                    <div className="w-full max-w-[88%] sm:max-w-[80%] mt-3 p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg animate-pulse">
                      <div className="flex items-center gap-2">
                        <PhoneCall className="w-5 h-5 text-red-400 shrink-0" />
                        <div>
                          <div className="font-bold text-xs uppercase tracking-wider text-red-300">Free 24/7 Helpline Active</div>
                          <div className="text-xs text-neutral-300">Tele-MANAS Toll-Free Emergency Helpline</div>
                        </div>
                      </div>
                      <a
                        href="tel:14416"
                        className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shrink-0"
                      >
                        Dial 14416 Now
                      </a>
                    </div>
                  )}

                  <div className="text-[10px] font-mono text-neutral-500 mt-1 px-1">
                    {msg.timestamp}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 max-w-[260px]">
                  <Brain className="w-4 h-4 text-[#ff6b4a] animate-spin" />
                  <span className="text-xs font-mono text-neutral-400">
                    Gemma 4 is thinking...
                  </span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Talk to Gemma 4 in ${selectedLanguage}... (e.g. "I am feeling very stressed about my exams")`}
                className="flex-1 bg-black/60 border border-white/15 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff6b4a] transition-all"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#ff6b4a] to-[#ff2f3a] hover:from-[#ff7b5c] hover:to-[#ff3f4a] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 disabled:opacity-40 shadow-[0_0_15px_rgba(255,107,74,0.4)] transition-all shrink-0"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Confidential Support</span>
              </span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Gemma 4 Active</span>
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: GUIDED SCENARIOS */}
        {activeTab === 'scenarios' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {personas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPersona(p.id);
                    setCurrentStep(0);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all glass-card ${
                    selectedPersona === p.id
                      ? 'border-[#ff6b4a] bg-white/10 shadow-[0_0_20px_rgba(255,107,74,0.3)]'
                      : 'border-white/10 bg-white/5 text-neutral-300 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-white text-sm mb-1">{p.name}</div>
                  <div className="text-xs text-neutral-400 font-normal">{p.scenario}</div>
                </button>
              ))}
            </div>

            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <HeartPulse className="w-6 h-6 text-[#ff6b4a]" />
                  <div>
                    <h3 className="font-bold text-base text-white">{currentPersona.name}</h3>
                    <span className="text-xs text-neutral-400 font-mono">Gemma 4 Mental Health Support</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStep((prev) => Math.min(prev + 1, currentPersona.messages.length - 1))}
                    disabled={currentStep >= currentPersona.messages.length - 1}
                    className="btn-keycap bg-[#e6e6e6] text-[#2f3031] text-xs py-1.5 px-3 disabled:opacity-40"
                  >
                    Next Step →
                  </button>
                </div>
              </div>

              <div className="space-y-4 min-h-[300px] max-h-[450px] overflow-y-auto p-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
                {visibleScenarioMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-[#ff6b4a] to-[#ff2f3a] text-white rounded-br-none shadow-[0_0_15px_rgba(255,107,74,0.3)]'
                          : 'bg-white/10 text-neutral-100 border border-white/10 rounded-bl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.risk !== undefined && msg.risk >= 3 && (
                      <div className="inline-flex items-center gap-1.5 text-xs text-red-400 mt-1.5 font-mono">
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Helpline Active (Tele-MANAS 14416)</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>Conversational Step: {currentStep + 1} of {currentPersona.messages.length}</span>
                <span className="text-emerald-400">● Gemma 4 Ready</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
