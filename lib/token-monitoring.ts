// Token usage monitoring for Hugging Face API
export interface TokenUsage {
  requestId: string;
  timestamp: Date;
  model: string;
  provider: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  estimatedCost?: number;
}

export const trackTokenUsage = (usage: TokenUsage) => {
  const existing = JSON.parse(localStorage.getItem('tokenUsage') || '[]');
  existing.push(usage);
  
  // Keep only last 100 entries
  const recent = existing.slice(-100);
  localStorage.setItem('tokenUsage', JSON.stringify(recent));
};

export const getTokenUsageSummary = () => {
  const usage: TokenUsage[] = JSON.parse(localStorage.getItem('tokenUsage') || '[]');
  
  const today = new Date();
  const thisMonth = usage.filter(u => {
    const date = new Date(u.timestamp);
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  });
  
  const totalTokens = thisMonth.reduce((sum, u) => sum + (u.totalTokens || 0), 0);
  const totalRequests = thisMonth.length;
  
  return {
    thisMonth: {
      requests: totalRequests,
      tokens: totalTokens,
      estimatedCost: thisMonth.reduce((sum, u) => sum + (u.estimatedCost || 0), 0)
    },
    allTime: {
      requests: usage.length,
      tokens: usage.reduce((sum, u) => sum + (u.totalTokens || 0), 0)
    },
    byModel: usage.reduce((acc, u) => {
      const key = u.model;
      if (!acc[key]) acc[key] = { requests: 0, tokens: 0 };
      acc[key].requests++;
      acc[key].tokens += u.totalTokens || 0;
      return acc;
    }, {} as Record<string, { requests: number; tokens: number }>)
  };
};

// Estimate token count (rough approximation)
export const estimateTokens = (text: string): number => {
  // Rough estimation: ~4 characters per token for most models
  return Math.ceil(text.length / 4);
};

// HF Pro limits (as of 2024)
export const HF_PRO_LIMITS = {
  monthlyTokens: 1_000_000, // 1M tokens per month for Pro
  requestsPerMinute: 1000,
  maxTokensPerRequest: 32_000
};
