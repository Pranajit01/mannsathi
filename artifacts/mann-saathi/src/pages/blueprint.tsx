import { useState } from 'react';
import { 
  ChevronRight, 
  FileText, 
  Sparkles, 
  Terminal, 
  Code2, 
  Shield, 
  Cpu, 
  Layers, 
  Activity, 
  Brain,
  Languages,
  CheckCircle2,
  Lock,
  PhoneCall,
  Server,
  Zap,
  ArrowRight
} from 'lucide-react';
import { LightRays } from '@/components/LightRays';
import { Link } from 'wouter';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function Blueprint() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [journeyStep, setJourneyStep] = useState(1);

  const techSections = [
    { id: 'pipeline', title: 'On-Device Gemma Pipeline', icon: Terminal },
    { id: 'architecture', title: 'AI System Architecture', icon: Cpu },
    { id: 'safety', title: 'Crisis & Safety Triage', icon: Shield },
    { id: 'indic', title: 'Multilingual Indic NLP', icon: Languages },
    { id: 'quantization', title: 'INT4 Quantization & Performance', icon: Activity },
    { id: 'blueprint', title: 'Full System Blueprint Docs', icon: FileText },
  ];

  const quantizationPerfData = [
    { model: 'Gemma 2B FP16', RAM: 8.2, Latency: 420 },
    { model: 'Gemma 2B INT8', RAM: 4.1, Latency: 210 },
    { model: 'Gemma 2B INT4 (Mann Saathi)', RAM: 1.15, Latency: 85 },
  ];

  const indicLanguages = [
    { name: 'Hindi (हिंदी)', sample: 'मुझे बहुत चिंता हो रही है, क्या आप मदद कर सकते हैं?', status: 'Native Fine-Tuned' },
    { name: 'Marathi (मराठी)', sample: 'मला खूप ताण आला आहे, काय करू सुचत नाही.', status: 'Native Fine-Tuned' },
    { name: 'Bengali (বাংলা)', sample: 'আমার খুব চিন্তা হচ্ছে, পরীক্ষা নিয়ে খুব চাপে আছি।', status: 'Native Fine-Tuned' },
    { name: 'Tamil (தமிழ்)', sample: 'எனக்கு ரொம்ப பயமாக இருக்கிறது, உதவி செய்ய முடியுமா?', status: 'Native Fine-Tuned' },
    { name: 'Hinglish', sample: 'Aaj kal bahut stress feel ho raha hai, zero focus in studies.', status: 'Code-Switching Ready' },
    { name: 'Telugu (తెలుగు)', sample: 'నాకు చాలా భయంగా ఉంది, దయచేసి సహాయం చేయండి.', status: 'Native Fine-Tuned' },
  ];

  // Dynamic SVG path drawing strokeDashoffset based on journey step (1 to 5)
  const totalSteps = 5;
  const strokeOffset = 100 - (journeyStep / totalSteps) * 100;

  return (
    <div className="min-h-screen text-white selection:bg-[#ff6b4a]/30 selection:text-amber-200 overflow-x-hidden relative font-sans pt-36 sm:pt-40 pb-20">
      
      {/* Living Animated WebGL LightRays & CSS Aurora Blades */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#ff6b4a"
        raysSpeed={1.5}
        lightSpread={1.5}
        rayLength={2.0}
        followMouse={true}
        mouseInfluence={0.4}
        noiseAmount={0.02}
        distortion={0.05}
      />

      {/* Living Warm Aurora Blades */}
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] aurora-blade-1 rounded-full pointer-events-none" />
      <div className="absolute top-[300px] left-[-150px] w-[500px] h-[500px] aurora-blade-2 rounded-full pointer-events-none" />
      <div className="absolute top-[200px] right-[-150px] w-[500px] h-[500px] aurora-blade-3 rounded-full pointer-events-none" />

      {/* Main Container with Clean Grid Padding - Zero Overlap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-mono tracking-wider text-amber-300 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#ff6b4a] animate-pulse" />
            <span>Google Gemma Open Model • On-Device Architecture</span>
          </div>
          <h1 className="font-sans font-extrabold text-4xl sm:text-6xl text-white uppercase leading-tight tracking-tight mb-4">
            Gemma <span className="text-warm-gradient">Tech System</span>
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg font-normal max-w-2xl mx-auto">
            Comprehensive technical architecture detailing on-device INT4 Gemma model execution, sub-100ms inference pipeline, and 100% private crisis detection.
          </p>
        </div>

        {/* Clean Responsive Glass Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12 max-w-5xl mx-auto">
          {techSections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeTab === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`glass-nav-btn flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'glass-nav-btn-active text-white shadow-[0_0_20px_rgba(255,107,74,0.4)]'
                    : 'text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#ff6b4a]'}`} />
                <span>{sec.title}</span>
              </button>
            );
          })}
        </div>

        {/* Section Content Area */}
        <div className="space-y-12">
          
          {/* TAB 1: On-Device Gemma Triage IDE Pipeline */}
          {(activeTab === 'pipeline' || activeTab === 'blueprint') && (
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <Terminal className="w-5 h-5 text-[#ff6b4a]" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-xl text-white">On-Device Triage Pipeline</h3>
                    <p className="text-xs text-neutral-400 font-mono">gemma_indic_triage.ts • LiteRT INT4 Execution</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Zero Cloud Dependency</span>
                </div>
              </div>

              {/* IDE Window Mockup */}
              <div className="bg-[#07080a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs sm:text-sm text-neutral-300">
                <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs text-neutral-400 ml-2">gemma_indic_triage.ts</span>
                  </div>
                  <span className="text-xs text-amber-300">Gemma LiteRT INT4</span>
                </div>

                <div className="p-6 overflow-x-auto leading-relaxed">
                  <pre>
                    <code>
                      <span className="text-[#ff6b4a]">import</span> &#123; <span className="text-amber-300">GemmaLiteRTEngine</span>, <span className="text-amber-300">IndicBERTClassifier</span> &#125; <span className="text-[#ff6b4a]">from</span> <span className="text-emerald-400">'@google/gemma-litert'</span>;<br /><br />
                      <span className="text-neutral-500">// Initialize zero-knowledge on-device pipeline</span><br />
                      <span className="text-[#ff6b4a]">const</span> <span className="text-amber-300">gemmaEngine</span> = <span className="text-[#ff6b4a]">new</span> <span className="text-amber-300">GemmaLiteRTEngine</span>(&#123;<br />
                      &nbsp;&nbsp;modelPath: <span className="text-emerald-400">'models/gemma-2b-indic-int4.bin'</span>,<br />
                      &nbsp;&nbsp;quantization: <span className="text-emerald-400">'INT4'</span>,<br />
                      &nbsp;&nbsp;maxMemoryMB: <span className="text-amber-300">1200</span><br />
                      &#125;);<br /><br />
                      <span className="text-[#ff6b4a]">export async function</span> <span className="text-amber-300">processIndicMessage</span>(userMessage: <span className="text-[#ff6b4a]">string</span>) &#123;<br />
                      &nbsp;&nbsp;<span className="text-[#ff6b4a]">const</span> distressLevel = <span className="text-[#ff6b4a]">await</span> IndicBERTClassifier.evaluateDistress(userMessage);<br /><br />
                      &nbsp;&nbsp;<span className="text-[#ff6b4a]">if</span> (distressLevel &gt;= <span className="text-amber-300">3</span>) &#123;<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ff6b4a]">return</span> EmergencyTriageRouter.triggerHelplineReferral(&#123;<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;helpline: <span className="text-emerald-400">'Tele-MANAS (14416)'</span>,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;action: <span className="text-emerald-400">'IMMEDIATE_ESCALATION'</span><br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&#125;);<br />
                      &nbsp;&nbsp;&#125;<br /><br />
                      &nbsp;&nbsp;<span className="text-[#ff6b4a]">return await</span> gemmaEngine.generateSupportiveResponse(&#123;<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;prompt: userMessage,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;safetyGuardrails: <span className="text-emerald-400">'WHO_MHGAP_STRICT'</span><br />
                      &nbsp;&nbsp;&#125;);<br />
                      &#125;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Interactive Animated SVG Architecture Journey Pipeline */}
          {(activeTab === 'architecture' || activeTab === 'blueprint') && (
            <div className="glass-card p-8 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="font-sans font-bold text-2xl text-white mb-1">Interactive Animated SVG Architecture Journey</h3>
                  <p className="text-sm text-neutral-400 font-normal">Click through steps to animate the glowing SVG pipeline connector line forward.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setJourneyStep((prev) => Math.max(1, prev - 1))}
                    disabled={journeyStep <= 1}
                    className="btn-keycap bg-white/10 text-white text-xs px-3 py-1.5 disabled:opacity-30"
                  >
                    ← Prev Step
                  </button>
                  <button
                    onClick={() => setJourneyStep((prev) => Math.min(5, prev + 1))}
                    disabled={journeyStep >= 5}
                    className="btn-keycap bg-[#e6e6e6] text-[#2f3031] text-xs px-3 py-1.5 disabled:opacity-30"
                  >
                    Next Step →
                  </button>
                </div>
              </div>

              {/* Animated SVG Journey Path */}
              <div className="relative my-8 py-6">
                <svg className="w-full h-12 overflow-visible" viewBox="0 0 1000 40" fill="none">
                  {/* Background Track Line */}
                  <path
                    d="M 50 20 L 250 20 L 450 20 L 650 20 L 850 20 L 950 20"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Dynamic Glowing Animated SVG Journey Line */}
                  <path
                    d="M 50 20 L 250 20 L 450 20 L 650 20 L 850 20 L 950 20"
                    stroke="url(#auroraGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="1000"
                    strokeDashoffset={1000 - (journeyStep / 5) * 900}
                    className="transition-all duration-700 ease-out"
                  />

                  <defs>
                    <linearGradient id="auroraGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0052cc" />
                      <stop offset="50%" stopColor="#ff6b4a" />
                      <stop offset="100%" stopColor="#ffb347" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* 5 Journey Nodes */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10 mt-4">
                  {[
                    { step: 1, title: '1. Indic User Input', desc: 'Multilingual prompt in 10+ Indic languages.', icon: Languages },
                    { step: 2, title: '2. IndicBERT Safety Triage', desc: 'Sub-50ms crisis & distress level assessment.', icon: Shield },
                    { step: 3, title: '3. Gemma INT4 Engine', desc: 'Local LiteRT model inference on-device.', icon: Brain },
                    { step: 4, title: '4. Encrypted Local Vault', desc: 'SQLCipher local DB with zero cloud leakage.', icon: Lock },
                    { step: 5, title: '5. Response & Escalation', desc: 'Supportive response or 1-tap Tele-MANAS referral.', icon: PhoneCall },
                  ].map((node) => {
                    const isPassed = node.step <= journeyStep;
                    const isCurrent = node.step === journeyStep;
                    const NodeIcon = node.icon;
                    return (
                      <div
                        key={node.step}
                        onClick={() => setJourneyStep(node.step)}
                        className={`glass-card p-4 rounded-2xl cursor-pointer transition-all ${
                          isCurrent
                            ? 'border-[#ff6b4a] bg-white/10 shadow-[0_0_25px_rgba(255,107,74,0.4)] scale-105'
                            : isPassed
                            ? 'border-white/30 bg-white/5'
                            : 'border-white/10 bg-black/40 opacity-50'
                        }`}
                      >
                        <NodeIcon className={`w-6 h-6 mb-2 ${isPassed ? 'text-[#ff6b4a]' : 'text-neutral-500'}`} />
                        <div className="font-bold text-xs text-white mb-1">{node.title}</div>
                        <div className="text-[11px] text-neutral-300 font-normal leading-relaxed">{node.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 4-Tier Crisis Safety Triage */}
          {(activeTab === 'safety' || activeTab === 'blueprint') && (
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="font-sans font-bold text-2xl text-white mb-6">4-Level Clinical Safety Triage Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
                  <div className="font-bold text-emerald-400 text-lg mb-1">Level 1</div>
                  <div className="text-sm text-white font-medium mb-1">Mild Stress</div>
                  <div className="text-xs text-neutral-300">Self-guided CBT journal prompts</div>
                </div>
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20">
                  <div className="font-bold text-amber-300 text-lg mb-1">Level 2</div>
                  <div className="text-sm text-white font-medium mb-1">Moderate Anxiety</div>
                  <div className="text-xs text-neutral-300">4-7-8 breathing & grounding</div>
                </div>
                <div className="p-4 rounded-xl border border-orange-500/30 bg-orange-950/20">
                  <div className="font-bold text-orange-400 text-lg mb-1">Level 3</div>
                  <div className="text-sm text-white font-medium mb-1">High Distress</div>
                  <div className="text-xs text-neutral-300">Tele-MANAS counselor SMS alert</div>
                </div>
                <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/20">
                  <div className="font-bold text-red-400 text-lg mb-1">Level 4</div>
                  <div className="text-sm text-white font-medium mb-1">Active Crisis</div>
                  <div className="text-xs text-neutral-300">1-Tap emergency helpline dialer</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Multilingual Indic NLP & Code-Switching Engine */}
          {(activeTab === 'indic' || activeTab === 'blueprint') && (
            <div className="glass-card p-8 rounded-3xl border border-white/15">
              <div className="flex items-center gap-3 mb-6">
                <Languages className="w-6 h-6 text-[#ff6b4a]" />
                <h3 className="font-sans font-bold text-2xl text-white">Multilingual Indic NLP & Code-Switching Engine</h3>
              </div>
              <p className="text-sm text-neutral-300 mb-8 max-w-2xl font-normal leading-relaxed">
                Fine-tuned tokenizer handles code-switching between regional Indic scripts and Hinglish, ensuring non-judgmental supportive care for diverse populations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {indicLanguages.map((lang, i) => (
                  <div key={i} className="glass-card p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm text-white">{lang.name}</div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-amber-300 border border-white/10">
                        {lang.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 italic font-mono bg-black/40 p-2.5 rounded-lg border border-white/5">
                      "{lang.sample}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INT4 Quantization Benchmarks & Performance Metrics */}
          {(activeTab === 'quantization' || activeTab === 'blueprint') && (
            <div className="glass-card p-8 rounded-3xl border border-white/15">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-amber-300" />
                <h3 className="font-sans font-bold text-2xl text-white">INT4 Model Quantization Benchmarks</h3>
              </div>
              <p className="text-sm text-neutral-300 mb-8 max-w-2xl font-normal leading-relaxed">
                INT4 4-bit quantization reduces RAM requirements from 8.2GB down to 1.15GB, enabling 60fps performance on budget smartphones.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={quantizationPerfData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="model" stroke="#a3a3a3" fontSize={11} />
                      <YAxis stroke="#a3a3a3" fontSize={11} unit="GB" />
                      <Tooltip contentStyle={{ backgroundColor: '#07080a', borderColor: 'rgba(255,255,255,0.2)' }} />
                      <Bar dataKey="RAM" fill="#ff6b4a" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <div className="glass-card p-5 rounded-2xl">
                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">Inference Latency</div>
                    <div className="text-3xl font-bold text-white font-sans">85 ms</div>
                    <div className="text-xs text-neutral-300 mt-1">Sub-100ms token generation on Android LiteRT</div>
                  </div>
                  <div className="glass-card p-5 rounded-2xl">
                    <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">Peak Memory Footprint</div>
                    <div className="text-3xl font-bold text-amber-300 font-sans">1.15 GB</div>
                    <div className="text-xs text-neutral-300 mt-1">Fits in budget smartphones with 3GB RAM</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Full System Blueprint Docs */}
          {activeTab === 'blueprint' && (
            <div className="glass-card p-8 rounded-3xl border border-white/15">
              <h3 className="font-sans font-bold text-2xl text-white mb-4">Complete System Executive Blueprint</h3>
              <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl mb-6 font-normal">
                Mind Care India (Mann Saathi) is an end-to-end open-access platform built to bridge India's 83% mental health treatment gap through private on-device AI.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/demo" className="btn-keycap bg-[#e6e6e6] text-[#2f3031] text-xs">
                  <span>Try AI Companion Demo</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
