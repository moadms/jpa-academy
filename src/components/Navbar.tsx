'use client';

import React from 'react';
import { Sparkles, BookOpen, Trophy, Gamepad2, Award } from 'lucide-react';

interface NavbarProps {
  activeView: 'chapters' | 'lectures' | 'architect' | 'interviews' | 'quiz' | 'games';
  setActiveView: (view: 'chapters' | 'lectures' | 'architect' | 'interviews' | 'quiz' | 'games') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="text-2xl">⚡</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">
                JPA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">ACADEMY</span>
              </span>
              <span className="text-[10px] font-mono bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full border border-pink-500/30">
                PRO 3D EDITION
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              L'art du mapping Hibernate & Préparation Entretien
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveView('chapters')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeView === 'chapters'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>10 Labs & TP</span>
          </button>

          <button
            onClick={() => setActiveView('lectures')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeView === 'lectures'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Cours Prof (7 Chapitres) 📚</span>
          </button>

          <button
            onClick={() => setActiveView('architect')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeView === 'architect'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Pensée Ingénieur 📐</span>
          </button>

          <button
            onClick={() => setActiveView('interviews')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeView === 'interviews'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Entretiens Maroc 💼</span>
          </button>

          <button
            onClick={() => setActiveView('quiz')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeView === 'quiz'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>QCMs</span>
          </button>

          <button
            onClick={() => setActiveView('games')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeView === 'games'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-pink-400" />
            <span>Mini-Jeux</span>
          </button>
        </nav>

        {/* User Rank Badge */}
        <div className="hidden lg:flex items-center gap-3 bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-2xl">
          <Award className="w-5 h-5 text-amber-400" />
          <div className="text-right">
            <div className="text-[11px] font-mono text-purple-300 font-bold">RANG : HOKAGE</div>
            <div className="text-[10px] text-emerald-400 font-semibold">10/10 Labs Validés</div>
          </div>
        </div>
      </div>
    </header>
  );
};
