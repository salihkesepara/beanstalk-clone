import { useState, useEffect } from 'react';
import { Sprout, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WaitlistModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop — translucent, blurred, page shows through */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal card */}
          <motion.div
            className="relative w-full max-w-[480px] rounded-[28px] overflow-hidden"
            style={{
              backgroundColor: '#111113',
              border: '1px solid rgba(255,255,255,0.09)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            }}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ color: '#555555' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = '#555555'}
            >
              <X size={16} />
            </button>

            {/* Body */}
            <div className="px-10 pt-10 pb-9 flex flex-col items-center">

              {/* Icon circle */}
              <div
                className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-7"
                style={{ backgroundColor: '#0d2016', border: '1px solid rgba(34,197,94,0.15)' }}
              >
                <Sprout size={32} style={{ color: '#22c55e' }} />
              </div>

              {/* Title */}
              <h2 className="text-[22px] font-bold text-white mb-3 text-center tracking-tight">
                Join the Waitlist
              </h2>

              {/* Subtitle */}
              <p className="text-[14px] text-center mb-8 leading-relaxed" style={{ color: '#888888', maxWidth: '300px' }}>
                Be the first to know when Beanstalk is ready. Early access for waitlist members.
              </p>

              {/* Email input */}
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-2xl px-5 py-[15px] text-sm text-white outline-none mb-3 transition-all"
                style={{
                  backgroundColor: '#111111',
                  border: '1px solid #2d2d2b',
                  color: '#ffffff',
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#3a3a37'}
                onBlur={e => e.currentTarget.style.borderColor = '#2d2d2b'}
              />

              {/* CTA button */}
              <button
                className="w-full rounded-2xl py-[15px] text-sm font-bold transition-colors"
                style={{ backgroundColor: '#4ade80', color: '#000000' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#22c55e'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4ade80'}
              >
                Join the Waitlist
              </button>

              {/* Fine print */}
              <p className="text-[12px] mt-4" style={{ color: '#555555' }}>
                No spam. Just an invite when it's your turn.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
