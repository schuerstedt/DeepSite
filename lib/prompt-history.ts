// Site and prompt history management for DeepSite

// Legacy prompt history interface for backward compatibility
export interface PromptHistoryEntry {
  id: string;
  prompt: string;
  timestamp: Date;
  style: string;
  mode: 'classic' | 'enhanced';
  provider: string;
  model: string;
  isFollowUp: boolean;
  originalPrompt?: string;
}

export interface SiteHistoryEntry {
  id: string;
  prompt: string;
  html: string;
  preview?: string; // Base64 encoded screenshot or thumbnail
  timestamp: Date;
  style: string;
  mode: 'classic' | 'enhanced';
  provider: string;
  model: string;
  isFollowUp: boolean;
  originalPrompt?: string; // For follow-ups, reference to the original
  parentId?: string; // For follow-ups, reference to parent entry
  tags?: string[];
  title?: string; // Auto-generated or user-defined title
  isFavorite?: boolean;
}

// Legacy prompt history functions for backward compatibility
export const savePromptToHistory = (entry: Omit<PromptHistoryEntry, 'id' | 'timestamp'>) => {
  if (typeof window === 'undefined') return;
  
  const history = getPromptHistory();
  const newEntry: PromptHistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: new Date(),
  };
  
  history.unshift(newEntry);
  const trimmed = history.slice(0, 50); // Keep more for prompts as they're smaller
  localStorage.setItem('promptHistory', JSON.stringify(trimmed));
  
  return newEntry.id;
};

export const getPromptHistory = (): PromptHistoryEntry[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('promptHistory');
    if (!stored) return [];
    
    return JSON.parse(stored).map((entry: any) => ({
      ...entry,
      timestamp: new Date(entry.timestamp)
    }));
  } catch (error) {
    console.error('Error loading prompt history:', error);
    return [];
  }
};

export const deletePromptFromHistory = (id: string) => {
  if (typeof window === 'undefined') return;
  
  const history = getPromptHistory();
  const filtered = history.filter(entry => entry.id !== id);
  localStorage.setItem('promptHistory', JSON.stringify(filtered));
};

export const saveSiteToHistory = (entry: Omit<SiteHistoryEntry, 'id' | 'timestamp' | 'title'>) => {
  if (typeof window === 'undefined') return;
  
  const history = getSiteHistory();
  const title = generateSiteTitle(entry.prompt, entry.html);
  const newEntry: SiteHistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: new Date(),
    title,
  };
  
  history.unshift(newEntry); // Add to beginning
  
  // Keep only last 30 entries to avoid localStorage size limits (HTML can be large)
  const trimmed = history.slice(0, 30);
  localStorage.setItem('siteHistory', JSON.stringify(trimmed));
  
  return newEntry.id;
};

export const getSiteHistory = (): SiteHistoryEntry[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('siteHistory');
    if (!stored) return [];
    
    return JSON.parse(stored).map((entry: any) => ({
      ...entry,
      timestamp: new Date(entry.timestamp)
    }));
  } catch (error) {
    console.error('Error parsing site history:', error);
    return [];
  }
};

export const getSiteById = (id: string): SiteHistoryEntry | undefined => {
  const history = getSiteHistory();
  return history.find(entry => entry.id === id);
};

export const updateSiteInHistory = (id: string, updates: Partial<SiteHistoryEntry>) => {
  if (typeof window === 'undefined') return;
  
  const history = getSiteHistory();
  const index = history.findIndex(entry => entry.id === id);
  
  if (index !== -1) {
    history[index] = { ...history[index], ...updates };
    localStorage.setItem('siteHistory', JSON.stringify(history));
  }
};

export const deleteSiteFromHistory = (id: string) => {
  if (typeof window === 'undefined') return;
  
  const history = getSiteHistory();
  const filtered = history.filter(entry => entry.id !== id);
  localStorage.setItem('siteHistory', JSON.stringify(filtered));
};

export const toggleSiteFavorite = (id: string) => {
  const history = getSiteHistory();
  const entry = history.find(e => e.id === id);
  if (entry) {
    updateSiteInHistory(id, { isFavorite: !entry.isFavorite });
  }
};

export const clearSiteHistory = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('siteHistory');
};

export const searchSiteHistory = (query: string): SiteHistoryEntry[] => {
  const history = getSiteHistory();
  const lowerQuery = query.toLowerCase();
  
  return history.filter(entry => 
    entry.prompt.toLowerCase().includes(lowerQuery) ||
    entry.title?.toLowerCase().includes(lowerQuery) ||
    entry.style.toLowerCase().includes(lowerQuery) ||
    entry.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getSitesByStyle = (style: string): SiteHistoryEntry[] => {
  const history = getSiteHistory();
  return history.filter(entry => entry.style === style);
};

export const getSitesByMode = (mode: 'classic' | 'enhanced'): SiteHistoryEntry[] => {
  const history = getSiteHistory();
  return history.filter(entry => entry.mode === mode);
};

export const getFavoriteSites = (): SiteHistoryEntry[] => {
  const history = getSiteHistory();
  return history.filter(entry => entry.isFavorite);
};

export const getRecentSites = (limit: number = 10): SiteHistoryEntry[] => {
  const history = getSiteHistory();
  return history.slice(0, limit);
};

export const generateSiteTitle = (prompt: string, html: string): string => {
  // Extract title from HTML if available
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1].trim();
  }
  
  // Generate title from prompt (first 50 chars)
  const cleaned = prompt.replace(/^(create|build|design|make)\s+/i, '').trim();
  return cleaned.length > 50 ? cleaned.substring(0, 47) + '...' : cleaned;
};

export const exportSiteHistory = (): string => {
  const history = getSiteHistory();
  return JSON.stringify(history, null, 2);
};

export const importSiteHistory = (data: string): boolean => {
  try {
    const imported = JSON.parse(data);
    if (Array.isArray(imported)) {
      localStorage.setItem('siteHistory', JSON.stringify(imported));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing site history:', error);
    return false;
  }
};

// Generate a simple thumbnail from HTML (basic approach)
export const generateSiteThumbnail = async (html: string): Promise<string | undefined> => {
  try {
    // Create a temporary iframe to render the HTML
    const iframe = document.createElement('iframe');
    iframe.style.width = '1200px';
    iframe.style.height = '800px';
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    
    document.body.appendChild(iframe);
    
    return new Promise((resolve) => {
      iframe.onload = () => {
        try {
          // Wait a bit for content to render
          setTimeout(() => {
            // This is a simplified approach - in production you'd use html2canvas or similar
            // For now, we'll extract some visual info from the HTML
            const preview = `Preview of: ${generateSiteTitle('', html)}`;
            resolve(btoa(preview)); // Simple base64 encoding
            document.body.removeChild(iframe);
          }, 1000);
        } catch (error) {
          console.error('Error generating thumbnail:', error);
          resolve(undefined);
          document.body.removeChild(iframe);
        }
      };
      
      iframe.srcdoc = html;
    });
  } catch (error) {
    console.error('Error in thumbnail generation:', error);
    return undefined;
  }
};
