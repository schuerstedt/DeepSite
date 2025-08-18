// Custom styles management for DeepSite
import { DesignStyle } from "./design-styles";

const CUSTOM_STYLES_KEY = 'customDesignStyles';

export const saveCustomStyle = (style: DesignStyle): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const existing = getCustomStyles();
    const updated = [...existing, style];
    localStorage.setItem(CUSTOM_STYLES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving custom style:', error);
  }
};

export const getCustomStyles = (): DesignStyle[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(CUSTOM_STYLES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading custom styles:', error);
    return [];
  }
};

export const deleteCustomStyle = (id: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const existing = getCustomStyles();
    const filtered = existing.filter(style => style.id !== id);
    localStorage.setItem(CUSTOM_STYLES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting custom style:', error);
  }
};

export const updateCustomStyle = (id: string, updates: Partial<DesignStyle>): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const existing = getCustomStyles();
    const updated = existing.map(style => 
      style.id === id ? { ...style, ...updates } : style
    );
    localStorage.setItem(CUSTOM_STYLES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error updating custom style:', error);
  }
};

export const exportCustomStyles = (): string => {
  const styles = getCustomStyles();
  return JSON.stringify(styles, null, 2);
};

export const importCustomStyles = (jsonData: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const imported = JSON.parse(jsonData) as DesignStyle[];
    
    // Validate the imported data
    if (!Array.isArray(imported)) {
      throw new Error('Invalid format: Expected array of styles');
    }
    
    for (const style of imported) {
      if (!style.id || !style.name || !style.prompt || !style.category) {
        throw new Error('Invalid style format: Missing required fields');
      }
    }
    
    const existing = getCustomStyles();
    const merged = [...existing, ...imported];
    localStorage.setItem(CUSTOM_STYLES_KEY, JSON.stringify(merged));
    
    return true;
  } catch (error) {
    console.error('Error importing custom styles:', error);
    return false;
  }
};

export const getAllStyles = (): DesignStyle[] => {
  // This would be used in the style selector to combine built-in and custom styles
  const custom = getCustomStyles();
  return custom; // Return just custom styles for now, the selector will handle merging
};
