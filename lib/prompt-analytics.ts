// Analytics for prompt mode performance
export interface PromptAnalytics {
  mode: 'classic' | 'enhanced';
  prompt: string;
  timestamp: Date;
  responseTime?: number;
  userSatisfaction?: 'positive' | 'negative' | 'neutral';
  outputQuality?: number; // 1-5 scale
}

export const trackPromptUsage = (analytics: PromptAnalytics) => {
  if (typeof window === 'undefined') return;
  
  const existing = JSON.parse(localStorage.getItem('promptAnalytics') || '[]');
  existing.push(analytics);
  
  // Keep only last 100 entries
  const recent = existing.slice(-100);
  localStorage.setItem('promptAnalytics', JSON.stringify(recent));
};

export const getPromptAnalytics = (): PromptAnalytics[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('promptAnalytics') || '[]');
};

export const getAnalyticsSummary = () => {
  if (typeof window === 'undefined') {
    return {
      totalUsage: 0,
      enhancedUsage: 0,
      classicUsage: 0,
      recentTrend: 'stable' as const,
      averageComplexity: 0
    };
  }
  const analytics = getPromptAnalytics();
  
  const classicUsage = analytics.filter(a => a.mode === 'classic').length;
  const enhancedUsage = analytics.filter(a => a.mode === 'enhanced').length;
  
  const avgResponseTime = {
    classic: analytics
      .filter(a => a.mode === 'classic' && a.responseTime)
      .reduce((sum, a) => sum + (a.responseTime || 0), 0) / classicUsage || 0,
    enhanced: analytics
      .filter(a => a.mode === 'enhanced' && a.responseTime)
      .reduce((sum, a) => sum + (a.responseTime || 0), 0) / enhancedUsage || 0
  };
  
  return {
    totalUsage: analytics.length,
    classicUsage,
    enhancedUsage,
    avgResponseTime,
    last30Days: analytics.filter(a => 
      new Date(a.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length
  };
};
