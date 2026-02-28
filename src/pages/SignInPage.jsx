import { useState } from 'react';
import { Sprout, Github } from 'lucide-react';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function SignInPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#0a0a0a' }}>

      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-8">
        <Sprout className="w-8 h-8" style={{ color: '#22c55e' }} />
        <span className="text-2xl font-semibold text-white tracking-tight">Beanstalk</span>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-2xl" style={{ backgroundColor: '#0f0f0e', border: '1px solid #1f1f1d' }}>

        {/* Card body */}
        <div className="px-8 pt-8 pb-6">

          <h1 className="text-center text-white font-semibold text-[17px] mb-7">
            Sign in to Beanstalk
          </h1>

          {/* Social buttons */}
          <div className="flex gap-3 mb-6">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-medium transition-colors"
              style={{ backgroundColor: '#171716', border: '1px solid #2a2a27' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1f1f1d'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#171716'}
            >
              <Github size={17} />
              GitHub
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-medium transition-colors"
              style={{ backgroundColor: '#171716', border: '1px solid #2a2a27' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1f1f1d'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#171716'}
            >
              <GoogleIcon />
              Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ backgroundColor: '#2a2a27' }} />
            <span className="text-sm" style={{ color: '#808080' }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#2a2a27' }} />
          </div>

          {/* Email field */}
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
              style={{
                backgroundColor: '#151514',
                border: '1px solid #2a2a27',
                color: '#ffffff',
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#4a4a47'}
              onBlur={e => e.currentTarget.style.borderColor = '#2a2a27'}
            />
          </div>

          {/* Continue button */}
          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors"
            style={{ backgroundColor: '#22c55e', color: '#000000' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#16a34a'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#22c55e'}
          >
            Continue
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </button>
        </div>

        {/* Card footer */}
        <div
          className="px-8 py-4 text-center"
          style={{ backgroundColor: '#0d0d0c', borderTop: '1px solid #1f1f1d' }}
        >
          <a href="#" className="text-sm transition-colors" style={{ color: '#22c55e' }}>
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
