/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useDailyHabit } from '../context/DailyHabitContext.tsx';
import { Compass, PlaySquare, ShoppingBag, Wallet, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentRoute, navigateTo } = useDailyHabit();

  const navItems = [
    { id: 'home', label: 'Feed', icon: Compass },
    { id: 'reels', label: 'Reels', icon: PlaySquare },
    { id: 'shop', label: 'AI Shop', icon: ShoppingBag },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentRoute === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
              isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400 scale-110' : ''}`} />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
