import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What's a Clawdbot?",
      answer: "Clawdbot turns Claude into an assistant that can actually do things — not just chat. It runs on your machine, so it can edit files, run code, search the web, and work with your existing tools. You describe what you need done, it figures out the steps. Beanstalk is the dashboard that lets you monitor and manage your Clawdbots from anywhere."
    },
    {
      question: "What do I need to run this?",
      answer: "You run Clawdbot locally on your machine (Mac/Linux). That's where your agent actually works — with access to your files, tools, and APIs. Beanstalk is a web app that connects to your local agent through a lightweight relay. You can check on your bots from your phone, another computer, wherever."
    },
    {
      question: "Is my data private?",
      answer: "Your files stay on your machine. They don't get uploaded anywhere. What Beanstalk sees: events like 'agent read package.json' or 'agent ran npm test'. What it doesn't see: the actual contents of those files. The relay routes messages but doesn't store your code or data."
    },
    {
      question: "How much does it cost?",
      answer: "Free while we're in closed beta. After launch, there'll be a free tier for personal use. We'll give plenty of notice before anything changes."
    },
    {
      question: "Can I use this with my team?",
      answer: "Not yet — but it's coming. Team workspaces will let you share visibility so everyone can see what agents are doing. Useful for handoffs and making sure nobody's bot is doing something unexpected at 4am."
    },
    {
      question: "What can I build with this?",
      answer: "Whatever you can describe to an AI. We're launching with 8 templates: Backend Dev, Frontend Dev, Bug Triager, Doc Writer for developers. Research Assistant and News Digest for research. Cost Monitor for ops. Inbox Zero for personal productivity. Start from a template and customize, or build your own from scratch."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-background relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/5 pb-4"
              >
                <button
                  className="w-full flex items-center justify-between text-left py-4 focus:outline-none group"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-medium text-white group-hover:text-primary transition-colors">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <ChevronRight size={20} className="text-textMuted group-hover:text-primary transition-colors" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 text-textMuted leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
