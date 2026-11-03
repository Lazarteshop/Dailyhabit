/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDailyHabit } from '../context/DailyHabitContext.tsx';
import {
  ShieldCheck,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Landmark,
  Scale,
  Lock,
  Layers,
  History,
  TrendingUp,
} from 'lucide-react';

export const MainAdminView: React.FC = () => {
  const {
    currentRole,
    switchRole,
    receiptQueue,
    mainAdminFinalDecision,
  } = useDailyHabit();

  const [feedback, setFeedback] = useState<string | null>(null);

  // Filter recommendations waiting for final Main Admin signature
  const pendingRecommendations = receiptQueue.filter(
    (r) => r.status === 'RECOMMENDED_APPROVAL' || r.status === 'RECOMMENDED_REJECTION'
  );

  const completedReceipts = receiptQueue.filter(
    (r) => r.status === 'APPROVED' || r.status === 'REJECTED'
  );

  // Simulated BSP Solvency Metrics
  const liquidVaultCashCentavos = 145000000; // ₱1,450,000.00 in Liquid Reserve
  const spendableAipmLiabilities = 82500000; // ₱825,000.00 (Account 2010)
  const withdrawalReservations = 9500000; // ₱95,000.00 (Account 2020)
  const unearnedAdBudgets = 4200000; // ₱42,000.00 (Account 2030)
  const assistantCommissionsPayable = 2100000; // ₱21,000.00 (Account 2040)
  const pendingClearingHold = 3400000; // ₱34,000.00 (Account 2050)

  const totalUserLiabilities =
    spendableAipmLiabilities +
    withdrawalReservations +
    unearnedAdBudgets +
    assistantCommissionsPayable +
    pendingClearingHold;

  const solvencyRatio = (liquidVaultCashCentavos / totalUserLiabilities) * 100;
  const isSolvent = solvencyRatio >= 100;

  const handleDecision = (id: string, decision: 'APPROVE' | 'REJECT') => {
    mainAdminFinalDecision(id, decision);
    setFeedback(
      decision === 'APPROVE'
        ? `✓ Simulated approval recorded in demo console. User credited with demo AIPM.`
        : `✓ Simulated rejection recorded. Zero liabilities credited.`
    );
    setTimeout(() => setFeedback(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Role Banner if not currently MAIN_ADMIN */}
      {currentRole !== 'MAIN_ADMIN' && (
        <div className="bg-purple-950/40 border border-purple-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3 text-purple-300">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Previewing as {currentRole}</p>
              <p className="text-xs text-purple-300/80">
                You are viewing the Main Admin Executive Console. Switch persona to Master Admin to execute final approvals.
              </p>
            </div>
          </div>
          <button
            onClick={() => switchRole('MAIN_ADMIN')}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-lg shadow-purple-500/20"
          >
            Switch to Main Admin <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Main Admin Treasury & Compliance Desk
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono">
                DEMO-ONLY SIMULATION
              </span>
            </h1>
            <p className="text-sm text-slate-400">
              DEMO-ONLY ROUTE — CLIENT-SIDE SIMULATION (NO REAL BACKEND ACCESS CONTROL). Simulated review sign-off and balance sheet invariant demonstration.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> SIMULATED CIRCUIT BREAKER: NORMAL
          </span>
        </div>
      </div>

      {feedback && (
        <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-2xl text-xs font-mono animate-fadeIn flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          {feedback}
        </div>
      )}

      {/* Solvency Equation Card (v2.5.8 Formula 1 & 2 Invariants) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              <Scale className="w-4 h-4" />
              SAMPLE DATA — NOT ACTUAL RESERVES OR REGULATORY APPROVAL
            </div>
            <h2 className="text-xl font-bold text-white">
              Simulated Reserve Solvency vs System Obligations
            </h2>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 uppercase font-mono tracking-wider">Simulated Solvency Ratio</div>
            <div className={`text-2xl font-black font-mono ${isSolvent ? 'text-emerald-400' : 'text-rose-400'}`}>
              {solvencyRatio.toFixed(1)}% <span className="text-xs font-medium text-slate-400">(Model Benchmark: 100.0%)</span>
            </div>
          </div>
        </div>

        {/* Breakdown of Invariant Accounts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-slate-400 flex items-center justify-between">
              <span>Account 1010 (Simulated Vault Cash)</span>
              <Landmark className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-lg font-bold text-cyan-400 font-mono">
              ₱{(liquidVaultCashCentavos / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[10px] text-slate-500">Sample vault figure for mathematical model demonstration only.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-slate-400 flex items-center justify-between">
              <span>Total Obligations (L_total)</span>
              <Layers className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-lg font-bold text-purple-400 font-mono">
              ₱{(totalUserLiabilities / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[10px] text-slate-500">Sum of all spendable, reserved, and pending user balances.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-slate-400 flex items-center justify-between">
              <span>Excess Equity Reserve</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-emerald-400 font-mono">
              ₱{((liquidVaultCashCentavos - totalUserLiabilities) / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[10px] text-slate-500">Unencumbered platform surplus buffer protecting solvency.</p>
          </div>
        </div>

        {/* Detailed Account Balance Sheet Table */}
        <div className="bg-slate-950/50 rounded-2xl border border-slate-800/80 p-4 space-y-3">
          <div className="text-[11px] font-bold text-slate-300 font-mono uppercase tracking-wider">
            Sub-Ledger Obligations Breakdown
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-[11px] font-mono">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[9px]">Account 2010 (Spendable AIPM)</span>
              <span className="text-slate-200 font-bold">₱{(spendableAipmLiabilities / 100).toLocaleString()}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[9px]">Account 2020 (Withdrawal Res.)</span>
              <span className="text-slate-200 font-bold">₱{(withdrawalReservations / 100).toLocaleString()}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[9px]">Account 2030 (Ad Budgets)</span>
              <span className="text-slate-200 font-bold">₱{(unearnedAdBudgets / 100).toLocaleString()}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[9px]">Account 2040 (Assistant Comm.)</span>
              <span className="text-slate-200 font-bold">₱{(assistantCommissionsPayable / 100).toLocaleString()}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[9px]">Account 2050 (Clearing Hold)</span>
              <span className="text-slate-200 font-bold">₱{(pendingClearingHold / 100).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final Verification Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              Simulated Authorization Queue ({pendingRecommendations.length})
            </h2>
            <p className="text-xs text-slate-400">
              DEMO ONLY: Simulated review workflow. Sign-off is client-side only (no cryptographic keys, atomic settlements, or actual banking transactions).
            </p>
          </div>
        </div>

        {pendingRecommendations.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs bg-slate-900/60 border border-dashed border-slate-800 rounded-2xl">
            No receipts currently pending Main Admin authorization. Level-1 assistants must submit recommendations first.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRecommendations.map((r) => (
              <div
                key={r.id}
                className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-5 space-y-4 shadow-xl relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Top-up Request: ₱{(r.amountCentavos / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Ref: {r.gcashReference} • {r.gcashNumberMasked}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-full font-mono font-bold uppercase ${
                      r.status === 'RECOMMENDED_APPROVAL'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {r.status.replace('RECOMMENDED_', 'REC: ')}
                  </span>
                </div>

                {/* Assistant recommendation note */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Screened by: {r.assignedAssistantName || 'Danilo Ramos'}</span>
                    <span className="text-purple-400 font-mono font-bold">
                      Comm: ₱{(r.commissionCentavos / 100).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-slate-300 italic">
                    "{r.adminNotes || 'Verification checks passed. Reference matched.'}"
                  </p>
                </div>

                {/* Proof preview snippet */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/80">
                  <img
                    src={r.quarantineProofUrl}
                    alt="Proof snippet"
                    className="w-12 h-12 object-cover rounded-lg border border-slate-800"
                  />
                  <div className="text-[11px]">
                    <span className="text-slate-300 font-semibold block">{r.userDisplayName}</span>
                    <span className="text-slate-500 font-mono text-[10px]">Static Sample Preview (Demo)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleDecision(r.id, 'REJECT')}
                    className="px-3 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" /> Final Reject
                  </button>
                  <button
                    onClick={() => handleDecision(r.id, 'APPROVE')}
                    className="px-3 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/20"
                  >
                    <CheckCircle className="w-4 h-4" /> Sign in Demo Console
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Verification History */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <History className="w-4 h-4 text-slate-400" />
          Recent Fiduciary Sign-offs
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-400">
            <thead className="text-[10px] font-mono text-slate-500 uppercase border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Transaction</th>
                <th className="py-2.5 px-3">Sender</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Commission Accrued</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {completedReceipts.map((r) => (
                <tr key={r.id} className="hover:bg-slate-950/40">
                  <td className="py-2.5 px-3 text-slate-300 font-bold">{r.gcashReference}</td>
                  <td className="py-2.5 px-3 text-slate-400 font-sans">{r.userDisplayName}</td>
                  <td className="py-2.5 px-3 text-cyan-400 font-bold">
                    ₱{(r.amountCentavos / 100).toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-emerald-400">
                    {r.status === 'APPROVED' ? `₱${(r.commissionCentavos / 100).toFixed(2)}` : '₱0.00'}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        r.status === 'APPROVED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
