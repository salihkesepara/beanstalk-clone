import React from 'react';
import { motion } from 'framer-motion';
import { Activity, LayoutTemplate, GitBranch, History, Terminal, MessageSquare, Zap, Globe, ChevronDown, ChevronRight } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-background border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Everything you need to manage agents
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-textMuted text-lg max-w-2xl mx-auto"
          >
            Built for developers who want to see what's happening
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 relative">

          {/* Feature 1: Live Event Stream */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="glass-card p-8 group relative overflow-hidden flex flex-col h-full hover:bg-white/[0.04] transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex flex-center items-center justify-center">
                <Activity size={24} className="text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Live Event Stream</h3>
            <p className="text-textMuted mb-8 flex-grow">Watch tool calls, file edits, and messages scroll by in real-time. Good for debugging. Also weirdly satisfying.</p>

            <div className="bg-[#0a0a0b] border border-white/10 rounded-xl overflow-hidden mt-auto">
              <div className="flex items-center justify-between px-4 py-3 bg-[#111113] border-b border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-primary tracking-wider">
                  <Zap size={14} className="animate-pulse" /> ACTIVITY
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white/50">5</span>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                </div>
              </div>
              <div className="p-3 flex flex-col gap-2">
                <div className="flex items-start gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <ChevronDown size={14} className="text-textMuted mt-0.5" />
                  <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Globe size={12} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">web_search</div>
                    <div className="text-xs text-textMuted truncate">searching "react server components"</div>
                  </div>
                  <div className="text-xs text-textMuted font-mono">1.2s</div>
                </div>

                <div className="flex items-start gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <ChevronDown size={14} className="text-textMuted mt-0.5" />
                  <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center shrink-0">
                    <MessageSquare size={12} className="text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">Message from Slack</div>
                    <div className="text-xs text-textMuted truncate">Can you help me debug...</div>
                  </div>
                  <div className="text-xs text-textMuted font-mono">11:29</div>
                </div>
              </div>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </motion.div>


          {/* Feature 2: Agent Templates */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-card p-8 group relative overflow-hidden flex flex-col h-full hover:bg-white/[0.04] transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex flex-center items-center justify-center">
                <LayoutTemplate size={24} className="text-primary" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-white/5 border border-white/10 rounded-md text-textMuted">Coming Soon</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Agent Templates</h3>
            <p className="text-textMuted mb-8 flex-grow">Pre-configured agents for common tasks. Pick a template, customize it, run it.</p>

            <div className="bg-[#0a0a0b] border border-white/10 rounded-xl overflow-hidden mt-auto">
              <div className="flex items-center justify-between px-4 py-3 bg-[#111113] border-b border-white/5">
                <div className="text-xs font-bold text-white tracking-wider">Templates</div>
                <div className="flex items-center gap-1 text-xs text-primary cursor-pointer hover:underline">
                  Browse all <ChevronRight size={12} />
                </div>
              </div>
              <div className="p-3 flex flex-col gap-2">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5">
                  <div className="text-2xl">⚙️</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white">Backend Dev</div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">Developer</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-textMuted border border-white/10">2 min</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5 opacity-50">
                  <div className="text-2xl">🎨</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white">Frontend Dev</div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Developer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </motion.div>

          {/* Feature 3: Multi-Agent Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="glass-card p-8 group relative overflow-hidden flex flex-col h-full hover:bg-white/[0.04] transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-center items-center justify-center">
                <GitBranch size={24} className="text-purple-400" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-white/5 border border-white/10 rounded-md text-textMuted">Coming Soon</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Multi-Agent Dashboard</h3>
            <p className="text-textMuted mb-8 flex-grow">Running multiple agents? See them all at once. Check status, compare activity, spot issues.</p>

            <div className="bg-[#0a0a0b] border border-white/10 rounded-xl overflow-hidden mt-auto min-h-[160px] relative flex items-center justify-center">
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-[#111113] border-b border-white/5 z-10">
                <div className="flex items-center gap-2 text-xs font-bold text-white tracking-wider">
                  <GitBranch size={14} className="text-purple-400" /> MULTI-AGENT
                </div>
                <div className="flex items-center gap-2 text-xs text-textMuted">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div> 2 active
                </div>
              </div>

              {/* Abstract Graph Visualization */}
              <div className="mt-8 relative w-full h-full flex items-center justify-center">
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                  <path d="M 150 70 L 100 120" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
                  <path d="M 150 70 L 200 120" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
                </svg>

                <div className="absolute top-[20px] left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 z-10 shadow-lg">
                  🤖 Beansbot
                </div>

                <div className="absolute top-[100px] left-[60px] bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 z-10 shadow-lg">
                  💻 Coder
                </div>

                <div className="absolute top-[100px] right-[60px] bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 z-10 shadow-lg">
                  🔍 Searcher
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </motion.div>

          {/* Feature 4: Session History */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="glass-card p-8 group relative overflow-hidden flex flex-col h-full hover:bg-white/[0.04] transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-center items-center justify-center">
                <History size={24} className="text-blue-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Session History</h3>
            <p className="text-textMuted mb-8 flex-grow">Every conversation, every tool call, every decision — logged and searchable.</p>

            <div className="bg-[#0a0a0b] border border-white/10 rounded-xl overflow-hidden mt-auto">
              <div className="flex items-center justify-between px-4 py-3 bg-[#111113] border-b border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-white tracking-wider">
                  <History size={14} className="text-blue-400" /> SESSIONS
                </div>
                <div className="text-xs text-textMuted">Last 7 days</div>
              </div>

              <div className="p-3 flex flex-col gap-2">
                <div className="p-3 rounded-lg border border-white/5 bg-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
                      <div className="text-sm font-semibold text-white">Deploy update to prod</div>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-primary border border-primary/30 bg-primary/10 px-1.5 py-0.5 rounded">ACTIVE</span>
                  </div>
                  <div className="text-xs text-textMuted ml-4">Today, 11:15 AM • Slack</div>
                </div>

                <div className="p-3 rounded-lg border border-transparent bg-transparent opacity-60">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full border border-white/30"></div>
                      <div className="text-sm font-semibold text-white">Fix the bug in auth flow</div>
                    </div>
                  </div>
                  <div className="text-xs text-textMuted ml-4">Today, 9:30 AM • CLI</div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
