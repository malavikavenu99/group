
import React, { useState } from 'react';
import { Lock, ShieldCheck, ShieldAlert, Cpu } from 'lucide-react';
import { ADMIN_CODE } from '../constants';

interface AuthPortalProps {
  onSuccess: () => void;
}

export const AuthPortal: React.FC<AuthPortalProps> = ({ onSuccess }) => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'granted' | 'denied'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('checking');
    
    setTimeout(() => {
      if (code.toUpperCase() === ADMIN_CODE) {
        setStatus('granted');
        setTimeout(onSuccess, 1000);
      } else {
        setStatus('denied');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white">
      {/* Decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-100 rounded-full blur-[100px] opacity-30 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100 rounded-full blur-[100px] opacity-30 animate-pulse" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="glass-panel p-8 rounded-3xl border border-white/60 shadow-2xl space-y-8 neon-border-cyan">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-200 animate-float">
              {status === 'granted' ? (
                <ShieldCheck className="w-10 h-10 text-white" />
              ) : status === 'denied' ? (
                <ShieldAlert className="w-10 h-10 text-white" />
              ) : (
                <Cpu className="w-10 h-10 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-orbitron font-black text-slate-800 tracking-tighter">
                NOVAGROUP <span className="text-cyan-500">ADMIN</span>
              </h1>
              <p className="text-slate-500 font-medium mt-1">Quantum Security Protocol Active</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-orbitron font-bold text-slate-400 uppercase tracking-widest px-1">
                Access Credentials
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter Secure Code"
                  className="w-full pl-11 pr-4 py-4 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all font-mono tracking-[0.3em]"
                />
              </div>
            </div>

            <button
              disabled={status === 'checking' || status === 'granted'}
              className={`w-full py-4 rounded-xl font-orbitron font-bold text-sm tracking-widest uppercase transition-all duration-300 transform active:scale-95 shadow-lg
                ${status === 'granted' ? 'bg-emerald-500 text-white shadow-emerald-200' : 
                  status === 'denied' ? 'bg-rose-500 text-white shadow-rose-200' :
                  'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'}
              `}
            >
              {status === 'checking' ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating
                </span>
              ) : status === 'granted' ? 'Access Granted' : 
                  status === 'denied' ? 'Invalid Credentials' : 'Authorize Access'}
            </button>
          </form>

          <div className="flex justify-center gap-4 text-xs font-orbitron text-slate-400 uppercase">
            <span>v3.1.2</span>
            <span>•</span>
            <span>Security Layer 7</span>
          </div>
        </div>
      </div>
    </div>
  );
};
