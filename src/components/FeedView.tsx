/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDailyHabit } from '../context/DailyHabitContext.tsx';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Send,
  Sparkles,
  TrendingUp,
  Image as ImageIcon,
  Flame,
  Coins,
  Megaphone,
  CheckCircle2,
  Clock,
  Eye,
  Lock,
  Globe,
  Users,
} from 'lucide-react';

export const FeedView: React.FC = () => {
  const {
    posts,
    currentUser,
    toggleLikePost,
    toggleSavePost,
    addComment,
    createPost,
    reels,
    navigateTo,
    promotePostWithAipm,
    dailyViewCount,
  } = useDailyHabit();

  const [filter, setFilter] = useState<'all' | 'trending' | 'following'>('all');
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostVisibility, setNewPostVisibility] = useState<'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE'>('PUBLIC');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [promoteModalPostId, setPromoteModalPostId] = useState<string | null>(null);
  const [promoteBudget, setPromoteBudget] = useState<number>(500); // ₱500 PHP
  const [promoteMessage, setPromoteMessage] = useState<string | null>(null);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostCaption.trim()) return;
    createPost(newPostCaption, undefined, newPostVisibility);
    setNewPostCaption('');
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    addComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handlePromoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoteModalPostId) return;
    const res = promotePostWithAipm(promoteModalPostId, promoteBudget);
    setPromoteMessage(res.message);
    setTimeout(() => {
      setPromoteMessage(null);
      setPromoteModalPostId(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Feed Column (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Holographic Stories / Active Video Reels Strip */}
          <div className="holo-card rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-2 font-display font-semibold text-white tracking-wide">
                <Flame className="w-4 h-4 text-cyan-400" />
                <span>Featured Neural Reels</span>
                <span className="text-slate-500 font-normal">· Demo Rewards (No Real Value)</span>
              </div>
              <button
                onClick={() => navigateTo('reels')}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-xs flex items-center gap-1"
              >
                <span>View All</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {reels.map((reel) => (
                <div
                  key={reel.id}
                  onClick={() => navigateTo('reels')}
                  className="group relative h-48 rounded-xl overflow-hidden cursor-pointer border border-slate-700/60 hover:border-cyan-400 transition-all shadow-md"
                >
                  <img
                    src={reel.videoCoverUrl}
                    alt={reel.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-2.5 flex flex-col justify-between">
                    <div className="self-end bg-cyan-950/80 border border-cyan-400/40 rounded px-1.5 py-0.5 text-[9px] font-mono text-cyan-300 flex items-center gap-1">
                      <Coins className="w-2.5 h-2.5 text-cyan-400" />
                      +5 AIC
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white line-clamp-2 leading-tight">
                        {reel.title}
                      </p>
                      <p className="text-[10px] text-cyan-300/80 font-mono mt-0.5">
                        @{reel.creator.handle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Post Creator Box */}
          <div className="holo-card rounded-2xl p-5 border border-slate-800">
            <div className="flex items-start gap-3">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.displayName}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full border border-cyan-500/40 object-cover shrink-0"
              />
              <form onSubmit={handlePostSubmit} className="flex-1 space-y-3">
                <textarea
                  value={newPostCaption}
                  onChange={(e) => setNewPostCaption(e.target.value)}
                  placeholder="Share a holographic creation, audio drop, or AI SHOP update..."
                  rows={3}
                  className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 text-xs flex items-center gap-1.5 transition-colors"
                      title="Attach Hologram or Image"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">Attach Media</span>
                    </button>

                    {/* Visibility Selector */}
                    <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
                      <button
                        type="button"
                        onClick={() => setNewPostVisibility('PUBLIC')}
                        className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                          newPostVisibility === 'PUBLIC'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Globe className="w-3 h-3 inline mr-1" />
                        Public
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewPostVisibility('FOLLOWERS_ONLY')}
                        className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                          newPostVisibility === 'FOLLOWERS_ONLY'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Users className="w-3 h-3 inline mr-1" />
                        Followers
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!newPostCaption.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Post</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Functional Feed Filter Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filter === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Feed
              </button>
              <button
                onClick={() => setFilter('trending')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 ${
                  filter === 'trending'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Trending
              </button>
              <button
                onClick={() => setFilter('following')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filter === 'following'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Following Only
              </button>
            </div>

            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              Showing {posts.length} verified social broadcasts
            </span>
          </div>

          {/* Social Posts Stream */}
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="holo-card rounded-2xl overflow-hidden border border-slate-800/80 hover:border-slate-700 transition-all shadow-xl"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between border-b border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatarUrl}
                      alt={post.author.displayName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-cyan-500/30"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{post.author.displayName}</span>
                        {post.author.badge && (
                          <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase">
                            · {post.author.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <span>@{post.author.handle}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.createdAt}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-500 uppercase">{post.visibility}</span>
                      </div>
                    </div>
                  </div>

                  {/* Promote Post Modal Trigger (Creator Economy Feature) */}
                  {post.author.id === currentUser.id && (
                    <button
                      onClick={() => setPromoteModalPostId(post.id)}
                      className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-950 to-cyan-950 border border-purple-500/30 hover:border-purple-400 text-purple-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                      title="Promote post with AI Pocket Money (AIPM)"
                    >
                      <Megaphone className="w-3.5 h-3.5 text-purple-400" />
                      <span>Boost</span>
                    </button>
                  )}
                </div>

                {/* Post Media */}
                {post.mediaUrl && (
                  <div className="relative aspect-video max-h-[460px] bg-slate-900 overflow-hidden">
                    <img
                      src={post.mediaUrl}
                      alt="Post visual showcase"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Caption & Tags */}
                <div className="p-4 space-y-3">
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">{post.caption}</p>

                  <div className="flex flex-wrap gap-2 text-xs font-mono text-cyan-400/90">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="hover:underline cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons: Like, Comment, Share, Save */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => toggleLikePost(post.id)}
                        className={`flex items-center gap-1.5 font-mono transition-colors ${
                          post.isLiked ? 'text-pink-500 font-semibold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likesCount}</span>
                      </button>

                      <button
                        onClick={() =>
                          setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                        }
                        className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 font-mono transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.commentsCount}</span>
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText?.(window.location.href);
                          alert('Holographic Post Link copied to clipboard!');
                        }}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-purple-400 font-mono transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>{post.sharesCount}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => toggleSavePost(post.id)}
                      className={`p-1.5 rounded transition-colors ${
                        post.isSaved ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Comment Section (Expanded on Click) */}
                  {activeCommentPostId === post.id && (
                    <div className="pt-3 border-t border-slate-800/80 space-y-3">
                      {/* Comments List */}
                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {post.comments && post.comments.length > 0 ? (
                          post.comments.map((comm) => (
                            <div key={comm.id} className="bg-slate-900/60 rounded-xl p-2.5 text-xs space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={comm.author.avatarUrl}
                                    alt={comm.author.displayName}
                                    className="w-5 h-5 rounded-full object-cover"
                                  />
                                  <span className="font-semibold text-white">{comm.author.displayName}</span>
                                  <span className="text-slate-500 font-mono text-[10px]">@{comm.author.handle}</span>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono">{comm.createdAt}</span>
                              </div>
                              <p className="text-slate-300 pl-7">{comm.content}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-slate-500 py-1">No comments yet. Start the conversation!</p>
                        )}
                      </div>

                      {/* Add Comment Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ''}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                          }
                          onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                          placeholder="Write a neural comment..."
                          className="flex-1 bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                        <button
                          onClick={() => handleCommentSubmit(post.id)}
                          className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-lg text-xs"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Creator Profile Summary & Rewards Info (4 cols) */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6">
          
          {/* Creator Profile Mini Card */}
          <div className="holo-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.displayName}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-xl border border-cyan-500/40 object-cover shadow-lg"
              />
              <div>
                <h3 className="font-display font-bold text-base text-white">{currentUser.displayName}</h3>
                <p className="text-xs text-cyan-400 font-mono">@{currentUser.handle}</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono">
                  <span>{currentUser.followersCount.toLocaleString()} followers</span>
                  <span>·</span>
                  <span>{currentUser.followingCount} following</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{currentUser.bio}</p>

            {/* Holographic Badges */}
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2">
                Holographic Credentials
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.holographicBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-900 border border-cyan-500/30 text-cyan-300 rounded px-2 py-0.5 text-[10px] font-mono flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => navigateTo('profile')}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 transition-colors"
              >
                View Profile
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className="w-full py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-xl text-xs font-medium transition-colors"
              >
                Manage AI Shop
              </button>
            </div>
          </div>

          {/* Daily Watch Rewards Tracker Card */}
          <div className="holo-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-cyan-400" />
                <span className="font-display font-semibold text-sm text-white">Daily Watch Rewards (Demo)</span>
              </div>
              <span className="text-xs font-mono text-cyan-400">{dailyViewCount}/100 Today</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all"
                style={{ width: `${Math.min(100, dailyViewCount)}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Complete 30-second simulated video reels to test the <strong className="text-cyan-300">5 AI Coin</strong> demo reward mechanism. <span className="text-amber-400/90 font-medium">DEMO ONLY — NO REAL VALUE.</span> Not an actual stream credit or financial award.
            </p>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 font-mono space-y-1">
              <p className="text-amber-300/90 font-semibold uppercase">Demo Rules:</p>
              <p>• AI Coins = Demo AI SHOP upgrades only (Non-cash, zero monetary value).</p>
              <p>• AI Pocket Money = Simulated creator value (Sample display only).</p>
            </div>

            <button
              onClick={() => navigateTo('reels')}
              className="w-full py-2 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 rounded-xl text-xs font-medium text-cyan-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Watch Reels & Earn AIC</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Promote Post Modal — Non-functional Preview Only */}
      {promoteModalPostId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="holo-card rounded-2xl max-w-md w-full p-6 border border-purple-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-purple-400" />
                <div>
                  <h3 className="font-display font-bold text-white text-base">Promote Post Preview</h3>
                  <span className="text-[10px] font-mono text-amber-400 block uppercase font-bold">
                    NON-FUNCTIONAL DEMO PREVIEW ONLY
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPromoteModalPostId(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                &times;
              </button>
            </div>

            <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl text-xs text-purple-200 leading-relaxed space-y-1">
              <p className="font-semibold text-purple-300">Campaign Preview Mode:</p>
              <p className="text-slate-300">
                This interface is a display preview of social boost options. Submitting will <strong className="text-white">not deduct real AIPM funds</strong> or launch actual ads.
              </p>
            </div>

            <form onSubmit={handlePromoteSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Simulated Budget Tier (PHP):</label>
                <div className="flex items-center gap-2">
                  {[250, 500, 1000, 2500].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setPromoteBudget(b)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                        promoteBudget === b
                          ? 'bg-purple-600 text-white border-purple-400'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      ₱{b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Simulated Reach:</span>
                  <span className="text-cyan-300">~{((promoteBudget / 500) * 10000).toLocaleString()} preview impressions</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Current Demo Balance:</span>
                  <span className="text-emerald-400">
                    ₱{(currentUser.wallets.aiPocketMoneyCentavos / 100).toFixed(2)} (Untouched)
                  </span>
                </div>
              </div>

              {promoteMessage && (
                <p className="text-xs text-cyan-300 font-mono bg-cyan-950/60 p-2 rounded border border-cyan-500/40">
                  {promoteMessage}
                </p>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPromoteModalPostId(null)}
                  className="flex-1 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-purple-500/20"
                >
                  Test Boost Preview (₱{promoteBudget})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
