/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DailyHabitProvider, useDailyHabit } from './context/DailyHabitContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { MobileNav } from './components/MobileNav.tsx';
import { FeedView } from './components/FeedView.tsx';
import { ReelsView } from './components/ReelsView.tsx';
import { AiShopView } from './components/AiShopView.tsx';
import { WalletView } from './components/WalletView.tsx';
import { ProfileView } from './components/ProfileView.tsx';
import { AdminAssistantView } from './components/AdminAssistantView.tsx';
import { MainAdminView } from './components/MainAdminView.tsx';
import { AiAssistantDrawer } from './components/AiAssistantDrawer.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import {
  Users,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Lock,
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentRoute, currentRole, switchRole, navigateTo } = useDailyHabit();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Render the active view based on client-side routing
  const renderActiveView = () => {
    switch (currentRoute) {
      case 'home':
        return <FeedView />;
      case 'reels':
        return <ReelsView />;
      case 'shop':
        return <AiShopView />;
      case 'wallet':
        return <WalletView />;
      case 'profile':
        return <ProfileView />;
      case 'adminassitant':
        return <AdminAssistantView />;
      case 'admin':
        return <MainAdminView />;
      default:
        return <FeedView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pb-24 md:pb-16">
        {renderActiveView()}
      </main>

      {/* Persistent Floating Persona Quick-Switcher (Bottom-Left) */}
      <div className="fixed bottom-20 md:bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 bg-slate-900/90 border border-slate-800 backdrop-blur-md p-1.5 rounded-2xl shadow-xl">
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono transition text-slate-300"
          title="Switch testing persona"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="font-bold text-white">Persona: {currentRole}</span>
          <span className="text-[10px] text-cyan-400 font-sans">Change</span>
        </button>

        {currentRole !== 'ADMIN_ASSISTANT' && (
          <button
            onClick={() => {
              switchRole('ADMIN_ASSISTANT');
              navigateTo('adminassitant');
            }}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-amber-400 hover:text-amber-300 transition"
            title="Fast switch to Admin Assistant"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
          </button>
        )}

        {currentRole !== 'MAIN_ADMIN' && (
          <button
            onClick={() => {
              switchRole('MAIN_ADMIN');
              navigateTo('admin');
            }}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-purple-400 hover:text-purple-300 transition"
            title="Fast switch to Main Admin"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Floating Copilot Drawer & Trigger */}
      <AiAssistantDrawer />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileNav />

      {/* Auth & Persona Switcher Dialog */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
              DH
            </div>
            <span className="text-slate-400 font-semibold">DAILYHABIT ARCHITECTURE v2.5.8</span>
            <span className="text-slate-700">|</span>
            <span className="text-[11px] font-mono text-cyan-400/80">Phase 1B Frontend Implementation</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Lock className="w-3 h-3" /> Zero-Billing Guardrail Verified
            </span>
            <span className="text-slate-700">·</span>
            <span className="text-amber-400/90 font-medium">SAMPLE DATA — NOT ACTUAL RESERVES OR REGULATORY APPROVAL</span>
            <span className="text-slate-700">·</span>
            <span>In-Memory State Demo</span>
          </div>

          <p className="text-[10px] text-slate-600 font-mono text-center md:text-right">
            Non-custodial demonstration mock • No live GCash API or Firebase credentials
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <DailyHabitProvider>
      <AppContent />
    </DailyHabitProvider>
  );
}
