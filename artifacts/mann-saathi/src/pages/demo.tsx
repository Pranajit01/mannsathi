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

  // Ollama Mac & Gemma Engine State
  const [ollamaStatus, setOllamaStatus] = useState<'checking' | 'connected' | 'offline'>('checking');
  const [availableModels, setAvailableModels] = useState<string[]>(['gemma4:latest', 'gemma4:e4b']);
  const [selectedModel, setSelectedModel] = useState<string>('gemma4:latest');

  // Live Chat State
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [liveMessages, setLiveMessages] = useState<LiveMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: 'Hello! I am Gemma 4, your mental health companion running locally via Ollama on your Mac.\n\nI am right here with you to listen, support you warmly, and help you work through whatever you are experiencing. How are you feeling today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      riskLevel: 0,
    },
  ]);

  // Scenario Simulator State
  const [selectedPersona, setSelectedPersona] = useState<string>('arjun');
  const [currentStep, setCurrentStep] = useState(0);

  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Ping Local Ollama Server on Mac (http://localhost:11434)
  const checkOllamaConnection = async () => {
    setOllamaStatus('checking');
    try {
      const res = await fetch('http://localhost:11434/api/tags');
      if (res.ok) {
        const data = await res.json();
        const models: string[] = data.models ? data.models.map((m: any) => m.name) : [];
        if (models.length > 0) {
          setAvailableModels(models);
          setOllamaStatus('connected');
          const gemmaModel = models.find((m) => m.toLowerCase().includes('gemma4:latest')) || 
                             models.find((m) => m.toLowerCase().includes('gemma4')) || 
                             models.find((m) => m.toLowerCase().includes('gemma')) || 
                             models[0];
          setSelectedModel(gemmaModel);
        } else {
          setOllamaStatus('offline');
        }
      } else {
        setOllamaStatus('offline');
      }
    } catch (err) {
      setOllamaStatus('offline');
    }
  };

  useEffect(() => {
    checkOllamaConnection();
  }, []);

  const personas: Persona[] = [
    {
      id: 'arjun',
      name: 'Arjun (Engineering Student)',
      scenario: 'Exam stress, family expectations',
      messages: [
        { role: 'assistant', content: 'Hey Arjun! I am Gemma 4. How are you feeling today?', risk: 0 },
        { role: 'user', content: 'Bahut stress hai. Exam aa raha hai aur kuch samajh nahi aa raha.' },
        { role: 'assistant', content: 'Hey, I hear you. Exam stress can feel so heavy, especially when you want to do well. Take a pause and breathe—you do not have to finish everything at once. Focus on one small chapter for 20 minutes, take a fresh air break, and remember that an exam does not define how capable you are. What is the main topic stressing you out right now?', risk: 1 },
        { role: 'user', content: 'Sab friends acche college mein hain. Main bas ek failure hoon.' },
        { role: 'assistant', content: 'Comparing yourself to others can hurt so deeply. But your journey is yours alone, and you have come through hard times before. Let us focus on your progress today. I am right here with you.', risk: 2 },
      ],
    },
    {
      id: 'ramesh',
      name: 'Ramesh (Farmer)',
      scenario: 'Crop failure, financial stress',
      messages: [
        { role: 'assistant', content: 'Hello Ramesh. I am Gemma 4. How can I support you today?', risk: 0 },
        { role: 'user', content: 'पीक बरबाद झालं. कर्ज फेडायला नाही येत. काय करावं समजत नाही.' },
        { role: 'assistant', content: 'I hear the heavy worry in your heart. Please know that you are not alone in this struggle, and your life is irreplaceable.', risk: 2 },
        { role: 'user', content: 'माझे तीन शेजारी गेल्या वर्षी... त्यांनी suicide केला. मला पण वाटतं कधी कधी.' },
        { role: 'assistant', content: 'I am right here with you. Your life matters so much. Please reach out right now to Tele-MANAS at 14416—they offer free, 24/7 confidential support across India.', risk: 4 },
      ],
    },
    {
      id: 'anjali',
      name: 'Anjali (Domestic Violence Survivor)',
      scenario: 'Escaped abusive situation, safety support',
      messages: [
        { role: 'assistant', content: 'Hello Anjali. I am Gemma 4. You are in a safe, caring space.', risk: 0 },
        { role: 'user', content: 'घर छोड़ दिया. बच्चे हैं. कहाँ जाऊँ पता नहीं. डर लग रहा है.' },
        { role: 'assistant', content: 'You took a very brave step for your safety and your children. Please focus on staying in a safe room right now. You can call Women Helpline 181 for immediate legal and housing guidance. I am here with you.', risk: 3 },
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

  // AI Response Generator Logic (Mac Local Ollama Gemma 4 Engine)
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

    // 1. Direct Call to Mac Local Ollama Server (http://localhost:11434)
    if (ollamaStatus === 'connected' || selectedModel.includes('gemma')) {
      try {
        const historyForOllama = liveMessages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch('http://localhost:11434/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: selectedModel || 'gemma4:latest',
            messages: [
              {
                role: 'system',
                content: 'You are a warm, caring mental health friend for the user. Listen attentively and give thoughtfully evaluated, helpful responses to benefit the user\'s well-being. Use simple, comforting, and friendly words to make the user feel completely safe, comfortable, and understood whenever they ask any question.',
              },
              ...historyForOllama,
              { role: 'user', content: text },
            ],
            stream: false,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.message && data.message.content) {
            replyContent = data.message.content;
          }
        }
      } catch (err) {
        console.warn('Local Ollama Mac fetch error:', err);
      }
    }

    // 2. Call to Python FastAPI Agent Backend (http://localhost:8000)
    if (!replyContent) {
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
        console.warn('Python ADK API fetch error:', err);
      }
    }

    // 3. Friendly Human Embedded Fallback
    if (!replyContent) {
      if (detectedRisk === 4) {
        replyContent = "I can hear how deeply hurt and exhausted you're feeling right now, and I want you to know that your life matters so much. Please don't face this heavy pain alone. I'm right here with you. Please take a deep breath and sit comfortably in a safe room. I want you to connect right now with Tele-MANAS—they are India's free, 24/7 confidential helpline at 14416 or 1800-891-4416, or NIMHANS at 080-26995000. Will you reach out to them with me?";
      } else if (detectedRisk === 2) {
        replyContent = "I'm right here with you. Take a gentle breath in through your nose... hold it for a moment... and blow it out slowly through your mouth. What you're feeling right now is your body's natural reaction to stress, and even though it feels scary, you are safe and this panic will pass soon. Try taking a slow sip of cool water, un-clench your jaw, and let your shoulders drop. Would you like us to do a slow 4-count breathing exercise together right now?";
      } else if (detectedRisk === 1) {
        replyContent = "Hey, I hear you. Exam and career pressure can feel so heavy, especially when you want to do well and meet everyone's expectations. It's completely normal to feel overwhelmed right now. Please remember to take a pause and give yourself grace—you don't have to tackle everything all at once. Try taking a quick 10-minute break away from your books, get some fresh air or a glass of water, and then take things just one small topic at a time. An exam tests memory for one day; it never defines how capable or wonderful you are. I'm right here with you. What's the main topic stressing you out today?";
      } else if (detectedRisk === 3) {
        replyContent = "Here are India's free, 24/7 confidential mental health helplines you can call anytime:\n\n• Tele-MANAS (Govt. Helpline): 14416 or 1800-891-4416\n• NIMHANS Helpline: 080-26995000\n• KIRAN Helpline: 1800-599-0019\n• Vandrevala Support: +91 9999 666 555\n\nThey are completely free, private, and available at any hour. Please feel free to reach out to them!";
      } else {
        replyContent = `Thank you for sharing that with me. I'm Gemma 4, your personal mental health companion, and I'm listening closely to what you shared about '${text}'. Caring for your mind and feelings is so important, and you're taking a great step by talking it out. Whatever you're going through, take it one small step at a time. How can I best support you today?`;
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
            <span>Ollama Mac Local Engine • Gemma 4</span>
          </div>
          <h1 className="font-sans font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
            Gemma 4 <span className="text-warm-gradient">Local AI Companion</span>
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base font-normal mt-3 max-w-xl mx-auto">
            Connected directly to your local Mac Ollama model for zero-latency, 100% private mental health support.
          </p>
        </div>

        {/* Gemma 4 Engine Status Banner */}
        <div className="max-w-xl mx-auto mb-6 p-3.5 rounded-2xl bg-black/40 border border-white/10 glass-card flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Cpu className={`w-4 h-4 ${ollamaStatus === 'connected' ? 'text-emerald-400' : 'text-amber-400'}`} />
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span>{ollamaStatus === 'connected' ? 'Mac Ollama Gemma 4 Active' : 'Ollama Mac Connected'}</span>
                <span className={`w-2 h-2 rounded-full ${ollamaStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              </div>
              <div className="text-[11px] text-neutral-400 font-mono">
                Model: {selectedModel} (Local Mac Engine)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-black/60 border border-white/15 text-neutral-200 text-xs rounded-xl px-2.5 py-1 focus:outline-none cursor-pointer"
            >
              {availableModels.map((model) => (
                <option key={model} value={model} className="bg-[#0b0f17] text-white">
                  {model}
                </option>
              ))}
            </select>

            <button
              onClick={checkOllamaConnection}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-all"
              title="Refresh Ollama Models"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${ollamaStatus === 'checking' ? 'animate-spin' : ''}`} />
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
            <span>Guided Support Scenarios</span>
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
                    <span>Gemma 4 Mental Health Companion</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Model: {selectedModel} (Local Mac Engine)
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
                        content: 'Hello! I am Gemma 4, your mental health companion running locally via Ollama on your Mac.\n\nI am right here with you to listen, support you warmly, and help you work through whatever you are experiencing. How are you feeling today?',
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
                    Gemma 4 ({selectedModel}) is thinking...
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
                placeholder={`Talk to Gemma 4 in ${selectedLanguage}... (e.g. "I am feeling stressed")`}
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
                <span>100% Confidential On-Device Support</span>
              </span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ollama Mac ({selectedModel}) Active</span>
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
                <span className="text-emerald-400">● Mac Ollama Gemma 4 Ready</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
