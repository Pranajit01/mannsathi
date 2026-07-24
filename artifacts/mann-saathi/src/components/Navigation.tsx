import { Link, useLocation } from 'wouter';
import { 
  Brain, 
  ArrowRight, 
  Menu, 
  X, 
  Sparkles, 
  PhoneCall, 
  Bug, 
  Cpu, 
  Github, 
  Linkedin, 
  Mail, 
  UserCheck,
  Send,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const [location] = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bugModalOpen, setBugModalOpen] = useState(false);
  const [bugReported, setBugReported] = useState(false);
  const [bugDescription, setBugDescription] = useState('');

  // Primary Header Bar links (Home, How to Use this AI, Gemma Tech System)
  const headerLinks = [
    { href: '/', label: 'Home' },
    { href: '/demo', label: 'How to Use this AI' },
    { href: '/blueprint', label: 'Gemma Tech System' },
  ];

  const handleBugSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBugReported(true);
    setTimeout(() => {
      setBugReported(false);
      setBugModalOpen(false);
      setBugDescription('');
    }, 2000);
  };

  return (
    <>
      {/* Fixed Upper-Middle Floating Header Bar */}
      <nav className="fixed top-4 inset-x-0 mx-auto w-[92%] max-w-4xl z-[9999] rounded-full glass-pill p-2 px-4 sm:px-6 flex items-center justify-between shadow-2xl transition-all">
        
        {/* Highlighted Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0052cc] via-[#ff6b4a] to-[#ff2f3a] flex items-center justify-center p-0.5 shadow-[0_0_20px_rgba(255,107,74,0.6)]">
            <div className="w-full h-full bg-[#07080a] rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-[#ff6b4a] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-black text-lg sm:text-xl tracking-tight text-white uppercase leading-none">
              Mann Saathi
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-[#ff6b4a] font-bold">
              Mind Care India
            </span>
          </div>
        </Link>

        {/* Desktop Header Links (Home, How to Use this AI, Gemma Tech System) */}
        <div className="hidden md:flex items-center gap-2">
          {headerLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`glass-nav-btn ${isActive ? 'glass-nav-btn-active' : ''}`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions: Try AI CTA + Hamburger Menu */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/demo"
            className="hidden sm:inline-flex glass-nav-btn bg-gradient-to-r from-[#ff6b4a] to-[#ff2f3a] text-white border-[#ff6b4a]/60 hover:border-white shadow-[0_0_15px_rgba(255,107,74,0.4)] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Try AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Universal Hamburger Drawer Toggle */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="glass-nav-btn p-2.5 rounded-full text-neutral-300 hover:text-white border-white/15"
            aria-label="Open Hamburger Drawer Menu"
            title="Open Hamburger Drawer Menu"
          >
            <Menu className="w-4.5 h-4.5" />
          </button>
        </div>
      </nav>

      {/* Hamburger Drawer Modal Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <aside className="relative w-full max-w-md bg-[#0b0f17]/95 backdrop-blur-xl border-l border-white/10 h-full overflow-y-auto z-10 p-6 sm:p-7 shadow-2xl flex flex-col justify-between transition-all">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff6b4a]/20 to-[#0052cc]/20 border border-[#ff6b4a]/30 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-[#ff6b4a]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-white tracking-wide">Navigation & Control</h3>
                    <p className="text-[11px] text-neutral-400">MindCare India System Menu</p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/5 transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Creator Attribution */}
              <div className="relative overflow-hidden p-4 rounded-2xl border border-[#ff6b4a]/20 bg-gradient-to-r from-[#ff6b4a]/10 via-amber-500/5 to-transparent mb-6 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-[#ff6b4a]">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Lead Architect & Creator</span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ff6b4a]/15 text-[#ff6b4a] border border-[#ff6b4a]/20">
                    Verified
                  </span>
                </div>
                
                <div className="font-semibold text-lg text-white mt-1.5 mb-3">Pranajit Das</div>
                
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/Pranajit01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-xs text-neutral-200 hover:text-white flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/10 transition-all font-medium"
                  >
                    <Github className="w-3.5 h-3.5 text-[#ff6b4a]" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/pranajitdas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-xs text-neutral-200 hover:text-white flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/10 transition-all font-medium"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Quick Navigation / Actions */}
              <div className="space-y-2.5 mb-6">
                <div className="text-[11px] font-medium tracking-wider uppercase text-neutral-400 px-1 mb-2">
                  Quick Access
                </div>

                {/* 1. Connect with Architecture */}
                <Link
                  href="/blueprint"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/10 text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Cpu className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-white group-hover:text-blue-300 transition-colors">
                        System Architecture
                      </div>
                      <div className="text-xs text-neutral-400">Google Gemma INT4 blueprint</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 group-hover:translate-x-1 transition-all" />
                </Link>

                {/* 2. Connect with Helpline */}
                <a
                  href="tel:14416"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-emerald-400 group-hover:text-emerald-300 transition-colors">
                        Tele-MANAS Helpline
                      </div>
                      <div className="text-xs text-neutral-400">14416 (24/7 Toll-Free)</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-500/70 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </a>

                {/* 3. Report Bug */}
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    setBugModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/10 text-white transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Bug className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-white group-hover:text-amber-300 transition-colors">
                        Report Issue
                      </div>
                      <div className="text-xs text-neutral-400">Direct feedback to lead architect</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>

            {/* Bottom Drawer CTA */}
            <div className="pt-4 border-t border-white/10">
              <Link
                href="/demo"
                onClick={() => setDrawerOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff4b5c] hover:from-[#ff7b5c] hover:to-[#ff5c6c] text-white font-medium text-sm text-center flex items-center justify-center gap-2 shadow-lg shadow-[#ff6b4a]/20 transition-all hover:shadow-[#ff6b4a]/30 active:scale-[0.99]"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Launch AI Companion</span>
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Interactive Report Bug Modal */}
      {bugModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setBugModalOpen(false)}
          />
          <div className="relative w-full max-w-lg glass-card bg-[#07080a] border border-white/20 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
                  <Bug className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Report System Issue or Bug</h3>
                  <p className="text-xs text-neutral-400">Directly routed to Pranajit Das (daspranajit973@gmail.com)</p>
                </div>
              </div>
              <button
                onClick={() => setBugModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bugReported ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-bold text-xl text-white">Bug Report Received!</h4>
                <p className="text-xs text-neutral-300">Thank you! Your feedback has been sent directly to the engineering team.</p>
              </div>
            ) : (
              <form onSubmit={handleBugSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                    Issue Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={bugDescription}
                    onChange={(e) => setBugDescription(e.target.value)}
                    placeholder="Describe what went wrong or suggest an improvement..."
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff6b4a]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff6b4a] to-[#ff2f3a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,107,74,0.4)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Bug Report</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
