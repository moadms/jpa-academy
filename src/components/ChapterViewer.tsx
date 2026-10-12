'use client';

import React, { useState } from 'react';
import { chapters } from '@/data/chapters';
import { Chapter } from '@/types';
import { InteractiveDiagram } from './InteractiveDiagram';
import { 
  BookOpen, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Code, 
  CheckCircle, 
  ChevronRight, 
  Compass, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

export const ChapterViewer: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(chapters[0]);
  const [activeTab, setActiveTab] = useState<'kid' | 'anatomy' | 'problems' | 'engineering' | 'schema'>('kid');

  const tabs = [
    { id: 'kid' as const, label: 'Explique à un enfant 🧒', icon: Sparkles },
    { id: 'anatomy' as const, label: 'Rôles & Code 🔬', icon: Code },
    { id: 'problems' as const, label: 'Pièges & Solutions ⚠️', icon: AlertTriangle },
    { id: 'engineering' as const, label: 'Pensée Ingénieur 📐', icon: Compass },
    { id: 'schema' as const, label: 'Schéma Visuel 🎨', icon: BookOpen }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
      {/* 10 Labs Navigation */}
      {/* Mobile/Tablet View : Compact Horizontal Pill Bar */}
      <div className="lg:hidden w-full space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Sélectionner un Lab (10 TPs) :
            </span>
          </div>
          <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
            TP {selectedChapter.number}/10
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {chapters.map((ch) => {
            const isSelected = selectedChapter.id === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedChapter(ch)}
                className={`shrink-0 px-3 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-950/40'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{ch.animeTheme.emoji}</span>
                <span>TP {ch.number}</span>
                <span className="text-[10px] opacity-75 hidden sm:inline truncate max-w-[100px]">
                  {ch.title.split(':')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop View : Rich Sticky Vertical Sub-Sidebar */}
      <div className="hidden lg:block w-80 shrink-0 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 space-y-2 backdrop-blur-xl sticky top-20">
        <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              10 Labs & TPs
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
            100% Validés
          </span>
        </div>

        <div className="space-y-1.5 max-h-[750px] overflow-y-auto no-scrollbar pt-1">
          {chapters.map((ch) => {
            const isSelected = selectedChapter.id === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedChapter(ch)}
                className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/15 border-indigo-500/60 shadow-md shadow-indigo-950/40 text-white'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 border ${
                  isSelected 
                    ? 'bg-indigo-600/30 border-indigo-400/50 text-indigo-200' 
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                  {ch.number}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-mono text-indigo-400 font-semibold uppercase">
                      TP {ch.number < 10 ? `0${ch.number}` : ch.number}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 truncate">
                      {ch.animeTheme.badge}
                    </span>
                  </div>
                  <div className="text-xs font-bold truncate text-slate-100">
                    {ch.title.split(':')[0]}
                  </div>
                </div>
                {isSelected && <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Main Stage : Selected Lab Content */}
      <div className="flex-1 min-w-0 w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl space-y-6">
        
        {/* 1. Header (Full Width - Never cramped) */}
        <div className="space-y-2 pb-5 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 rounded-full">
              TP {selectedChapter.number} • {selectedChapter.animeTheme.badge}
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 rounded-full flex items-center gap-1.5">
              <span>{selectedChapter.animeTheme.emoji}</span>
              <span>{selectedChapter.animeTheme.character}</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight break-words">
            {selectedChapter.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedChapter.subtitle}
          </p>
        </div>

        {/* 2. Navigation Tabs (Full Width, Wrap Cleanly, No Overflow) */}
        <div className="w-full flex flex-wrap gap-2 pb-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-500'
                    : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1 : Kid Explanation */}
        {activeTab === 'kid' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-6 relative">
              <div className="flex items-center gap-2 text-indigo-300 font-bold mb-3 text-sm">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>L'Histoire Pédagogique Imagée</span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {selectedChapter.kidExplanation.story}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl">
                <div className="text-amber-400 font-bold text-xs mb-2 flex items-center gap-1.5 uppercase font-mono">
                  <span>💡</span> La Métaphore du Quotidien
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {selectedChapter.kidExplanation.analogy}
                </p>
              </div>

              <div className="p-5 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl">
                <div className="text-emerald-400 font-bold text-xs mb-2 flex items-center gap-1.5 uppercase font-mono">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Ce qu'il faut retenir absolument</span>
                </div>
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                  {selectedChapter.kidExplanation.keyTakeaway}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 : Anatomy & Roles */}
        {activeTab === 'anatomy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
            {selectedChapter.anatomyElements.map((el, i) => (
              <div
                key={i}
                className="p-5 bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-lg border border-indigo-500/20">
                      {el.name}
                    </span>
                    <span className="text-xs text-slate-400">{el.role}</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    👶 <em>{el.kidDescription}</em>
                  </p>
                </div>
                <pre className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto no-scrollbar">
                  <code>{el.codeExample}</code>
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3 : Problems & Solutions */}
        {activeTab === 'problems' && (
          <div className="space-y-5 animate-fadeIn">
            {selectedChapter.problemsAndSolutions.map((p, i) => (
              <div
                key={i}
                className="p-6 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-base">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <span>{p.problemName}</span>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-mono font-bold uppercase tracking-wider ${
                      p.dangerLevel === 'Catastrophique'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : p.dangerLevel === 'Critique'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                    }`}
                  >
                    Danger : {p.dangerLevel}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-rose-950/20 border border-rose-900/40 rounded-xl text-slate-300">
                    <strong className="text-rose-400 block mb-1">🛑 Symptôme dans le code :</strong>
                    {p.symptom}
                  </div>
                  <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300">
                    <strong className="text-indigo-400 block mb-1">🧠 Pourquoi cela arrive :</strong>
                    {p.whyItHappens}
                  </div>
                </div>

                <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl">
                  <div className="text-emerald-400 font-bold text-xs mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> La Solution Industrielle Claire :
                  </div>
                  <p className="text-xs text-slate-200 mb-2">{p.solution}</p>
                  <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto border border-emerald-900/40 no-scrollbar">
                    <code>{p.correctCode}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4 : Engineering Guide */}
        {activeTab === 'engineering' && selectedChapter.engineeringGuide && (
          <div className="space-y-6 animate-fadeIn">
            {/* Overview Banner */}
            <div className="p-5 bg-slate-950/80 border border-indigo-500/30 rounded-2xl">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-1.5">
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Vision de l'Architecte Logiciel</span>
              </div>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                {selectedChapter.engineeringGuide.overview}
              </p>
            </div>

            {/* Critical Questions */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                Questions que l'Ingénieur se pose avant d'écrire le code :
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {selectedChapter.engineeringGuide.criticalQuestions.map((cq, idx) => (
                  <div key={idx} className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                    <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <span className="text-indigo-400 font-mono">Q{idx + 1}.</span>
                      <span>{cq.question}</span>
                    </div>
                    <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <strong className="text-indigo-300">Pourquoi c'est vital :</strong> {cq.whyItMatters}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-rose-950/20 border border-rose-900/40 rounded-xl text-slate-300">
                        <strong className="text-rose-400 block mb-1">❌ Erreur de débutant :</strong>
                        {cq.rookieMistake}
                      </div>
                      <div className="p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-slate-300">
                        <strong className="text-emerald-400 block mb-1">✅ Décision Senior :</strong>
                        {cq.seniorDecision}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UML To Code Steps */}
            {selectedChapter.engineeringGuide.umlToCodeSteps.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  Traduction du Diagramme UML en Code JPA :
                </h4>
                {selectedChapter.engineeringGuide.umlToCodeSteps.map((step, idx) => (
                  <div key={idx} className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-white">{step.umlConcept}</div>
                      <div className="text-xs font-mono text-indigo-300">{step.jpaAnnotation}</div>
                      <div className="text-xs text-slate-400">{step.engineeringRule}</div>
                    </div>
                    <pre className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto w-full md:w-auto md:max-w-md no-scrollbar">
                      <code>{step.codeSnippet}</code>
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {/* Architecture Checklist */}
            <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
              <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Checklist Qualité Code avant Livraison
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedChapter.engineeringGuide.architectureChecklist.map((chk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{chk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 5 : Interactive Diagram */}
        {activeTab === 'schema' && (
          <div className="animate-fadeIn">
            <InteractiveDiagram type={selectedChapter.schema.type} />
          </div>
        )}

      </div>
    </div>
  );
};
