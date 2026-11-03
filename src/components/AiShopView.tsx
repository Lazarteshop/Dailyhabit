/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDailyHabit } from '../context/DailyHabitContext.tsx';
import {
  ShoppingBag,
  Coins,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Download,
  Star,
  Layers,
  Zap,
  Tag,
  AlertCircle,
} from 'lucide-react';

export const AiShopView: React.FC = () => {
  const { shop, currentUser, upgradeShopTier, purchaseProduct, navigateTo } = useDailyHabit();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [downloadModalProduct, setDownloadModalProduct] = useState<string | null>(null);

  const categories = [
    { id: 'ALL', label: 'All Items' },
    { id: 'DIGITAL_ASSET', label: 'Holographic Relics' },
    { id: 'AI_PROMPT_PACK', label: 'Prompt Matrices' },
    { id: 'COMMERCE_PRESET', label: 'LUT Shaders' },
  ];

  const filteredProducts =
    selectedCategory === 'ALL'
      ? shop.products
      : shop.products.filter((p) => p.category === selectedCategory);

  const handleUpgrade = (tier: 2 | 3) => {
    const res = upgradeShopTier(tier);
    setFeedbackMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setTimeout(() => {
        setIsUpgradeModalOpen(false);
        setFeedbackMessage(null);
      }, 2000);
    }
  };

  const handlePurchase = (productId: string, title: string) => {
    const res = purchaseProduct(productId);
    setFeedbackMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setDownloadModalProduct(title);
    }
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner: Storefront Tier Status & Upgrade Rail */}
      <div className="holo-card rounded-3xl p-6 border border-cyan-500/30 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
                Storefront Tier {shop.tier} Active
              </span>
              <span className="text-xs text-slate-400 font-mono">· {shop.shopName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              AI-Powered Creator Commerce
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sell holographic assets, neural presets, and prompts. Unlock interactive 3D showrooms and autonomous sales concierges using your non-cash <strong className="text-cyan-300">AI Coins (AIC)</strong>.
            </p>
          </div>

          {/* Upgrade Card / Callout */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3 min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Your AI Coins Balance:</span>
              <span className="text-cyan-300 font-bold text-sm flex items-center gap-1">
                <Coins className="w-4 h-4 text-cyan-400" />
                {currentUser.wallets.aiCoinsBalance} AIC
              </span>
            </div>

            <div className="text-[11px] text-slate-400 font-mono">
              {shop.tier === 1 && (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Next: Tier 2 Hologram Showcase</span>
                    <span className="text-cyan-400">100 AIC</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full"
                      style={{ width: `${Math.min(100, (currentUser.wallets.aiCoinsBalance / 100) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {shop.tier === 2 && (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Next: Tier 3 Quantum Boutique</span>
                    <span className="text-purple-400">250 AIC</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-purple-400 h-full"
                      style={{ width: `${Math.min(100, (currentUser.wallets.aiCoinsBalance / 250) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {shop.tier === 3 && (
                <p className="text-emerald-400 font-bold">★ Maximum Tier 3 Sovereign Storefront Unlocked!</p>
              )}
            </div>

            {shop.tier < 3 && (
              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="w-full py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-1.5 transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Upgrade Storefront with AIC</span>
              </button>
            )}
          </div>
        </div>

        {/* Feedback Alert Banner */}
        {feedbackMessage && (
          <div
            className={`mt-4 p-3 rounded-xl text-xs font-mono border flex items-center gap-2 ${
              feedbackMessage.isError
                ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
            }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{feedbackMessage.text}</span>
          </div>
        )}
      </div>

      {/* Category Tabs & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>Spendable Wallet:</span>
          <span className="text-emerald-400 font-bold">
            ₱{(currentUser.wallets.aiPocketMoneyCentavos / 100).toFixed(2)} AIPM
          </span>
          <button
            onClick={() => navigateTo('wallet')}
            className="text-cyan-400 hover:underline flex items-center gap-0.5"
          >
            <span>Top Up</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => {
          const isTierLocked = prod.requiredTier > shop.tier;
          const pricePhp = (prod.priceAipmCentavos / 100).toFixed(2);

          return (
            <div
              key={prod.id}
              className={`holo-card rounded-2xl overflow-hidden border transition-all flex flex-col justify-between ${
                isTierLocked
                  ? 'border-slate-800 opacity-75'
                  : 'border-slate-800 hover:border-cyan-500/40 shadow-xl'
              }`}
            >
              {/* Product Visual Container */}
              <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
                <img
                  src={prod.imageUrl}
                  alt={prod.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 rounded px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                  {prod.category.replace('_', ' ')}
                </div>

                {isTierLocked && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
                    <Lock className="w-8 h-8 text-amber-400 mb-2" />
                    <span className="text-xs font-bold text-white uppercase">Tier {prod.requiredTier} Required</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-1">Upgrade shop tier to unlock</span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-mono">{prod.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{prod.salesCount} sold</span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-1">{prod.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                {/* Purchase Button & Price */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Price</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">
                      ₱{pricePhp} <span className="text-[10px] text-slate-400">AIPM</span>
                    </span>
                  </div>

                  {isTierLocked ? (
                    <button
                      onClick={() => setIsUpgradeModalOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono font-medium hover:bg-amber-900/60"
                    >
                      Unlock Tier {prod.requiredTier}
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePurchase(prod.id, prod.title)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Buy Item</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upgrade Storefront Modal */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="holo-card rounded-3xl max-w-lg w-full p-6 border border-cyan-500/40 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-bold text-white text-lg">AI SHOP Tier Upgrade Matrix</h3>
              </div>
              <button
                onClick={() => setIsUpgradeModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Burn non-cash <strong className="text-cyan-300">AI Coins (AIC)</strong> earned from watching video reels to expand your creator storefront features.
            </p>

            {/* Tier Option Cards */}
            <div className="space-y-3">
              {/* Tier 2 Card */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  shop.tier >= 2
                    ? 'bg-slate-900/40 border-slate-800 opacity-60'
                    : 'bg-slate-900 border-cyan-500/40 hover:border-cyan-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-white text-sm">Tier 2: Holographic 3D Showcase</span>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-bold">100 AIC</span>
                </div>
                <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                  <li>3D rotating object previews with custom chromatic lighting</li>
                  <li>Unlock Prompt Matrix & Shaders catalog slots</li>
                  <li>Automated customer engagement telemetry</li>
                </ul>

                {shop.tier < 2 && (
                  <button
                    onClick={() => handleUpgrade(2)}
                    disabled={currentUser.wallets.aiCoinsBalance < 100}
                    className="w-full mt-3 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-xl transition-all"
                  >
                    Activate Tier 2 (Burn 100 AIC)
                  </button>
                )}
                {shop.tier >= 2 && (
                  <span className="block mt-2 text-[10px] font-mono text-emerald-400 font-bold">
                    ✓ Currently Unlocked
                  </span>
                )}
              </div>

              {/* Tier 3 Card */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  shop.tier >= 3
                    ? 'bg-slate-900/40 border-slate-800 opacity-60'
                    : 'bg-slate-900 border-purple-500/40 hover:border-purple-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span className="font-bold text-white text-sm">Tier 3: Neural Quantum Boutique</span>
                  </div>
                  <span className="text-xs font-mono text-purple-300 font-bold">250 AIC</span>
                </div>
                <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                  <li>Autonomous AI Sales Concierge answering visitor questions</li>
                  <li>Full WebGL interactive showroom engine</li>
                  <li>Zero platform transaction surcharges on digital sales</li>
                </ul>

                {shop.tier < 3 && (
                  <button
                    onClick={() => handleUpgrade(3)}
                    disabled={currentUser.wallets.aiCoinsBalance < 250}
                    className="w-full mt-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Activate Tier 3 (Burn 250 AIC)
                  </button>
                )}
                {shop.tier >= 3 && (
                  <span className="block mt-2 text-[10px] font-mono text-emerald-400 font-bold">
                    ✓ Currently Unlocked
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
              <span className="text-amber-400 font-semibold block mb-0.5">Air-Gap Policy Reminder:</span>
              AI Coins have zero fiat redemption value and cannot be withdrawn or converted to Philippine Pesos.
            </div>
          </div>
        </div>
      )}

      {/* Simulated Download Asset Modal */}
      {downloadModalProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="holo-card rounded-2xl max-w-md w-full p-6 border border-emerald-500/40 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Download className="w-6 h-6 animate-bounce" />
            </div>
            <h3 className="font-display font-bold text-white text-base">Holographic Asset Unlocked</h3>
            <p className="text-xs text-slate-300">
              You purchased <strong className="text-cyan-300">"{downloadModalProduct}"</strong>. The simulated binary bundle has been provisioned to your local session vault.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 text-left">
              SHA-256: 8f4b238e9a1029c... (Simulated Cryptographic Delivery)
            </div>
            <button
              onClick={() => setDownloadModalProduct(null)}
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
