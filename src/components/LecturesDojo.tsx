'use client';

import React, { useState } from 'react';
import { platformLectures } from '@/data/lectures';
import { CourseLecture } from '@/types';
import { 
  BookOpen, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  Code2, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

export const LecturesDojo: React.FC = () => {
  const [selectedLecture, setSelectedLecture] = useState<CourseLecture>(platformLectures[0]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950/60 via-purple-950/40 to-slate-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-500/30 mb-3">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>COURS MAGISTRAL OFFICIEL DE LA PLATEFORME</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Les 7 Chapitres Théoriques <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">du Professeur</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              Retrouvez l'intégralité du contenu de cours ajouté par le professeur dans MLIAEdu : l'impédance ORM, l'architecture JPA, les fichiers de configuration, les tables comparatives et les règles industrielles.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-2xl shrink-0">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[11px] font-mono text-slate-400">Volume Total</div>
              <div className="text-xs font-bold text-white">3h30 de Cours Décodé</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Horizontal Picker */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {platformLectures.map((lec) => {
          const isSelected = selectedLecture.id === lec.id;
          return (
            <button
              key={lec.id}
              onClick={() => setSelectedLecture(lec)}
              className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-left cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
                0{lec.number}
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">
                  {lec.duration}
                </div>
                <div className="text-sm font-bold truncate max-w-[190px] text-slate-100">
                  {lec.title.replace(`Chapitre ${lec.number} : `, '')}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Lecture Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full">
              Chapitre {selectedLecture.number} sur 7
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {selectedLecture.duration}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {selectedLecture.title}
          </h3>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            {selectedLecture.summary}
          </p>
        </div>

        {/* Core Concepts */}
        <div className="space-y-6">
          <h4 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            Concepts Fondamentaux & Schémas Mentaux
          </h4>

          <div className="grid grid-cols-1 gap-5">
            {selectedLecture.coreConcepts.map((concept, idx) => (
              <div key={idx} className="p-5 sm:p-6 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-mono flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span>{concept.title}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {concept.description}
                </p>
                {concept.codeSnippet && (
                  <pre className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                    <code>{concept.codeSnippet}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Comparative Table if exists */}
        {selectedLecture.comparativeTable && (
          <div className="space-y-3">
            <h4 className="text-sm font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              Tableau Comparatif : ORM (Hibernate) vs JDBC Traditionnel
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 font-mono text-cyan-300">
                    <th className="p-3.5">Critère</th>
                    <th className="p-3.5 text-purple-300">ORM / Hibernate</th>
                    <th className="p-3.5 text-slate-400">JDBC Pur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {selectedLecture.comparativeTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5 font-bold text-white">{row.dimension}</td>
                      <td className="p-3.5 text-emerald-300 font-medium">{row.col1}</td>
                      <td className="p-3.5 text-slate-400">{row.col2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pro Practices */}
        <div className="p-5 bg-gradient-to-r from-emerald-950/30 via-slate-950 to-slate-950 border border-emerald-500/30 rounded-2xl space-y-3">
          <div className="text-emerald-400 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Conseils Pratiques du Professeur
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
            {selectedLecture.proPractices.map((prac, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{prac}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
