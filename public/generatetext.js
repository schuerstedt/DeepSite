/**
 * Dynamic Content Generation for DeepSite
 * Enhanced with modular prompt system, caching, and data-concept support
 */

// Cache for generated content
const contentCache = new Map();

// Modular Prompt Builder (JavaScript version of TypeScript class)
class ModularPromptBuilder {
  constructor(context) {
    this.context = context;
  }

  build() {
    const sections = [];

    // 1. Base Content Request
    sections.push(this.buildBasePrompt());

    // 2. Concept Context (if provided)
    if (this.context.concept) {
      sections.push(this.buildContextModule());
    }

    // 3. Style Guide Integration
    if (this.context.styleGuide) {
      sections.push(this.buildStyleModule());
    }

    // 4. Specifications (length, tone, audience, language)
    const specsModule = this.buildSpecificationsModule();
    if (specsModule) {
      sections.push(specsModule);
    }

    // 5. Technical Constraints
    sections.push(this.buildTechnicalConstraints());

    return sections.join('\n\n');
  }

  buildBasePrompt() {
    return `Generate content: "${this.context.specificPrompt}"`;
  }

  buildContextModule() {
    return `CONTEXT: This is part of explaining "${this.context.concept}". Ensure this section aligns with and supports the overall concept while focusing specifically on the requested topic.`;
  }

  buildStyleModule() {
    return `STYLE GUIDE: ${this.context.styleGuide}`;
  }

  buildSpecificationsModule() {
    const specs = [];

    if (this.context.length) {
      const lengthGuide = this.getLengthGuidance(this.context.length);
      specs.push(`Length: ${lengthGuide}`);
    }

    if (this.context.tone) {
      specs.push(`Tone: ${this.context.tone}`);
    }

    if (this.context.audience) {
      specs.push(`Target Audience: ${this.context.audience}`);
    }

    if (this.context.language && this.context.language !== 'en') {
      specs.push(`Language: ${this.context.language}`);
    }

    return specs.length > 0 ? `SPECIFICATIONS: ${specs.join(' | ')}` : null;
  }

  buildTechnicalConstraints() {
    return `FORMATTING: Use proper HTML formatting with semantic elements. Make content scannable with headings, lists, and clear structure. Avoid overly long paragraphs.`;
  }

  getLengthGuidance(length) {
    const lengthMap = {
      'short': '1-2 concise paragraphs (100-200 words)',
      'medium': '3-4 well-developed paragraphs (300-500 words)',
      'long': '5+ comprehensive paragraphs with examples (600+ words)'
    };

    return lengthMap[length] || length;
  }

  getCacheKey() {
    if (!this.context.key) return null;

    const keyComponents = [
      this.context.key,
      this.context.length || 'default',
      this.context.tone || 'default',
      this.context.audience || 'general',
      this.context.language || 'en'
    ];

    return keyComponents.join('.');
  }
}

// Extract prompt context from DOM element
function extractPromptContext(element) {
  return {
    specificPrompt: element.dataset.generatetext || '',
    concept: element.dataset.concept,
    length: element.dataset.length,
    tone: element.dataset.tone,
    audience: element.dataset.audience,
    language: element.dataset.lang || 'en',
    key: element.dataset.key
  };
}

// Build enhanced prompt using modular system
function buildEnhancedPrompt(context, styleGuide = null) {
  context.styleGuide = styleGuide;
  const builder = new ModularPromptBuilder(context);
  return builder.build();
}

// Get style guidelines for a specific style
async function getStyleGuidelines(styleId) {
  const styleGuidelines = {
    'excalidraw': 'Apply hand-drawn sketch aesthetics with rough lines, imperfect shapes, and whiteboard style. Use sketch-style class names like .sketch-border, .rough-line. Prefer analogies and simple diagrams.',
    'material-design': 'Follow Google Material Design principles with elevation layers, 8dp grid spacing, flat colors, and subtle shadows. Use material-style classes like .mat-card, .elevation-z2.',
    'cyberpunk-terminal': 'Create Matrix-style interface with green text, monospace fonts, terminal effects, and hacker aesthetics. Use cyber-style classes like .terminal-, .matrix-, .glow-.',
    'corporate-slide': 'Design professional presentation style with clean typography, business colors, and PowerPoint-like layouts. Use corporate classes like .corp-, .slide-, .business-.',
    'blueprint': 'Apply technical blueprint style with precise lines, grid backgrounds, and architectural aesthetics. Use blueprint classes like .blueprint-, .technical-.',
    'comic-panel': 'Use comic book style with speech bubbles, halftone patterns, and dynamic layouts. Apply comic classes like .comic-, .bubble-, .panel-.',
    'neon-synthwave': 'Create retro 80s style with neon colors, gradients, and cyberpunk elements. Use neon classes like .neon-, .synthwave-, .glow-.',
    'pixel-art': 'Apply 8-bit retro gaming style with blocky graphics and limited color palettes. Use pixel classes like .pixel-, .retro-, .8bit-.',
    'modern': 'Clean, minimal design with generous white space, subtle shadows, and professional typography. Focus on readability and user experience.',
    'minimal': 'Extremely clean design with maximum white space, limited color palette, and essential elements only.',
    'colorful': 'Vibrant, energetic design with bold colors, dynamic gradients, and playful elements.',
    'professional': 'Corporate-friendly design with conservative colors, formal typography, and business-appropriate styling.',
    'creative': 'Artistic and unique design with experimental layouts, creative typography, and innovative visual elements.'
  };

  return styleGuidelines[styleId] || styleGuidelines['modern'];
}

// Global variables for model management
let availableModels = ['openai']; // Default fallback
let selectedModel = localStorage.getItem('deepsite-text-model') || 'openai';

// Listen for model changes from the main app settings
window.addEventListener('textModelChanged', (event) => {
  selectedModel = event.detail.model;
  console.log(`Text model updated from settings: ${selectedModel}`);
});

/**
 * Fetch available models from pollinations.ai
 */
async function fetchAvailableModels() {
  try {
    // Use the correct text models API endpoint
    const response = await fetch('https://text.pollinations.ai/models');
    if (response.ok) {
      const models = await response.json();
      if (Array.isArray(models)) {
        // Handle the new API format with objects containing name and description
        availableModels = models
          .filter(model => model.name && !model.community) // Filter out community models
          .map(model => model.name);
        console.log('Available text models from API:', availableModels);
      } else {
        throw new Error('API returned invalid format');
      }
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.warn('Failed to fetch models from API, using fallback models:', error);
    // Use common text generation models as fallback based on the actual API response
    availableModels = ['openai', 'gemini', 'mistral', 'deepseek-reasoning', 'nova-fast', 'openai-fast'];
  }
  
  // Ensure selectedModel is in the available models list
  if (!availableModels.includes(selectedModel)) {
    selectedModel = availableModels[0];
    localStorage.setItem('deepsite-text-model', selectedModel);
  }
}

/**
 * Create model selector UI - only for test pages, not generated content
 */
function createModelSelector(containerId = 'model-selector-container') {
  // Only create model selector if we're on a test page with the specific container
  const container = document.getElementById(containerId);
  if (!container) {
    console.log('Model selector container not found - skipping (normal for generated content)');
    return;
  }
  
  // Double-check we're not in generated content by looking for test page indicators
  if (!document.title.includes('Test') && !document.querySelector('[data-generatetext]')) {
    console.log('Not on test page - skipping model selector creation');
    return;
  }
  
  // Ensure we have models to display
  if (availableModels.length === 0) {
    availableModels = ['openai', 'gemini', 'mistral', 'deepseek-reasoning', 'nova-fast'];
    console.log('Using default model list:', availableModels);
  }
  
  console.log(`Creating model selector with ${availableModels.length} models:`, availableModels);
  console.log(`Selected model: ${selectedModel}`);
  
  const targetContainer = document.getElementById(containerId);
  const selectorHtml = `
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 mb-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 class="text-lg font-semibold text-blue-800 mb-1">🤖 Text Generation Model</h3>
          <p class="text-sm text-blue-600">Select the AI model for content generation</p>
        </div>
        <div class="flex items-center gap-3 flex-wrap">
          <label for="model-select" class="text-sm font-medium text-blue-700">Model:</label>
          <select 
            id="model-select" 
            class="bg-white border border-blue-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onchange="handleModelChange(this.value)">
            ${availableModels.map(model => {
              // Create a display name from the model name
              const displayName = model.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ');
              return `<option value="${model}" ${model === selectedModel ? 'selected' : ''}>${displayName}</option>`;
            }).join('')}
          </select>
          <span id="model-status" class="text-xs text-green-600">✅ Active</span>
          <button 
            onclick="regenerateAllContent()" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
            🔄 Regenerate All
          </button>
        </div>
      </div>
    </div>
  `;
  
  targetContainer.innerHTML = selectorHtml;
  console.log('Model selector UI created successfully');
}

/**
 * Handle model selection change
 */
function handleModelChange(newModel) {
  selectedModel = newModel;
  localStorage.setItem('deepsite-text-model', newModel);
  
  const statusElement = document.getElementById('model-status');
  if (statusElement) {
    statusElement.textContent = '🔄 Updated';
    statusElement.className = 'text-xs text-orange-600';
    
    setTimeout(() => {
      statusElement.textContent = '✅ Active';
      statusElement.className = 'text-xs text-green-600';
    }, 1500);
  }
  
  console.log(`Text generation model changed to: ${newModel}`);
}

/**
 * Regenerate all content with the currently selected model
 */
async function regenerateAllContent() {
  const button = event.target;
  const originalText = button.innerHTML;
  
  // Update button state
  button.disabled = true;
  button.innerHTML = '🔄 Regenerating...';
  button.classList.add('opacity-50');
  
  console.log(`Regenerating all content with model: ${selectedModel}`);
  
  // Find all generatetext placeholders and regenerate them
  const placeholders = document.querySelectorAll('[data-generatetext]');
  
  for (let i = 0; i < placeholders.length; i++) {
    const placeholder = placeholders[i];
    const prompt = placeholder.getAttribute('data-generatetext');
    const systemPrompt = placeholder.getAttribute('data-system') || 'Return ONLY the inner HTML content without any wrapper containers. Use h2/h3 headings for sections, detailed paragraphs (p tags), bullet points (ul/li), and examples. Apply Tailwind CSS classes for professional styling: mb-4 for paragraph spacing, mb-6 for section spacing, text-gray-700 for content, font-semibold for emphasis. Do NOT include main, section, div, or container wrapper tags. Start directly with content elements like h2, p, ul, etc. Aim for 300-500 words with clear structure, specific examples, and actionable information.';
    
    // Show loading state
    placeholder.innerHTML = `<div class="animate-pulse bg-orange-50 p-6 rounded border-l-4 border-orange-300">
      <div class="flex items-center space-x-3">
        <div class="w-4 h-4 bg-orange-400 rounded-full animate-bounce"></div>
        <div class="text-orange-700 font-medium">Regenerating with ${selectedModel}... (${i + 1}/${placeholders.length})</div>
      </div>
    </div>`;
    
    try {
      const content = await generatetext(prompt, systemPrompt);
      placeholder.innerHTML = content;
      console.log(`Regenerated content ${i + 1}/${placeholders.length} with ${selectedModel}`);
    } catch (error) {
      console.error(`Failed to regenerate content ${i + 1}:`, error);
      placeholder.innerHTML = createErrorContent(prompt);
    }
    
    // Add delay between requests
    if (i < placeholders.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Reset button
  button.disabled = false;
  button.innerHTML = originalText;
  button.classList.remove('opacity-50');
  
  console.log('All content regenerated successfully');
}

/**
 * Generate content with enhanced modular prompt system, caching, and data-concept support
 */
async function generatetext(prompt, system = 'Return ONLY the inner HTML content without any wrapper containers. Use h2/h3 headings for sections, detailed paragraphs (p tags), bullet points (ul/li), and examples. Apply Tailwind CSS classes for professional styling: mb-4 for paragraph spacing, mb-6 for section spacing, text-gray-700 for content, font-semibold for emphasis. Do NOT include main, section, div, or container wrapper tags. Start directly with content elements like h2, p, ul, etc. Aim for 300-500 words with clear structure, specific examples, and actionable information.', element = null) {
  try {
    let enhancedPrompt = prompt;
    let cacheKey = null;
    
    // If element is provided, use modular prompt system
    if (element) {
      const context = extractPromptContext(element);
      
      // Check cache first
      const builder = new ModularPromptBuilder(context);
      cacheKey = builder.getCacheKey();
      
      if (cacheKey && contentCache.has(cacheKey)) {
        console.log(`📦 Using cached content for key: ${cacheKey}`);
        return contentCache.get(cacheKey);
      }
      
      // Get selected design style and enhance prompt
      const selectedStyle = localStorage.getItem('designStyle') || 'default';
      let styleGuide = null;
      
      if (selectedStyle !== 'default') {
        styleGuide = await getStyleGuidelines(selectedStyle);
      }
      
      // Build enhanced prompt with modular system
      enhancedPrompt = buildEnhancedPrompt(context, styleGuide);
      
      console.log(`🎨 Generating with concept: "${context.concept || 'none'}", style: ${selectedStyle}`);
    } else {
      // Fallback to legacy style enhancement
      const selectedStyle = localStorage.getItem('designStyle') || 'default';
      if (selectedStyle !== 'default') {
        enhancedPrompt = await enhancePromptWithStyleGuidelines(prompt, selectedStyle);
      }
    }
    
    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    const encodedSystem = encodeURIComponent(system);
    const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}?system=${encodedSystem}&model=${selectedModel}`);
    let content = await response.text();
    
    console.log(`Generated content using model: ${selectedModel}`);
    
    // Clean up the response
    content = cleanupContent(content);

    // If content doesn't contain HTML tags, wrap in paragraphs
    if (!content.includes('<') && content.length > 50) {
      const paragraphs = content.split('\n\n').filter(p => p.trim());
      content = paragraphs.map(p => `<p class="mb-4">${p.trim()}</p>`).join('');
    }
    
    // Cache the content if we have a cache key
    if (cacheKey && content) {
      contentCache.set(cacheKey, content);
      console.log(`💾 Cached content for key: ${cacheKey}`);
    }
    
    return content;
  } catch (error) {
    console.error('Content generation failed:', error);
    return createErrorContent(prompt);
  }
}

/**
 * Enhance prompt with style guidelines for better consistency
 */
async function enhancePromptWithStyleGuidelines(originalPrompt, styleId) {
  // Style guidelines for different design styles
  const styleGuidelines = {
    'excalidraw': 'Apply hand-drawn sketch aesthetics with rough lines, imperfect shapes, and whiteboard style. Use sketch-style class names like .sketch-border, .rough-line. Prefer analogies and simple diagrams.',
    'material-design': 'Follow Google Material Design principles with elevation layers, 8dp grid spacing, flat colors, and subtle shadows. Use material-style classes like .mat-card, .elevation-z2.',
    'cyberpunk-terminal': 'Create Matrix-style interface with green text, monospace fonts, terminal effects, and hacker aesthetics. Use cyber-style classes like .terminal-, .matrix-, .glow-.',
    'corporate-slide': 'Design professional presentation style with clean typography, business colors, and PowerPoint-like layouts. Use corporate classes like .corp-, .slide-, .business-.',
    'blueprint': 'Apply technical blueprint style with precise lines, grid backgrounds, and architectural aesthetics. Use blueprint classes like .blueprint-, .technical-.',
    'comic-panel': 'Use comic book style with speech bubbles, halftone patterns, and dynamic layouts. Apply comic classes like .comic-, .bubble-, .panel-.',
    'neon-synthwave': 'Create retro 80s style with neon colors, gradients, and cyberpunk elements. Use neon classes like .neon-, .synthwave-, .glow-.',
    'pixel-art': 'Apply 8-bit retro gaming style with blocky graphics and limited color palettes. Use pixel classes like .pixel-, .retro-, .8bit-.'
  };

  const styleGuide = styleGuidelines[styleId];
  if (styleGuide) {
    return `${originalPrompt}\n\nSTYLE REQUIREMENTS: ${styleGuide}`;
  }
  
  return originalPrompt;
}/**
 * Clean up pollinations.ai response content
 */
function cleanupContent(content) {
  // Remove DOCTYPE and html/head/body tags if they exist
  content = content.replace(/<!DOCTYPE[^>]*>/gi, '');
  content = content.replace(/<\/?html[^>]*>/gi, '');
  content = content.replace(/<\/?head[^>]*>/gi, '');
  content = content.replace(/<\/?body[^>]*>/gi, '');
  content = content.replace(/<meta[^>]*>/gi, '');
  content = content.replace(/<title[^>]*>.*?<\/title>/gi, '');
  
  // Remove script tags (especially extra Tailwind CDN)
  content = content.replace(/<script[^>]*src[^>]*tailwindcss[^>]*><\/script>/gi, '');
  content = content.replace(/<script[^>]*>.*?<\/script>/gi, '');
  
  // Remove wrapper container tags that shouldn't be there
  content = content.replace(/^<main[^>]*>/i, '');
  content = content.replace(/<\/main>$/i, '');
  content = content.replace(/^<section[^>]*>/i, '');
  content = content.replace(/<\/section>$/i, '');
  content = content.replace(/^<div[^>]*>/i, '');
  content = content.replace(/<\/div>$/i, '');
  content = content.replace(/^<article[^>]*>/i, '');
  content = content.replace(/<\/article>$/i, '');
  
  // Remove pollinations.ai advertisements and sponsor content
  content = content.replace(/---\s*\*\*Sponsor\*\*[\s\S]*?$/gi, '');
  content = content.replace(/\*\*Sponsor\*\*[\s\S]*?$/gi, '');
  content = content.replace(/Interested in.*?\[Feedify\].*?$/gi, '');
  content = content.replace(/pollinations\.ai\/redirect-nexad\/[^)]*\)/gi, '');
  content = content.replace(/To boost your website's engagement.*?$/gi, '');
  
  // Clean up extra whitespace and newlines
  content = content.replace(/\n{3,}/g, '\n\n');
  content = content.trim();
  
  return content;
}

/**
 * Create error content with retry button
 */
function createErrorContent(prompt) {
  const shortPrompt = prompt.length > 50 ? prompt.substring(0, 50) + '...' : prompt;
  return `
    <div class="bg-red-50 border border-red-200 p-4 rounded-lg">
      <h4 class="text-red-800 font-semibold mb-2">⚠️ Content Generation Failed</h4>
      <p class="text-red-700 text-sm mb-3">Failed to generate: ${shortPrompt}</p>
      <button 
        onclick="retryContent(this, '${prompt.replace(/'/g, "\\'")}', '')"
        class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors">
        🔄 Retry
      </button>
    </div>
  `;
}

/**
 * Retry content generation
 */
async function retryContent(button, prompt, system) {
  const container = button.closest('[data-generatetext]') || button.parentElement;
  const originalPrompt = prompt || container.getAttribute('data-generatetext');
  const originalSystem = system || container.getAttribute('data-system') || 'Return ONLY the inner HTML content without any wrapper containers. Use h2/h3 headings for sections, detailed paragraphs (p tags), bullet points (ul/li), and examples. Apply Tailwind CSS classes for professional styling: mb-4 for paragraph spacing, mb-6 for section spacing, text-gray-700 for content, font-semibold for emphasis. Do NOT include main, section, div, or container wrapper tags. Start directly with content elements like h2, p, ul, etc. Aim for 300-500 words with clear structure, specific examples, and actionable information.';
  
  // Show loading state
  container.innerHTML = `
    <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg animate-pulse">
      <div class="flex items-center space-x-3">
        <div class="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
        <div class="text-blue-700 font-medium">Retrying content generation...</div>
      </div>
    </div>
  `;
  
  try {
    const content = await generatetext(originalPrompt, originalSystem);
    container.innerHTML = content;
    console.log('Retry successful for:', originalPrompt.substring(0, 50) + '...');
  } catch (error) {
    console.error('Retry failed:', error);
    container.innerHTML = createErrorContent(originalPrompt);
  }
}

/**
 * Auto-load content for all generatetext placeholders on page load
 */
async function autoLoadContent() {
  // Find all generatetext placeholders in the page
  const placeholders = document.querySelectorAll('[data-generatetext]');
  console.log(`Found ${placeholders.length} generatetext placeholders to load`);
  
  for (let i = 0; i < placeholders.length; i++) {
    const placeholder = placeholders[i];
    const prompt = placeholder.getAttribute('data-generatetext');
    const systemPrompt = placeholder.getAttribute('data-system') || 'Return ONLY the inner HTML content without any wrapper containers. Use h2/h3 headings for sections, detailed paragraphs (p tags), bullet points (ul/li), and examples. Apply Tailwind CSS classes for professional styling: mb-4 for paragraph spacing, mb-6 for section spacing, text-gray-700 for content, font-semibold for emphasis. Do NOT include main, section, div, or container wrapper tags. Start directly with content elements like h2, p, ul, etc. Aim for 300-500 words with clear structure, specific examples, and actionable information.';
    
    console.log(`Processing content ${i + 1}/${placeholders.length}: ${prompt.substring(0, 50)}...`);
    
    // Check if this is a large snippet that should be broken down
    const isLargeSnippet = shouldBreakdownSnippet(prompt);
    
    if (isLargeSnippet) {
      // Use master LLM to break down into structured parts
      console.log(`Breaking down large snippet: ${prompt.substring(0, 50)}...`);
      placeholder.innerHTML = `
        <div class="animate-pulse bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin"></div>
            <div class="text-blue-700 font-medium">Master LLM creating content structure ${i + 1}/${placeholders.length}...</div>
          </div>
        </div>`;
      
      try {
        const structuredContent = await breakdownLargeSnippet(prompt);
        placeholder.innerHTML = structuredContent;
        
        // Now load all the new generatetext placeholders created by the breakdown
        const newPlaceholders = placeholder.querySelectorAll('[data-generatetext]');
        console.log(`Created ${newPlaceholders.length} sub-sections from breakdown`);
        
        // Load each sub-section
        for (let j = 0; j < newPlaceholders.length; j++) {
          const subPlaceholder = newPlaceholders[j];
          const subPrompt = subPlaceholder.getAttribute('data-generatetext');
          const subLength = subPlaceholder.getAttribute('data-length') || 'medium';
          
          if (!subPrompt) continue;
          
          subPlaceholder.innerHTML = `
            <div class="flex items-center space-x-2 p-4 bg-blue-50 rounded border-l-4 border-blue-400">
              <div class="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
              <div class="text-blue-700 text-sm">Loading section ${j + 1}/${newPlaceholders.length}...</div>
            </div>`;
          
          try {
            const subContent = await generatetext(subPrompt, systemPrompt, subPlaceholder);
            subPlaceholder.innerHTML = subContent;
            console.log(`Loaded sub-section ${j + 1}/${newPlaceholders.length}`);
          } catch (error) {
            console.error(`Failed to load sub-section ${j + 1}:`, error);
            subPlaceholder.innerHTML = createErrorContent(subPrompt);
          }
          
          // Small delay between sub-sections
          if (j < newPlaceholders.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        console.log(`Successfully loaded structured content ${i + 1}/${placeholders.length}`);
      } catch (error) {
        console.error(`Failed to break down large snippet:`, error);
        // Fall back to regular generation
        placeholder.innerHTML = `
          <div class="animate-pulse bg-blue-50 p-6 rounded border-l-4 border-blue-300">
            <div class="flex items-center space-x-3">
              <div class="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
              <div class="text-blue-700 font-medium">Generating content ${i + 1}/${placeholders.length}...</div>
            </div>
          </div>`;
        
        const content = await generatetext(prompt, systemPrompt, placeholder);
        placeholder.innerHTML = content;
      }
    } else {
      // Regular single snippet generation
      placeholder.innerHTML = `
        <div class="animate-pulse bg-blue-50 p-6 rounded border-l-4 border-blue-300">
          <div class="flex items-center space-x-3">
            <div class="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
            <div class="text-blue-700 font-medium">Generating content ${i + 1}/${placeholders.length}...</div>
          </div>
        </div>`;
      
      try {
        const content = await generatetext(prompt, systemPrompt, placeholder);
        placeholder.innerHTML = content;
        console.log(`Successfully loaded content ${i + 1}/${placeholders.length}`);
      } catch (error) {
        console.error(`Failed to load content ${i + 1}/${placeholders.length}:`, error);
        placeholder.innerHTML = createErrorContent(prompt);
      }
    }
    
    // Add progressive delay between requests to avoid rate limits
    if (i < placeholders.length - 1) {
      const delay = 2000 + (i * 1000); // 2s, 3s, 4s, etc.
      console.log(`Waiting ${delay}ms before next request...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  console.log('All content loading completed');
}

/**
 * Initialize the generatetext system
 */
async function initializeGenerateText() {
  console.log('🚀 Initializing GenerateText system...');
  console.log('Current selected model from localStorage:', selectedModel);
  
  // Fetch available models
  console.log('📡 Fetching available models...');
  await fetchAvailableModels();
  
  // Only create model selector on test pages (not in generated content)
  console.log('🎛️ Creating model selector UI...');
  createModelSelector();
  
  console.log(`✅ GenerateText initialized with model: ${selectedModel}`);
  console.log('Available models:', availableModels);
}

// Auto-load content when the page is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', async () => {
    console.log('📄 DOM Content Loaded - starting initialization...');
    try {
      await initializeGenerateText();
      console.log('✅ Initialization complete - starting content loading...');
      autoLoadContent();
    } catch (error) {
      console.error('❌ Initialization failed:', error);
      // Try to create basic model selector anyway
      createModelSelector();
      autoLoadContent();
    }
  });
} else {
  console.log('📄 DOM already loaded - starting initialization...');
  initializeGenerateText()
    .then(() => {
      console.log('✅ Initialization complete - starting content loading...');
      autoLoadContent();
    })
    .catch((error) => {
      console.error('❌ Initialization failed:', error);
      // Try to create basic model selector anyway
      createModelSelector();
      autoLoadContent();
    });
}

/**
 * Enhanced style integration functions for better visual consistency
 */

/**
 * Get enhanced system prompt based on selected style
 */
function getEnhancedSystemPromptForStyle(styleId) {
  const basePrompt = 'Return ONLY the inner HTML content without any wrapper containers. Use h2/h3 headings for sections, detailed paragraphs (p tags), bullet points (ul/li), and examples. Apply Tailwind CSS classes for professional styling: mb-4 for paragraph spacing, mb-6 for section spacing, text-gray-700 for content, font-semibold for emphasis. Do NOT include main, section, div, or container wrapper tags. Start directly with content elements like h2, p, ul, etc. Aim for 300-500 words with clear structure, specific examples, and actionable information.';
  
  const styleEnhancements = {
    'excalidraw': ' Apply hand-drawn, sketchy aesthetics with rough borders and casual language.',
    'material-design': ' Use Material Design principles with clean typography and proper elevation.',
    'cyberpunk-terminal': ' Apply terminal/hacker aesthetics with monospace elements and tech language.',
    'corporate-slide': ' Use professional, business-appropriate language and clean formatting.',
    'blueprint': ' Apply technical, precise language with structured, engineering-style content.',
    'comic-panel': ' Use engaging, dynamic language with visual storytelling elements.',
    'neon-synthwave': ' Apply retro, energetic language with vivid descriptions.',
    'pixel-art': ' Use nostalgic, gaming-inspired language with retro references.'
  };

  return basePrompt + (styleEnhancements[styleId] || '');
}

/**
 * Get image style suffix for pollinations API integration
 */
function getImageStyleSuffix(styleId) {
  const imageSuffixes = {
    'excalidraw': 'hand-drawn sketch style, rough strokes, no text',
    'material-design': 'clean material design aesthetic, flat colors, subtle shadows',
    'cyberpunk-terminal': 'cyberpunk terminal interface, green text, black background, Matrix-style',
    'corporate-slide': 'clean corporate slide aesthetic, minimal palette, professional',
    'blueprint': 'technical blueprint style, white lines on blue background, precise',
    'comic-panel': 'comic book style, halftone patterns, speech bubbles, dynamic',
    'neon-synthwave': 'neon synthwave style, retro 80s, purple and pink gradients',
    'pixel-art': 'pixel art style, 8-bit retro gaming aesthetic, blocky'
  };
  
  return imageSuffixes[styleId] || 'professional, clean, modern aesthetic';
}

// Make functions globally available
window.getEnhancedSystemPromptForStyle = getEnhancedSystemPromptForStyle;
window.getImageStyleSuffix = getImageStyleSuffix;

/**
 * Determine if a snippet should be broken down by master LLM
 */
function shouldBreakdownSnippet(prompt) {
  // Check for indicators of large/complex content
  const indicators = [
    'explain', 'comprehensive', 'detailed', 'complete guide',
    'step-by-step', 'how to', 'examples', 'tactics', 'strategies',
    'with examples', 'counter', 'and how to', 'complete'
  ];
  
  const promptLower = prompt.toLowerCase();
  const hasIndicators = indicators.some(indicator => promptLower.includes(indicator));
  const isLong = prompt.length > 100;
  const hasMultipleConcepts = (promptLower.match(/and|with|including|plus/g) || []).length > 1;
  
  return hasIndicators && (isLong || hasMultipleConcepts);
}

/**
 * Master LLM breaks down large snippet into structured parts
 */
async function breakdownLargeSnippet(originalPrompt) {
  const masterPrompt = `You are a master content strategist. Take this single large content request and break it into multiple smaller, focused parts with visual elements between them.

ORIGINAL REQUEST: "${originalPrompt}"

Your task:
1. Create an overall concept/context for this topic
2. Break it into 3-5 smaller, focused parts
3. Add visual elements (images, icons, callouts) between parts
4. Each part should reference the overall concept for context

Return HTML structure with:
- Multiple data-generatetext divs for each concept part
- Visual elements (images, icons, callouts) between parts
- Each generatetext prompt should include the overall concept context
- Styling elements to make it visually appealing

Example structure:
<div class="space-y-8">
  <div class="text-center mb-8">
    <h3 class="text-2xl font-bold mb-4">[MAIN TOPIC TITLE]</h3>
    <p class="text-slate-600">[Brief overview of what will be covered]</p>
  </div>

  <!-- Part 1 -->
  <div class="bg-white/50 rounded-lg p-6 border-l-4 border-blue-500">
    <div class="flex items-center gap-2 mb-4">
      <span class="bg-blue-600 text-white px-2 py-1 rounded text-sm">1</span>
      <h4 class="font-semibold">[PART TITLE]</h4>
    </div>
    <div data-generatetext="[FOCUSED PROMPT FOR THIS PART]. Context: This is part of explaining [OVERALL CONCEPT]. Focus specifically on [SPECIFIC ASPECT]." data-length="medium">Loading...</div>
  </div>

  <!-- Visual Element -->
  <figure class="text-center my-6">
    <img src="https://image.pollinations.ai/prompt/[RELEVANT IMAGE PROMPT]" width="600" height="300" alt="[ALT TEXT]" class="mx-auto rounded-lg shadow-md">
    <figcaption class="text-sm text-slate-600 mt-2">[CAPTION]</figcaption>
  </figure>

  <!-- Part 2 -->
  <div class="bg-white/50 rounded-lg p-6 border-l-4 border-green-500">
    <div class="flex items-center gap-2 mb-4">
      <span class="bg-green-600 text-white px-2 py-1 rounded text-sm">2</span>
      <h4 class="font-semibold">[PART TITLE]</h4>
    </div>
    <div data-generatetext="[FOCUSED PROMPT FOR THIS PART]. Context: This is part of explaining [OVERALL CONCEPT]. Focus specifically on [SPECIFIC ASPECT]." data-length="medium">Loading...</div>
  </div>

  <!-- Continue pattern... -->
</div>

Create the complete HTML structure for: "${originalPrompt}"

Make it visually engaging with:
- Color-coded sections
- Strategic image placement  
- Icons and visual breaks
- Callout boxes for important points
- Each generatetext should include context about the overall concept`;

  try {
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(masterPrompt)}?model=openai`);
    const structuredContent = await response.text();
    
    // Clean up the response
    return cleanupMasterContent(structuredContent);
  } catch (error) {
    console.error('Failed to break down large snippet:', error);
    return createFallbackBreakdown(originalPrompt);
  }
}

/**
 * Clean up master LLM response
 */
function cleanupMasterContent(content) {
  // Remove any wrapper HTML tags
  content = content.replace(/<!DOCTYPE[^>]*>/gi, '');
  content = content.replace(/<\/?html[^>]*>/gi, '');
  content = content.replace(/<\/?head[^>]*>/gi, '');
  content = content.replace(/<\/?body[^>]*>/gi, '');
  content = content.replace(/<meta[^>]*>/gi, '');
  content = content.replace(/<title[^>]*>.*?<\/title>/gi, '');
  content = content.replace(/<script[^>]*>.*?<\/script>/gi, '');
  
  // Clean up extra whitespace
  content = content.replace(/\n{3,}/g, '\n\n');
  content = content.trim();
  
  return content;
}

/**
 * Create fallback breakdown if master LLM fails
 */
function createFallbackBreakdown(originalPrompt) {
  // Extract key topic from prompt
  const topic = originalPrompt.split(' ').slice(1, 4).join(' ') || 'Topic';
  
  return `
<div class="space-y-8">
  <div class="text-center mb-8">
    <h3 class="text-2xl font-bold mb-4">${topic}</h3>
    <p class="text-slate-600">Comprehensive guide broken into focused sections</p>
  </div>

  <!-- Definition & Overview -->
  <div class="bg-white/50 rounded-lg p-6 border-l-4 border-blue-500">
    <div class="flex items-center gap-2 mb-4">
      <span class="bg-blue-600 text-white px-2 py-1 rounded text-sm">1</span>
      <h4 class="font-semibold">Overview & Definition</h4>
    </div>
    <div data-generatetext="Provide a clear definition and overview of: ${originalPrompt}. Context: This is the introduction to a comprehensive guide. Focus on key concepts and importance." data-length="medium">Loading overview...</div>
  </div>

  <!-- Visual Break -->
  <figure class="text-center my-6">
    <img src="https://image.pollinations.ai/prompt/${encodeURIComponent(topic + ' concept diagram illustration')}" width="600" height="300" alt="${topic} illustration" class="mx-auto rounded-lg shadow-md">
    <figcaption class="text-sm text-slate-600 mt-2">${topic} - Visual Overview</figcaption>
  </figure>

  <!-- Detailed Explanation -->
  <div class="bg-white/50 rounded-lg p-6 border-l-4 border-green-500">
    <div class="flex items-center gap-2 mb-4">
      <span class="bg-green-600 text-white px-2 py-1 rounded text-sm">2</span>
      <h4 class="font-semibold">How It Works</h4>
    </div>
    <div data-generatetext="Explain how ${originalPrompt} works in practice. Context: This follows the overview section. Focus on mechanisms, processes, and step-by-step details." data-length="medium">Loading detailed explanation...</div>
  </div>

  <!-- Examples -->
  <div class="bg-white/50 rounded-lg p-6 border-l-4 border-purple-500">
    <div class="flex items-center gap-2 mb-4">
      <span class="bg-purple-600 text-white px-2 py-1 rounded text-sm">3</span>
      <h4 class="font-semibold">Examples & Applications</h4>
    </div>
    <div data-generatetext="Provide concrete examples and applications for: ${originalPrompt}. Context: This builds on the previous explanations. Focus on real-world scenarios and specific cases." data-length="medium">Loading examples...</div>
  </div>

  <!-- Key Takeaways -->
  <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
    <div class="flex items-center gap-2 mb-4">
      <span class="bg-orange-600 text-white px-2 py-1 rounded text-sm">💡</span>
      <h4 class="font-semibold">Key Takeaways</h4>
    </div>
    <div data-generatetext="Summarize the key takeaways and actionable insights for: ${originalPrompt}. Context: This is the conclusion to our comprehensive guide. Focus on practical applications and main points." data-length="short">Loading takeaways...</div>
  </div>
</div>
  `.trim();
}
