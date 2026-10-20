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
  GitBranch,
  Zap,
  GraduationCap,
  FileText
} from 'lucide-react';

export type ActiveViewType = 'academy' | 'chapters' | 'lectures' | 'architect' | 'interviews' | 'quiz' | 'games';

interface SidebarProps {
  activeView: ActiveViewType;
  setActiveView: (view: ActiveViewType) => void;
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
      id: 'academy' as const,
      label: 'Masterclass Java & Spring 🎓',
      subtitle: 'JVM, RAM, Tests, PFE Maroc',
      icon: Zap,
      badge: 'Essentiel',
      activeColor: 'bg-indigo-600/20 text-indigo-200 border-indigo-500/50 shadow-indigo-950/40'
    },
    {
      id: 'chapters' as const,
      label: '10 Labs & TPs Décortiqués',
      subtitle: 'Code, Schémas & Enfant',
      icon: BookOpen,
      badge: '10 TPs',
      activeColor: 'bg-indigo-600/20 text-indigo-200 border-indigo-500/50 shadow-indigo-950/40'
    },
    {
      id: 'lectures' as const,
      label: 'Cours Magistral (7 Chapitres)',
      subtitle: 'Plateforme officielle prof',
      icon: GraduationCap,
      badge: 'Officiel',
      activeColor: 'bg-sky-600/20 text-sky-200 border-sky-500/50 shadow-sky-950/40'
    },
    {
      id: 'architect' as const,
      label: 'Pensée Ingénieur 📐',
      subtitle: '7 Clés & Convertisseur UML',
      icon: Compass,
      badge: 'Senior',
      activeColor: 'bg-violet-600/20 text-violet-200 border-violet-500/50 shadow-violet-950/40'
    },
    {
      id: 'interviews' as const,
      label: 'Entretiens Maroc 💼',
      subtitle: 'Oracle, Capgemini, SG ATS',
      icon: Briefcase,
      badge: 'Salaires DH',
      activeColor: 'bg-emerald-600/20 text-emerald-200 border-emerald-500/50 shadow-emerald-950/40'
    },
    {
      id: 'quiz' as const,
      label: 'Arène des QCMs',
      subtitle: 'Tous les tests validés',
      icon: Trophy,
      badge: '100% Score',
      activeColor: 'bg-amber-600/20 text-amber-200 border-amber-500/50 shadow-amber-950/40'
    },
    {
      id: 'games' as const,
      label: 'Dojo Mini-Jeux',
      subtitle: 'Bug Hunter & Code Fill',
      icon: Gamepad2,
      badge: 'Coding Games',
      activeColor: 'bg-indigo-600/20 text-indigo-200 border-indigo-500/50 shadow-indigo-950/40'
    }
  ];

  return (
    <aside className="w-72 shrink-0 bg-slate-950/95 border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 backdrop-blur-2xl z-40 select-none">
      {/* Top Header / Brand */}
      <div>
        <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-lg shadow-md shadow-indigo-950/50 shrink-0">
            ⚡
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-white">
                JPA <span className="text-indigo-400">ACADEMY</span>
              </span>
            </div>
            <div className="text-[10px] font-mono text-emerald-400 font-medium tracking-wider flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>INGÉNIERIE & TECH MAROC</span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3.5 py-4 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 pb-2 font-bold flex items-center justify-between">
            <span>Navigation Principale</span>
            <span className="text-indigo-400 font-semibold">{navItems.length} Modules</span>
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
                className={`w-full text-left p-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? `${item.activeColor} shadow-md`
                    : 'bg-transparent border-transparent text-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-indigo-300'
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

                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full shrink-0 ml-1.5 font-bold ${
                  isActive
                    ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 group-hover:border-slate-700'
                }`}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile / Student Widget */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        {/* Candidate / Student card */}
        <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono text-indigo-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
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

        {/* Direct Link to Standalone HTML Reports */}
        <div className="space-y-1.5">
          <a
            href="/rapport-tp5-spring-hibernate.html"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600/25 to-teal-600/25 hover:from-emerald-600/40 hover:to-teal-600/40 border border-emerald-500/40 hover:border-emerald-400 text-emerald-200 hover:text-white text-xs font-bold transition-all shadow-md shadow-emerald-950/40 group"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Rapport TP 5 Spring/Hibernate 🍃</span>
          </a>
          <a
            href="/rapport-soutenance.html"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-[11px] font-medium transition-all group"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Rapport Soutenance JPA 📄</span>
          </a>
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
            <span>moadms</span>
          </a>
          <div className="py-2 px-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-mono text-emerald-400 text-center font-bold">
            ▲ Vercel Ready
          </div>
        </div>
      </div>
    </aside>
  );
};
