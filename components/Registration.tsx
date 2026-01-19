
import React, { useState } from 'react';
import { UserPlus, CheckCircle, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { getRandomNumber } from '../utils';
import { Student } from '../types';
import { NUMBER_COLORS } from '../constants';

interface RegistrationProps {
  onRegister: (student: Student) => void;
  onAdminClick: () => void;
  existingStudents: Student[];
  numGroups: number;
}

export const Registration: React.FC<RegistrationProps> = ({ onRegister, onAdminClick, existingStudents, numGroups }) => {
  const [name, setName] = useState('');
  const [registeredStudent, setRegisteredStudent] = useState<Student | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim().toUpperCase();
    
    if (!cleanName) return;
    setError(null);

    // Check for existing registration
    const isDuplicate = existingStudents.some(s => s.name.toUpperCase() === cleanName);
    
    if (isDuplicate) {
      setError("IDENTITY ALREADY REGISTERED IN THE MATRIX");
      return;
    }

    setIsRegistering(true);
    
    // Simulate a "Quantum Assignment" delay
    setTimeout(() => {
      const newStudent: Student = {
        id: `ST-${Math.floor(1000 + Math.random() * 9000)}`,
        name: cleanName,
        registrationNumber: getRandomNumber(numGroups),
        groupId: null,
        timestamp: Date.now()
      };
      
      onRegister(newStudent);
      setRegisteredStudent(newStudent);
      setIsRegistering(false);
      setName('');
    }, 1200);
  };

  const reset = () => {
    setRegisteredStudent(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#f8fafc]">
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-100/40 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-100/40 rounded-full blur-[120px] animate-pulse" />

      <div className="w-full max-w-xl relative z-10">
        {!registeredStudent ? (
          <GlassCard className="p-10 space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 text-cyan-400 shadow-xl animate-float">
                <UserPlus size={32} />
              </div>
              <h1 className="text-4xl font-orbitron font-black text-slate-800 tracking-tighter">
                NODE <span className="text-cyan-500">ENTRY</span>
              </h1>
              <p className="text-slate-500 font-medium">Enter your identity to receive group assignment</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-orbitron font-bold text-slate-400 uppercase tracking-widest px-1">Full Identity Name</label>
                <div className="relative">
                  <input
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="e.g. ALEX RIVERA"
                    className={`w-full px-6 py-5 bg-white border rounded-2xl focus:ring-4 transition-all outline-none font-orbitron font-bold text-lg text-slate-700 placeholder:text-slate-300 uppercase ${
                      error ? 'border-rose-400 focus:ring-rose-500/10 focus:border-rose-500 animate-shake' : 'border-slate-200 focus:ring-cyan-500/10 focus:border-cyan-400'
                    }`}
                    disabled={isRegistering}
                  />
                  {error && (
                    <div className="absolute -bottom-6 left-1 flex items-center gap-1.5 text-rose-500 text-[10px] font-orbitron font-bold tracking-wider animate-in fade-in slide-in-from-top-1">
                      <AlertCircle size={12} />
                      {error}
                    </div>
                  )}
                </div>
              </div>

              <button
                disabled={!name.trim() || isRegistering}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-orbitron font-bold tracking-[0.2em] uppercase transition-all shadow-xl hover:shadow-cyan-200/50 hover:-translate-y-1 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 overflow-hidden group"
              >
                {isRegistering ? (
                  <>
                    <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                    <span>Assigning Quantum ID...</span>
                  </>
                ) : (
                  <>
                    <span>Initialize Registration</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        ) : (
          <GlassCard className="p-10 text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700" glowColor="violet">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 shadow-inner">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-2xl font-orbitron font-black text-slate-800 uppercase tracking-tight">ASSIGNMENT COMPLETE</h2>
              <p className="text-slate-500">Welcome, <span className="text-slate-800 font-bold uppercase">{registeredStudent.name}</span></p>
            </div>

            <div className="relative py-8">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Sparkles size={120} className="text-violet-500 animate-spin-slow" />
              </div>
              <div className={`relative z-10 mx-auto w-32 h-32 flex flex-col items-center justify-center rounded-3xl border-2 shadow-2xl transition-transform hover:scale-105 cursor-default ${NUMBER_COLORS[((registeredStudent.registrationNumber - 1) % 10) + 1]}`}>
                <span className="text-xs font-orbitron font-black opacity-50 uppercase">Team ID</span>
                <span className="text-6xl font-orbitron font-black">{registeredStudent.registrationNumber}</span>
              </div>
            </div>

            <div className="p-4 bg-violet-50 rounded-xl border border-violet-100">
              <p className="text-violet-700 font-medium text-sm">
                Your teammates are students assigned to <span className="font-bold underline">Group #{registeredStudent.registrationNumber}</span>
              </p>
            </div>

            <button
              onClick={reset}
              className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-orbitron font-bold text-xs tracking-widest uppercase hover:bg-slate-50 transition-all"
            >
              New Registration
            </button>
          </GlassCard>
        )}

        <button 
          onClick={onAdminClick}
          className="mt-8 mx-auto flex items-center gap-2 text-slate-400 font-orbitron text-[10px] uppercase tracking-[0.3em] hover:text-slate-600 transition-colors"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          Admin Access Portal
        </button>
      </div>
    </div>
  );
};
