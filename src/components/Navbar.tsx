/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDailyHabit } from '../context/DailyHabitContext.tsx';
import {
  Sparkles,
  Coins,
  Wallet,
  Bell,
  ShieldCheck,
  UserCheck,
  Menu,
  X,
  Compass,
  PlaySquare,
  ShoppingBag,
  User,
  LogOut,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    currentRole,
    switchRole,
    currentUser,
    notifications,
    unreadNotificationsCount,
    markNotificationsAsRead,
    setIsAssistantOpen,
  } = useDailyHabit();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Prototype Guardrail Notice */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 border-b border-cyan-500/20 px-4 py-1.5 text-center text-[11px] font-mono tracking-wide text-cyan-300/90 flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>DAILYHABIT PHASE 1B PROTOTYPE</span>
        <span className="text-slate-500">·</span>
        <span className="text-amber-400/90 font-medium">SIMULATED / DEMO DATA ONLY</span>
        <span className="text-slate-500">·</span>
        <span className="text-slate-400 hidden sm:inline">ZERO-BILLING SAFETY BOUNDARY ACTIVE</span>
      </div>

      {/* Main Top Bar Contract: 3 Zones (Brand, Nav Links, Primary Action/Status) */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 text-left shrink-0 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-lg font-display font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                DAILYHABIT
              </span>
              <span className="text-[10px] font-mono tracking-wider text-cyan-400/70 block -mt-1 uppercase">
                AI Social & Commerce
              </span>
            </div>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => navigateTo('home')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentRoute === 'home' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              <Compass className="w-4 h-4" />
              Feed
            </button>
            <button
              onClick={() => navigateTo('reels')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentRoute === 'reels' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              <PlaySquare className="w-4 h-4" />
              Reels
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentRoute === 'shop' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              AI Shop
            </button>
            <button
              onClick={() => navigateTo('wallet')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentRoute === 'wallet' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              <Wallet className="w-4 h-4" />
              Dual Wallet
            </button>
            <button
              onClick={() => navigateTo('profile')}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentRoute === 'profile' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={() => navigateTo('adminassitant')}
              className={`hover:text-violet-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded bg-violet-950/40 border border-violet-500/30 ${
                currentRoute === 'adminassitant' ? 'text-violet-300 border-violet-400' : 'text-violet-400'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Assistant Queue (Demo)
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className={`hover:text-pink-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded bg-pink-950/40 border border-pink-500/30 ${
                currentRoute === 'admin' ? 'text-pink-300 border-pink-400' : 'text-pink-400'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Main Admin (Demo)
            </button>
          </nav>

          {/* Zone 3: Dual-Balance Pill, Assistant Trigger & Notifications */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Dual Wallet Quick Pill (AIC + AIPM) */}
            <button
              onClick={() => navigateTo('wallet')}
              className="hidden sm:flex items-center gap-3 bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-lg px-3 py-1.5 transition-all text-xs"
              title="View Dual Wallet (AI Coins & AI Pocket Money)"
            >
              <div className="flex items-center gap-1.5 text-cyan-300 font-mono">
                <Coins className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold">{currentUser.wallets.aiCoinsBalance}</span>
                <span className="text-[10px] text-slate-400 uppercase">AIC</span>
              </div>
              <div className="w-px h-3.5 bg-slate-700" />
              <div className="flex items-center gap-1.5 text-emerald-300 font-mono">
                <span className="font-semibold">
                  ₱{(currentUser.wallets.aiPocketMoneyCentavos / 100).toLocaleString('en-PH', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-[10px] text-slate-400 uppercase">AIPM</span>
              </div>
            </button>

            {/* AI Assistant Floating Trigger Button */}
            <button
              onClick={() => setIsAssistantOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg px-3 py-1.5 text-xs font-medium shadow-md shadow-cyan-500/20 transition-transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  if (!isNotifOpen) markNotificationsAsRead();
                }}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Drawer */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                    <span className="text-[10px] text-slate-400 font-mono">Real-time Simulation</span>
                  </div>
                  <div className="divide-y divide-slate-800/60 max-h-64 overflow-y-auto mt-1">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2.5 px-1 text-left">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-cyan-300">{n.title}</p>
                          <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Demo Role Switcher */}
            <div className="relative hidden md:block">
              <select
                value={currentRole}
                onChange={(e) => switchRole(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 hover:border-cyan-500 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono cursor-pointer"
              >
                <option value="USER">Role: Creator</option>
                <option value="ADMIN_ASSISTANT">Role: Assistant</option>
                <option value="MAIN_ADMIN">Role: Main Admin</option>
              </select>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              aria-label="Open Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-800 space-y-2 animate-in fade-in">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <button
                onClick={() => {
                  navigateTo('home');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left flex items-center gap-2 text-slate-200"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                Feed
              </button>
              <button
                onClick={() => {
                  navigateTo('reels');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left flex items-center gap-2 text-slate-200"
              >
                <PlaySquare className="w-4 h-4 text-purple-400" />
                Reels
              </button>
              <button
                onClick={() => {
                  navigateTo('shop');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left flex items-center gap-2 text-slate-200"
              >
                <ShoppingBag className="w-4 h-4 text-pink-400" />
                AI Shop
              </button>
              <button
                onClick={() => {
                  navigateTo('wallet');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left flex items-center gap-2 text-slate-200"
              >
                <Wallet className="w-4 h-4 text-emerald-400" />
                Dual Wallet
              </button>
              <button
                onClick={() => {
                  navigateTo('adminassitant');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-violet-950/50 border border-violet-500/40 text-left flex items-center gap-2 text-violet-300"
              >
                <UserCheck className="w-4 h-4 text-violet-400" />
                Assistant Queue
              </button>
              <button
                onClick={() => {
                  navigateTo('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-lg bg-pink-950/50 border border-pink-500/40 text-left flex items-center gap-2 text-pink-300"
              >
                <ShieldCheck className="w-4 h-4 text-pink-400" />
                Main Admin
              </button>
            </div>

            {/* Mobile Role Switcher */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Switch Demo Persona:</span>
              <select
                value={currentRole}
                onChange={(e) => {
                  switchRole(e.target.value as any);
                  setIsMobileMenuOpen(false);
                }}
                className="bg-slate-900 border border-slate-700 text-cyan-300 rounded px-2 py-1 text-xs"
              >
                <option value="USER">Creator User</option>
                <option value="ADMIN_ASSISTANT">Admin Assistant</option>
                <option value="MAIN_ADMIN">Main Admin</option>
              </select>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
