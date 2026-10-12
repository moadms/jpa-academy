'use client';

import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Trophy, 
  Gamepad2, 
  Award, 
  Compass, 
  Briefcase, 
  Layers,
  ChevronRight,
  Flame,
  GitBranch,
  Zap,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  activeView: 'chapters' | 'lectures' | 'architect' | 'interviews' | 'quiz' | 'games';
  setActiveView: (view: 'chapters' | 'lectures' | 'architect' | 'interviews' | 'quiz' | 'games') => void;
  isOpenMobile?: boolean;
  setIsOpenMobile?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  setActiveView,
  isOpenMobile,
  setIsOpenMobile 
}) => {
  const navItems = [
    {
      id: 'chapters' as const,
      label: '10 Labs & TPs',
      subtitle: 'Code, Schémas & Enfant',
      icon: BookOpen,
      badge: '10 TPs',
      gradient: 'from-purple-600 to-indigo-600',
      activeColor: 'bg-purple-600/20 text-purple-300 border-purple-500/50 shadow-purple-900/30'
    },
    {
      id: 'lectures' as const,
      label: 'Cours Prof (7 Chapitres)',
      subtitle: 'Contenu plateforme officiel',
      icon: GraduationCap,
      badge: 'Officiel',
      gradient: 'from-blue-600 to-cyan-600',
      activeColor: 'bg-blue-600/20 text-cyan-300 border-cyan-500/50 shadow-cyan-900/30'
    },
    {
      id: 'architect' as const,
      label: 'Pensée Ingénieur 📐',
      subtitle: '7 Clés & Convertisseur UML',
      icon: Compass,
      badge: 'Senior',
      gradient: 'from-pink-600 to-rose-600',
      activeColor: 'bg-pink-600/20 text-pink-300 border-pink-500/50 shadow-pink-900/30'
    },
    {
      id: 'interviews' as const,
      label: 'Entretiens Maroc 💼',
      subtitle: 'Oracle, Capgemini, SG ATS',
      icon: Briefcase,
      badge: 'Salaires DH',
      gradient: 'from-emerald-600 to-teal-600',
      activeColor: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50 shadow-emerald-900/30'
    },
    {
      id: 'quiz' as const,
      label: 'Arène des QCMs',
      subtitle: 'Tous les tests décodés',
      icon: Trophy,
      badge: '100% Validé',
      gradient: 'from-amber-500 to-yellow-600',
      activeColor: 'bg-amber-600/20 text-yellow-300 border-yellow-500/50 shadow-yellow-900/30'
    },
    {
      id: 'games' as const,
      label: 'Dojo Mini-Jeux',
      subtitle: 'Bug Hunter & Code Fill',
      icon: Gamepad2,
      badge: 'Ninja',
      gradient: 'from-fuchsia-600 to-purple-600',
      activeColor: 'bg-fuchsia-600/20 text-fuchsia-300 border-fuchsia-500/50 shadow-fuchsia-900/30'
    }
  ];

  return (
    <aside className="w-72 shrink-0 bg-slate-950/95 border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 backdrop-blur-2xl z-40 select-none">
      {/* Top Header / Brand */}
      <div>
        <div className="p-6 border-b border-slate-800/70 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-600/30 shrink-0">
            <span className="text-2xl">⚡</span>
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white">
                JPA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">ACADEMY</span>
              </span>
            </div>
            <div className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>PRO ARCHITECT 3D</span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-4 py-5 space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 pb-2 font-bold flex items-center justify-between">
            <span>Navigation Principale</span>
            <span className="text-purple-400 font-semibold">6 Modules</span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  if (setIsOpenMobile) setIsOpenMobile(false);
                }}
                className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? `${item.activeColor} shadow-lg scale-[1.01]`
                    : 'bg-slate-900/30 border-transparent text-slate-300 hover:bg-slate-900/80 hover:text-white hover:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                    isActive
                      ? `bg-gradient-to-tr ${item.gradient} text-white shadow-md`
                      : 'bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-purple-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>

                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full shrink-0 ml-2 font-bold ${
                  isActive
                    ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800/80 group-hover:border-slate-700'
                }`}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile / Student Widget */}
      <div className="p-4 border-t border-slate-800/70 space-y-3">
        {/* Candidate / Student card */}
        <div className="p-3.5 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-900 border border-purple-500/30 rounded-2xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Moad Moussaoui</span>
            </span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded-full font-bold">
              10/10 Labs
            </span>
          </div>
          <div className="text-xs font-bold text-white">Score Moyen : 79% (Cours 28)</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Prêt pour Recrutement ESN & Big Tech</div>
        </div>

        {/* GitHub & Vercel Links */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/moadms/jpa-academy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-[11px] font-mono font-medium transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>GitHub moadms</span>
          </a>
          <div className="py-2 px-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-400 text-center font-bold">
            ▲ Vercel Ready
          </div>
        </div>
      </div>
    </aside>
  );
};
