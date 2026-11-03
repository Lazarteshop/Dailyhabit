/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  Post,
  Reel,
  AiShop,
  AiShopProduct,
  WalletTransaction,
  PaymentReceiptReview,
  ChatMessage,
} from '../types/index.ts';

// Generated image assets (ESM imports for Vite production bundling)
import HERO_AVATAR from '../assets/images/dailyhabit_hero_avatar_1793662268082.jpg';
import REEL_COVER from '../assets/images/dailyhabit_reel_cover_1793662268789.jpg';
import SHOP_PRODUCT from '../assets/images/dailyhabit_shop_product_1793662269237.jpg';
import PROFILE_BANNER from '../assets/images/dailyhabit_profile_banner_1793662268873.jpg';

interface DailyHabitContextType {
  // Navigation & Role
  currentRoute: string;
  navigateTo: (route: string) => void;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;

  // User State
  currentUser: UserProfile;
  updateBio: (newBio: string) => void;

  // Social Feed & Posts
  posts: Post[];
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  createPost: (caption: string, mediaUrl?: string, visibility?: 'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE') => void;

  // Reels & Video Rewards
  reels: Reel[];
  activeReelIndex: number;
  setActiveReelIndex: (index: number) => void;
  toggleLikeReel: (reelId: string) => void;
  claimReelReward: (reelId: string) => { success: boolean; message: string; coinsEarned: number };
  dailyViewCount: number;

  // AI SHOP
  shop: AiShop;
  upgradeShopTier: (targetTier: 2 | 3) => { success: boolean; message: string };
  purchaseProduct: (productId: string) => { success: boolean; message: string };

  // Dual Wallet & Financials
  walletTransactions: WalletTransaction[];
  requestSimulatedTopUp: (amountPhp: number, gcashRef: string) => { success: boolean; message: string };
  requestSimulatedWithdrawal: (amountPhp: number, gcashNumber: string) => { success: boolean; message: string };
  promotePostWithAipm: (postId: string, budgetPhp: number) => { success: boolean; message: string };

  // Verification Queue (Assistant & Main Admin)
  receiptQueue: PaymentReceiptReview[];
  assistantClaimReceipt: (receiptId: string) => { success: boolean; message: string };
  assistantRecommendDecision: (receiptId: string, decision: 'APPROVE' | 'REJECT', notes?: string) => void;
  mainAdminFinalDecision: (receiptId: string, decision: 'APPROVE' | 'REJECT') => void;

  // AI Assistant Chat
  chatMessages: ChatMessage[];
  sendAssistantMessage: (text: string) => void;
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;

  // Notifications
  notifications: Array<{ id: string; title: string; desc: string; time: string; read: boolean }>;
  unreadNotificationsCount: number;
  markNotificationsAsRead: () => void;
}

const INITIAL_USER: UserProfile = {
  id: 'usr_kaelen_01',
  handle: 'kaelen_cyber',
  displayName: 'Kaelen Reyes',
  avatarUrl: HERO_AVATAR,
  coverUrl: PROFILE_BANNER,
  bio: 'Cyberpunk creator & holographic sound architect based in Neo-Manila. Minting immersive neural media & digital gear.',
  role: 'USER',
  followersCount: 14280,
  followingCount: 420,
  reputationScore: 98,
  holographicBadges: ['NEURAL CREATOR', 'TOP 1% MANILA (DEMO BADGE)', 'VERIFIED AI MERCHANT (DEMO BADGE)'],
  shopTier: 1,
  wallets: {
    aiCoinsBalance: 320, // AIC: Strictly shop upgrades (DEMO ONLY — NO REAL VALUE)
    aiPocketMoneyCentavos: 425000, // ₱4,250.00 AIPM (DEMO ONLY — NO REAL VALUE)
    pendingWithdrawalCentavos: 0,
    pendingClearingCentavos: 18000, // ₱180.00 in demo clearing
  },
};

const INITIAL_POSTS: Post[] = [
  {
    id: 'post_01',
    author: {
      id: 'usr_kaelen_01',
      handle: 'kaelen_cyber',
      displayName: 'Kaelen Reyes',
      avatarUrl: HERO_AVATAR,
      role: 'USER',
      badge: 'VERIFIED CREATOR',
    },
    caption: 'Testing the new spatial holographic soundstage in BGC. Lighting cues synced directly with neural frequencies. Full demo dropping in my AI SHOP tomorrow! ⚡🌌',
    mediaUrl: REEL_COVER,
    mediaType: 'IMAGE',
    visibility: 'PUBLIC',
    likesCount: 1248,
    commentsCount: 89,
    sharesCount: 142,
    isLiked: false,
    isSaved: false,
    createdAt: '25m ago',
    tags: ['#NeoManila', '#CyberAesthetics', '#AIShop', '#Holographic'],
    comments: [
      {
        id: 'comm_1',
        postId: 'post_01',
        author: {
          id: 'usr_mira_02',
          handle: 'mira_flux',
          displayName: 'Mira Takahashi',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        },
        content: 'The chromatic rim lighting looks unbelievable! Can this audio preset load in AI Shop Tier 1?',
        createdAt: '18m ago',
      },
      {
        id: 'comm_2',
        postId: 'post_01',
        author: {
          id: 'usr_renzo_03',
          handle: 'renzo_grid',
          displayName: 'Renzo Santos',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        },
        content: 'Just unlocked Tier 2 using my AI Coins. Can confirm the latency is zero.',
        createdAt: '10m ago',
      },
    ],
  },
  {
    id: 'post_02',
    author: {
      id: 'usr_elena_04',
      handle: 'elena_quantum',
      displayName: 'Elena Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      role: 'USER',
      badge: 'PRO MERCHANT',
    },
    caption: 'Fresh inventory restocked in my holographic showroom: Aetherial Octahedron Relics. Powered by neural prompt weights and optimized for high-velocity creators.',
    mediaUrl: SHOP_PRODUCT,
    mediaType: 'IMAGE',
    visibility: 'PUBLIC',
    likesCount: 892,
    commentsCount: 44,
    sharesCount: 78,
    isLiked: true,
    isSaved: true,
    createdAt: '2h ago',
    tags: ['#DigitalCommerce', '#AIPocketMoney', '#Collectibles'],
    comments: [
      {
        id: 'comm_3',
        postId: 'post_02',
        author: {
          id: 'usr_kaelen_01',
          handle: 'kaelen_cyber',
          displayName: 'Kaelen Reyes',
          avatarUrl: HERO_AVATAR,
        },
        content: 'Secured one using my creator earnings balance! Quality is phenomenal.',
        createdAt: '1h ago',
      },
    ],
  },
  {
    id: 'post_03',
    author: {
      id: 'usr_danilo_asst',
      handle: 'danilo_admin_asst',
      displayName: 'Danilo Ramos (Verification Lead)',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      role: 'ADMIN_ASSISTANT',
      badge: 'VERIFIED ASSISTANT',
    },
    caption: 'Daily Notice: Top-up verification queues operate 09:00 - 18:00 PHT on Philippine banking business days. All assistant recommendations are subject to final Main Admin bank reconciliation.',
    mediaUrl: PROFILE_BANNER,
    mediaType: 'IMAGE',
    visibility: 'PUBLIC',
    likesCount: 412,
    commentsCount: 19,
    sharesCount: 88,
    isLiked: false,
    isSaved: false,
    createdAt: '5h ago',
    tags: ['#SystemBulletin', '#GCashVerification', '#DailyHabitSecurity'],
    comments: [],
  },
];

const INITIAL_REELS: Reel[] = [
  {
    id: 'reel_01',
    creator: {
      id: 'usr_kaelen_01',
      handle: 'kaelen_cyber',
      displayName: 'Kaelen Reyes',
      avatarUrl: HERO_AVATAR,
    },
    title: 'Neon Skyline Live Performance — Manila 2077',
    caption: 'Synthesized cyber beats on a transparent holographic stage in Bonifacio Global City. Earn 5 AI Coins for watching complete 30s session!',
    videoCoverUrl: REEL_COVER,
    viewsCount: 45280,
    likesCount: 3890,
    commentsCount: 312,
    isLiked: false,
    rewardCoinsEarned: 5,
  },
  {
    id: 'reel_02',
    creator: {
      id: 'usr_elena_04',
      handle: 'elena_quantum',
      displayName: 'Elena Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    },
    title: 'Holographic Product Unboxing & Setup',
    caption: 'How to unlock Tier 2 AI Shop using your watch rewards without spending cash. Step-by-step walkthrough.',
    videoCoverUrl: SHOP_PRODUCT,
    viewsCount: 31800,
    likesCount: 2450,
    commentsCount: 184,
    isLiked: true,
    rewardCoinsEarned: 5,
  },
];

const INITIAL_SHOP_PRODUCTS: AiShopProduct[] = [
  {
    id: 'prod_01',
    title: 'Aetherial Octahedron Neural Relic',
    category: 'DIGITAL_ASSET',
    priceAipmCentavos: 125000, // ₱1,250.00 AIPM
    requiredTier: 1,
    description: '3D interactive floating hologram asset with customizable chromatic light rings and embedded haptic triggers.',
    imageUrl: SHOP_PRODUCT,
    salesCount: 84,
    rating: 4.9,
  },
  {
    id: 'prod_02',
    title: 'Neo-Manila Night Aesthetic LUT & Shader Pack',
    category: 'COMMERCE_PRESET',
    priceAipmCentavos: 75000, // ₱750.00 AIPM
    requiredTier: 1,
    description: '12 calibrated visual grading shaders for reels, avatars, and video posts with cyber cyan and deep violet tones.',
    imageUrl: PROFILE_BANNER,
    salesCount: 230,
    rating: 4.8,
  },
  {
    id: 'prod_03',
    title: 'Autonomous Creator Assistant Prompt Matrix',
    category: 'AI_PROMPT_PACK',
    priceAipmCentavos: 195000, // ₱1,950.00 AIPM
    requiredTier: 2,
    description: 'Advanced conversational workflows for automated subscriber engagement, comment sentiment triage, and sponsorship pitch decks.',
    imageUrl: HERO_AVATAR,
    salesCount: 52,
    rating: 5.0,
  },
  {
    id: 'prod_04',
    title: 'Quantum Dynamic Micro-Showcase Module',
    category: 'DIGITAL_ASSET',
    priceAipmCentavos: 350000, // ₱3,500.00 AIPM
    requiredTier: 3,
    description: 'Tier 3 exclusive: interactive WebGL 3D showcase component with real-time dynamic inventory rotation and instant checkout.',
    imageUrl: SHOP_PRODUCT,
    salesCount: 19,
    rating: 4.95,
  },
];

const INITIAL_SHOP: AiShop = {
  id: 'shop_kaelen_01',
  ownerId: 'usr_kaelen_01',
  shopName: "Kaelen's Cybernetic Emporium",
  tier: 1,
  description: 'Official digital storefront of Kaelen Reyes. Featuring custom shaders, holographic relics, and creative prompt modules.',
  bannerUrl: PROFILE_BANNER,
  products: INITIAL_SHOP_PRODUCTS,
  totalSalesCentavos: 894000, // ₱8,940.00 total sales
};

const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx_01',
    type: 'CREATOR_REWARD',
    amountCentavos: 65000,
    description: 'DEMO ONLY — Simulated Creator Reward Allocation (Sample Demo Credit — No Real Value)',
    status: 'COMPLETED',
    date: 'Today, 2:15 PM',
    referenceNumber: 'DH-CR-89241',
  },
  {
    id: 'tx_02',
    type: 'TOPUP',
    amountCentavos: 100000,
    description: 'DEMO ONLY — Simulated GCash Top-Up (Ref: 80234918234) — Approved in Demo Console',
    status: 'COMPLETED',
    date: 'Yesterday, 4:40 PM',
    referenceNumber: 'DH-TU-77192',
  },
  {
    id: 'tx_03',
    type: 'SHOP_UPGRADE',
    amountCentavos: 0,
    amountCoins: 100,
    description: 'DEMO ONLY — Simulated AI SHOP Upgrade to Tier 1 Core Storefront (Burned 100 AIC)',
    status: 'COMPLETED',
    date: 'Nov 01, 2026',
    referenceNumber: 'DH-SU-44120',
  },
];

const INITIAL_RECEIPT_QUEUE: PaymentReceiptReview[] = [
  {
    id: 'rcpt_101',
    userId: 'usr_user_882',
    userDisplayName: 'Mateo De Leon',
    gcashNumberMasked: '+639*****4182',
    gcashReference: '202611029871625',
    amountCentavos: 100000, // ₱1,000.00
    status: 'ASSIGNED',
    assignedAssistantId: 'usr_danilo_asst',
    assignedAssistantName: 'Danilo Ramos',
    quarantineProofUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
    createdAt: '12m ago',
    commissionCentavos: 1000, // ₱10.00 (Tier 1 Commission)
  },
  {
    id: 'rcpt_102',
    userId: 'usr_user_991',
    userDisplayName: 'Althea Soriano',
    gcashNumberMasked: '+639*****9014',
    gcashReference: '202611021142981',
    amountCentavos: 500000, // ₱5,000.00
    status: 'PENDING_ASSIGNMENT',
    quarantineProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    createdAt: '4m ago',
    commissionCentavos: 2500, // ₱25.00 (Tier 2 Commission)
  },
  {
    id: 'rcpt_103',
    userId: 'usr_user_443',
    userDisplayName: 'Carlos Mendoza',
    gcashNumberMasked: '+639*****5521',
    gcashReference: '202611028472910',
    amountCentavos: 250000, // ₱2,500.00
    status: 'RECOMMENDED_APPROVAL',
    assignedAssistantId: 'usr_danilo_asst',
    assignedAssistantName: 'Danilo Ramos',
    quarantineProofUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
    createdAt: '22m ago',
    commissionCentavos: 1000,
    adminNotes: 'Assistant Danilo checked transaction reference on terminal. Awaiting final Main Admin bank reconciliation.',
  },
];

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_1',
    sender: 'assistant',
    text: "Mabuhay Kaelen! I am your Personal AI Assistant for DAILYHABIT. How can I optimize your holographic content, AI SHOP tiers, or wallet strategies today?",
    timestamp: 'Just now',
    suggestedActions: [
      { label: 'Check AI Coins & Upgrade Shop', action: 'upgrade_shop' },
      { label: 'Review Creator Earnings (AIPM)', action: 'view_wallet' },
      { label: 'Boost Reel with Ad Campaign', action: 'promote_post' },
      { label: 'View Philippine Settlement Rules', action: 'settlement_rules' },
    ],
  },
];

const DailyHabitContext = createContext<DailyHabitContextType | undefined>(undefined);

export const DailyHabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Deep Linking
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [currentRole, setCurrentRole] = useState<UserRole>('USER');

  // Core State
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [reels, setReels] = useState<Reel[]>(INITIAL_REELS);
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);
  const [dailyViewCount, setDailyViewCount] = useState<number>(14); // Out of 100 daily limit
  const [shop, setShop] = useState<AiShop>(INITIAL_SHOP);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [receiptQueue, setReceiptQueue] = useState<PaymentReceiptReview[]>(INITIAL_RECEIPT_QUEUE);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif_1',
      title: 'Demo Creator Reward Allocated',
      desc: '₱650.00 demo AIPM allocated to your simulated balance (Sample data only).',
      time: '1h ago',
      read: false,
    },
    {
      id: 'notif_2',
      title: '5 Demo AI Coins Awarded',
      desc: 'Added 5 demo AIC for simulated playback session. Strictly for demo AI SHOP tier upgrades!',
      time: '3h ago',
      read: false,
    },
    {
      id: 'notif_3',
      title: 'New Comment on Soundstage Post',
      desc: 'Mira Takahashi commented on your holographic audio preview.',
      time: '5h ago',
      read: true,
    },
  ]);

  // Deep linking sync with browser URL hash/pathname
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '') || 'home';
      if (['home', 'reels', 'profile', 'shop', 'assistant', 'wallet', 'admin', 'adminassitant', 'auth'].includes(path)) {
        setCurrentRoute(path);
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState(null, '', `/${route === 'home' ? '' : route}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser((prev) => ({
      ...prev,
      role,
      displayName:
        role === 'MAIN_ADMIN'
          ? 'System Master Admin'
          : role === 'ADMIN_ASSISTANT'
          ? 'Danilo Ramos (Verification Lead)'
          : 'Kaelen Reyes',
      handle:
        role === 'MAIN_ADMIN'
          ? 'main_admin_sys'
          : role === 'ADMIN_ASSISTANT'
          ? 'danilo_admin_asst'
          : 'kaelen_cyber',
    }));

    // Auto-navigate to respective operational dashboard if switching roles
    if (role === 'ADMIN_ASSISTANT') {
      navigateTo('adminassitant');
    } else if (role === 'MAIN_ADMIN') {
      navigateTo('admin');
    }
  };

  const updateBio = (newBio: string) => {
    setCurrentUser((prev) => ({ ...prev, bio: newBio }));
  };

  // Social interactions
  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likesCount: isLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1),
          };
        }
        return post;
      })
    );
  };

  const toggleSavePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post))
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!content.trim()) return;
    const newComment = {
      id: `comm_${Date.now()}`,
      postId,
      author: {
        id: currentUser.id,
        handle: currentUser.handle,
        displayName: currentUser.displayName,
        avatarUrl: currentUser.avatarUrl,
      },
      content,
      createdAt: 'Just now',
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [newComment, ...(post.comments || [])],
          };
        }
        return post;
      })
    );
  };

  const createPost = (caption: string, mediaUrl?: string, visibility: 'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE' = 'PUBLIC') => {
    if (!caption.trim()) return;
    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: {
        id: currentUser.id,
        handle: currentUser.handle,
        displayName: currentUser.displayName,
        avatarUrl: currentUser.avatarUrl,
        role: currentUser.role,
        badge: 'CREATOR',
      },
      caption,
      mediaUrl: mediaUrl || REEL_COVER,
      mediaType: 'IMAGE',
      visibility,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: false,
      isSaved: false,
      createdAt: 'Just now',
      tags: ['#NeoManila', '#DailyHabitHolo', '#CreatorEconomy'],
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  // Reels watch reward logic (100 views daily cap, 5 AIC per eligible completion)
  const toggleLikeReel = (reelId: string) => {
    setReels((prev) =>
      prev.map((reel) => {
        if (reel.id === reelId) {
          const isLiked = !reel.isLiked;
          return {
            ...reel,
            isLiked,
            likesCount: isLiked ? reel.likesCount + 1 : Math.max(0, reel.likesCount - 1),
          };
        }
        return reel;
      })
    );
  };

  const claimReelReward = (reelId: string) => {
    if (dailyViewCount >= 100) {
      return {
        success: false,
        message: 'Daily rewarded view cap reached (100/100 views in Asia/Manila calendar day). Session completed with 0 AIC.',
        coinsEarned: 0,
      };
    }

    // Award 5 AI Coins to user wallet
    const coinsToAward = 5;
    setDailyViewCount((prev) => prev + 1);
    setCurrentUser((prev) => ({
      ...prev,
      wallets: {
        ...prev.wallets,
        aiCoinsBalance: prev.wallets.aiCoinsBalance + coinsToAward,
      },
    }));

    return {
      success: true,
      message: `DEMO ONLY — NO REAL VALUE: Simulated playback completed. +${coinsToAward} demo AI Coins added to demo Shop Upgrades balance (${dailyViewCount + 1}/100 demo views). Demo coins carry zero cash value and cannot be withdrawn or converted to fiat.`,
      coinsEarned: coinsToAward,
    };
  };

  // AI SHOP tier upgrades using AI Coins (Strict non-cash token)
  const upgradeShopTier = (targetTier: 2 | 3) => {
    const requiredCoins = targetTier === 2 ? 100 : 250;
    if (currentUser.wallets.aiCoinsBalance < requiredCoins) {
      return {
        success: false,
        message: `Insufficient AI Coins. Upgrading to Tier ${targetTier} requires ${requiredCoins} AIC. (Current Balance: ${currentUser.wallets.aiCoinsBalance} AIC). Watch more video reels to earn AIC for free!`,
      };
    }

    // Deduct coins & upgrade tier
    setCurrentUser((prev) => ({
      ...prev,
      shopTier: targetTier,
      wallets: {
        ...prev.wallets,
        aiCoinsBalance: prev.wallets.aiCoinsBalance - requiredCoins,
      },
    }));

    setShop((prev) => ({
      ...prev,
      tier: targetTier,
    }));

    // Log transaction
    const newTx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      type: 'SHOP_UPGRADE',
      amountCentavos: 0,
      amountCoins: requiredCoins,
      description: `AI SHOP Tier ${targetTier} Activation (Burned ${requiredCoins} AIC)`,
      status: 'COMPLETED',
      date: 'Just now',
      referenceNumber: `DH-SU-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    setWalletTransactions((prev) => [newTx, ...prev]);

    return {
      success: true,
      message: `Congratulations! Your AI SHOP has been upgraded to Tier ${targetTier} with advanced holographic modules unlocked!`,
    };
  };

  // Purchase product using AI Pocket Money (AIPM)
  const purchaseProduct = (productId: string) => {
    const product = shop.products.find((p) => p.id === productId);
    if (!product) return { success: false, message: 'Product not found.' };

    if (currentUser.wallets.aiPocketMoneyCentavos < product.priceAipmCentavos) {
      const deficitPhp = (product.priceAipmCentavos - currentUser.wallets.aiPocketMoneyCentavos) / 100;
      return {
        success: false,
        message: `Insufficient AI Pocket Money. Need additional ₱${deficitPhp.toFixed(2)} AIPM to complete purchase. Top up your wallet via GCash first.`,
      };
    }

    // Deduct balance
    setCurrentUser((prev) => ({
      ...prev,
      wallets: {
        ...prev.wallets,
        aiPocketMoneyCentavos: prev.wallets.aiPocketMoneyCentavos - product.priceAipmCentavos,
      },
    }));

    const newTx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      type: 'SHOP_UPGRADE',
      amountCentavos: product.priceAipmCentavos,
      description: `Purchased "${product.title}" from AI SHOP`,
      status: 'COMPLETED',
      date: 'Just now',
      referenceNumber: `DH-PUR-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    setWalletTransactions((prev) => [newTx, ...prev]);

    return {
      success: true,
      message: `Purchased "${product.title}" for ₱${(product.priceAipmCentavos / 100).toFixed(2)} AIPM. Download link unlocked in your Creator Portfolio!`,
    };
  };

  // Top-Up Request: User enters GCash reference with static sample image preview
  const requestSimulatedTopUp = (amountPhp: number, gcashRef: string) => {
    if (amountPhp < 100) {
      return { success: false, message: 'Minimum demo GCash top-up is ₱100.00.' };
    }
    if (!gcashRef || gcashRef.length < 8) {
      return { success: false, message: 'Please provide a valid 8+ digit GCash reference number.' };
    }

    const amountCentavos = Math.round(amountPhp * 100);
    // Illustrative assistant commission simulation tier (₱10 - ₱800 policy)
    let commCentavos = 1000; // ₱10.00
    if (amountPhp > 50000) commCentavos = 80000; // ₱800.00
    else if (amountPhp > 10000) commCentavos = 10000; // ₱100.00
    else if (amountPhp > 2500) commCentavos = 2500; // ₱25.00

    const newReviewItem: PaymentReceiptReview = {
      id: `rcpt_${Date.now()}`,
      userId: currentUser.id,
      userDisplayName: currentUser.displayName,
      gcashNumberMasked: '+639*****' + Math.floor(1000 + Math.random() * 9000),
      gcashReference: gcashRef,
      amountCentavos,
      status: 'PENDING_ASSIGNMENT',
      quarantineProofUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
      createdAt: 'Just now',
      commissionCentavos: commCentavos,
    };

    setReceiptQueue((prev) => [newReviewItem, ...prev]);

    return {
      success: true,
      message: `DEMO ONLY — NO REAL VALUE: Simulated top-up of ₱${amountPhp.toFixed(2)} submitted to demo queue. Sample proof preview used (no files or real money processed). An Admin Assistant can review and recommend approval in the demo console.`,
    };
  };

  // Withdrawal Request: Demonstration simulation with ₱100 minimum & ₱15 transfer fee display
  const requestSimulatedWithdrawal = (amountPhp: number, gcashNumber: string) => {
    const grossCentavos = Math.round(amountPhp * 100);
    const surchargeCentavos = 1500; // ₱15.00 transfer fee display-only simulation

    if (amountPhp < 100) {
      return { success: false, message: 'Minimum demo withdrawal amount is ₱100.00 (Payout schedule: 5th & 20th of the month).' };
    }
    if (currentUser.wallets.aiPocketMoneyCentavos < grossCentavos) {
      return {
        success: false,
        message: `Insufficient demo spendable balance. You have ₱${(currentUser.wallets.aiPocketMoneyCentavos / 100).toFixed(2)} AIPM available.`,
      };
    }

    const netPayoutCentavos = grossCentavos - surchargeCentavos;

    // Deduct demo spendable AIPM and reserve in Account 2020 for display simulation
    setCurrentUser((prev) => ({
      ...prev,
      wallets: {
        ...prev.wallets,
        aiPocketMoneyCentavos: prev.wallets.aiPocketMoneyCentavos - grossCentavos,
        pendingWithdrawalCentavos: prev.wallets.pendingWithdrawalCentavos + grossCentavos,
      },
    }));

    const newTx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      type: 'WITHDRAWAL',
      amountCentavos: grossCentavos,
      description: `DEMO ONLY — Simulated GCash payout to ${gcashNumber} (Net: ₱${(netPayoutCentavos / 100).toFixed(2)}, Fee: ₱15.00 simulated). Batch dates: 5th & 20th.`,
      status: 'PENDING',
      date: 'Just now',
      referenceNumber: `DH-WD-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    setWalletTransactions((prev) => [newTx, ...prev]);

    return {
      success: true,
      message: `DEMO ONLY — NO REAL VALUE: Withdrawal of ₱${amountPhp.toFixed(2)} simulated. Demonstration reservation placed in Account 2020 (Batch dates: every 5th and 20th). No real funds or fees are collected.`,
    };
  };

  // Promote post using AIPM budget: Clearly labeled non-functional preview only (Zero deductions, no AD_CAMPAIGN tx)
  const promotePostWithAipm = (postId: string, budgetPhp: number) => {
    return {
      success: true,
      message: `DEMO PREVIEW ONLY: Post Boost preview activated for post (${postId}) with ₱${budgetPhp.toFixed(2)} simulated tier. No AIPM balance was deducted and no ad campaign was created.`,
    };
  };

  // Verification Queue Handlers
  const assistantClaimReceipt = (receiptId: string) => {
    setReceiptQueue((prev) =>
      prev.map((item) => {
        if (item.id === receiptId && item.status === 'PENDING_ASSIGNMENT') {
          return {
            ...item,
            status: 'ASSIGNED',
            assignedAssistantId: currentUser.id,
            assignedAssistantName: currentUser.displayName,
          };
        }
        return item;
      })
    );
    return { success: true, message: 'DEMO QUEUE: Receipt claimed for 15-minute simulated review lease.' };
  };

  const assistantRecommendDecision = (receiptId: string, decision: 'APPROVE' | 'REJECT', notes?: string) => {
    setReceiptQueue((prev) =>
      prev.map((item) => {
        if (item.id === receiptId) {
          return {
            ...item,
            status: decision === 'APPROVE' ? 'RECOMMENDED_APPROVAL' : 'RECOMMENDED_REJECTION',
            adminNotes: notes || (decision === 'APPROVE' ? 'Assistant reviewed sample proof and reference.' : 'Sample proof rejected.'),
          };
        }
        return item;
      })
    );
  };

  // Main Admin Final Verification & Approval: Simulated demo workflow (No cryptographic or atomic claims)
  const mainAdminFinalDecision = (receiptId: string, decision: 'APPROVE' | 'REJECT') => {
    const item = receiptQueue.find((r) => r.id === receiptId);
    if (!item) return;

    if (decision === 'APPROVE') {
      // 1. Credit the user's demo spendable AIPM
      if (item.userId === currentUser.id) {
        setCurrentUser((prev) => ({
          ...prev,
          wallets: {
            ...prev.wallets,
            aiPocketMoneyCentavos: prev.wallets.aiPocketMoneyCentavos + item.amountCentavos,
          },
        }));
      }

      // 2. Update queue status
      setReceiptQueue((prev) =>
        prev.map((r) => (r.id === receiptId ? { ...r, status: 'APPROVED' } : r))
      );

      // 3. Log completed top-up transaction as demo only
      const newTx: WalletTransaction = {
        id: `tx_${Date.now()}`,
        type: 'TOPUP',
        amountCentavos: item.amountCentavos,
        description: `DEMO ONLY — Simulated GCash Top-Up (Ref: ${item.gcashReference}) — Demo Console Approved`,
        status: 'COMPLETED',
        date: 'Just now',
        referenceNumber: `DH-VAULT-${Math.floor(10000 + Math.random() * 90000)}`,
      };
      setWalletTransactions((prev) => [newTx, ...prev]);
    } else {
      // Reject
      setReceiptQueue((prev) =>
        prev.map((r) => (r.id === receiptId ? { ...r, status: 'REJECTED' } : r))
      );
    }
  };

  // AI Assistant Chat Logic
  const sendAssistantMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Simulated Intelligent Assistant Response
    setTimeout(() => {
      let reply = "I analyzed your request through the DAILYHABIT neural engine. How else may I assist with your creator strategy?";
      let actions = [
        { label: 'Check AI Coins & Upgrade Shop', action: 'upgrade_shop' },
        { label: 'Review Creator Earnings (AIPM)', action: 'view_wallet' },
      ];

      const lower = text.toLowerCase();
      if (lower.includes('coin') || lower.includes('upgrade') || lower.includes('tier') || lower.includes('shop')) {
        reply = `DEMO ONLY — NO REAL VALUE: You currently hold ${currentUser.wallets.aiCoinsBalance} demo AI Coins (AIC). Remember: AI Coins carry zero cash value and cannot be withdrawn. They are strictly utility tokens for demo AI SHOP tier upgrades (Tier 2 requires 100 AIC, Tier 3 requires 250 AIC).`;
        actions = [
          { label: 'Go to AI SHOP', action: 'NAV:shop' },
          { label: 'Watch Reels for Demo AIC', action: 'NAV:reels' },
        ];
      } else if (lower.includes('withdraw') || lower.includes('gcash') || lower.includes('pocket money') || lower.includes('payout')) {
        reply = `DEMO ONLY: Your demo spendable AI Pocket Money is ₱${(currentUser.wallets.aiPocketMoneyCentavos / 100).toFixed(2)} AIPM (Sample data only). Minimum demo withdrawal is ₱100.00 with an illustrative ₱15.00 transfer fee simulation. Scheduled demo payout batches run every 5th and 20th of the month. No real funds or fees are collected.`;
        actions = [
          { label: 'Open Dual Wallet', action: 'NAV:wallet' },
        ];
      } else if (lower.includes('promote') || lower.includes('boost') || lower.includes('ad')) {
        reply = `DEMO PREVIEW ONLY: Post Boost is a display-only preview in Phase 1B. You can explore boost tiers and simulated reach counters, but no AIPM balance will be deducted and no live ad campaigns will be broadcast.`;
        actions = [
          { label: 'View Feed & Boost Preview', action: 'NAV:home' },
        ];
      }

      const botMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'assistant',
        text: reply,
        timestamp: 'Just now',
        suggestedActions: actions,
      };

      setChatMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <DailyHabitContext.Provider
      value={{
        currentRoute,
        navigateTo,
        currentRole,
        switchRole,
        currentUser,
        updateBio,
        posts,
        toggleLikePost,
        toggleSavePost,
        addComment,
        createPost,
        reels,
        activeReelIndex,
        setActiveReelIndex,
        toggleLikeReel,
        claimReelReward,
        dailyViewCount,
        shop,
        upgradeShopTier,
        purchaseProduct,
        walletTransactions,
        requestSimulatedTopUp,
        requestSimulatedWithdrawal,
        promotePostWithAipm,
        receiptQueue,
        assistantClaimReceipt,
        assistantRecommendDecision,
        mainAdminFinalDecision,
        chatMessages,
        sendAssistantMessage,
        isAssistantOpen,
        setIsAssistantOpen,
        notifications,
        unreadNotificationsCount,
        markNotificationsAsRead,
      }}
    >
      {children}
    </DailyHabitContext.Provider>
  );
};

export const useDailyHabit = () => {
  const context = useContext(DailyHabitContext);
  if (!context) {
    throw new Error('useDailyHabit must be used within a DailyHabitProvider');
  }
  return context;
};
