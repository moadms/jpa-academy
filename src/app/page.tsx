'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopHeader } from '@/components/TopHeader';
import { ChapterViewer } from '@/components/ChapterViewer';
import { LecturesDojo } from '@/components/LecturesDojo';
import { ArchitectGuide } from '@/components/ArchitectGuide';
import { InterviewArena } from '@/components/InterviewArena';
import { QuizArena } from '@/components/QuizArena';
import { GamesDojo } from '@/components/GamesDojo';
import { Hero3DScene } from '@/components/Hero3DScene';
import { Sparkles, Trophy, BookOpen, Gamepad2, Compass, Briefcase, Zap, X } from 'lucide-react';

export default function Home() {
  const [activeView, setActiveView] = useState<'chapters' | 'lectures' | 'architect' | 'interviews' | 'quiz' | 'games'>('chapters');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const getTitle = () => {
    switch (activeView) {
      case 'chapters': return 'Laboratoires Pratiques (10 TPs Décortiqués)';
      case 'lectures': return 'Cours Magistral Officiel (7 Chapitres Théoriques)';
      case 'architect': return 'Dojo de l\'Ingénieur & Pensée Critique (7 Clés & UML)';
      case 'interviews': return 'Banque d\'Entretiens Recruteurs (Oracle, Capgemini, SG ATS Maroc)';
      case 'quiz': return 'Arène des QCMs & Tests de Certification Validés';
      case 'games': return 'Dojo des Mini-Jeux de Code & Chasseur de Bugs';
      default: return 'JPA Academy';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex selection:bg-purple-500 selection:text-white relative">
      
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
          <div className="relative z-10 w-72 h-full bg-slate-950">
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
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

        {/* Hero Banner with 3D Scene (displayed for chapters view or top) */}
        {activeView === 'chapters' && (
          <section className="relative overflow-hidden pt-8 pb-10 border-b border-slate-900 bg-radial from-purple-900/30 via-slate-950 to-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Content */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <span>FORMATION EXPERTE HIBERNATE/JPA & CARRIÈRE TECH MAROC</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Maîtrise <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">JPA & Hibernate</span> et Décroche ton Job
                  </h1>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                    Les 7 chapitres du cours officiel, 10 TPs expliqués comme à un enfant avec pièges et solutions, et les entretiens techniques réels chez <strong>Oracle Maroc, Capgemini, SG ATS et CGI</strong>.
                  </p>

                  {/* Action Shortcuts */}
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    <button
                      onClick={() => setActiveView('lectures')}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Cours Magistral (7 Chapitres)</span>
                    </button>
                    <button
                      onClick={() => setActiveView('interviews')}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>Entretiens Maroc (Salaires DH)</span>
                    </button>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                    {[
                      { label: 'Cours du Prof', val: '7 Chapitres', icon: BookOpen, color: 'text-blue-400' },
                      { label: 'Labs Validés', val: '10/10 TPs', icon: Zap, color: 'text-purple-400' },
                      { label: 'Pensée Critique', val: '7 Clés Architecte', icon: Compass, color: 'text-pink-400' },
                      { label: 'Marché Marocain', val: '5 Grandes ESNs', icon: Briefcase, color: 'text-emerald-400' }
                    ].map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <div key={i} className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-sm">
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
                  <div className="w-full max-w-[420px] h-[320px] sm:h-[380px] rounded-3xl bg-slate-900/30 border border-purple-500/20 backdrop-blur-sm overflow-hidden relative shadow-2xl shadow-purple-900/20">
                    <Hero3DScene />
                    <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 border border-slate-800/80 p-2 rounded-xl backdrop-blur-md flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-purple-300 font-mono text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>JPA CORE 3D VISUALIZER</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Three.js</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* Dynamic Main Workspace Stage */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeView === 'chapters' && <ChapterViewer />}
          {activeView === 'lectures' && <LecturesDojo />}
          {activeView === 'architect' && <ArchitectGuide />}
          {activeView === 'interviews' && <InterviewArena />}
          {activeView === 'quiz' && <QuizArena />}
          {activeView === 'games' && <GamesDojo />}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 space-y-1.5">
            <p>
              Plateforme interactive conçue avec 💜 pour maîtriser Hibernate/JPA et réussir les entretiens de développement au Maroc.
            </p>
            <p className="font-mono text-slate-600 text-[11px]">
              JPA Academy • 7 Chapitres Magistraux • 10 Labs • Questions d'Entretiens Oracle, Capgemini, CGI, SG ATS
            </p>
          </div>
        </footer>
      </div>

    </div>
  );
}
