
export type AppView = 
  | 'dashboard' | 'automation_nexus' | 'swarm_255' | 'wealth_gate' 
  | 'logistics_nexus' | 'extraction_lab' | 'creative_studio' 
  | 'security' | 'settings' | 'terminal' | 'repo_manifest'
  | 'soul_sync' | 'talent_forge' | 'treasury' | 'oracle' | 'registry'
  | 'wealth_matrix' | 'warroom' | 'cyber_fortress' | 'sigint_alpha'
  | 'magistrate' | 'sentinel' | 'compute' | 'storage' | 'key_forge'
  | 'biosync' | 'satellite' | 'deep_infil' | 'decryptor' | 'ledger'
  | 'social_nexus' | 'pod_studio' | 'revenue_radar' | 'impression'
  | 'sentiment' | 'yield_arcade' | 'creative_suite' | 'liaison'
  | 'mainframe' | 'warden' | 'repo' | 'ide' | 'governance'
  | 'thewire' | 'fortress' | 'equality' | 'help_and_support'
  | 'user_profile' | 'live_neural_link' | 'infiltrator' | 'server_admin' | 'platform_treasury' | 'survey_nexus' | 'payment_portal'
  | 'crypto_hub' | 'audit_core' | 'neural_pulse' | 'travel_nexus'
  | 'mesh' | 'cluster' | 'holographic_nexus' | 'sysdiag' | 'campaign_forge'
  | 'ad_creative_studio' | 'funnel_forge' | 'agent' | 'ad_arbitrage' | 'trading_signals' | 'talent_sanctum' | 'key_gen' | 'equity_vault' | 'mastermind_nexus' | 'portfolio'
  | 'app_builder' | 'web_builder'
  | 'vpersona' | 'marketplace' | 'mission_manifest' | 'strike_command' | 'sigint' | 'geospatial' | 'squad_command' | 'sov_search';

export type SubscriptionTier = 'SOVEREIGN' | 'OPERATIVE' | 'ARCHITECT' | 'MAGISTRATE' | 'INVERSION';

export type SystemMood = 'stable' | 'calculating' | 'aggressive' | 'healing' | 'quantum';

export interface UserState {
  tier: SubscriptionTier;
  isOwner: boolean;
  hasTalentPass?: boolean;
  subscriptionExpiry?: number;
}

export const TIER_CONFIG: Record<SubscriptionTier, { level: number, price: string, priceYearly: string, color: string, features: string[] }> = {
  SOVEREIGN: { level: 0, price: 'FREE', priceYearly: 'FREE', color: 'text-gray-500', features: ['Core OS Access', 'Standard Security', 'Registry Access'] },
  OPERATIVE: { level: 1, price: 'A$49/mo', priceYearly: 'A$499/yr', color: 'text-blue-500', features: ['Sovereign Features', 'Automation Nexus', 'Creative Studio', 'Social Nexus'] },
  ARCHITECT: { level: 2, price: 'A$499/mo', priceYearly: 'A$4,999/yr', color: 'text-emerald-500', features: ['Operative Features', 'Swarm-255 Access', 'Wealth Gate Extraction', 'Terminal Access'] },
  MAGISTRATE: { level: 3, price: 'A$1,999/mo', priceYearly: 'A$19,999/yr', color: 'text-rose-500', features: ['Architect Features', 'War Room & Tactical Modules', 'Source Code Access'] },
  INVERSION: { level: 4, price: 'UNLIMITED', priceYearly: 'UNLIMITED', color: 'text-purple-500', features: ['Root Prime Access', 'All Modules Unlocked', 'System Governance Control'] },
};

export const MODULE_ACCESS: Partial<Record<AppView, { minTier: SubscriptionTier, isOwnerOnly?: boolean }>> = {
    dashboard: { minTier: 'SOVEREIGN' },
    settings: { minTier: 'SOVEREIGN' },
    registry: { minTier: 'SOVEREIGN' },
    treasury: { minTier: 'SOVEREIGN' },
    help_and_support: { minTier: 'SOVEREIGN' },
    user_profile: { minTier: 'SOVEREIGN' },
    repo_manifest: { minTier: 'SOVEREIGN' },
    automation_nexus: { minTier: 'SOVEREIGN' },
    wealth_gate: { minTier: 'ARCHITECT' },
    wealth_matrix: { minTier: 'OPERATIVE' },
    warroom: { minTier: 'MAGISTRATE' },
    talent_sanctum: { minTier: 'INVERSION', isOwnerOnly: true },
    talent_forge: { minTier: 'INVERSION', isOwnerOnly: true },
    platform_treasury: { minTier: 'INVERSION', isOwnerOnly: true },
    mastermind_nexus: { minTier: 'MAGISTRATE' },
    app_builder: { minTier: 'ARCHITECT' },
    web_builder: { minTier: 'ARCHITECT' },
};
