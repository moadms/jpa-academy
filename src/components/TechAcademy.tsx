'use client';

import React, { useState } from 'react';
import { 
  jvmAndRamTopics, 
  springBootTopics, 
  testingAndDevopsTopics, 
  microservicesAndAngularTopics, 
  moroccanPfeCompanies, 
  oneMonthRoadmap, 
  topTrapQuestions, 
  cheatSheetDocs,
  learningPathwayStages,
  coachManifestoData,
  interviewPsychologyTechniques,
  moroccanTechVideos,
  memoryFlashcards,
  KnowledgeTopic,
  TrapQuestionItem,
  RoadmapWeekPlan,
  PfeCompanyInfo,
  CheatSheetDoc,
  LearningPathwayStage,
  PsychologicalTechnique,
  MoroccanTechVideo,
  MemoryFlashcard
} from '@/data/devKnowledge';
import { 
  Cpu, 
  Zap, 
  Shield, 
  Layers, 
  Briefcase, 
  Calendar, 
  AlertTriangle, 
  BookOpen, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Code2, 
  Copy, 
  Check, 
  Building2, 
  Coins, 
  Compass, 
  Terminal, 
  Sparkles,
  ArrowRight,
  Play,
  RotateCcw,
  HelpCircle,
  Video,
  Flame,
  Brain,
  MessageSquare,
  Clock,
  UserCheck,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const TechAcademy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'pathway' | 'manifesto' | 'jvm' | 'spring' | 'testing' | 'microservices' | 'companies' | 'videos' | 'flashcards' | 'roadmap' | 'traps' | 'cheatsheets'
  >('pathway');

  const [expandedTopicId, setExpandedTopicId] = useState<string | null>('ram-variables-storage');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [selectedRoadmapWeek, setSelectedRoadmapWeek] = useState<number>(1);
  const [revealedSolutionId, setRevealedSolutionId] = useState<string | null>(null);
  const [selectedCheatSheet, setSelectedCheatSheet] = useState<CheatSheetDoc>(cheatSheetDocs[0]);
  const [selectedVideo, setSelectedVideo] = useState<MoroccanTechVideo>(moroccanTechVideos[0]);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlashcard = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const tabs = [
    { id: 'pathway' as const, label: 'Parcours & Workflow 🗺️', icon: Compass, badge: 'Par où commencer ?' },
    { id: 'manifesto' as const, label: 'Motivation & Mindset 🚀', icon: Flame, badge: 'Coach Senior' },
    { id: 'jvm' as const, label: 'JVM & RAM 🧠', icon: Cpu, badge: 'Physique & JIT' },
    { id: 'spring' as const, label: 'Spring Boot ⚡', icon: Zap, badge: 'Sous le Capot' },
    { id: 'testing' as const, label: 'Tests & DevOps 🛡️', icon: Shield, badge: 'Testcontainers' },
    { id: 'microservices' as const, label: 'Microservices & Angular 🌐', icon: Layers, badge: 'Distribué' },
    { id: 'companies' as const, label: '14 Entreprises Maroc 🏢', icon: Building2, badge: 'Salaires & Hubs' },
    { id: 'videos' as const, label: 'Vidéos & Podcasts Darija 🎬', icon: Video, badge: 'Watchable' },
    { id: 'flashcards' as const, label: 'Cartes Mémo 🎴', icon: Brain, badge: 'Mémorisation' },
    { id: 'roadmap' as const, label: 'Plan 1 Mois & Coding Games 📅', icon: Calendar, badge: 'Défis Chrono' },
    { id: 'traps' as const, label: '20 Questions Pièges ⚠️', icon: AlertTriangle, badge: 'Lead Tech' },
    { id: 'cheatsheets' as const, label: 'Fiches Synthèse 📄', icon: BookOpen, badge: 'PDF Express' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>ACADÉMIE DE L'INGÉNIEUR EN DÉVELOPPEMENT DIGITAL & SYSTÈMES D'INFORMATION</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Masterclass Complète : Du Schéma à l'Entretien d'Embauche
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Un parcours méthodique structuré : <strong>Motivation</strong>, <strong>Workflow d'apprentissage</strong>, <strong>Schémas d'architecture</strong>, <strong>Vidéos & Podcasts d'experts marocains (GeeksBlaBla)</strong> intégrés, et préparation psychologique pour décrocher votre stage PFE et votre premier CDI d'ingénieur.
            </p>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg">
              🇲🇦
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-mono">Écosystème Tech</div>
              <div className="text-sm font-bold text-white">Casablanca, Rabat, Fès</div>
            </div>
          </div>
        </div>

        {/* Tab Selection Navigation (Wrapped, Clean, No Scrollbar) */}
        <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-slate-800">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 border border-indigo-500'
                    : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-indigo-700/60 text-indigo-100' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1 : LEARNING PATHWAY & WORKFLOW */}
      {activeTab === 'pathway' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Workflow Méthodologique & Organisation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Le Parcours en 6 Phases : Comment Apprendre Efficacement Sans Se Perdre
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Il y a énormément d'informations dans l'ingénierie logicielle. Le secret des meilleurs étudiants est de suivre un <strong>ordre strict</strong> : Ne commencez jamais par les microservices sans comprendre la mémoire vive !
            </p>
          </div>

          <div className="space-y-6">
            {learningPathwayStages.map((stage) => (
              <div 
                key={stage.id}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold font-mono text-sm">
                      0{stage.stageNumber}
                    </span>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white">{stage.title}</h4>
                      <p className="text-xs text-slate-400">{stage.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{stage.estimatedDuration}</span>
                    </span>
                  </div>
                </div>

                {/* Mindset Quote Banner */}
                <div className="p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-2xl flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <span className="text-xl shrink-0">💡</span>
                  <div className="italic">
                    "{stage.mindsetQuote}"
                  </div>
                </div>

                {/* Visual Architecture Diagram First */}
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-4 h-4" />
                    <span>Schéma d'Architecture & Flux Mental :</span>
                  </div>
                  <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-mono text-cyan-300 overflow-x-auto no-scrollbar">
                    <code>{stage.visualArchitectureDiagram}</code>
                  </pre>
                </div>

                {/* Key Concepts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stage.keyConcepts.map((kc, kIdx) => (
                    <div key={kIdx} className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2.5">
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="text-indigo-400 font-mono">#{kIdx + 1}</span>
                        <span>{kc.title}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {kc.description}
                      </p>
                      <div className="p-2.5 bg-rose-950/20 border border-rose-900/30 rounded-xl text-xs text-slate-300">
                        <strong className="text-rose-400">⚠️ Piège classique : </strong>
                        {kc.warningTrap}
                      </div>
                      <div className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Règle : {kc.engineeringRule}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Checklist */}
                <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl space-y-2">
                  <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Objectifs de validation de cette phase :</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {stage.actionChecklist.map((chk, cIdx) => (
                      <div key={cIdx} className="text-xs text-slate-300 flex items-start gap-1.5 p-2 bg-slate-900/60 rounded-xl">
                        <span className="text-indigo-400">•</span>
                        <span>{chk}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2 : COACH MANIFESTO & INTERVIEW PSYCHOLOGY */}
      {activeTab === 'manifesto' && (
        <div className="space-y-8">
          {/* Coach Manifesto Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 relative overflow-hidden shadow-2xl">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>LETTRE OUVERTE D'UN LEAD TECH AUX FUTURS LAURÉATS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {coachManifestoData.title}
              </h3>
              <p className="text-sm text-indigo-300 font-bold">
                {coachManifestoData.salutation}
              </p>
            </div>

            <div className="text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line space-y-4 bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
              {coachManifestoData.introManifesto}
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider">
                La Réalité du Marché du Travail au Maroc :
              </h4>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-5 rounded-2xl border border-slate-800 whitespace-pre-line">
                {coachManifestoData.theTruthAboutMoroccanRecruiters}
              </div>
            </div>

            {/* The 3 Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {coachManifestoData.theThreePillarsOfVictory.map((p, pIdx) => (
                <div key={pIdx} className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2.5">
                  <div className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-mono text-xs">
                      {pIdx + 1}
                    </span>
                    <span>{p.pillar}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {p.explanation}
                  </p>
                  <div className="text-xs font-mono text-emerald-400 pt-1">
                    ⚡ <em>{p.actionableHabit}</em>
                  </div>
                </div>
              ))}
            </div>

            {/* ROI Calculation Banner */}
            <div className="p-6 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <Coins className="w-5 h-5 text-emerald-400" />
                <span>{coachManifestoData.roiCalculation.title}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-400">
                  <strong className="text-slate-300 block mb-1">Sans préparation structurée :</strong>
                  {coachManifestoData.roiCalculation.withoutPreparation}
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 text-slate-200">
                  <strong className="text-emerald-400 block mb-1">Avec JPA Academy (1 mois discipliné) :</strong>
                  {coachManifestoData.roiCalculation.withDisciplinedPreparation}
                </div>
              </div>
              <div className="text-xs font-mono text-emerald-300 font-bold">
                Impact financier net : {coachManifestoData.roiCalculation.differenceDh}
              </div>
            </div>
          </div>

          {/* Psychological Interview Techniques */}
          <div className="space-y-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-400" />
                <span>Les 4 Techniques Psychologiques pour Dominer les Entretiens</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                La technique ne suffit pas. 50% de la réussite réside dans la gestion de l'interaction humaine avec le Lead Tech.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {interviewPsychologyTechniques.map((tech) => (
                <div key={tech.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-bold text-white">{tech.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Psychologie
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 italic">
                    Contexte : {tech.context}
                  </p>

                  <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-slate-300">
                    <strong className="text-indigo-300 block mb-1">🧠 L'état d'esprit Senior :</strong>
                    {tech.seniorMindset}
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <strong className="text-slate-400 block font-mono uppercase text-[10px]">Étapes de la méthode :</strong>
                    {tech.methodologySteps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-1.5">
                        <span className="text-indigo-400">•</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 bg-indigo-950/30 border border-indigo-500/30 rounded-xl text-xs text-indigo-200">
                    <strong className="text-indigo-300 block mb-1 font-mono">🗣️ Phrase exacte à prononcer (Script) :</strong>
                    <em>{tech.exactScriptOrPhrase}</em>
                  </div>

                  <div className="text-xs text-rose-400 bg-rose-950/20 p-2.5 rounded-xl border border-rose-900/30">
                    <strong>❌ Erreur de débutant : </strong> {tech.rookieMistake}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3 : JVM & RAM */}
      {activeTab === 'jvm' && (
        <TopicListRenderer 
          topics={jvmAndRamTopics} 
          expandedId={expandedTopicId} 
          onToggle={(id) => setExpandedTopicId(expandedTopicId === id ? null : id)}
          onCopy={copyToClipboard}
          copiedId={copiedCodeId}
        />
      )}

      {/* VIEW 4 : SPRING BOOT */}
      {activeTab === 'spring' && (
        <TopicListRenderer 
          topics={springBootTopics} 
          expandedId={expandedTopicId} 
          onToggle={(id) => setExpandedTopicId(expandedTopicId === id ? null : id)}
          onCopy={copyToClipboard}
          copiedId={copiedCodeId}
        />
      )}

      {/* VIEW 5 : TESTING & DEVOPS */}
      {activeTab === 'testing' && (
        <TopicListRenderer 
          topics={testingAndDevopsTopics} 
          expandedId={expandedTopicId} 
          onToggle={(id) => setExpandedTopicId(expandedTopicId === id ? null : id)}
          onCopy={copyToClipboard}
          copiedId={copiedCodeId}
        />
      )}

      {/* VIEW 6 : MICROSERVICES & ANGULAR */}
      {activeTab === 'microservices' && (
        <TopicListRenderer 
          topics={microservicesAndAngularTopics} 
          expandedId={expandedTopicId} 
          onToggle={(id) => setExpandedTopicId(expandedTopicId === id ? null : id)}
          onCopy={copyToClipboard}
          copiedId={copiedCodeId}
        />
      )}

      {/* VIEW 7 : 14 MOROCCAN COMPANIES */}
      {activeTab === 'companies' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              <span>Panorama des 14 Entreprises Majeures au Maroc (PFE & Premier CDI)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pour les élèves ingénieurs Bac+5 en Développement Digital & Systèmes d'Information : voici les grilles salariales réelles (2025/2026), les hubs d'implantation (Casablanca Nearshore, Technopolis Rabat, Fès Shore, Oujda), les étapes de sélection et les compétences clés recherchées.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {moroccanPfeCompanies.map((comp, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 space-y-4 transition-all shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">{comp.name}</h4>
                    <div className="text-xs text-indigo-400 font-medium flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{comp.city} • {comp.hub}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shrink-0">
                    Ouvert
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {comp.hiringScope}
                </p>

                {/* Salary Grids */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/80 border border-slate-800 rounded-2xl">
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">Stage PFE (Gratification)</div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-400">{comp.salaryPfe}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">Premier CDI Junior</div>
                    <div className="text-xs sm:text-sm font-bold text-indigo-300">{comp.salaryJuniorCdi}</div>
                  </div>
                </div>

                {/* Required Skills */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Compétences Clés :
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {comp.requiredSkills.map((sk, sIdx) => (
                      <span 
                        key={sIdx}
                        className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Selection Steps */}
                <div className="space-y-1 text-xs text-slate-300">
                  <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Processus de Recrutement :
                  </div>
                  {comp.selectionSteps.map((step, stIdx) => (
                    <div key={stIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                {/* Insider Advice */}
                <div className="p-3.5 bg-indigo-950/20 border border-indigo-500/30 rounded-2xl text-xs text-slate-200">
                  <div className="text-indigo-300 font-bold mb-1 flex items-center gap-1.5">
                    <span>💡</span> Conseil Recruteur :
                  </div>
                  {comp.insiderAdvice}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 8 : VIDEOS & MOROCCAN TECH PODCASTS (WATCHABLE EMBED) */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Video className="w-4 h-4" />
              <span>Vidéothèque & Podcasts d'Experts Marocains (GeeksBlaBla)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Regardez & Révisez Directement Dans la Plateforme
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Une sélection des meilleurs podcasts et conférences de référence en Darija et en Français pour comprendre le monde de l'ingénierie au Maroc, les stages PFE et les entretiens techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left : Embedded Responsive Video Player */}
            <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-indigo-400">{selectedVideo.showOrPodcast}</span>
                  <h4 className="text-lg font-bold text-white mt-0.5">{selectedVideo.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                    ⏱️ {selectedVideo.duration}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    {selectedVideo.language}
                  </span>
                </div>
              </div>

              {/* YouTube Player Responsive Container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Deep Dive Summary & Notes */}
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                  <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Résumé de la Session :
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedVideo.summary}
                  </p>
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                  <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                    Points Clés Abordés :
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedVideo.keyPointsCovered.map((kp, kpIdx) => (
                      <li key={kpIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-2xl text-xs text-slate-200">
                  <strong className="text-indigo-300 block mb-1">🎯 Pourquoi chaque futur ingénieur doit l'écouter :</strong>
                  {selectedVideo.whyEveryMoroccanEngineerMustWatch}
                </div>
              </div>
            </div>

            {/* Right : Playlist Selector */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider px-1">
                Sessions Disponibles ({moroccanTechVideos.length}) :
              </div>
              {moroccanTechVideos.map(vid => {
                const isSelected = selectedVideo.id === vid.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => setSelectedVideo(vid)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-900/20'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                      isSelected ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}>
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-mono text-indigo-400 font-semibold">{vid.badge}</span>
                        <span className="text-[10px] font-mono text-slate-400">{vid.duration}</span>
                      </div>
                      <div className="text-xs font-bold text-white truncate">{vid.title}</div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">{vid.showOrPodcast}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 9 : MEMORY FLASHCARDS (ANIMATED STUDY) */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Brain className="w-4 h-4" />
              <span>Méthode de Répétition Espacée & Mémorisation Active</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Cartes Mémo Interactives : Cliquez pour Découvrir la Réponse
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Testez votre mémoire instantanément. Essayez de formuler la réponse à voix haute avant de retourner chaque carte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memoryFlashcards.map((fc) => {
              const isFlipped = !!flippedCards[fc.id];
              return (
                <div
                  key={fc.id}
                  onClick={() => toggleFlashcard(fc.id)}
                  className={`min-h-[280px] p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl relative select-none ${
                    isFlipped
                      ? 'bg-slate-900 border-indigo-500 shadow-indigo-950/40'
                      : 'bg-slate-950/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                      {fc.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{isFlipped ? 'Voir Question' : 'Dévoiler'}</span>
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="my-auto py-4">
                    {!isFlipped ? (
                      <div className="space-y-3">
                        <div className="text-sm sm:text-base font-bold text-white leading-snug">
                          {fc.frontQuestion}
                        </div>
                        <div className="text-xs text-slate-400 italic">
                          Indice : {fc.frontHint}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 animate-fadeIn">
                        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {fc.backCoreConcept}
                        </div>
                        {fc.backDiagramAscii && (
                          <pre className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-[10px] font-mono text-cyan-300 overflow-x-auto no-scrollbar">
                            <code>{fc.backDiagramAscii}</code>
                          </pre>
                        )}
                        <div className="text-[11px] font-mono text-emerald-400 pt-1">
                          💎 Règle d'or : {fc.backSeniorRule}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer hint */}
                  <div className="text-[10px] font-mono text-slate-500 text-center border-t border-slate-800/80 pt-2">
                    Cliquez sur la carte pour {isFlipped ? 'la retourner' : 'voir la solution'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 10 : 1-MONTH ROADMAP & CODING GAMES */}
      {activeTab === 'roadmap' && (
        <div className="space-y-8">
          {/* Week Selector */}
          <div className="flex flex-wrap gap-3">
            {oneMonthRoadmap.map(plan => (
              <button
                key={plan.weekNumber}
                onClick={() => setSelectedRoadmapWeek(plan.weekNumber)}
                className={`flex-1 min-w-[200px] p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedRoadmapWeek === plan.weekNumber
                    ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-900/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-mono text-indigo-400 mb-1">SEMAINE {plan.weekNumber}</div>
                <div className="text-sm font-bold text-white truncate">{plan.title.split(':')[1]}</div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-1">{plan.focus}</div>
              </button>
            ))}
          </div>

          {/* Active Week Content */}
          {(() => {
            const plan = oneMonthRoadmap.find(w => w.weekNumber === selectedRoadmapWeek) || oneMonthRoadmap[0];
            return (
              <div className="space-y-6">
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Semaine {plan.weekNumber} sur 4
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-2">{plan.title}</h3>
                    <p className="text-sm text-slate-300 mt-1">{plan.focus}</p>
                  </div>

                  {/* Daily Schedule Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {plan.dailySchedule.map((ds, idx) => (
                      <div key={idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-indigo-400">{ds.day}</span>
                          <span className="text-xs font-bold text-white">{ds.goal}</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {ds.tasks.map((t, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2">
                              <span className="text-slate-500">•</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Coding Game Challenge Card */}
                  <div className="p-6 bg-slate-950 border border-indigo-500/40 rounded-2xl space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Terminal className="w-4 h-4" />
                          <span>Défi Coding Game de la Semaine</span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1">{plan.codingGameChallenge.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          {plan.codingGameChallenge.difficulty}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 text-slate-300">
                          ⏱️ {plan.codingGameChallenge.timeLimitMinutes} min
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {plan.codingGameChallenge.description}
                    </p>

                    {/* Starter Code */}
                    <div className="space-y-1.5">
                      <div className="text-xs text-slate-400 font-mono">Code de départ (À compléter) :</div>
                      <pre className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto no-scrollbar">
                        <code>{plan.codingGameChallenge.starterCode}</code>
                      </pre>
                    </div>

                    {/* Reveal Solution Button */}
                    <div>
                      <button
                        onClick={() => setRevealedSolutionId(revealedSolutionId === plan.title ? null : plan.title)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Code2 className="w-4 h-4" />
                        <span>{revealedSolutionId === plan.title ? 'Masquer la Solution' : 'Dévoiler la Solution Optimale'}</span>
                      </button>
                    </div>

                    {/* Solution Code */}
                    {revealedSolutionId === plan.title && (
                      <div className="space-y-1.5 pt-2 animate-fadeIn">
                        <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Solution en O(N) attendue par le recruteur :</span>
                        </div>
                        <pre className="p-3.5 bg-slate-900 border border-emerald-500/40 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto no-scrollbar">
                          <code>{plan.codingGameChallenge.solutionCode}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* VIEW 11 : 20 TRAP QUESTIONS */}
      {activeTab === 'traps' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Les Questions Pièges Clés des Entretiens Techniques</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Ces questions sont conçues par les Lead Techs pour faire trébucher les candidats qui ont appris par cœur sans comprendre les mécanismes physiques sous-jacents. Voici exactement comment y répondre.
            </p>
          </div>

          <div className="space-y-4">
            {topTrapQuestions.map((trap, idx) => (
              <div 
                key={trap.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-xs">
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">{trap.topic}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {trap.companyTarget}
                    </span>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono ${
                    trap.difficulty === 'Senior'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : trap.difficulty === 'Confirmé'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    Niveau {trap.difficulty}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-white">
                  {trap.question}
                </h4>

                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300">
                  <strong className="text-amber-400">⚠️ Le Piège Caché : </strong>
                  {trap.theTrap}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xl text-slate-300">
                    <strong className="text-rose-400 block mb-1.5 font-bold">❌ Ce que répond un débutant (Échec) :</strong>
                    {trap.rookieMistake}
                  </div>
                  <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-slate-200">
                    <strong className="text-emerald-400 block mb-1.5 font-bold">✅ La Réponse Modèle Senior (Succès) :</strong>
                    {trap.seniorModelAnswer}
                  </div>
                </div>

                {trap.codeIllustration && (
                  <pre className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto no-scrollbar">
                    <code>{trap.codeIllustration}</code>
                  </pre>
                )}

                <div className="text-xs font-mono text-indigo-300 flex items-center gap-1.5 pt-1">
                  <span className="text-amber-400">💎</span> Règle d'or : <strong>{trap.goldenRule}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 12 : CHEAT SHEETS & PDF READER */}
      {activeTab === 'cheatsheets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left List of Cheat Sheets */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider px-1">
                Fiches de Synthèse Disponibles :
              </div>
              {cheatSheetDocs.map(cs => {
                const isSelected = selectedCheatSheet.id === cs.id;
                return (
                  <button
                    key={cs.id}
                    onClick={() => setSelectedCheatSheet(cs)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-900/20'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-mono text-indigo-400 mb-1">{cs.category}</div>
                    <div className="text-sm font-bold text-white">{cs.title}</div>
                    <div className="text-xs text-slate-400 mt-1">Lecture : {cs.readTime}</div>
                  </button>
                );
              })}
            </div>

            {/* Right Document Preview Reader */}
            <div className="md:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-indigo-400">{selectedCheatSheet.category}</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{selectedCheatSheet.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{selectedCheatSheet.summary}</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-slate-700"
                >
                  <span>🖨️ Imprimer / PDF</span>
                </button>
              </div>

              {/* Document Markdown Content */}
              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
                <div className="whitespace-pre-wrap font-sans">
                  {selectedCheatSheet.contentMarkdown}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component for rendering deep dive topics with Problem Before vs Solution After
const TopicListRenderer: React.FC<{
  topics: KnowledgeTopic[];
  expandedId: string | null;
  onToggle: (id: string) => void;
  onCopy: (code: string, id: string) => void;
  copiedId: string | null;
}> = ({ topics, expandedId, onToggle, onCopy, copiedId }) => {
  return (
    <div className="space-y-6">
      {topics.map(topic => {
        const isExpanded = expandedId === topic.id;
        return (
          <div 
            key={topic.id}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden transition-all shadow-xl"
          >
            {/* Header Accordion Bar */}
            <div 
              onClick={() => onToggle(topic.id)}
              className="p-6 cursor-pointer hover:bg-slate-800/40 transition-colors flex items-start justify-between gap-4 select-none"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {topic.badge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {topic.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {topic.subtitle}
                </p>
              </div>

              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 shrink-0">
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {/* Expanded Content Body */}
            {isExpanded && (
              <div className="p-6 sm:p-8 border-t border-slate-800/80 bg-slate-950/40 space-y-6 animate-fadeIn">
                {/* Summary */}
                <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                  {topic.summary}
                </p>

                {/* Problem Before vs Solution After */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-rose-950/20 border border-rose-900/40 rounded-2xl space-y-2">
                    <div className="text-rose-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Le Problème Historique / Sans Cette Notion :</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {topic.problemBefore}
                    </p>
                  </div>

                  <div className="p-5 bg-emerald-950/20 border border-emerald-900/40 rounded-2xl space-y-2">
                    <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>La Solution & L'Approche Industrielle :</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {topic.solutionAfter}
                    </p>
                  </div>
                </div>

                {/* Deep Dive Sections */}
                <div className="space-y-6 pt-2">
                  <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                    Schémas Visuels & Analyse Détaillée :
                  </h4>

                  {topic.deepDive.map((section, sIdx) => (
                    <div key={sIdx} className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
                      <div className="text-base font-bold text-white flex items-center gap-2">
                        <span className="text-indigo-400 font-mono">#{sIdx + 1}</span>
                        <span>{section.sectionTitle}</span>
                      </div>

                      {/* Visual Diagram First */}
                      {section.diagramAscii && (
                        <div className="overflow-x-auto no-scrollbar">
                          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 leading-tight">
                            <code>{section.diagramAscii}</code>
                          </pre>
                        </div>
                      )}

                      <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </div>

                      {/* Optional Code Snippet with Copy */}
                      {section.codeSnippet && (
                        <div className="relative group">
                          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto no-scrollbar">
                            <code>{section.codeSnippet}</code>
                          </pre>
                          <button
                            onClick={() => onCopy(section.codeSnippet!, `${topic.id}-${sIdx}`)}
                            className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                            title="Copier le code"
                          >
                            {copiedId === `${topic.id}-${sIdx}` ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      )}

                      <div className="text-xs text-indigo-300 font-mono bg-indigo-950/20 p-2.5 rounded-xl border border-indigo-900/30">
                        ⚡ <strong>Ce qu'il faut retenir :</strong> {section.keyTakeaway}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trap Question Accordion */}
                <div className="p-5 bg-slate-950 border border-amber-500/30 rounded-2xl space-y-3">
                  <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>La Question Piège Classique Posée en Entretien :</span>
                  </div>

                  <div className="text-sm font-bold text-white">
                    {topic.trapQuestion.question}
                  </div>

                  <div className="text-xs text-slate-400">
                    <em>Pourquoi le recruteur pose cette question :</em> {topic.trapQuestion.whyRecruiterAsks}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-3 bg-rose-950/20 border border-rose-900/30 rounded-xl text-slate-300">
                      <strong className="text-rose-400 block mb-1">❌ Réponse de Débutant :</strong>
                      {topic.trapQuestion.rookieAnswer}
                    </div>
                    <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-xl text-slate-200">
                      <strong className="text-emerald-400 block mb-1">✅ Réponse Modèle Senior :</strong>
                      {topic.trapQuestion.seniorAnswer}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
