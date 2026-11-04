/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDailyHabit } from '../context/DailyHabitContext.tsx';
import {
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  CreditCard,
  History,
  Info,
  Sparkles,
  QrCode,
  DollarSign,
  Send,
} from 'lucide-react';

export const WalletView: React.FC = () => {
  const {
    currentUser,
    walletTransactions,
    requestSimulatedTopUp,
    requestSimulatedWithdrawal,
    navigateTo,
  } = useDailyHabit();

  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(1000);
  const [topUpGcashRef, setTopUpGcashRef] = useState<string>('20261102' + Math.floor(100000 + Math.random() * 900000));
  const [withdrawAmount, setWithdrawAmount] = useState<number>(1000);
  const [withdrawGcashNumber, setWithdrawGcashNumber] = useState<string>('+63917' + Math.floor(1000000 + Math.random() * 9000000));
  const [actionFeedback, setActionFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = requestSimulatedTopUp(topUpAmount, topUpGcashRef);
    setActionFeedback({ text: res.message, isError: !res.success });
    if (res.success) {
      setTimeout(() => {
        setIsTopUpModalOpen(false);
        setActionFeedback(null);
      }, 3000);
    }
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = requestSimulatedWithdrawal(withdrawAmount, withdrawGcashNumber);
    setActionFeedback({ text: res.message, isError: !res.success });
    if (res.success) {
      setTimeout(() => {
        setIsWithdrawModalOpen(false);
        setActionFeedback(null);
      }, 3000);
    }
  };

  const spendableAipmPhp = (currentUser.wallets.aiPocketMoneyCentavos / 100).toFixed(2);
  const reservedWithdrawalPhp = (currentUser.wallets.pendingWithdrawalCentavos / 100).toFixed(2);
  const pendingClearingPhp = (currentUser.wallets.pendingClearingCentavos / 100).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      
      {/* Top Prototype Disclaimers & Air-Gap Banner */}
      <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-amber-300 font-mono uppercase tracking-wide">
            SIMULATED DEMO ONLY — NO REAL MONEY, NO REAL STORED VALUE, NO ACTUAL PAYMENT OR WITHDRAWAL.
          </p>
          <p className="text-slate-300 leading-relaxed">
            All fiat and token balances displayed below are in-memory demo records. AI Coins are non-cash utility credits for AI SHOP creation and tier upgrades. AI Pocket Money (AIPM) represents demo balance only (1 AIPM = 1.00 PHP Demo Reference Only).
          </p>
        </div>
      </div>

      {/* Dual Wallet Display Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: AI Coins (Utility Token) */}
        <div className="holo-card rounded-3xl p-6 border border-cyan-500/40 relative overflow-hidden shadow-2xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-display font-bold text-white">AI Coins (AIC)</h2>
                <span className="text-[10px] font-mono text-cyan-400">In-App Utility Token — Demo Only</span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-400/50 text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
              SHOP UPGRADES ONLY
            </span>
          </div>

          <div>
            <span className="text-xs font-mono text-slate-400 block mb-1">Available Token Balance:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                {currentUser.wallets.aiCoinsBalance}
              </span>
              <span className="text-sm font-mono text-cyan-400 font-bold">AIC</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Earn simulated AI Coins through 30-second demonstration video playback (5 AIC per demo session, up to 100 demo sessions/day). Strictly non-cash, carries no real-world value, and involves no verified real-world views.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigateTo('reels')}
              className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Coins className="w-3.5 h-3.5 text-cyan-400" />
              <span>Earn Free Coins</span>
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="py-2.5 px-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upgrade AI Shop</span>
            </button>
          </div>
        </div>

        {/* Card 2: AI Pocket Money (PHP-Denominated Stored Value) */}
        <div className="holo-card rounded-3xl p-6 border border-emerald-500/40 relative overflow-hidden shadow-2xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-display font-bold text-white">AI Pocket Money (AIPM)</h2>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold block">1 AIPM = 1.00 PHP (Demo Reference Only)</span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-400/50 text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider">
              SIMULATED DEMO VALUE
            </span>
          </div>

          <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-[10px] font-mono text-emerald-300">
            SIMULATED DEMO ONLY — NO REAL MONEY, NO REAL STORED VALUE, NO ACTUAL PAYMENT OR WITHDRAWAL.
          </div>

          <div>
            <span className="text-xs font-mono text-slate-400 block mb-1">Spendable Balance:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                ₱{spendableAipmPhp}
              </span>
              <span className="text-sm font-mono text-emerald-400 font-bold">PHP</span>
            </div>
          </div>

          {/* Subtotals (Reservations & Clearing) */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-400 text-[10px] block">Pending Withdrawal (Account 2020):</span>
              <span className="text-amber-400 font-semibold">₱{reservedWithdrawalPhp}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">In Anti-Fraud Hold (Account 2050):</span>
              <span className="text-cyan-400 font-semibold">₱{pendingClearingPhp}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => setIsTopUpModalOpen(true)}
              className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span>GCash Top-Up</span>
            </button>
            <button
              onClick={() => setIsWithdrawModalOpen(true)}
              className="py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Simulated Withdrawal Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Demonstration Payout Schedule & Fee Notice */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Scheduled Demo Payout Batches: <strong>Every 5th & 20th of the month</strong> · SAMPLE DATA — NOT ACTUAL RESERVES OR REGULATORY APPROVAL
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Simulated Fee: ₱15.00 (Display Only)</span>
          <span>·</span>
          <span>Min Demo Payout: ₱100.00</span>
        </div>
      </div>

      {/* Simulated Double-Entry Ledger Transactions Table */}
      <div className="holo-card rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-white text-base">Ledger Transaction Audit Trail</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {walletTransactions.length} Simulated Transaction History
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Journal Description</th>
                <th className="py-2.5 px-3">Reference #</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {walletTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{tx.date}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.type === 'CREATOR_REWARD'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                          : tx.type === 'TOPUP'
                          ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
                          : tx.type === 'WITHDRAWAL'
                          ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                          : 'bg-purple-950 text-purple-400 border border-purple-500/40'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-200 max-w-xs sm:max-w-md truncate">
                    {tx.description}
                  </td>
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{tx.referenceNumber}</td>
                  <td className="py-3 px-3 text-right font-bold whitespace-nowrap">
                    {tx.amountCoins ? (
                      <span className="text-cyan-400">-{tx.amountCoins} AIC</span>
                    ) : tx.type === 'WITHDRAWAL' || tx.type === 'AD_CAMPAIGN' ? (
                      <span className="text-amber-400">-₱{(tx.amountCentavos / 100).toFixed(2)}</span>
                    ) : (
                      <span className="text-emerald-400">+₱{(tx.amountCentavos / 100).toFixed(2)}</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <span
                      className={`text-[10px] font-bold ${
                        tx.status === 'COMPLETED' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulated Top-Up Modal */}
      {isTopUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="holo-card rounded-3xl max-w-md w-full p-6 border border-cyan-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-bold text-white text-base">GCash Manual Top-Up</h3>
              </div>
              <button onClick={() => setIsTopUpModalOpen(false)} className="text-slate-400 hover:text-white text-lg">
                &times;
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Submit your simulated GCash deposit. The proof is routed to the <strong className="text-cyan-300">Admin Assistant Queue</strong> for review, followed by <strong className="text-purple-300">Main Admin final bank verification</strong>.
            </p>

            <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-[11px] text-cyan-200 space-y-1">
              <p className="font-bold text-cyan-300">DEMO ONLY — SAMPLE IMAGE PREVIEW:</p>
              <p className="text-slate-300">
                Phase 1B operates strictly with static sample receipts for UI demonstration. No files are uploaded, stored, or transmitted over the network.
              </p>
            </div>

            <form onSubmit={handleTopUpSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Top-Up Amount (PHP):</label>
                <div className="grid grid-cols-4 gap-2">
                  {[100, 500, 1000, 2500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-1.5 rounded-lg text-xs font-mono border ${
                        topUpAmount === amt
                          ? 'bg-cyan-600 text-slate-950 font-bold border-cyan-400'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      ₱{amt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">GCash Reference Number:</label>
                <input
                  type="text"
                  value={topUpGcashRef}
                  onChange={(e) => setTopUpGcashRef(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g. 202611029871625"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Merchant Destination:</span>
                  <span className="text-white">DAILYHABIT CORP (Demo Terminal)</span>
                </div>
                <div className="flex justify-between">
                  <span>Illustrative Assistant Comm.:</span>
                  <span className="text-cyan-300">
                    {topUpAmount > 50000 ? '₱800.00' : topUpAmount > 10000 ? '₱100.00' : topUpAmount > 2500 ? '₱25.00' : '₱10.00'}
                  </span>
                </div>
                <p className="text-[10px] text-amber-400/90 pt-1">
                  *Illustrative commission shown as pending until simulated Main Admin sign-off.
                </p>
              </div>

              {actionFeedback && (
                <p
                  className={`text-xs p-2 rounded border font-mono ${
                    actionFeedback.isError
                      ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                      : 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
                  }`}
                >
                  {actionFeedback.text}
                </p>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTopUpModalOpen(false)}
                  className="flex-1 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20"
                >
                  Submit Top-Up (₱{topUpAmount})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simulated Withdrawal Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="holo-card rounded-3xl max-w-md w-full p-6 border border-emerald-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <h3 className="font-display font-bold text-white text-base">Simulated Withdrawal Preview</h3>
              </div>
              <button onClick={() => setIsWithdrawModalOpen(false)} className="text-slate-400 hover:text-white text-lg">
                &times;
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              DEMO ONLY: Simulated payout reservation. Scheduled batch disbursement runs on the <strong className="text-emerald-300">5th and 20th of the month</strong>. No real-world cash or fees are transferred.
            </p>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Target GCash Mobile Number:</label>
                <input
                  type="text"
                  value={withdrawGcashNumber}
                  onChange={(e) => setWithdrawGcashNumber(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  placeholder="+639XXXXXXXXX"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Withdrawal Gross Amount (PHP, Min: ₱100):</label>
                <input
                  type="number"
                  min={100}
                  step={50}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Gross Requested Amount:</span>
                  <span className="text-white">₱{withdrawAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Simulated Transfer Fee (Display Only):</span>
                  <span className="text-amber-400">-₱15.00</span>
                </div>
                <div className="flex justify-between text-slate-400 font-bold pt-1 border-t border-slate-800">
                  <span className="text-emerald-300">Simulated Net Cash-Out:</span>
                  <span className="text-emerald-400 text-sm">
                    ₱{Math.max(0, withdrawAmount - 15).toFixed(2)}
                  </span>
                </div>
              </div>

              {actionFeedback && (
                <p
                  className={`text-xs p-2 rounded border font-mono ${
                    actionFeedback.isError
                      ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                      : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                  }`}
                >
                  {actionFeedback.text}
                </p>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="flex-1 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  Reserve Payout (₱{withdrawAmount})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
