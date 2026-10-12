'use client';

import React, { useState } from 'react';
import { quizzes } from '@/data/quizzes';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle2, XCircle, Sparkles, RefreshCw, ArrowRight, Award } from 'lucide-react';

export const QuizArena: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = quizzes[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const percentage = Math.round((score / quizzes.length) * 100);
    let rank = 'Genin du Code';
    if (percentage >= 90) rank = 'Hokage du JPA 👑';
    else if (percentage >= 70) rank = 'Jonin des Entités ⚔️';
    else if (percentage >= 50) rank = 'Chunin du Mapping 🛡️';

    return (
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-8 sm:p-12 text-center text-white max-w-xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="w-20 h-20 bg-gradient-to-tr from-yellow-500 to-amber-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/30">
          <Trophy className="w-10 h-10 text-slate-950" />
        </div>
        <h3 className="text-3xl font-extrabold mb-2">Examen QCM Terminé !</h3>
        <p className="text-slate-400 text-sm mb-6">Voici le bilan de ton entraînement ninja JPA</p>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 mb-6">
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-2">
            {percentage}%
          </div>
          <div className="text-sm text-slate-300">
            {score} sur {quizzes.length} questions correctes
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-sm font-bold text-amber-300">
            <Award className="w-4 h-4" /> Rang Obtenu : <span className="text-white">{rank}</span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mx-auto transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> Recommencer l'Arène des QCMs
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl max-w-3xl mx-auto">
      {/* Progress & Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div>
          <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            {currentQ.labTitle}
          </span>
          <div className="text-xs text-slate-400 mt-1">
            Question {currentQuestionIndex + 1} sur {quizzes.length}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Score Actuel</div>
          <div className="text-lg font-black text-emerald-400">{score} pts</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-6 border border-slate-800">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / quizzes.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
        {currentQ.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((opt, idx) => {
          const isCorrect = idx === currentQ.correctAnswerIndex;
          const isSelected = selectedAnswer === idx;

          let btnClass = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-purple-500/50 hover:bg-slate-800/60';
          if (isAnswered) {
            if (isCorrect) {
              btnClass = 'border-emerald-500 bg-emerald-950/50 text-emerald-200 ring-2 ring-emerald-500';
            } else if (isSelected) {
              btnClass = 'border-rose-500 bg-rose-950/50 text-rose-200 ring-2 ring-rose-500';
            } else {
              btnClass = 'border-slate-900 bg-slate-950/30 text-slate-600 opacity-50';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base font-medium flex items-center justify-between transition-all duration-200 cursor-pointer ${btnClass}`}
            >
              <span>{opt}</span>
              {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {isAnswered && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 mb-6 animate-fadeIn">
          <div className="flex items-center gap-2 text-sm font-bold text-purple-300">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Explication Didactique</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentQ.explanation}
          </p>
          <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-xl text-xs text-purple-200">
            <strong>💡 Conseil Pro :</strong> {currentQ.proTip}
          </div>
        </div>
      )}

      {/* Next Button */}
      {isAnswered && (
        <button
          onClick={handleNextQuestion}
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
        >
          <span>{currentQuestionIndex < quizzes.length - 1 ? 'Question Suivante' : 'Voir mon Bilan Final'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
