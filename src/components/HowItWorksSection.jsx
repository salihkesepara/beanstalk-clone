import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Network, ShieldCheck } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Terminal,
      title: 'Your Machine',
      subtitle: 'Clawdbot runs here',
      description: 'Your agent lives exactly where your code does. It has direct access to your local files, dev server, and terminal just like you do.'
    },
    {
      icon: Network,
      title: 'The Relay',
      subtitle: 'WebSocket Bridge',
      description: 'A secure, lightweight connection between your machine and our servers. It only passes events and commands—never your source code or data.'
    },
    {
      icon: ShieldCheck,
      title: 'Dashboard',
      subtitle: 'beans.talk',
      description: 'The visual control plane in your browser. Watch the live event stream, approve actions, manage templates, and orchestrate multiple agents.'
    }
  ];

  return (
    <section className="py-24 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-textMuted text-lg max-w-2xl mx-auto"
          >
            A secure architecture designed to keep your IP safe while giving you global visibility and control over your local agents.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative items-start">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#111113] border border-white/10 flex items-center justify-center mb-6 shadow-xl group-hover:border-primary/50 transition-colors">
                <step.icon size={28} className={index === 1 ? 'text-blue-400' : 'text-primary'} />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
              <span className="text-xs font-mono text-primary mb-4 px-2 py-1 bg-primary/10 rounded">{step.subtitle}</span>
              <p className="text-textMuted leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-3xl mx-auto p-6 rounded-2xl glass-card border-primary/20 bg-primary/5 text-center flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <ShieldCheck className="text-primary w-10 h-10 shrink-0" />
          <p className="text-left text-sm text-textMuted leading-relaxed">
            <strong className="text-white">Your data never leaves your machine.</strong> We just relay the events. The dashboard receives telemetry like "agent ran npm test" but never the contents of your codebase or the command outputs unless explicitly requested.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
