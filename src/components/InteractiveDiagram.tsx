'use client';

import React, { useState } from 'react';
import { Layers, Database, ArrowRight, ShieldCheck, Zap, AlertTriangle, RefreshCw } from 'lucide-react';

interface DiagramProps {
  type: 'lifecycle' | 'relation' | 'cache' | 'inheritance' | 'locking';
}

export const InteractiveDiagram: React.FC<DiagramProps> = ({ type }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  if (type === 'lifecycle') {
    return (
      <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
            <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Cycle de Vie d'une Entité JPA</span>
          </div>
          <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/40">
            Interactif • Clique sur les étapes
          </span>
        </div>

        {/* Lifecycle States Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
          {[
            {
              id: 0,
              title: "NEW / TRANSIENT",
              color: "border-slate-500/50 bg-slate-800/60 text-slate-300",
              activeColor: "border-slate-400 bg-slate-700 text-white ring-2 ring-slate-400",
              desc: "new Salle() • Simple objet en RAM, ignoré par la base et sans ID."
            },
            {
              id: 1,
              title: "MANAGED",
              color: "border-emerald-500/50 bg-emerald-950/40 text-emerald-300",
              activeColor: "border-emerald-400 bg-emerald-900/80 text-white ring-2 ring-emerald-400 shadow-lg shadow-emerald-500/20",
              desc: "em.persist() • Surveillé par le Contexte de Persistance (L1 Cache). Les modifications seront envoyées en base !"
            },
            {
              id: 2,
              title: "DETACHED",
              color: "border-amber-500/50 bg-amber-950/40 text-amber-300",
              activeColor: "border-amber-400 bg-amber-900/80 text-white ring-2 ring-amber-400 shadow-lg shadow-amber-500/20",
              desc: "em.close() ou em.detach() • Objet toujours en mémoire mais Hibernate ne suit plus ses changements."
            },
            {
              id: 3,
              title: "REMOVED",
              color: "border-rose-500/50 bg-rose-950/40 text-rose-300",
              activeColor: "border-rose-400 bg-rose-900/80 text-white ring-2 ring-rose-400 shadow-lg shadow-rose-500/20",
              desc: "em.remove() • Marqué pour destruction physique. DELETE SQL envoyé au prochain commit."
            }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                activeStep === s.id ? s.activeColor : s.color
              }`}
            >
              <div className="text-xs font-mono font-bold tracking-wider mb-1">{s.title}</div>
              <p className="text-xs leading-relaxed opacity-90">{s.desc}</p>
            </button>
          ))}
        </div>

        {/* Visual pipeline representation */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="font-semibold text-slate-400">new Entity()</span>
          <ArrowRight className="w-4 h-4 text-indigo-400" />
          <span className="font-mono bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded border border-indigo-500/30">em.persist()</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-emerald-400 font-bold">MANAGED</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
          <span className="font-mono bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded border border-amber-500/30">em.close()</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-amber-400 font-bold">DETACHED</span>
          <ArrowRight className="w-4 h-4 text-cyan-400" />
          <span className="font-mono bg-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded border border-cyan-500/30">em.merge()</span>
        </div>
      </div>
    );
  }

  if (type === 'cache') {
    return (
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg">
            <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span>Architecture du Cache L1 vs Cache L2</span>
          </div>
          <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/40">
            Performance x100
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          {/* L1 Cache */}
          <div className="p-4 rounded-xl border border-blue-500/40 bg-blue-950/30">
            <div className="flex items-center gap-2 text-blue-300 font-bold mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
              <span>Cache L1 (Session)</span>
            </div>
            <p className="text-xs text-slate-300 mb-2">
              Attaché à <strong>1 seul EntityManager</strong>. Automatique, impossible à désactiver.
            </p>
            <div className="text-[11px] font-mono bg-slate-900/80 p-2 rounded text-blue-200">
              em.find(Salle.class, 1L);<br />
              // 2ème appel = 0 requête SQL !
            </div>
          </div>

          {/* L2 Cache */}
          <div className="p-4 rounded-xl border border-purple-500/40 bg-purple-950/30">
            <div className="flex items-center gap-2 text-purple-300 font-bold mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <span>Cache L2 (Partagé)</span>
            </div>
            <p className="text-xs text-slate-300 mb-2">
              Attaché à la <strong>SessionFactory</strong>. Partagé entre TOUS les utilisateurs.
            </p>
            <div className="text-[11px] font-mono bg-slate-900/80 p-2 rounded text-purple-200">
              @Cacheable<br />
              @Cache(usage = READ_WRITE)
            </div>
          </div>

          {/* Database */}
          <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-300 font-bold mb-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Base SQL Physique</span>
              </div>
              <p className="text-xs text-slate-300">
                Disque dur physique (H2 / MySQL / Postgres). Les requêtes sont lentes et coûteuses.
              </p>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded text-center mt-2 border border-emerald-500/20">
              Épargnée par les caches !
            </span>
          </div>
        </div>

        <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-xl text-xs text-cyan-200 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
          <span>
            <strong>Règle d'or :</strong> Si l'entité est trouvée dans L1, on retourne l'instance. Sinon on vérifie L2. Si absente, requête SQL puis mise en cache automatique !
          </span>
        </div>
      </div>
    );
  }

  if (type === 'locking') {
    return (
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>Verrouillage Optimiste (@Version) contre Collision</span>
          </div>
          <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/40">
            Sécurité Concurrente
          </span>
        </div>

        <div className="relative border-l-2 border-amber-500/40 ml-4 pl-6 space-y-6 my-6">
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-slate-950"></div>
            <div className="font-bold text-amber-300 text-sm">Étape 1 : Lecture Concurrente</div>
            <p className="text-xs text-slate-300">
              Naruto et Sasuke lisent en même temps la Salle 10. Elle a <code>version = 1</code>.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950"></div>
            <div className="font-bold text-emerald-300 text-sm">Étape 2 : Naruto valide en premier (Commit)</div>
            <p className="text-xs text-slate-300">
              UPDATE salle SET nom = 'Dojo', version = 2 WHERE id = 10 AND version = 1;<br />
              <span className="text-emerald-400 font-semibold">1 ligne mise à jour. SUCCÈS ! La version passe à 2.</span>
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-slate-950 animate-ping"></div>
            <div className="font-bold text-rose-400 text-sm">Étape 3 : Sasuke tente de valider avec version = 1</div>
            <p className="text-xs text-slate-300">
              UPDATE salle SET capacite = 30, version = 2 WHERE id = 10 AND version = 1;<br />
              <span className="text-rose-400 font-bold">0 ligne mise à jour car version vaut désormais 2 en base !</span>
            </p>
            <div className="mt-2 p-2.5 bg-rose-950/60 border border-rose-500/50 rounded-lg text-xs font-mono text-rose-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>javax.persistence.OptimisticLockException levée immédiatement !</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback / Inheritance
  return (
    <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center gap-2 text-purple-400 font-bold text-lg mb-4">
        <Layers className="w-5 h-5 text-purple-400" />
        <span>Les 3 Stratégies d'Héritage JPA</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
          <div className="font-bold text-purple-300 text-sm mb-1">SINGLE_TABLE (Défaut)</div>
          <p className="text-slate-400 mb-2">1 seule table pour toute la famille. Colonne @DiscriminatorColumn obligatoire.</p>
          <span className="text-emerald-400 font-medium">⚡ Ultra rapide (pas de jointure)</span>
          <span className="block text-rose-400 font-medium mt-1">⚠️ Colonnes NULL obligatoires</span>
        </div>
        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
          <div className="font-bold text-purple-300 text-sm mb-1">JOINED</div>
          <p className="text-slate-400 mb-2">1 table mère + 1 table par classe fille avec la même clé primaire partagée.</p>
          <span className="text-emerald-400 font-medium">✨ Base propre et normalisée</span>
          <span className="block text-rose-400 font-medium mt-1">⚠️ Jointures SQL obligatoires</span>
        </div>
        <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
          <div className="font-bold text-purple-300 text-sm mb-1">TABLE_PER_CLASS</div>
          <p className="text-slate-400 mb-2">Chaque classe concrète a sa propre table indépendante qui duplique les colonnes.</p>
          <span className="text-emerald-400 font-medium">📦 Autonomie complète</span>
          <span className="block text-rose-400 font-medium mt-1">⚠️ Requêtes polymorphiques UNION lentes</span>
        </div>
      </div>
    </div>
  );
};
