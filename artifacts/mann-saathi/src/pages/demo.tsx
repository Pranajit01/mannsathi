import { useState } from 'react';
import { Send, Volume2, Languages, AlertCircle, Sparkles, Brain, Shield, PhoneCall } from 'lucide-react';
import { LightRays } from '@/components/LightRays';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  risk?: number;
};

type Persona = {
  id: string;
  name: string;
  scenario: string;
  messages: Message[];
};

export default function Demo() {
  const [selectedPersona, setSelectedPersona] = useState<string>('arjun');
  const [currentStep, setCurrentStep] = useState(0);

  const personas: Persona[] = [
    {
      id: 'arjun',
      name: 'Arjun (Engineering Student)',
      scenario: 'Exam stress, family expectations, comparison culture',
      messages: [
        { role: 'assistant', content: 'Namaste. Main Mann Saathi hoon. Aap kaise hain aaj? Kya aap mujhse kuch share karna chahenge?', risk: 0 },
        { role: 'user', content: 'Bahut stress hai. Exam aa raha hai aur kuch samajh nahi aa raha.' },
        { role: 'assistant', content: 'Main samajh sakta hoon. Exam stress bahut overwhelming ho sakta hai. Kya aap mujhe thoda aur batayenge ki aap kaisa feel kar rahe hain?', risk: 1 },
        { role: 'user', content: 'Sab friends acche college mein hain. Main bas ek failure hoon. Parents ne itna invest kiya aur maine unhe disappoint kiya.' },
        { role: 'assistant', content: 'Yeh sunke mann bhaari ho gaya. Comparison ka dard main samajh sakta hoon. Lekin ek baat batau? Ek exam aapki puri life define nahi karti. Aap abhi bahut young hain — bahut saare raaste hain. Kya aapne apne parents se baat ki hai is baare mein?', risk: 2 },
        { role: 'user', content: 'Nahi. Main unhe face nahi kar sakta. Har din unke expectations ka weight feel hota hai.' },
        { role: 'assistant', content: 'Yeh bahut heavy burden hai jo aap carry kar rahe hain. Akele carry karna aur bhi mushkil hota hai. Kya aap chahte hain ki hum saath mein kuch breathing exercise karein? Thoda calm feel karne ke liye?', risk: 2 },
      ],
    },
    {
      id: 'ramesh',
      name: 'Ramesh (Farmer)',
      scenario: 'Crop failure, severe distress, financial anxiety',
      messages: [
        { role: 'assistant', content: 'नमस्ते. मी मन साथी आहे. आपण कसे आहात? काही बोलायचे आहे का?', risk: 0 },
        { role: 'user', content: 'पीक बरबाद झालं. कर्ज फेडायला नाही येत. काय करावं समजत नाही.' },
        { role: 'assistant', content: 'हे ऐकून मला खूप वाईट वाटतंय. शेतकरी असणं सध्या खूप कठीण आहे. पाऊस नाही, किंमत नाही. आपण एकटे नाही आहात या संघर्षात.', risk: 2 },
        { role: 'user', content: 'माझे तीन शेजारी गेल्या वर्षी... त्यांनी suicide केला. मला पण वाटतं कधी कधी.' },
        { role: 'assistant', content: 'आपण हे share केलंत म्हणजे खूप धैर्य आहे आपल्यात. मला वाटतं आपण सध्या खूप मोठ्या वेदनेतून जातंय. मी आपल्याला एका व्यक्तीशी जोडू शकतो जो मदत करू शकतो. Tele-MANAS — 14416. हे free आणि confidential आहे. काय मी आपल्याला आत्ता connect करू?', risk: 4 },
      ],
    },
    {
      id: 'anjali',
      name: 'Anjali (Domestic Violence Survivor)',
      scenario: 'Escaped abusive situation, acute crisis support',
      messages: [
        { role: 'assistant', content: 'नमस्ते. मैं मन साथी हूँ. आप सुरक्षित हैं? मुझसे बात करें.', risk: 0 },
        { role: 'user', content: 'घर छोड़ दिया. बच्चे हैं. कहाँ जाऊँ पता नहीं. डर लग रहा है.' },
        { role: 'assistant', content: 'आपने जो step लिया वो बहुत बहादुरी का है. सबसे पहले — आप अभी सुरक्षित हैं? आपको किसी immediate help की ज़रूरत तो नहीं?', risk: 3 },
        { role: 'user', content: 'अभी तो safe हूँ. बहन के घर आई हूँ. लेकिन आगे क्या होगा? कोर्ट, पैसे, सब.' },
        { role: 'assistant', content: 'मैं समझ सकता हूँ कितना overwhelming है ये सब. लेकिन आपने सबसे मुश्किल step ले लिया — निकल आईं. अब हम छोटे-छोटे steps लेंगे. Legal help के लिए कुछ resources हैं — महिला हेल्पलाइन 181, और NGOs जो DV survivors को मदद करते हैं. क्या मैं आपको ये details share करूँ?', risk: 3 },
        { role: 'user', content: 'हाँ. कुछ भी help चाहिए.' },
        { role: 'assistant', content: 'बिल्कुल. मैं आपको अभी connect कर रहा हूँ iCall से (9152987821) — वो आपको legal aid और counseling दोनों में guide करेंगे. आप अकेली नहीं हैं Anjali. Help available है.', risk: 3 },
      ],
    },
  ];

  const currentPersona = personas.find((p) => p.id === selectedPersona) || personas[0];
  const visibleMessages = currentPersona.messages.slice(0, currentStep + 1);

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative font-sans pt-36 sm:pt-40 pb-20">
      {/* Living WebGL Aurora Background */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#ff6b4a"
        raysSpeed={1.5}
        lightSpread={1.5}
        rayLength={2.0}
        followMouse={true}
        mouseInfluence={0.4}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ff6b4a]" />
            <span>Interactive Gemma AI Companion Sandbox</span>
          </div>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white uppercase leading-tight">
            Mann Saathi <span className="text-warm-gradient">Live Demo</span>
          </h1>
          <p className="text-neutral-300 text-sm font-normal mt-2">
            Simulate real-world Indic conversational support and 4-tier clinical triage.
          </p>
        </div>

        {/* Persona Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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

        {/* Chat Interface Container */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-[#ff6b4a]" />
              <div>
                <h3 className="font-bold text-base text-white">{currentPersona.name}</h3>
                <span className="text-xs text-neutral-400 font-mono">100% Private On-Device Session</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, currentPersona.messages.length - 1))}
                disabled={currentStep >= currentPersona.messages.length - 1}
                className="btn-keycap bg-[#e6e6e6] text-[#2f3031] text-xs py-1.5 px-3 disabled:opacity-40"
              >
                Next Message Step →
              </button>
            </div>
          </div>

          {/* Message Stream */}
          <div className="space-y-4 min-h-[300px] max-h-[450px] overflow-y-auto p-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
            {visibleMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
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
                    <span>Emergency Crisis Escalate (Tele-MANAS 14416)</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>Conversational Step: {currentStep + 1} of {currentPersona.messages.length}</span>
            <span className="text-emerald-400">● Gemma INT4 Model Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
