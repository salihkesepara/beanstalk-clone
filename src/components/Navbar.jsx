import React from 'react';
import { Terminal } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-borderSubtle">
      <div className="flex items-center gap-2 text-textMain">
        <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-md flex items-center justify-center">
          <Terminal size={18} className="text-white" />
        </div>
        <span className="font-semibold text-lg tracking-tight">beans.talk</span>
      </div>

      <div className="flex items-center gap-4">
        <a href="#" className="text-sm font-medium text-textMuted hover:text-textMain transition-colors">
          Log in
        </a>
        <a href="#" className="text-sm font-medium text-background bg-primary hover:bg-[#3ac16f] transition-colors px-4 py-2 rounded-md">
          Join waitlist
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
