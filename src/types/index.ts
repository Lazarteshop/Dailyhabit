/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'USER' | 'ADMIN_ASSISTANT' | 'MAIN_ADMIN';

export interface UserProfile {
  id: string;
  handle: string;
  displayName: string;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  role: UserRole;
  followersCount: number;
  followingCount: number;
  reputationScore: number;
  holographicBadges: string[];
  shopTier: 1 | 2 | 3;
  wallets: {
    aiCoinsBalance: number; // Utility units: SHOP UPGRADES ONLY (Non-cash)
    aiPocketMoneyCentavos: number; // Centavos: 100 = 1.00 PHP (Creator Stored Value)
    pendingWithdrawalCentavos: number; // Centavos reserved for active payouts
    pendingClearingCentavos: number; // Centavos under 48h anti-fraud hold
  };
}

export interface Post {
  id: string;
  author: {
    id: string;
    handle: string;
    displayName: string;
    avatarUrl: string;
    role: UserRole;
    badge?: string;
  };
  caption: string;
  mediaUrl: string;
  mediaType: 'IMAGE' | 'VIDEO';
  visibility: 'PUBLIC' | 'FOLLOWERS_ONLY' | 'PRIVATE';
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
  tags: string[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  postId: string;
  author: {
    id: string;
    handle: string;
    displayName: string;
    avatarUrl: string;
  };
  content: string;
  createdAt: string;
}

export interface Reel {
  id: string;
  creator: {
    id: string;
    handle: string;
    displayName: string;
    avatarUrl: string;
  };
  title: string;
  caption: string;
  videoCoverUrl: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  rewardCoinsEarned: number;
}

export interface AiShopProduct {
  id: string;
  title: string;
  category: 'DIGITAL_ASSET' | 'AI_PROMPT_PACK' | 'NEO_AVATAR' | 'COMMERCE_PRESET';
  priceAipmCentavos: number; // Monetary price in centavos
  requiredTier: 1 | 2 | 3;
  description: string;
  imageUrl: string;
  salesCount: number;
  rating: number;
}

export interface AiShop {
  id: string;
  ownerId: string;
  shopName: string;
  tier: 1 | 2 | 3;
  description: string;
  bannerUrl: string;
  products: AiShopProduct[];
  totalSalesCentavos: number;
}

export interface WalletTransaction {
  id: string;
  type: 'TOPUP' | 'CREATOR_REWARD' | 'SHOP_UPGRADE' | 'WITHDRAWAL' | 'AD_CAMPAIGN';
  amountCentavos: number;
  amountCoins?: number;
  description: string;
  status: 'COMPLETED' | 'PENDING' | 'REJECTED';
  date: string;
  referenceNumber: string;
}

export interface PaymentReceiptReview {
  id: string;
  userId: string;
  userDisplayName: string;
  gcashNumberMasked: string; // e.g. "+639*****1234"
  gcashReference: string;
  amountCentavos: number;
  status: 'PENDING_ASSIGNMENT' | 'ASSIGNED' | 'RECOMMENDED_APPROVAL' | 'RECOMMENDED_REJECTION' | 'APPROVED' | 'REJECTED';
  assignedAssistantId?: string;
  assignedAssistantName?: string;
  quarantineProofUrl: string;
  createdAt: string;
  commissionCentavos: number;
  adminNotes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
}
