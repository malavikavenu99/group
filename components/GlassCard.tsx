
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'violet';
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', glowColor = 'cyan' }) => {
  const glowClass = glowColor === 'cyan' ? 'neon-border-cyan' : 'neon-border-violet';
  
  return (
    <div className={`glass-panel rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] ${glowClass} ${className}`}>
      {children}
    </div>
  );
};
