/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDailyHabit } from '../context/DailyHabitContext.tsx';
import { UserRole } from '../types/index.ts';
import {
  X,
  User,
  ShieldAlert,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Smartphone,
  Lock,
  Mail,
  Zap,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { currentRole, switchRole, currentUser, navigateTo } = useDailyHabit();
  const [tab, setTab] = useState<'login' | 'register' | 'switch'>('switch');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectRole = (role: UserRole) => {
    switchRole(role);
    setNotice(`Switched persona to ${role}`);
    setTimeout(() => {
      onClose();
      if (role === 'ADMIN_ASSISTANT') navigateTo('adminassitant');
      if (role === 'MAIN_ADMIN') navigateTo('admin');
      if (role === 'USER') navigateTo('home');
    }, 400);
  };

  const handleMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice('Phase 1B Sandbox: Demo authenticated successfully as Creator.');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">DailyHabit Access Portal</h2>
              <p className="text-xs text-slate-400">Phase 1B Persona & Authentication Sandbox</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800/80 text-xs font-semibold">
          <button
            onClick={() => setTab('switch')}
            className={`py-2 rounded-xl transition ${
              tab === 'switch'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Switch Persona
          </button>
          <button
            onClick={() => setTab('login')}
            className={`py-2 rounded-xl transition ${
              tab === 'login'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`py-2 rounded-xl transition ${
              tab === 'register'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {notice && (
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-xs font-mono text-cyan-300 animate-fadeIn">
            {notice}
          </div>
        )}

        {/* Tab 1: Switch Persona (Fast 1-Click for Audit & Testing) */}
        {tab === 'switch' && (
          <div className="space-y-4">
            <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-[11px] text-amber-200 leading-relaxed">
              <span className="font-bold text-amber-300 block mb-0.5">DEMO-ONLY SIMULATION:</span>
              Persona switching is an in-memory client-side testing interface. It does not provide real cryptographic role-based access control (RBAC), authentication tokens, or server-enforced security boundaries.
            </div>
            <p className="text-xs text-slate-400">
              Select an architectural persona below to preview role-specific interface states:
            </p>

            <div className="space-y-3">
              {/* Persona 1: Creator User */}
              <button
                onClick={() => handleSelectRole('USER')}
                className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between group ${
                  currentRole === 'USER'
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      Kaelen Reyes
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 font-mono">
                        CREATOR
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Publishes posts, streams reels, manages AI SHOP, spends AIPM & AIC.
                    </p>
                  </div>
                </div>
                {currentRole === 'USER' && (
                  <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                )}
              </button>

              {/* Persona 2: Admin Assistant */}
              <button
                onClick={() => handleSelectRole('ADMIN_ASSISTANT')}
                className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between group ${
                  currentRole === 'ADMIN_ASSISTANT'
                    ? 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      Danilo Ramos
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 font-mono">
                        ADMIN ASSISTANT
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Level-1 queue screener. Claims receipts & recommends approval (no auto-commissions).
                    </p>
                  </div>
                </div>
                {currentRole === 'ADMIN_ASSISTANT' && (
                  <Check className="w-5 h-5 text-amber-400 shrink-0" />
                )}
              </button>

              {/* Persona 3: Main Admin */}
              <button
                onClick={() => handleSelectRole('MAIN_ADMIN')}
                className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between group ${
                  currentRole === 'MAIN_ADMIN'
                    ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      Master Administrator
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-400 font-mono">
                        MAIN ADMIN
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Level-2 fiduciary signatory. Solvency audits & final transaction authorization.
                    </p>
                  </div>
                </div>
                {currentRole === 'MAIN_ADMIN' && (
                  <Check className="w-5 h-5 text-purple-400 shrink-0" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Login */}
        {tab === 'login' && (
          <form onSubmit={handleMockSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email or GCash Number
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@dailyhabit.ph or +639171234567"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-cyan-500/20"
            >
              Sign In (Demo Auth)
            </button>
          </form>
        )}

        {/* Tab 3: Register */}
        {tab === 'register' && (
          <form onSubmit={handleMockSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" /> Creator Handle
              </label>
              <input
                type="text"
                placeholder="@yourhandle"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Philippine GCash Mobile Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+63 9XX XXX XXXX"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" /> Create Security Pin / Password
              </label>
              <input
                type="password"
                placeholder="6-digit PIN or password"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-cyan-500/20"
            >
              Create Account (Demo Auth)
            </button>
          </form>
        )}

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-500 font-mono">
          Note: In accordance with Phase 1B specifications, credentials and authentication sessions are simulated in-memory. Zero backend writes or Firebase credentials are deployed.
        </div>
      </div>
    </div>
  );
};
