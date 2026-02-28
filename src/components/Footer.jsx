import React from 'react';
import { Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-background pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Background vignette glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at bottom, rgba(74, 222, 128, 0.2), transparent 70%)' }}></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">

        {/* Call to action section */}
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get early access</h2>
          <p className="text-lg text-textMuted mb-10 max-w-lg">
            We're in closed beta. Join the waitlist and we'll let you in as we scale up.
          </p>

          <form className="w-full max-w-md flex flex-col gap-3 mb-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <input
                type="email"
                placeholder="name@company.com"
                className="relative w-full px-4 py-4 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-center"
                required
              />
            </div>

            <button
              type="submit"
              className="relative w-full py-4 rounded-xl font-semibold bg-primary hover:bg-[#3ac16f] text-background transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span className="relative z-10">Join the waitlist</span>
            </button>
            <p className="text-xs text-textMuted mt-2">No spam. Just an invite when it's your turn.</p>
          </form>

          <div className="flex items-center gap-6 text-sm text-textMuted font-medium">
            <div className="flex items-center gap-2">
              <span className="text-white">🔒</span> Local-first
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-white">⚡️</span> Setup in 2 min
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-textMuted">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span>© 2026 <a href="#" className="hover:text-white transition-colors">Toolbenders Labs</a></span>
            <span className="text-white/20">·</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Manifesto</a>
          </div>

          <a href="#" className="flex items-center gap-2 text-white hover:text-primary transition-colors group">
            <div className="w-6 h-6 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <Terminal size={14} className="text-white group-hover:text-primary transition-colors" />
            </div>
            <span className="font-semibold tracking-tight">Beanstalk</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
