import { Link } from 'wouter';
import { 
  Brain, 
  Heart, 
  Shield, 
  Languages, 
  Users, 
  TrendingDown, 
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Activity,
  Sparkles,
  Lock,
  Apple,
  Terminal
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LightRays } from '@/components/LightRays';

export default function Landing() {
  const treatmentGapData = [
    { condition: 'Depression', gap: 83 },
    { condition: 'Schizophrenia', gap: 86 },
    { condition: 'Anxiety', gap: 79 },
    { condition: 'Bipolar', gap: 82 },
  ];

  const tickerItems = [
    { label: 'AFFECTED CITIZENS', value: '197M+' },
    { label: 'DEPRESSION TREATMENT GAP', value: '83%' },
    { label: 'INDIC LANGUAGES SUPPORTED', value: '10+' },
    { label: 'GEMMA INFERENCE LATENCY', value: '<100ms' },
    { label: 'ON-DEVICE PRIVACY GUARANTEE', value: '100%' },
    { label: 'PSYCHIATRISTS PER 100K', value: '0.75' },
    { label: 'CRISIS TRIAGE ROUTING', value: '24/7' },
  ];

  return (
    <div className="min-h-screen text-white selection:bg-[#ff6b4a]/30 selection:text-amber-200 overflow-x-hidden relative font-sans">
      
      {/* 5% Grain Film Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] mix-blend-overlay" />

      {/* Hero Section with Living Animated Aurora Background */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-36 sm:pt-40 pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden border-b border-white/10">
        
        {/* Living Animated WebGL LightRays & CSS Aurora Blades */}
        <LightRays
          raysOrigin="top-center"
          raysColor="#ff6b4a"
          raysSpeed={1.8}
          lightSpread={1.6}
          rayLength={2.2}
          followMouse={true}
          mouseInfluence={0.45}
          noiseAmount={0.02}
          distortion={0.06}
        />

        {/* Living Warm Aurora Blades (Crimson #ff2f3a -> Coral #ff6b4a -> Amber #ffb347) */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] aurora-blade-1 rounded-full pointer-events-none" />
        <div className="absolute top-[200px] left-[-150px] w-[500px] h-[500px] aurora-blade-2 rounded-full pointer-events-none" />
        <div className="absolute top-[150px] right-[-150px] w-[500px] h-[500px] aurora-blade-3 rounded-full pointer-events-none" />



        {/* Big Hero Headline & Subtitle */}
        <div className="relative z-10 my-auto py-2">
          <h1 className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-8xl text-white uppercase leading-[0.95] tracking-tight mb-6">
            Empathetic{' '}
            <span className="text-warm-gradient">
              Mental Care
            </span>
            <br />
            for 1.4 Billion Citizens
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mt-4">
            <p className="lg:col-span-7 text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
              An offline-first, multilingual AI companion engineered for India's healthcare ecosystem. High-fidelity supportive care, 24/7 crisis triage, and CBT tools across regional Indic languages.
            </p>

            <div className="lg:col-span-5 flex flex-wrap items-center justify-start lg:justify-end gap-3 pt-4 sm:pt-0">
              <Link href="/demo" className="btn-keycap bg-gradient-to-r from-[#ff6b4a] to-[#ff2f3a] text-white border-[#ff6b4a]/60 shadow-[0_0_20px_rgba(255,107,74,0.5)] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Start Interactive Companion</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link href="/blueprint" className="btn-keycap bg-white/10 text-white border border-white/20 hover:bg-white/20 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-300" />
                <span>Gemma Tech System</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Metadata Grid */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-6 mt-6">
          {[
            { label: 'AFFECTED CITIZENS', value: '197 MILLION' },
            { label: 'TREATMENT GAP', value: '83% UNTREATED' },
            { label: 'PSYCHIATRIST DENSITY', value: '0.75 PER 100K' },
            { label: 'INDIC LANGUAGES', value: '6 ACTIVE (10+ NEXT)' }
          ].map((item, i) => (
            <div key={i} className="space-y-0.5">
              <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">{item.label}</div>
              <div className="font-sans text-xl sm:text-2xl text-white font-bold">{item.value}</div>
            </div>
          ))}
        </div>

      </section>

      {/* Infinite Horizontal Metrics Ticker */}
      <section className="relative h-14 bg-[#07080a]/90 border-y border-white/10 overflow-hidden flex items-center z-20">
        <div className="animate-infinite-ticker flex gap-10 whitespace-nowrap items-center">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div key={index} className="inline-flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">{item.label}:</span>
              <span className="text-xs font-mono font-bold text-amber-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">{item.value}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b4a] ml-6" />
            </div>
          ))}
        </div>
      </section>

      {/* Problem & Treatment Gap Analysis Section */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative border-b border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-[#ff6b4a] mb-2 block">Socio-Cultural Landscape</span>
          <h2 className="font-sans text-4xl sm:text-5xl font-bold text-white mb-4">
            India's Mental Healthcare Crisis
          </h2>
          <p className="text-neutral-300 text-base font-normal leading-relaxed">
            Structural scarcity, language isolation, and acute social stigma prevent 8 out of 10 individuals from accessing professional psychiatric intervention.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          {/* Animated Recharts Graph Card */}
          <div className="glass-card p-8 rounded-2xl">
            <h3 className="font-sans font-bold text-xl text-white mb-6 flex items-center gap-2.5">
              <TrendingDown className="w-5 h-5 text-[#ff6b4a]" />
              Treatment Gap by Mental Health Condition
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={treatmentGapData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="condition" stroke="#a3a3a3" fontSize={12} />
                  <YAxis stroke="#a3a3a3" fontSize={12} unit="%" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                  <Bar dataKey="gap" fill="#ff6b4a" radius={[6, 6, 0, 0]} isAnimationActive={true} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Users,
                title: 'Severe Professional Shortage',
                desc: 'India has fewer than 9,000 psychiatrists for 1.4 billion people. Rural districts often have zero access to mental health practitioners.',
                accent: 'text-[#ff6b4a]'
              },
              {
                icon: Languages,
                title: 'Linguistic Exclusion',
                desc: 'Most traditional therapy tools are built exclusively in English, leaving over 90% of the population without accessible care in native Indic languages.',
                accent: 'text-amber-300'
              },
              {
                icon: Shield,
                title: 'Social Stigma & Privacy Risks',
                desc: 'Fear of social judgment causes users to avoid clinics. Mind Care India ensures 100% on-device processing so personal feelings never leak.',
                accent: 'text-[#ff2f3a]'
              }
            ].map((problem, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                  <problem.icon className={`w-5 h-5 ${problem.accent}`} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">{problem.title}</h4>
                  <p className="text-sm text-neutral-300 leading-relaxed font-normal">{problem.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Tier Safety Level & Crisis Matrix Section */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative border-b border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-mono uppercase tracking-widest mb-3">
            Clinical Safety Matrix
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl font-bold text-white mb-3">
            4-Tier Safety & Crisis Escalation System
          </h2>
          <p className="text-neutral-300 text-base font-normal">
            Multi-signal safety classifier automatically routes user distress states from self-guided CBT tools up to immediate emergency helpline connections.
          </p>
        </div>

        {/* 4-Tier Animated Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { level: 'Level 1', label: 'Mild Stress', color: 'border-emerald-500/30 bg-gradient-to-b from-emerald-500/15 via-white/[0.08] to-white/[0.02]', textColor: 'text-emerald-400', action: 'Gemma CBT companion & journal prompts' },
            { level: 'Level 2', label: 'Moderate Anxiety', color: 'border-amber-500/30 bg-gradient-to-b from-amber-500/15 via-white/[0.08] to-white/[0.02]', textColor: 'text-amber-300', action: 'Interactive 4-7-8 breathwork & mood logs' },
            { level: 'Level 3', label: 'High Distress', color: 'border-orange-500/30 bg-gradient-to-b from-orange-500/15 via-white/[0.08] to-white/[0.02]', textColor: 'text-orange-400', action: 'Tele-MANAS counselor booking & SMS alert' },
            { level: 'Level 4', label: 'Active Crisis', color: 'border-red-500/30 bg-gradient-to-b from-red-500/15 via-white/[0.08] to-white/[0.02]', textColor: 'text-red-400', action: '1-Tap emergency helpline dialer & protocol' },
          ].map((stage) => (
            <div key={stage.level} className={`glass-card ${stage.color} p-6 rounded-2xl text-center hover:scale-105 transition-transform`}>
              <Activity className={`w-7 h-7 ${stage.textColor} mx-auto mb-3`} />
              <div className={`font-sans font-bold text-xl ${stage.textColor} mb-1`}>{stage.level}</div>
              <div className="text-sm font-semibold text-white mb-2">{stage.label}</div>
              <div className="text-xs text-neutral-300 leading-relaxed font-normal">{stage.action}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Modules Grid */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative border-b border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-teal-300 text-xs font-mono uppercase tracking-widest mb-3">
            System Capabilities
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl font-bold text-white mb-3">
            Architected for High Impact & Safety
          </h2>
          <p className="text-neutral-300 text-base font-normal">
            Engineered around Google Gemma's compact model footprint to deliver private, real-time supportive therapy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Brain,
              title: 'Google Gemma Model Engine',
              desc: 'Fine-tuned on Indic conversational corpora. Executes locally via INT4 quantization with sub-100ms response latency.',
              color: 'text-[#ff6b4a]'
            },
            {
              icon: Languages,
              title: 'Native Indic Multilingual',
              desc: 'Natively understands Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Punjabi, and Hinglish code-switching.',
              color: 'text-amber-300'
            },
            {
              icon: AlertTriangle,
              title: '4-Tier Emergency Triage',
              desc: 'Distress detection algorithms automatically escalate high-risk signals to Tele-MANAS (14416) and NIMHANS emergency helplines.',
              color: 'text-[#ff2f3a]'
            },
            {
              icon: Lock,
              title: 'Zero-Knowledge Privacy',
              desc: 'Encrypted local SQLite database and ChromaDB vector embeddings keep all conversation history strictly on-device.',
              color: 'text-emerald-400'
            },
            {
              icon: Activity,
              title: 'CBT Grounding & Breathwork',
              desc: 'Embedded interactive toolkits including 4-7-8 breathing animations, PHQ-9 mood tracking, and sensory grounding.',
              color: 'text-[#ff6b4a]'
            },
            {
              icon: Users,
              title: 'ASHA Worker Portal',
              desc: 'Equips grassroots healthcare workers with voice-guided screening tools to assist rural populations effectively.',
              color: 'text-amber-300'
            }
          ].map((feature, idx) => (
            <div key={idx} className="glass-card p-7 rounded-2xl group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:rotate-6 transition-transform">
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="font-sans font-bold text-xl text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto text-center relative">
        <div className="glass-card p-10 sm:p-14 rounded-3xl border border-white/15 relative overflow-hidden bg-gradient-to-b from-white/5 to-[#07080a]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff6b4a]/20 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="font-sans font-extrabold text-4xl sm:text-6xl text-white mb-4 relative z-10">
            Democratizing <span className="text-warm-gradient">Mental Healthcare</span>
          </h2>
          <p className="text-neutral-300 text-base max-w-xl mx-auto mb-8 font-normal relative z-10">
            Powered by Google Gemma. Designed for 1.4 billion people. Experience the interactive live companion demo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/demo" className="btn-keycap bg-[#e6e6e6] text-[#2f3031] flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff2f3a]" />
              <span>Try Interactive Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/blueprint" className="btn-keycap bg-white/10 text-white border border-white/20 hover:bg-white/20 flex items-center justify-center gap-2">
              <Terminal className="w-4 h-4 text-amber-300" />
              <span>Explore Gemma Tech System</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
