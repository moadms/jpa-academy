'use client';

import React, { useState } from 'react';
import { criticalQuestionsData, umlToJpaPatterns } from '@/data/engineering';
import { CriticalQuestion, UmlToJpaPattern } from '@/types';
import { 
  Compass, 
  HelpCircle, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Code2, 
  Cpu, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  FileCode,
  BookOpen
} from 'lucide-react';

export const ArchitectGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'critical-thinking' | 'uml-to-code' | 'methodology'>('critical-thinking');
  const [selectedQuestion, setSelectedQuestion] = useState<CriticalQuestion>(criticalQuestionsData[0]);
  const [selectedPattern, setSelectedPattern] = useState<UmlToJpaPattern>(umlToJpaPatterns[1]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Relations', 'Performance', 'Héritage', 'Concurrence', 'Transactions'];

  const filteredQuestions = categoryFilter === 'All'
    ? criticalQuestionsData
    : criticalQuestionsData.filter(q => q.category === categoryFilter);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono font-bold border border-purple-500/30 mb-3">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>DOJO DE L'INGÉNIEUR & PENSÉE CRITIQUE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Comment Réfléchir comme un <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Senior Architect</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              Avant d'écrire la moindre ligne de code, un ingénieur d'élite se pose 7 questions fondamentales et convertit méthodiquement chaque losange et flèche UML en entités JPA infaillibles.
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('critical-thinking')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'critical-thinking'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>7 Questions Critiques</span>
            </button>
            <button
              onClick={() => setActiveTab('uml-to-code')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'uml-to-code'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4 text-pink-400" />
              <span>Convertisseur UML ➔ Code</span>
            </button>
            <button
              onClick={() => setActiveTab('methodology')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'methodology'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Méthode des 4 Piliers</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1 : 7 QUESTIONS CRITIQUES */}
      {activeTab === 'critical-thinking' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question List Sidebar */}
          <div className="lg:col-span-5 space-y-3">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`text-[11px] px-3 py-1 rounded-full font-mono transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredQuestions.map(q => {
              const isSelected = selectedQuestion.id === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuestion(q)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-500 shadow-md shadow-purple-500/20 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-purple-400 font-semibold">{q.category}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                      Question clé
                    </span>
                  </div>
                  <div className="font-bold text-sm text-slate-100 leading-snug">
                    {q.question}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Question Deep-Dive Inspector */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-wider">
                Focus Architectural • {selectedQuestion.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                {selectedQuestion.question}
              </h3>
            </div>

            {/* Child Explanation Card */}
            <div className="bg-gradient-to-r from-pink-950/30 to-purple-950/30 border border-pink-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-pink-300 font-bold text-sm mb-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>Expliqué à un Enfant (L'Intuition Pure) 🧒</span>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                {selectedQuestion.childExplanation}
              </p>
            </div>

            {/* Senior Architect Technical Vision */}
            <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>La Vision Senior Software Engineer (En Entreprise) 👔</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedQuestion.seniorExplanation}
              </p>
            </div>

            {/* Trap vs Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-2xl">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Le Piège Débutant à Éviter</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {selectedQuestion.trapToAvoid}
                </p>
              </div>

              <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Règle d'Or de l'Ingénieur</span>
                </div>
                <p className="text-slate-200 text-xs font-semibold leading-relaxed">
                  {selectedQuestion.solutionRule}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2 : UML TO CODE TRANSFORMER */}
      {activeTab === 'uml-to-code' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pattern Navigation */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Patrons de Transformation UML ➔ JPA
            </div>
            {umlToJpaPatterns.map((pat, idx) => {
              const isSelected = selectedPattern.umlElement === pat.umlElement;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedPattern(pat)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-500 text-white shadow-md shadow-purple-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="text-[11px] font-mono text-cyan-400 font-bold">
                    {pat.umlSymbol}
                  </div>
                  <div className="font-bold text-sm text-slate-100 mt-1">
                    {pat.umlElement}
                  </div>
                  <div className="text-[11px] text-purple-300 font-mono mt-1 truncate">
                    {pat.jpaMapping}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Transformation Detail Display */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400">Élément UML Source</span>
                <h3 className="text-2xl font-black text-white">{selectedPattern.umlElement}</h3>
                <div className="text-xs text-pink-300 font-mono mt-0.5">Symbole : {selectedPattern.umlSymbol}</div>
              </div>
              <div className="bg-purple-500/20 text-purple-300 border border-purple-500/40 px-3 py-1.5 rounded-xl font-mono text-xs font-bold self-start">
                {selectedPattern.jpaMapping}
              </div>
            </div>

            {/* Key Question to Ask */}
            <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-2xl">
              <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> La Question Clé à se poser devant le schéma :
              </div>
              <p className="text-slate-200 text-sm font-medium">
                "{selectedPattern.keyQuestion}"
              </p>
            </div>

            {/* Java & SQL Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-mono text-purple-300 font-bold mb-1.5 flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-purple-400" />
                  <span>Code Java JPA Correspondant</span>
                </div>
                <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-mono text-purple-200 overflow-x-auto leading-relaxed">
                  <code>{selectedPattern.exampleJava}</code>
                </pre>
              </div>

              <div>
                <div className="text-xs font-mono text-cyan-300 font-bold mb-1.5 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Schéma SQL Généré en Base</span>
                </div>
                <pre className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                  <code>{selectedPattern.exampleSql}</code>
                </pre>
              </div>
            </div>

            {/* Golden Rule */}
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-emerald-400 font-bold text-xs">Règle d'Or d'Implémentation</div>
                <p className="text-slate-200 text-xs sm:text-sm mt-0.5 leading-relaxed">
                  {selectedPattern.goldenRule}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3 : METHODOLOGY 4 PILIERS */}
      {activeTab === 'methodology' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-8">
          <div>
            <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider mb-1">
              Méthodologie Industrielle
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Les 4 Étapes Séquentielles pour Résoudre N'importe quel Sujet de Persistance
            </h3>
            <p className="text-slate-400 text-sm mt-2 max-w-3xl">
              Les étudiants qui échouent commencent directement par coder un contrôleur ou un main sans réfléchir. Voici l'ordre rigoureux utilisé par les ingénieurs chez Google, Amazon et Capgemini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Audit du Modèle de Données',
                icon: Layers,
                color: 'from-blue-500 to-indigo-600',
                badge: '30% du Temps',
                rules: [
                  "Identifier les classes racines et les agrégats.",
                  "Repérer les compositions ◆ (orphanRemoval = true).",
                  "Localiser qui portera la clé étrangère (FK).",
                  "Choisir la stratégie d'héritage (JOINED vs SINGLE)."
                ]
              },
              {
                step: '02',
                title: 'Entités Pures & Helpers',
                icon: Code2,
                color: 'from-purple-500 to-pink-600',
                badge: '25% du Temps',
                rules: [
                  "Créer le constructeur no-arg obligatoire.",
                  "Déclarer @Id et @GeneratedValue.",
                  "Mettre tout @ManyToOne en FetchType.LAZY.",
                  "Écrire les méthodes bidirectionnelles addChild() / removeChild().",
                  "Exclure les collections de toString() et equals()."
                ]
              },
              {
                step: '03',
                title: 'Couche DAO Générique & Singleton',
                icon: Cpu,
                color: 'from-emerald-500 to-teal-600',
                badge: '20% du Temps',
                rules: [
                  "Créer GenericDao<T, ID> avec CRUD universel.",
                  "Configurer HibernateUtil avec EMF unique.",
                  "Implémenter les requêtes JPQL avancées avec paramètres nommés.",
                  "Ajouter la pagination sur les listes volumineuses."
                ]
              },
              {
                step: '04',
                title: 'Service Métier & Tests JUnit 5',
                icon: ShieldCheck,
                color: 'from-amber-500 to-orange-600',
                badge: '25% du Temps',
                rules: [
                  "Placer begin() et commit() dans la couche Service.",
                  "Gérer les rollbacks dans le catch.",
                  "Protéger par @Version contre la concurrence.",
                  "Écrire les tests unitaires et assertions (assertNotNull, assertTrue)."
                ]
              }
            ].map((st, i) => {
              const Icon = st.icon;
              return (
                <div
                  key={i}
                  className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-purple-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {st.step}
                      </span>
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                        {st.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold text-base mb-3">
                      <Icon className="w-5 h-5 text-purple-400" />
                      <span>{st.title}</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {st.rules.map((r, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
