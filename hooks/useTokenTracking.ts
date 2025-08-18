import { useEffect, useState } from 'react';

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

export const useTokenTracking = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const trackTokenUsage = (usage: TokenUsage) => {
    if (!isClient) return;
    
    const existing = JSON.parse(localStorage.getItem('tokenUsage') || '[]');
    existing.push(usage);
    
    // Keep only last 100 entries
    const recent = existing.slice(-100);
    localStorage.setItem('tokenUsage', JSON.stringify(recent));
  };

  const getTokenUsageSummary = () => {
    if (!isClient) return {
      thisMonth: { requests: 0, tokens: 0, estimatedCost: 0 },
      allTime: { requests: 0, tokens: 0 },
      byModel: {}
    };

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

  return {
    trackTokenUsage,
    getTokenUsageSummary,
    isClient
  };
};

// Token estimation function (can be used anywhere)
export const estimateTokens = (text: string): number => {
  // Simple estimation: ~4 characters per token for English text
  // This is a rough approximation, actual tokenization varies by model
  return Math.ceil(text.length / 4);
};
