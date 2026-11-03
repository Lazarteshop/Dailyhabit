/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useDailyHabit } from '../context/DailyHabitContext.tsx';
import {
  Heart,
  MessageCircle,
  Share2,
  Coins,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Clock,
  ShieldAlert,
  Flame,
} from 'lucide-react';

export const ReelsView: React.FC = () => {
  const {
    reels,
    activeReelIndex,
    setActiveReelIndex,
    toggleLikeReel,
    claimReelReward,
    dailyViewCount,
    navigateTo,
  } = useDailyHabit();

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(0);
  const [rewardClaimedForActive, setRewardClaimedForActive] = useState<boolean>(false);
  const [rewardNotice, setRewardNotice] = useState<string | null>(null);

  const activeReel = reels[activeReelIndex] || reels[0];

  // 30-second playback timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying && playbackSeconds < 30 && !rewardClaimedForActive) {
      interval = setInterval(() => {
        setPlaybackSeconds((prev) => {
          if (prev >= 29) {
            clearInterval(interval);
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSeconds, rewardClaimedForActive]);

  // Reset timer on reel switch
  useEffect(() => {
    setPlaybackSeconds(0);
    setRewardClaimedForActive(false);
    setRewardNotice(null);
  }, [activeReelIndex]);

  const handleNextReel = () => {
    if (activeReelIndex < reels.length - 1) {
      setActiveReelIndex(activeReelIndex + 1);
    } else {
      setActiveReelIndex(0);
    }
  };

  const handlePrevReel = () => {
    if (activeReelIndex > 0) {
      setActiveReelIndex(activeReelIndex - 1);
    } else {
      setActiveReelIndex(reels.length - 1);
    }
  };

  const handleClaimReward = () => {
    const res = claimReelReward(activeReel.id);
    setRewardClaimedForActive(true);
    setRewardNotice(res.message);
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 min-h-[calc(100vh-140px)] flex flex-col justify-center">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between mb-4 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white uppercase tracking-wider">Holographic Neural Reels</span>
          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold">
            DEMO ONLY — NO REAL VALUE
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <span className="text-slate-400">Daily Rewards Cap:</span>
          <span className="bg-cyan-950 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded font-bold">
            {dailyViewCount}/100 Completed
          </span>
        </div>
      </div>

      {toastMessage && (
        <div className="mb-3 text-center text-xs font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 p-2 rounded-xl">
          {toastMessage}
        </div>
      )}

      {/* Main Reel Card Container (Vertical 9:16 layout) */}
      <div className="relative mx-auto w-full max-w-md h-[580px] sm:h-[640px] rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
        
        {/* Background Video / Animated Image */}
        <img
          src={activeReel.videoCoverUrl}
          alt={activeReel.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none"
        />

        {/* Ambient Overlay Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/90" />

        {/* Top Floating Reward Progress Bar (30 seconds target) */}
        <div className="absolute top-4 left-4 right-4 z-20">
          <div className="bg-slate-950/80 backdrop-blur-md rounded-xl p-2.5 border border-cyan-500/30 shadow-lg">
            <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
              <span className="text-cyan-300 flex items-center gap-1 font-semibold">
                <Coins className="w-3.5 h-3.5 text-cyan-400" />
                Simulated Playback: {playbackSeconds}s / 30s
              </span>
              <span className="text-amber-400 font-bold text-[10px]">
                {playbackSeconds >= 30 ? 'Demo Reward Ready' : 'Demo Player'}
              </span>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 h-full transition-all duration-1000"
                style={{ width: `${(playbackSeconds / 30) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Play / Pause Toggle Center Indicator */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 z-10 w-full h-full flex items-center justify-center group focus:outline-none"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {!isPlaying && (
            <div className="w-16 h-16 rounded-full bg-slate-950/70 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-2xl backdrop-blur-sm">
              <Play className="w-7 h-7 fill-current ml-1" />
            </div>
          )}
        </button>

        {/* Right Floating Interaction Rail (Like, Comment, Share, Claim, Sound) */}
        <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4">
          {/* Like */}
          <button
            onClick={() => toggleLikeReel(activeReel.id)}
            className="flex flex-col items-center gap-1 text-white hover:text-pink-500 transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-slate-950/60 border border-slate-700/80 flex items-center justify-center backdrop-blur-md">
              <Heart className={`w-5 h-5 ${activeReel.isLiked ? 'text-pink-500 fill-current' : ''}`} />
            </div>
            <span className="text-[10px] font-mono">{activeReel.likesCount}</span>
          </button>

          {/* Comment */}
          <button
            onClick={() => showToast('Comments panel preview active (Phase 1B demo).')}
            className="flex flex-col items-center gap-1 text-white hover:text-cyan-400 transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-slate-950/60 border border-slate-700/80 flex items-center justify-center backdrop-blur-md">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono">{activeReel.commentsCount}</span>
          </button>

          {/* Share */}
          <button
            onClick={() => {
              showToast('Demo reel reference copied to clipboard.');
            }}
            className="flex flex-col items-center gap-1 text-white hover:text-purple-400 transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-slate-950/60 border border-slate-700/80 flex items-center justify-center backdrop-blur-md">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono">Share</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-11 h-11 rounded-full bg-slate-950/60 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white backdrop-blur-md"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Bottom Metadata & Claim Bar */}
        <div className="absolute bottom-4 left-4 right-16 z-20 space-y-2">
          {/* Creator Profile */}
          <div className="flex items-center gap-2.5">
            <img
              src={activeReel.creator.avatarUrl}
              alt={activeReel.creator.displayName}
              className="w-9 h-9 rounded-full object-cover border border-cyan-400"
            />
            <div>
              <p className="text-xs font-bold text-white">{activeReel.creator.displayName}</p>
              <p className="text-[10px] text-cyan-300 font-mono">@{activeReel.creator.handle}</p>
            </div>
            <button className="ml-2 px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[10px] font-semibold text-cyan-300 hover:bg-cyan-500/30">
              Follow
            </button>
          </div>

          {/* Reel Caption */}
          <h2 className="text-xs font-bold text-white line-clamp-1">{activeReel.title}</h2>
          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
            {activeReel.caption}
          </p>

          {/* 30-Second Reward Claim Action */}
          {playbackSeconds >= 30 && !rewardClaimedForActive && (
            <button
              onClick={handleClaimReward}
              className="w-full mt-2 py-2.5 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-slate-950 font-display font-bold text-xs rounded-xl shadow-xl shadow-cyan-500/40 flex items-center justify-center gap-2 animate-bounce"
            >
              <Coins className="w-4 h-4 fill-current" />
              <span>CLAIM +5 DEMO AI COINS (NO REAL VALUE)</span>
            </button>
          )}

          {rewardClaimedForActive && (
            <div className="mt-2 p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-[11px] font-mono text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>DEMO ONLY: +5 AI Coins added. Non-cash, strictly for demo AI SHOP upgrades.</span>
            </div>
          )}

          {rewardNotice && !rewardClaimedForActive && (
            <div className="mt-2 p-2 rounded-xl bg-amber-950/80 border border-amber-500/50 text-[10px] font-mono text-amber-300">
              {rewardNotice}
            </div>
          )}
        </div>

        {/* Up / Down Navigation Controls */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          <button
            onClick={handlePrevReel}
            className="p-1.5 rounded-full bg-slate-900/70 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400"
            title="Previous Reel"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextReel}
            className="p-1.5 rounded-full bg-slate-900/70 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400"
            title="Next Reel"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Rules Banner Footer */}
      <div className="mt-4 text-center text-xs text-slate-500 font-mono">
        <span>Demonstration Reel Playback Simulation (No Auditable Real-World View Tracking)</span>
        <span className="mx-2">·</span>
        <span>Reels index: {activeReelIndex + 1} of {reels.length}</span>
        <span className="mx-2">·</span>
        <button onClick={() => navigateTo('shop')} className="text-cyan-400 underline hover:text-cyan-300">
          Spend AI Coins in AI Shop
        </button>
      </div>
    </div>
  );
};
