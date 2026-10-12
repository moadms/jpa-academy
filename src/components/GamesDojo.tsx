'use client';

import React, { useState } from 'react';
import { codeFillGames, bugHunterGames, lifecycleSteps } from '@/data/games';
import { Gamepad2, Sparkles, CheckCircle2, XCircle, RefreshCw, Zap, ShieldAlert, ArrowUpDown, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GamesDojo: React.FC = () => {
  const [activeGameMode, setActiveGameMode] = useState<'codeFill' | 'bugHunter' | 'lifecycle'>('codeFill');

  // Code Fill state
  const [codeFillIndex, setCodeFillIndex] = useState(0);
  const [codeFillSelected, setCodeFillSelected] = useState<string | null>(null);
  const [codeFillFeedback, setCodeFillFeedback] = useState<boolean | null>(null);

  // Bug Hunter state
  const [bugIndex, setBugIndex] = useState(0);
  const [bugSelected, setBugSelected] = useState<number | null>(null);

  // Lifecycle state
  const [currentOrder, setCurrentOrder] = useState([...lifecycleSteps]);
  const [lifecycleChecked, setLifecycleChecked] = useState(false);

  // Handle Code Fill
  const handleSelectCodeFill = (choice: string) => {
    setCodeFillSelected(choice);
    const isCorrect = choice === codeFillGames[codeFillIndex].correctAnswer;
    setCodeFillFeedback(isCorrect);
    if (isCorrect) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  const nextCodeFill = () => {
    if (codeFillIndex < codeFillGames.length - 1) {
      setCodeFillIndex(prev => prev + 1);
      setCodeFillSelected(null);
      setCodeFillFeedback(null);
    } else {
      setCodeFillIndex(0);
      setCodeFillSelected(null);
      setCodeFillFeedback(null);
    }
  };

  // Move lifecycle step
  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newItems = [...currentOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setCurrentOrder(newItems);
    setLifecycleChecked(false);
  };

  const checkLifecycleOrder = () => {
    const isPerfect = currentOrder.every((item, idx) => item.order === idx + 1);
    setLifecycleChecked(true);
    if (isPerfect) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-6">
      {/* Game Mode Selector */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {[
          { id: 'codeFill', label: '🎮 Défi 1 : Complétion de Code', icon: Zap },
          { id: 'bugHunter', label: '🐛 Défi 2 : Chasseur de Pièges', icon: ShieldAlert },
          { id: 'lifecycle', label: '🔄 Défi 3 : Cycle de Vie Ninja', icon: ArrowUpDown }
        ].map(mode => {
          const Icon = mode.icon;
          const isActive = activeGameMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveGameMode(mode.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/30 scale-105'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* GAME 1 : CODE COMPLETION */}
      {activeGameMode === 'codeFill' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">🥷</span>
              <div>
                <h3 className="font-extrabold text-white text-lg">
                  {codeFillGames[codeFillIndex].title}
                </h3>
                <span className="text-xs text-purple-400 font-mono">
                  Difficulté : {codeFillGames[codeFillIndex].difficulty}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-400">
              {codeFillIndex + 1} / {codeFillGames.length}
            </span>
          </div>

          <p className="text-sm text-slate-300 mb-4">
            {codeFillGames[codeFillIndex].description}
          </p>

          {/* Code snippet with highlighted blank */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-slate-300 mb-6 overflow-x-auto">
            <pre>
              {codeFillGames[codeFillIndex].templateCode.split('{{BLANK}}').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-lg border border-purple-500/50 font-bold mx-1 animate-pulse">
                      {codeFillSelected || '??? (Choisis ci-dessous)'}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </pre>
          </div>

          {/* Choices Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {codeFillGames[codeFillIndex].choices.map((choice, i) => {
              const isSelected = codeFillSelected === choice;
              const isCorrect = choice === codeFillGames[codeFillIndex].correctAnswer;

              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-purple-500';
              if (codeFillFeedback !== null) {
                if (isCorrect) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500';
                else if (isSelected && !isCorrect) btnStyle = 'bg-rose-950 border-rose-500 text-rose-200 ring-2 ring-rose-500';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelectCodeFill(choice)}
                  disabled={codeFillFeedback !== null}
                  className={`p-3.5 rounded-xl border text-center font-mono font-bold text-sm transition-all cursor-pointer ${btnStyle}`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {codeFillFeedback !== null && (
            <div className={`p-4 rounded-xl text-xs mb-4 border ${
              codeFillFeedback ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}>
              <div className="font-bold mb-1 flex items-center gap-1.5">
                {codeFillFeedback ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                {codeFillFeedback ? 'Excellente réponse ninja !' : 'Oups, ce n’est pas le bon mot-clé !'}
              </div>
              <p>{codeFillGames[codeFillIndex].explanation}</p>
            </div>
          )}

          {codeFillFeedback !== null && (
            <button
              onClick={nextCodeFill}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-sm transition-all cursor-pointer"
            >
              Défi Suivant
            </button>
          )}
        </div>
      )}

      {/* GAME 2 : BUG HUNTER */}
      {activeGameMode === 'bugHunter' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">🕵️</span>
              <h3 className="font-extrabold text-white text-lg">
                {bugHunterGames[bugIndex].title}
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              {bugIndex + 1} / {bugHunterGames.length}
            </span>
          </div>

          <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-2xl mb-4 text-xs text-amber-200">
            <strong>Scénario :</strong> {bugHunterGames[bugIndex].scenario}
          </div>

          {/* Suspicious code */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-rose-900/40 text-xs font-mono text-rose-300 mb-6 overflow-x-auto">
            <pre>{bugHunterGames[bugIndex].buggyCode}</pre>
          </div>

          <h4 className="font-bold text-sm text-white mb-3">
            {bugHunterGames[bugIndex].question}
          </h4>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {bugHunterGames[bugIndex].options.map((opt, i) => {
              const isSelected = bugSelected === i;
              let style = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-pink-500';
              if (bugSelected !== null) {
                if (opt.isBug) style = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                else if (isSelected && !opt.isBug) style = 'bg-rose-950 border-rose-500 text-rose-200';
                else style = 'opacity-40 border-slate-900';
              }

              return (
                <button
                  key={i}
                  onClick={() => {
                    setBugSelected(i);
                    if (opt.isBug) confetti({ particleCount: 60, spread: 60 });
                  }}
                  disabled={bugSelected !== null}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${style}`}
                >
                  <div>{opt.text}</div>
                  {bugSelected !== null && isSelected && (
                    <div className="mt-2 text-xs opacity-90 font-normal border-t border-slate-700/50 pt-2">
                      {opt.explanation}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {bugSelected !== null && (
            <button
              onClick={() => {
                setBugIndex(prev => (prev + 1) % bugHunterGames.length);
                setBugSelected(null);
              }}
              className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl text-sm transition-all cursor-pointer"
            >
              Affronter le Piège Suivant
            </button>
          )}
        </div>
      )}

      {/* GAME 3 : LIFECYCLE MASTER */}
      {activeGameMode === 'lifecycle' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="font-extrabold text-white text-xl flex items-center justify-center gap-2">
              <ArrowUpDown className="w-5 h-5 text-purple-400" />
              <span>Ordonne le Cycle de Vie d'une Entité</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Réorganise les étapes dans le bon ordre chronologique du cycle de persistance JPA (de l'instanciation à la suppression).
            </p>
          </div>

          <div className="space-y-2.5 mb-6">
            {currentOrder.map((step, idx) => (
              <div
                key={step.id}
                className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs sm:text-sm text-slate-200"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-600/30 text-purple-300 font-bold flex items-center justify-center text-xs">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-white">{step.title}</div>
                    <div className="text-[11px] text-slate-400">{step.description}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveStep(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300 cursor-pointer"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveStep(idx, 'down')}
                    disabled={idx === currentOrder.length - 1}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-slate-300 cursor-pointer"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={checkLifecycleOrder}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-bold text-sm text-white transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
          >
            Vérifier Mon Ordre Chronologique
          </button>

          {lifecycleChecked && (
            <div className={`mt-4 p-4 rounded-xl text-center text-xs font-bold ${
              currentOrder.every((item, idx) => item.order === idx + 1)
                ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-300'
                : 'bg-rose-950/60 border border-rose-500 text-rose-300'
            }`}>
              {currentOrder.every((item, idx) => item.order === idx + 1)
                ? '🎉 FÉLICITATIONS ! Ton ordre chronologique est parfait, tu maîtrises le cycle de vie JPA !'
                : '⚠️ Il y a encore des étapes mal placées dans l’ordre du cycle. Réessaye avec les flèches !'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
