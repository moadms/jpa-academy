'use client';

import React, { useState } from 'react';
import { moroccanCompanies, interviewQuestions } from '@/data/interviews';
import { InterviewQuestion, MoroccanTechCompany } from '@/types';
import { 
  Building2, 
  HelpCircle, 
  Sparkles, 
  Cpu, 
  AlertTriangle, 
  Banknote, 
  ChevronRight, 
  Briefcase, 
  CheckCircle2, 
  Compass, 
  Search,
  MapPin,
  Flame,
  Award
} from 'lucide-react';

export const InterviewArena: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'questions' | 'companies' | 'prep-guide'>('questions');
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion>(interviewQuestions[0]);
  const [selectedCompany, setSelectedCompany] = useState<MoroccanTechCompany>(moroccanCompanies[0]);
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const topics = ['All', 'Hibernate / JPA Interne', 'Spring Boot & Architecture', 'Concurrence & Transactions', 'Performance & SQL Tuning', 'System Design & DDD'];
  const levels = ['All', 'Junior (0-2 ans)', 'Confirmé (2-5 ans)', 'Senior / Lead Tech (5+ ans)'];

  const filteredQuestions = interviewQuestions.filter(q => {
    const matchTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const matchLevel = selectedLevel === 'All' || q.level === selectedLevel;
    return matchTopic && matchLevel;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/50 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30 mb-3">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>MARCHÉ TECH MAROCAIN • CASABLANCA & RABAT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Réussir les Entretiens Techniques <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Oracle, Capgemini & SG ATS</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              Questions réelles posées aux ingénieurs développement, salaires pratiqués au Maroc, profils les plus recherchés, pièges des recruteurs et stratégie de négociation.
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('questions')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'questions'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Questions Récentes</span>
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'companies'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Entreprises & Salaires</span>
            </button>
            <button
              onClick={() => setActiveTab('prep-guide')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'prep-guide'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Guide de Réussite</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1 : QUESTIONS D'ENTRETIEN */}
      {activeTab === 'questions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar / Filter */}
          <div className="lg:col-span-5 space-y-3">
            {/* Filters */}
            <div className="space-y-2 mb-3">
              <div className="flex flex-wrap gap-1">
                {topics.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTopic(t)}
                    className={`text-[10px] px-2.5 py-1 rounded-full font-mono transition-all cursor-pointer ${
                      selectedTopic === t
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            {filteredQuestions.map(q => {
              const isSelected = selectedQuestion.id === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuestion(q)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/60 border-emerald-500 shadow-md shadow-emerald-500/20 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-emerald-400 font-bold">{q.companyTarget}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                      {q.level}
                    </span>
                  </div>
                  <div className="font-bold text-sm text-slate-100 leading-snug line-clamp-2">
                    {q.question}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deep-Dive Card */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedQuestion.companyTarget}
                </span>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-800/40">
                  {selectedQuestion.topic}
                </span>
                <span className="text-xs text-slate-400 ml-auto">
                  Niveau : {selectedQuestion.level}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                {selectedQuestion.question}
              </h3>
            </div>

            {/* Child Intuition */}
            <div className="bg-gradient-to-r from-pink-950/30 to-purple-950/30 border border-pink-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-pink-300 font-bold text-sm mb-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>L'Intuition Magique (Pour comprendre en 30 secondes) 🧒</span>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                {selectedQuestion.childIntuition}
              </p>
            </div>

            {/* Senior Technical Answer */}
            <div className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Ce qu'il faut dire mot pour mot à l'examinateur 👔</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedQuestion.seniorTechnicalAnswer}
              </p>
              {selectedQuestion.codeExample && (
                <pre className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                  <code>{selectedQuestion.codeExample}</code>
                </pre>
              )}
            </div>

            {/* Trap vs Salary Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-2xl">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Le Piège Débutant de l'Examinateur</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {selectedQuestion.examinerTrap}
                </p>
              </div>

              <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-2xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1.5">
                  <Banknote className="w-4 h-4" />
                  <span>Boost de Salaire & Négociation</span>
                </div>
                <p className="text-slate-200 text-xs font-medium leading-relaxed">
                  {selectedQuestion.salaryImpactProTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2 : ENTREPRISES & SALAIRES MAROC */}
      {activeTab === 'companies' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-2.5">
            {moroccanCompanies.map((comp, idx) => {
              const isSelected = selectedCompany.name === comp.name;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCompany(comp)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="font-bold text-sm text-slate-100 flex items-center justify-between">
                    <span>{comp.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="text-xs text-emerald-400 font-mono mt-1">
                    Junior : {comp.averageSalaryJunior.split(' ')[0]} {comp.averageSalaryJunior.split(' ')[1]} DH
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Fiche Entreprise • Maroc
              </span>
              <h3 className="text-2xl font-black text-white mt-1">{selectedCompany.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCompany.locations.map((loc, i) => (
                  <span key={i} className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" /> {loc}
                  </span>
                ))}
              </div>
            </div>

            {/* Salary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl">
                <div className="text-xs text-slate-400 font-mono">Salaire Junior (0-2 ans)</div>
                <div className="text-lg font-black text-emerald-400 mt-1">{selectedCompany.averageSalaryJunior}</div>
              </div>
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl">
                <div className="text-xs text-slate-400 font-mono">Salaire Senior (5+ ans)</div>
                <div className="text-lg font-black text-cyan-400 mt-1">{selectedCompany.averageSalarySenior}</div>
              </div>
            </div>

            {/* Stages */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                Déroulement Exact du Processus de Recrutement :
              </h4>
              <div className="space-y-2">
                {selectedCompany.interviewStages.map((stage, i) => (
                  <div key={i} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{stage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                Technologies Testées Prioritairement :
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCompany.keyHiringTechnologies.map((tech, i) => (
                  <span key={i} className="text-xs bg-cyan-950/30 text-cyan-300 border border-cyan-800/40 px-2.5 py-1 rounded-xl font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Insider Tips */}
            <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-2xl">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Flame className="w-4 h-4" /> Le Conseil Secret des Développeurs Déjà en Poste :
              </div>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                {selectedCompany.insiderTips}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3 : GUIDE DE RÉUSSITE */}
      {activeTab === 'prep-guide' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Feuille de Route pour Décrocher l'Offre
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Les 5 Piliers pour Réussir Tout Entretien de Développement au Maroc
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "1. Maîtriser le 'Pourquoi' pas seulement le 'Comment'",
                desc: "Ne dites pas 'Je mets @Transactional'. Dites 'Spring utilise un proxy CGLIB qui intercepte l'appel et gère la connexion JDBC dans un ThreadLocal'."
              },
              {
                title: "2. Chasser le Problème N+1 Systématiquement",
                desc: "Dans 100% des tests techniques de Capgemini et CGI, un scénario avec N+1 requêtes vous sera présenté. Proposez spontanément `JOIN FETCH` ou `@EntityGraph`."
              },
              {
                title: "3. Connaître les Structures de Données Internes",
                desc: "Oracle adore tester l'implémentation de `HashMap` (buckets, collision chaining avec LinkedList puis Red-Black Tree en Java 8+) et `ConcurrentHashMap`."
              },
              {
                title: "4. Parler en Métriques et Performance",
                desc: "Mentionnez des ordres de grandeur : coût d'ouverture d'une connexion (50ms) vs pool HikariCP (0.1ms), heap size, et throughput de requêtes."
              },
              {
                title: "5. Soigner l'Anglais Technique",
                desc: "À Casablanca Nearshore et Rabat Technopolis, les équipes travaillent pour la France, les USA et l'Europe. Un anglais fluide fait la différence de 30% sur le salaire."
              },
              {
                title: "6. Poser des Questions Pertinentes à la Fin",
                desc: "Demandez : 'Quel est le taux de couverture SonarQube exigé sur le projet ?' et 'Comment gérez-vous les migrations DB en production (Flyway ou Liquibase) ?'."
              }
            ].map((p, idx) => (
              <div key={idx} className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                <div className="text-sm font-bold text-white text-emerald-400">{p.title}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
