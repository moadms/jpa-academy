'use client';

import React, { useState } from 'react';
import { chapters } from '@/data/chapters';
import { Chapter } from '@/types';
import { InteractiveDiagram } from './InteractiveDiagram';
import { BookOpen, Sparkles, AlertTriangle, ShieldCheck, Code, CheckCircle, ChevronRight, Compass, CheckCircle2, Cpu } from 'lucide-react';

export const ChapterViewer: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(chapters[0]);
  const [activeTab, setActiveTab] = useState<'kid' | 'anatomy' | 'problems' | 'engineering' | 'schema'>('kid');

  return (
    <div className="space-y-6">
      {/* Chapter Selection Bar with Anime Badges */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {chapters.map((ch) => {
          const isSelected = selectedChapter.id === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => setSelectedChapter(ch)}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300 text-left ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border-purple-500 shadow-lg shadow-purple-500/20 text-white scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <span className="text-2xl p-1 bg-slate-800/80 rounded-xl border border-slate-700">
                {ch.animeTheme.emoji}
              </span>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-purple-400">
                  Chapitre {ch.number}
                </div>
                <div className="text-sm font-bold truncate max-w-[170px] text-slate-100">
                  {ch.title.split(':')[0]}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Chapter Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Anime Gradient Ambient Glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">
                Chapitre {selectedChapter.number} • {selectedChapter.animeTheme.badge}
              </span>
              <span className="px-3 py-1 text-xs font-medium bg-pink-500/20 text-pink-300 border border-pink-500/30 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-pink-400" />
                {selectedChapter.animeTheme.character}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {selectedChapter.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1">
              {selectedChapter.subtitle}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'kid', label: 'Explique à un enfant 🧒', icon: Sparkles },
              { id: 'anatomy', label: 'Rôles & Code 🔬', icon: Code },
              { id: 'problems', label: 'Pièges & Solutions ⚠️', icon: AlertTriangle },
              { id: 'engineering', label: 'Pensée Ingénieur 📐', icon: Compass },
              { id: 'schema', label: 'Schéma Visuel 🎨', icon: BookOpen }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1 : Kid Explanation */}
        {activeTab === 'kid' && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-900 border border-purple-500/30 rounded-2xl p-6 relative">
              <div className="flex items-center gap-2 text-purple-300 font-bold mb-3 text-base">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span>L'Histoire Magique</span>
              </div>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                {selectedChapter.kidExplanation.story}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl">
                <div className="text-pink-400 font-bold text-sm mb-2 flex items-center gap-2">
                  <span>💡</span> La Métaphore du Quotidien
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedChapter.kidExplanation.analogy}
                </p>
              </div>

              <div className="p-5 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl">
                <div className="text-emerald-400 font-bold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Ce qu'il faut retenir absolument
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedChapter.kidExplanation.keyTakeaway}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 : Anatomy & Roles */}
        {activeTab === 'anatomy' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
            {selectedChapter.anatomyElements.map((el, i) => (
              <div
                key={i}
                className="p-5 bg-slate-950/70 border border-slate-800/80 rounded-2xl flex flex-col justify-between hover:border-purple-500/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-base font-bold text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-lg border border-purple-500/20">
                      {el.name}
                    </span>
                    <span className="text-xs text-slate-400">{el.role}</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-3 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                    👶 <em>{el.kidDescription}</em>
                  </p>
                </div>
                <pre className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto">
                  <code>{el.codeExample}</code>
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3 : Problems & Solutions */}
        {activeTab === 'problems' && (
          <div className="mt-8 space-y-5 animate-fadeIn">
            {selectedChapter.problemsAndSolutions.map((p, i) => (
              <div
                key={i}
                className="p-6 bg-slate-950/80 border border-rose-500/30 rounded-2xl space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-lg">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <span>{p.problemName}</span>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                      p.dangerLevel === 'Catastrophique'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : p.dangerLevel === 'Critique'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                    }`}
                  >
                    Danger : {p.dangerLevel}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-slate-300">
                    <strong className="text-rose-400 block mb-1">🛑 Symptôme dans le code :</strong>
                    {p.symptom}
                  </div>
                  <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300">
                    <strong className="text-purple-400 block mb-1">🧠 Pourquoi cela arrive :</strong>
                    {p.whyItHappens}
                  </div>
                </div>

                <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
                  <div className="text-emerald-400 font-bold text-xs mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> La Solution Claire :
                  </div>
                  <p className="text-xs text-slate-200 mb-2">{p.solution}</p>
                  <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto border border-emerald-900/40">
                    <code>{p.correctCode}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4 : Engineering Guide */}
        {activeTab === 'engineering' && selectedChapter.engineeringGuide && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            {/* Overview Banner */}
            <div className="p-5 bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-1.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Vision de l'Architecte Logiciel</span>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                {selectedChapter.engineeringGuide.overview}
              </p>
            </div>

            {/* Critical Questions */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono font-bold text-purple-400 uppercase tracking-wider">
                Questions que l'Ingénieur se pose avant d'écrire le code :
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {selectedChapter.engineeringGuide.criticalQuestions.map((cq, idx) => (
                  <div key={idx} className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                    <div className="text-base font-bold text-white flex items-center gap-2">
                      <span className="text-purple-400 font-mono">Q{idx + 1}.</span>
                      <span>{cq.question}</span>
                    </div>
                    <div className="text-xs text-slate-300 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                      <strong className="text-cyan-400">Pourquoi c'est vital :</strong> {cq.whyItMatters}
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
                <h4 className="text-sm font-mono font-bold text-pink-400 uppercase tracking-wider">
                  Traduction du Diagramme UML en Code JPA :
                </h4>
                {selectedChapter.engineeringGuide.umlToCodeSteps.map((step, idx) => (
                  <div key={idx} className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-white">{step.umlConcept}</div>
                      <div className="text-xs font-mono text-purple-300">{step.jpaAnnotation}</div>
                      <div className="text-xs text-slate-400">{step.engineeringRule}</div>
                    </div>
                    <pre className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto shrink-0 max-w-md">
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
          <div className="mt-8 animate-fadeIn">
            <InteractiveDiagram type={selectedChapter.schema.type} />
          </div>
        )}
      </div>
    </div>
  );
};

