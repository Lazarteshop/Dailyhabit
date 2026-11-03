/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDailyHabit } from '../context/DailyHabitContext.tsx';
import {
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Coins,
  Wallet,
  Settings,
  Share2,
  Grid,
  PlaySquare,
  Award,
  Edit3,
  ExternalLink,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { currentUser, posts, reels, shop, navigateTo, updateBio } = useDailyHabit();
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'shop'>('posts');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [copyNotice, setCopyNotice] = useState<string | null>(null);
  const [bioInput, setBioInput] = useState(currentUser.bio);

  const handleShareProfile = () => {
    setCopyNotice('Profile link copied to clipboard (Demo simulation).');
    setTimeout(() => setCopyNotice(null), 3000);
  };

  const handleBioSave = () => {
    updateBio(bioInput);
    setIsEditingBio(false);
  };

  const userPosts = posts.filter((p) => p.author.id === currentUser.id);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
      {copyNotice && (
        <div className="p-3 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono rounded-xl text-center">
          {copyNotice}
        </div>
      )}

      {/* Holographic Cover & Header Card */}
      <div className="holo-card rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
        {/* Cover Banner */}
        <div className="h-56 sm:h-72 w-full relative bg-slate-900 overflow-hidden">
          <img
            src={currentUser.coverUrl}
            alt="Profile Cover"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShareProfile}
              className="px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-xs font-mono text-slate-300 hover:text-white backdrop-blur-md flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
            
            {/* Avatar & Identifiers */}
            <div className="flex items-end gap-4">
              <div className="relative group">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.displayName}
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-slate-950 shadow-2xl holo-glow-cyan"
                />
                <div className="absolute bottom-1 right-1 bg-cyan-500 text-slate-950 rounded-full p-1 border-2 border-slate-950">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1 mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-display font-bold text-white">
                    {currentUser.displayName}
                  </h1>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    Tier {currentUser.shopTier} Merchant
                  </span>
                </div>
                <p className="text-xs font-mono text-cyan-400">@{currentUser.handle}</p>
              </div>
            </div>

            {/* Quick Action CTA Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('shop')}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Visit AI Shop</span>
              </button>
              <button
                onClick={() => navigateTo('wallet')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span>Dual Wallet</span>
              </button>
            </div>
          </div>

          {/* Bio & Neural Description */}
          <div className="max-w-3xl space-y-3">
            {isEditingBio ? (
              <div className="space-y-2">
                <textarea
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  rows={3}
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBioSave}
                    className="px-3 py-1 bg-cyan-500 text-slate-950 rounded-lg text-xs font-bold"
                  >
                    Save Bio
                  </button>
                  <button
                    onClick={() => setIsEditingBio(false)}
                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm text-slate-200 leading-relaxed font-sans">{currentUser.bio}</p>
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="text-slate-400 hover:text-cyan-400 p-1 rounded"
                  title="Edit Bio"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Badges Ribbon */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {currentUser.holographicBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>

            {/* Metric Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Followers</span>
                <span className="text-lg font-bold font-mono text-white">
                  {currentUser.followersCount.toLocaleString()}
                </span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Following</span>
                <span className="text-lg font-bold font-mono text-white">{currentUser.followingCount}</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">AI Coins (AIC)</span>
                <span className="text-lg font-bold font-mono text-cyan-400">
                  {currentUser.wallets.aiCoinsBalance}
                </span>
                <span className="text-[9px] text-slate-500 block">Shop Upgrades Only</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Spendable AIPM</span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  ₱{(currentUser.wallets.aiPocketMoneyCentavos / 100).toFixed(2)}
                </span>
                <span className="text-[9px] text-slate-500 block">Simulated Withdrawal Eligibility — Demo Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Showcase Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'posts'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Broadcasts & Posts ({userPosts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('reels')}
            className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'reels'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PlaySquare className="w-4 h-4" />
            <span>Neural Reels ({reels.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'shop'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>AI SHOP Products ({shop.products.length})</span>
          </button>
        </div>

        {/* Tab 1: Posts Grid */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userPosts.map((post) => (
              <div key={post.id} className="holo-card rounded-2xl overflow-hidden border border-slate-800 p-4 space-y-3">
                {post.mediaUrl && (
                  <div className="aspect-video rounded-xl overflow-hidden bg-slate-900">
                    <img
                      src={post.mediaUrl}
                      alt="Post Media"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p className="text-xs text-slate-200 line-clamp-2">{post.caption}</p>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
                  <span>{post.likesCount} likes</span>
                  <span>{post.commentsCount} comments</span>
                  <span>{post.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Reels Grid */}
        {activeTab === 'reels' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {reels.map((reel) => (
              <div
                key={reel.id}
                onClick={() => navigateTo('reels')}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-cyan-400 transition-all shadow-lg"
              >
                <img
                  src={reel.videoCoverUrl}
                  alt={reel.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-3 flex flex-col justify-between">
                  <div className="self-end bg-cyan-950/80 border border-cyan-400/40 rounded px-1.5 py-0.5 text-[9px] font-mono text-cyan-300">
                    +5 AIC Reward
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white line-clamp-2">{reel.title}</p>
                    <p className="text-[10px] text-cyan-300 font-mono mt-1">{reel.viewsCount.toLocaleString()} views</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: AI SHOP Storefront Preview */}
        {activeTab === 'shop' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-purple-950/40 border border-cyan-500/30">
              <div>
                <h3 className="font-display font-bold text-base text-white">{shop.shopName}</h3>
                <p className="text-xs text-slate-300">{shop.description}</p>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                Open Full Shop View
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {shop.products.map((item) => (
                <div key={item.id} className="holo-card rounded-2xl overflow-hidden border border-slate-800 p-4 space-y-2">
                  <div className="aspect-video rounded-xl overflow-hidden bg-slate-900">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono">
                    <span className="text-emerald-400 font-bold">
                      ₱{(item.priceAipmCentavos / 100).toFixed(2)} AIPM
                    </span>
                    <span className="text-slate-500">{item.salesCount} sold</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
