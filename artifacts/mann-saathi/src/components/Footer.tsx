import { Link } from 'wouter';
import { AlertTriangle, Phone, Brain, Shield, Github, Linkedin, Mail, UserCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative z-20 backdrop-blur-md bg-black/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Emergency Safety Disclaimer Banner */}
        <div className="glass-card bg-[#ff2f3a]/5 border border-[#ff2f3a]/30 rounded-2xl p-6 mb-12 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-[#ff2f3a] shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-sans font-bold text-lg text-white mb-1">Important Safety Disclaimer</h3>
            <p className="text-xs text-neutral-300 mb-3 leading-relaxed font-normal">
              Mann Saathi provides supportive care and psychoeducation grounded in CBT principles, but is not a replacement for professional clinical therapy. If you are experiencing immediate crisis or thoughts of self-harm, please connect with official emergency services immediately:
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <a href="tel:14416" className="text-[#ff6b4a] hover:underline flex items-center gap-1.5 font-semibold">
                <Phone className="w-3.5 h-3.5" /> Tele-MANAS: 14416 / 1800-891
              </a>
              <a href="tel:9152987821" className="text-amber-300 hover:underline flex items-center gap-1.5 font-semibold">
                <Phone className="w-3.5 h-3.5" /> Vandrevala Foundation: +91 9999 666 555
              </a>
              <a href="tel:08026995000" className="text-emerald-400 hover:underline flex items-center gap-1.5 font-semibold">
                <Phone className="w-3.5 h-3.5" /> NIMHANS Helpline: 080-26995000
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Mission Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0052cc] via-[#ff6b4a] to-[#ff2f3a] flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#07080a] rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-[#ff6b4a]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-black text-xl text-white tracking-tight uppercase leading-none">
                  Mann Saathi
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#ff6b4a] uppercase font-bold">
                  Mind Care India
                </span>
              </div>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Democratizing accessible, privacy-first mental healthcare across India using Google's Gemma open model series.
            </p>
          </div>

          {/* Lead Innovator & Architect Column */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 mb-2 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-[#ff6b4a]" />
              <span>LEAD INNOVATOR & MAKER</span>
            </h5>
            <div className="font-bold text-sm text-white">Pranajit Das</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              End-to-end architecture and creation of the Mind Care India platform.
            </p>
            <div className="flex flex-col gap-2 text-xs font-mono pt-1">
              <a
                href="https://github.com/Pranajit01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white flex items-center gap-2 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-[#ff6b4a]" />
                <span>github.com/Pranajit01</span>
              </a>
              <a
                href="https://www.linkedin.com/in/pranajitdas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white flex items-center gap-2 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>linkedin.com/in/pranajitdas</span>
              </a>
              <a
                href="mailto:daspranajit973@gmail.com"
                className="text-neutral-300 hover:text-white flex items-center gap-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>daspranajit973@gmail.com</span>
              </a>
            </div>
          </div>

          {/* System Nav */}
          <div>
            <h5 className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 mb-4">SYSTEM NAV</h5>
            <ul className="space-y-2 text-xs text-neutral-300 font-normal">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/demo" className="hover:text-white transition-colors">AI Companion Demo</Link></li>
              <li><Link href="/blueprint" className="hover:text-white transition-colors">Gemma Tech System</Link></li>
            </ul>
          </div>

          {/* System Status */}
          <div>
            <h5 className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 mb-4">SYSTEM STATUS</h5>
            <div className="glass-card p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">System Operational</span>
              </div>
              <p className="text-[11px] text-neutral-400 font-normal">Google Gemma Open Engine running with 100% privacy & sub-100ms latency.</p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 font-normal gap-4">
          <div>© {new Date().getFullYear()} Mind Care India (Mann Saathi). Architected & Created by Pranajit Das.</div>
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-widest uppercase">
            <span>Privacy First</span>
            <span>Zero Data Leakage</span>
            <span>Google Gemma Powered</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
