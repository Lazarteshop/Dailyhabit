/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDailyHabit } from '../context/DailyHabitContext.tsx';
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  XCircle,
  FileSearch,
  Lock,
  Coins,
  AlertTriangle,
  ArrowRight,
  UserCheck,
  Building2,
  FileText,
} from 'lucide-react';

export const AdminAssistantView: React.FC = () => {
  const {
    currentRole,
    switchRole,
    receiptQueue,
    assistantClaimReceipt,
    assistantRecommendDecision,
  } = useDailyHabit();

  const [activeReceiptId, setActiveReceiptId] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Filter queues
  const unassignedReceipts = receiptQueue.filter(
    (r) => r.status === 'PENDING_ASSIGNMENT'
  );
  const myAssignedReceipts = receiptQueue.filter(
    (r) => r.status === 'ASSIGNED'
  );
  const reviewedReceipts = receiptQueue.filter(
    (r) =>
      r.status === 'RECOMMENDED_APPROVAL' ||
      r.status === 'RECOMMENDED_REJECTION' ||
      r.status === 'APPROVED' ||
      r.status === 'REJECTED'
  );

  const activeReceipt = receiptQueue.find((r) => r.id === activeReceiptId);

  const handleClaim = (id: string) => {
    const res = assistantClaimReceipt(id);
    setActionFeedback(res.message);
    if (res.success) {
      setActiveReceiptId(id);
    }
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleRecommend = (decision: 'APPROVE' | 'REJECT') => {
    if (!activeReceiptId) return;
    assistantRecommendDecision(activeReceiptId, decision, reviewNotes);
    setActionFeedback(
      decision === 'APPROVE'
        ? '✓ Recommendation recorded: APPROVE. Forwarded to Main Admin for final verification.'
        : '✓ Recommendation recorded: REJECT. Forwarded to Main Admin for final review.'
    );
    setReviewNotes('');
    setActiveReceiptId(null);
    setTimeout(() => setActionFeedback(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Role Banner if not currently ADMIN_ASSISTANT */}
      {currentRole !== 'ADMIN_ASSISTANT' && (
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3 text-amber-300">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <div>
              <p className="font-semibold text-sm">Previewing as {currentRole}</p>
              <p className="text-xs text-amber-300/80">
                You are viewing the Level-1 Assistant Console. Switch persona to Danilo Ramos (Admin Assistant) for the active operator flow.
              </p>
            </div>
          </div>
          <button
            onClick={() => switchRole('ADMIN_ASSISTANT')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0"
          >
            Switch to Admin Assistant <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header & Architecture Rule Card */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FileSearch className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  Admin Assistant Verification Desk
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono">
                    DEMO-ONLY SIMULATION
                  </span>
                </h1>
                <p className="text-sm text-slate-400">
                  DEMO-ONLY ROUTE — CLIENT-SIDE SIMULATION (NO REAL BACKEND ACCESS CONTROL). Screen sample GCash receipts and submit simulated recommendations.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-2.5 text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">
                Assigned Queue
              </span>
              <span className="text-lg font-bold text-cyan-400 font-mono">
                {myAssignedReceipts.length} Active / {unassignedReceipts.length} Open
              </span>
            </div>
          </div>
        </div>

        {/* Commission Rule Simulation Callout */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4 text-indigo-400" />
            DEMO WORKFLOW NOTICE: Pending Illustrative Commission Until Simulated Main Admin Approval
          </div>
          <p className="text-slate-300 leading-relaxed">
            <span className="text-amber-400/90 font-bold">SAMPLE DATA — NOT ACTUAL RESERVES OR REGULATORY APPROVAL.</span> Admin Assistants perform simulated Level-1 screening. Submitting a recommendation does not generate real financial credit. Assistant commission is an illustrative pending amount (₱10.00 – ₱800.00 policy) until the simulated Main Admin signs off in the demo console.
          </p>
        </div>
      </div>

      {actionFeedback && (
        <div className="bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 px-4 py-3 rounded-2xl text-xs font-mono animate-fadeIn flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {actionFeedback}
        </div>
      )}

      {/* Main Grid: Work Queues + Active Review Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Queues (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Section: Open Unassigned Queue */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Unassigned Queue ({unassignedReceipts.length})
              </h2>
              <span className="text-[11px] text-slate-500 font-mono">15m Claim Lock</span>
            </div>

            {unassignedReceipts.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                No unassigned GCash receipts waiting in quarantine.
              </div>
            ) : (
              <div className="space-y-3">
                {unassignedReceipts.map((receipt) => (
                  <div
                    key={receipt.id}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition space-y-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">
                          ₱{(receipt.amountCentavos / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {receipt.gcashNumberMasked} • {receipt.gcashReference}
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono">
                        OPEN
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[11px]">
                      <span className="text-slate-400">User: {receipt.userDisplayName}</span>
                      <button
                        onClick={() => handleClaim(receipt.id)}
                        className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition"
                      >
                        Claim for Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: My Assigned Receipts */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                My Active Reviews ({myAssignedReceipts.length})
              </h2>
            </div>

            {myAssignedReceipts.length === 0 ? (
              <div className="py-6 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                Claim a receipt above to start Level-1 screening.
              </div>
            ) : (
              <div className="space-y-3">
                {myAssignedReceipts.map((receipt) => (
                  <div
                    key={receipt.id}
                    onClick={() => setActiveReceiptId(receipt.id)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer ${
                      activeReceiptId === receipt.id
                        ? 'bg-cyan-950/30 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">
                          ₱{(receipt.amountCentavos / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Ref: {receipt.gcashReference}
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono">
                        IN PROGRESS
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>{receipt.userDisplayName}</span>
                      <span className="text-cyan-400 font-semibold flex items-center gap-1">
                        Review Now <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Completed / Handed off to Main Admin */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 space-y-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-400" />
              Handed to Main Admin ({reviewedReceipts.length})
            </h2>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {reviewedReceipts.map((r) => (
                <div
                  key={r.id}
                  className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/70 text-[11px] flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono text-slate-300 font-bold">
                      ₱{(r.amountCentavos / 100).toFixed(2)}
                    </span>{' '}
                    <span className="text-slate-500">({r.gcashReference})</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                      r.status === 'APPROVED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : r.status === 'REJECTED'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}
                  >
                    {r.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Review Workspace (7 cols) */}
        <div className="lg:col-span-7">
          {activeReceipt ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    Reviewing Receipt #{activeReceipt.id}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Submitted by {activeReceipt.userDisplayName} ({activeReceipt.gcashNumberMasked})
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-cyan-400 font-mono">
                    ₱{(activeReceipt.amountCentavos / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="block text-[10px] text-slate-500 font-mono uppercase">
                    Proposed Top-up
                  </span>
                </div>
              </div>

              {/* Sample Proof Image (Static Preview Only) */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Sample Proof Image (Static Preview Only — No File Upload or Cloud Storage)</span>
                  <span className="text-[10px] text-amber-400 font-mono">DEMO PREVIEW</span>
                </label>
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4 flex flex-col items-center justify-center">
                  <img
                    src={activeReceipt.quarantineProofUrl}
                    alt="Sample Receipt Preview"
                    className="max-h-64 object-contain rounded-lg border border-slate-800/80 shadow-md"
                  />
                  <p className="text-[11px] text-slate-500 mt-2 font-mono">
                    Static sample preview image for demonstration only (no actual user receipt data stored)
                  </p>
                </div>
              </div>

              {/* Verification Checklist */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Level-1 Screening Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Reference Number:</span>
                    <span className="font-mono text-cyan-300 font-bold">{activeReceipt.gcashReference}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Sender Phone:</span>
                    <span className="font-mono text-slate-200">{activeReceipt.gcashNumberMasked}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Illustrative Comm. If Approved:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      ₱{(activeReceipt.commissionCentavos / 100).toFixed(2)} (Pending Sign-off)
                    </span>
                    <span className="text-[9px] text-slate-500 block">demonstration illustrative amount only</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Queue Status:</span>
                    <span className="text-cyan-400 font-bold">SAMPLE_PREVIEW_OK</span>
                  </div>
                </div>
              </div>

              {/* Recommendation Notes */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">
                  Assistant Review Notes (Mandatory for rejection, recommended for approval)
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="e.g. Reference code cross-checked with GCash SMS alert timestamp; amounts match perfectly."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              {/* Decision Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => handleRecommend('REJECT')}
                  className="px-4 py-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Recommend Rejection
                </button>
                <button
                  onClick={() => handleRecommend('APPROVE')}
                  className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  Recommend Approval
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <FileSearch className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-400">No Receipt Selected for Review</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Select an assigned receipt from your queue on the left or claim a new one to inspect proof documents.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
