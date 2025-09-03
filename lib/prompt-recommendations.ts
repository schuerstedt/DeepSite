// Smart prompt mode recommendation system
export const analyzePromptComplexity = (prompt: string): {
  complexity: 'simple' | 'moderate' | 'complex';
  recommendedMode: 'classic' | 'enhanced';
  reasoning: string;
  confidence: number; // 0-1
} => {
  const text = prompt.toLowerCase();
  
  // Keywords that indicate complexity
  const complexKeywords = [
    'dashboard', 'admin', 'complex', 'multiple sections', 'interactive',
    'animation', 'form validation', 'responsive design', 'professional',
    'business', 'enterprise', 'multi-page', 'navigation', 'sidebar',
    'user management', 'data visualization', 'charts', 'graphs',
    'images', 'image', 'photos', 'pictures', 'gallery', 'visual',
    'explainer', 'tutorial', 'guide', 'educational', 'attention'
  ];
  
  const simpleKeywords = [
    'simple', 'basic', 'minimal', 'quick', 'landing page',
    'coming soon', 'single page', 'portfolio', 'resume'
  ];
  
  const designKeywords = [
    'beautiful', 'modern', 'sleek', 'professional', 'elegant',
    'creative', 'unique', 'stunning', 'attractive', 'polished'
  ];
  
  let complexityScore = 0;
  let designScore = 0;
  
  // Count complexity indicators
  complexKeywords.forEach(keyword => {
    if (text.includes(keyword)) complexityScore += 1;
  });
  
  simpleKeywords.forEach(keyword => {
    if (text.includes(keyword)) complexityScore -= 0.5;
  });
  
  designKeywords.forEach(keyword => {
    if (text.includes(keyword)) designScore += 1;
  });
  
  // Length and detail analysis
  const wordCount = prompt.split(' ').length;
  if (wordCount > 20) complexityScore += 1;
  if (wordCount > 50) complexityScore += 2;
  
  // Sentence complexity
  const sentences = prompt.split(/[.!?]+/).length;
  if (sentences > 3) complexityScore += 1;
  
  // Determine complexity level
  let complexity: 'simple' | 'moderate' | 'complex';
  let recommendedMode: 'classic' | 'enhanced';
  let reasoning: string;
  let confidence: number;
  
  if (complexityScore <= -1 && wordCount < 10) {
    complexity = 'simple';
    recommendedMode = 'classic';
    reasoning = 'Very simple request with basic requirements - Classic mode will be faster';
    confidence = 0.8;
  } else if (complexityScore >= 1 || designScore >= 1 || wordCount > 20) {
    complexity = 'complex';
    recommendedMode = 'enhanced';
    reasoning = 'Request with detailed requirements - Enhanced mode will provide better planning and results';
    confidence = 0.9;
  } else {
    complexity = 'moderate';
    recommendedMode = 'enhanced'; // Default to enhanced for moderate complexity
    reasoning = 'Moderate complexity - Enhanced mode recommended for better results';
    confidence = 0.7;
  }
  
  return { complexity, recommendedMode, reasoning, confidence };
};

export const getPromptRecommendation = (prompt: string) => {
  if (!prompt.trim()) {
    return null;
  }
  
  const analysis = analyzePromptComplexity(prompt);
  
  if (analysis.confidence < 0.7) {
    return null; // Don't recommend if not confident
  }
  
  return analysis;
};
