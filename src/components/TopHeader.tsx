'use client';

import React from 'react';
import { Menu, Sparkles, GitBranch, Award } from 'lucide-react';

interface TopHeaderProps {
  activeTitle: string;
  onOpenMobileSidebar: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ activeTitle, onOpenMobileSidebar }) => {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger toggle */}
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
            JPA ACADEMY • ESPACE D'APPRENTISSAGE
          </div>
          <h1 className="text-sm sm:text-base font-black text-white truncate max-w-[240px] sm:max-w-md">
            {activeTitle}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="https://github.com/moadms/jpa-academy"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 font-mono transition-all"
        >
          <GitBranch className="w-4 h-4" />
          <span>moadms/jpa-academy</span>
        </a>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span className="hidden sm:inline">PRO 3D EDITION</span>
          <span className="sm:hidden">PRO</span>
        </div>
      </div>
    </header>
  );
};
