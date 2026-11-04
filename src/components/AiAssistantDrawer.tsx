/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useDailyHabit } from '../context/DailyHabitContext.tsx';
import {
  Bot,
  X,
  Send,
  Sparkles,
  ArrowRight,
  Store,
  Wallet,
  Zap,
} from 'lucide-react';

export const AiAssistantDrawer: React.FC = () => {
  const {
    isAssistantOpen,
    setIsAssistantOpen,
    chatMessages,
    sendAssistantMessage,
    navigateTo,
  } = useDailyHabit();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAssistantOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAssistantOpen]);

  if (!isAssistantOpen) {
    return (
      <button
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
        aria-label="Open Demo Assistant"
      >
        <Bot className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-xs font-black tracking-wide">DEMO COPILOT</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </button>
    );
  }

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;
    sendAssistantMessage(text.trim());
    if (!textToSend) setInput('');
  };

  const handleActionClick = (action: string) => {
    if (action.startsWith('NAV:')) {
      const target = action.replace('NAV:', '');
      navigateTo(target);
      setIsAssistantOpen(false);
    } else {
      handleSend(action);
    }
  };

  const quickPrompts = [
    'How do I upgrade to Tier 2 AI SHOP?',
    'What is the difference between AI Coins & AIPM?',
    'How does GCash withdrawal reservation work?',
    'Can I promote my post with AI Pocket Money?',
  ];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsAssistantOpen(false)}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-auto transition-opacity"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md h-full bg-slate-950/95 border-l border-slate-800 shadow-2xl flex flex-col pointer-events-auto transition-transform duration-300 z-10">
        {/* Header */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">DailyHabit Demo Assistant</h3>
                <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] font-mono font-bold">
                  SIMULATED DEMO (KEYWORD ENGINE)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Phase 1B simulated keyword-based responses only (No live AI or backend service)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAssistantOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="p-2.5 mx-4 mt-3 bg-slate-900/90 border border-slate-800 rounded-xl text-[10px] font-mono text-slate-400 flex items-start gap-2">
          <Bot className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
          <span>DEMO ONLY: Keyword-based response simulation. All balances, shop tiers, and assistance provided are simulated demonstration data with no real financial or account impact.</span>
        </div>

        {/* Quick Navigation Short-cuts */}
        <div className="px-4 py-2 border-b border-slate-800/60 bg-slate-900/30 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-400 scrollbar-none">
          <span className="text-[9px] uppercase font-mono text-slate-500 shrink-0">Jump To:</span>
          <button
            onClick={() => {
              navigateTo('shop');
              setIsAssistantOpen(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition shrink-0 flex items-center gap-1"
          >
            <Store className="w-3 h-3 text-cyan-400" /> AI Shop
          </button>
          <button
            onClick={() => {
              navigateTo('wallet');
              setIsAssistantOpen(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition shrink-0 flex items-center gap-1"
          >
            <Wallet className="w-3 h-3 text-emerald-400" /> Dual Wallet
          </button>
          <button
            onClick={() => {
              navigateTo('reels');
              setIsAssistantOpen(false);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition shrink-0 flex items-center gap-1"
          >
            <Zap className="w-3 h-3 text-amber-400" /> Watch Reels
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500 text-slate-950 font-medium shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <span className="text-[9px] font-mono text-cyan-400 font-semibold block mb-1">
                    Simulated Demo Response (Keyword-Based Mock — No Backend AI Service)
                  </span>
                )}
                <div className="whitespace-pre-line">{msg.text}</div>
                <div
                  className={`text-[9px] mt-1.5 font-mono ${
                    msg.sender === 'user' ? 'text-slate-800' : 'text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {/* Action buttons suggested by assistant */}
              {msg.suggestedActions && (
                <div className="mt-2 flex flex-wrap gap-1.5 max-w-[85%]">
                  {msg.suggestedActions.map((act, i) => (
                    <button
                      key={i}
                      onClick={() => handleActionClick(act.action)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 text-[10px] font-semibold transition flex items-center gap-1"
                    >
                      {act.label} <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-900/40 space-y-1.5">
          <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Suggested Inquiries (Demo Topics)
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-300 transition truncate max-w-full"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input Box */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about simulated tiers, demo balances, or preview features..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 transition font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
