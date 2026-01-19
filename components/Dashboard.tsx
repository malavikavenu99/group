
import React from 'react';
import { Users, Download, Printer, Trash2, LayoutGrid, UserPlus, Settings2, Sliders } from 'lucide-react';
import { Student, SystemConfig } from '../types';
import { GlassCard } from './GlassCard';
import { groupByNumber } from '../utils';
import { NUMBER_COLORS } from '../constants';

interface DashboardProps {
  students: Student[];
  config: SystemConfig;
  onUpdateConfig: (config: SystemConfig) => void;
  onClear: () => void;
  onGoToRegistration: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ students, config, onUpdateConfig, onClear, onGoToRegistration }) => {
  const groups = groupByNumber(students, config.activeGroups);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Name,GroupNumber\n"
      + students.map(s => `${s.id},${s.name},${s.registrationNumber}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "nova_group_results.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExpectedChange = (val: number) => {
    const active = Math.max(1, Math.ceil(val / config.targetGroupSize));
    onUpdateConfig({
      ...config,
      expectedStudents: val,
      activeGroups: active
    });
  };

  const handleSizeChange = (val: number) => {
    const active = Math.max(1, Math.ceil(config.expectedStudents / val));
    onUpdateConfig({
      ...config,
      targetGroupSize: val,
      activeGroups: active
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 pb-20">
      <header className="sticky top-0 z-50 glass-panel border-b border-white/60 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg">
            <LayoutGrid className="text-cyan-400 w-6 h-6" />
          </div>
          <h2 className="font-orbitron font-bold text-xl tracking-tight">NOVAGROUP <span className="text-cyan-500">ADMIN</span></h2>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onGoToRegistration}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 text-white font-orbitron font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-100"
          >
            <UserPlus size={16} />
            Registration Mode
          </button>
          <button 
            onClick={handleExport}
            className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 border border-slate-200"
            title="Export CSV"
          >
            <Download size={20} />
          </button>
          <button 
            onClick={handlePrint}
            className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 border border-slate-200"
            title="Print View"
          >
            <Printer size={20} />
          </button>
          <button 
            onClick={onClear}
            className="p-2.5 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors text-slate-500 border border-slate-200"
            title="Clear All Data"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        
        {/* System Configuration Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GlassCard className="lg:col-span-1 space-y-6" glowColor="cyan">
            <div className="flex items-center gap-2 mb-2">
              <Settings2 className="text-cyan-500" size={20} />
              <h3 className="font-orbitron text-sm font-bold uppercase tracking-wider text-slate-400">System Parameters</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-orbitron font-bold text-slate-400 uppercase tracking-widest ml-1 flex justify-between">
                  <span>Total Expected Students</span>
                  <span className="text-cyan-600">{config.expectedStudents}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={config.expectedStudents}
                  onChange={(e) => handleExpectedChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-orbitron font-bold text-slate-400 uppercase tracking-widest ml-1 flex justify-between">
                  <span>Target Students Per Group</span>
                  <span className="text-cyan-600">{config.targetGroupSize}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={config.targetGroupSize}
                  onChange={(e) => handleSizeChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div className="p-4 bg-slate-900 rounded-xl flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] font-orbitron font-bold text-cyan-400/60 uppercase">Calculated Active Nodes</div>
                  <div className="text-2xl font-orbitron font-black text-white">{config.activeGroups}</div>
                </div>
                <Sliders className="text-cyan-400/20" size={32} />
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-2 flex flex-col justify-end space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-1">
                <span className="text-xs font-orbitron font-bold text-cyan-500 uppercase tracking-widest">Master Overview</span>
                <h1 className="text-4xl font-orbitron font-black text-slate-800 uppercase tracking-tighter">Group <span className="text-violet-500">Nodes</span></h1>
              </div>
              <div className="flex gap-4">
                <GlassCard className="px-6 py-3 flex items-center gap-4">
                    <Users className="text-slate-400" size={24} />
                    <div className="text-right">
                      <div className="text-[10px] font-orbitron font-bold text-slate-400 uppercase">Registered / Capacity</div>
                      <div className="text-2xl font-orbitron font-black text-slate-800">
                        {students.length} / <span className="text-slate-300">{config.expectedStudents}</span>
                      </div>
                    </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>

        {students.length === 0 ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-6 border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/30">
            <div className="w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center animate-float">
               <Users size={48} className="text-slate-200" />
            </div>
            <div className="space-y-2">
              <h3 className="font-orbitron text-xl font-bold text-slate-400 uppercase">Awaiting Deployments</h3>
              <p className="text-slate-400 max-w-xs mx-auto text-sm">Switch to registration mode to allow students to join the network.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
            {groups.map((group) => (
              <GlassCard 
                key={group.id} 
                className="relative group/card overflow-hidden hover:neon-border-violet" 
                glowColor={group.students.length > 0 ? 'violet' : 'cyan'}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 font-orbitron font-black text-lg ${NUMBER_COLORS[((group.id - 1) % 10) + 1]}`}>
                    {group.id}
                  </div>
                  <div className="text-[10px] font-orbitron font-bold text-slate-400 uppercase">
                    {group.students.length} Units
                  </div>
                </div>

                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                  {group.students.length > 0 ? (
                    group.students.map((student) => (
                      <div key={student.id} className="p-3 bg-white/60 border border-white/80 rounded-xl hover:bg-white transition-all animate-in fade-in slide-in-from-right-2">
                         <div className="text-[9px] font-mono text-slate-400 mb-1">{student.id}</div>
                         <div className="text-xs font-bold text-slate-700 uppercase">{student.name}</div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-[10px] font-orbitron text-slate-300 uppercase tracking-widest italic">
                      Empty Node
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 glass-panel border-t border-white/60 px-6 py-3 flex items-center justify-between z-40 text-[10px] font-orbitron text-slate-400 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Quantum Feed Active
        </div>
        <div className="hidden sm:block">Novagroup Security Layer 10</div>
        <div>© 2025 Cluster Matrix</div>
      </footer>
    </div>
  );
};
