'use client';

import React, { useState } from 'react';
import { Sidebar, ActiveViewType } from '@/components/Sidebar';
import { TopHeader } from '@/components/TopHeader';
import { TechAcademy } from '@/components/TechAcademy';
import { ChapterViewer } from '@/components/ChapterViewer';
import { LecturesDojo } from '@/components/LecturesDojo';
import { ArchitectGuide } from '@/components/ArchitectGuide';
import { InterviewArena } from '@/components/InterviewArena';
import { QuizArena } from '@/components/QuizArena';
import { GamesDojo } from '@/components/GamesDojo';
import { Hero3DScene } from '@/components/Hero3DScene';
import { 
  Sparkles, 
  Trophy, 
  BookOpen, 
  Gamepad2, 
  Compass, 
  Briefcase, 
  Zap, 
  X,
  Layers,
  GraduationCap
} from 'lucide-react';

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveViewType>('academy');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const getTitle = () => {
    switch (activeView) {
      case 'academy': return 'Masterclass Complète : Java, Spring Boot, Tests & Recrutement PFE';
      case 'chapters': return 'Laboratoires Pratiques (10 TPs Décortiqués & Analysés)';
      case 'lectures': return 'Cours Magistral Officiel (7 Chapitres Théoriques)';
      case 'architect': return 'Dojo de l\'Ingénieur & Pensée Critique (7 Clés & UML)';
      case 'interviews': return 'Banque d\'Entretiens Recruteurs (Oracle, Capgemini, SG ATS Maroc)';
      case 'quiz': return 'Arène des QCMs & Tests de Certification Validés';
      case 'games': return 'Dojo des Mini-Jeux de Code & Chasseur de Bugs';
      default: return 'JPA Academy';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex selection:bg-indigo-500 selection:text-white relative">
      
      {/* Desktop Permanent Sidebar */}
      <div className="hidden lg:block shrink-0">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-72 h-full bg-slate-950 border-r border-slate-800">
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <Sidebar 
              activeView={activeView} 
              setActiveView={setActiveView}
              isOpenMobile={isMobileSidebarOpen}
              setIsOpenMobile={setIsMobileSidebarOpen}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopHeader 
          activeTitle={getTitle()} 
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)} 
        />

        {/* Hero Banner with 3D Scene */}
        {(activeView === 'academy' || activeView === 'chapters') && (
          <section className="relative overflow-hidden pt-8 pb-10 border-b border-slate-800/80 bg-slate-900/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Content */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>PLATEFORME ÉDUCATIVE SUPÉRIEURE • ÉCOSYSTÈME TECH MAROC</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Maîtrise <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">Java, Spring Boot & DevOps</span> et Réussis tes Entretiens
                  </h1>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                    De la mémoire vive (Stack vs Heap, Garbage Collection) jusqu'aux Microservices, Testcontainers, SonarQube et aux recrutements PFE chez <strong>Capgemini, Oracle MDC Casablanca, SG ATS et CGI</strong>.
                  </p>

                  {/* Action Shortcuts */}
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    <button
                      onClick={() => setActiveView('academy')}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Masterclass & Notions Clés</span>
                    </button>
                    <button
                      onClick={() => setActiveView('chapters')}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      <span>10 Labs Décortiqués</span>
                    </button>
                    <button
                      onClick={() => setActiveView('interviews')}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                      <span>Grille des Salaires Maroc</span>
                    </button>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                    {[
                      { label: 'Masterclass', val: '8 Modules', icon: Zap, color: 'text-indigo-400' },
                      { label: 'Labs Validés', val: '10/10 TPs', icon: BookOpen, color: 'text-sky-400' },
                      { label: 'Tests & DevOps', val: 'JUnit / Sonar', icon: Trophy, color: 'text-emerald-400' },
                      { label: 'Stage PFE Maroc', val: '5 Hubs ESN', icon: Briefcase, color: 'text-amber-400' }
                    ].map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <div key={i} className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-sm">
                          <Icon className={`w-4 h-4 mb-1 ${stat.color}`} />
                          <div className="text-base font-black text-white">{stat.val}</div>
                          <div className="text-[10px] text-slate-400">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right 3D Interactive Canvas */}
                <div className="lg:col-span-5 flex justify-center items-center">
                  <div className="w-full max-w-[420px] h-[320px] sm:h-[380px] rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm overflow-hidden relative shadow-2xl shadow-indigo-950/30">
                    <Hero3DScene />
                    <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 border border-slate-800 p-2 rounded-xl backdrop-blur-md flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-indigo-300 font-mono text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>JPA CORE 3D VISUALIZER</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Three.js WebGL</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* Dynamic Main Workspace Stage */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeView === 'academy' && <TechAcademy />}
          {activeView === 'chapters' && <ChapterViewer />}
          {activeView === 'lectures' && <LecturesDojo />}
          {activeView === 'architect' && <ArchitectGuide />}
          {activeView === 'interviews' && <InterviewArena />}
          {activeView === 'quiz' && <QuizArena />}
          {activeView === 'games' && <GamesDojo />}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 space-y-1.5">
            <p>
              Plateforme d'ingénierie logicielle conçue pour maîtriser Java, Spring Boot, JPA et préparer les stages PFE au Maroc.
            </p>
            <p className="font-mono text-slate-500 text-[11px]">
              JPA Academy • 8 Modules Masterclass • 10 Labs • Entretiens Oracle, Capgemini, CGI, SG ATS Casablanca & Rabat
            </p>
          </div>
        </footer>
      </div>

    </div>
  );
}
