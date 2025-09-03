/**
 * Dynamic Content Generation for DeepSite
 * Automatically loads content from pollinations.ai text API on page load
 */

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

async function generatetext(prompt, system = 'Return ONLY the inner HTML content without any wrapper containers. Use h2/h3 headings for sections, detailed paragraphs (p tags), bullet points (ul/li), and examples. Apply Tailwind CSS classes for professional styling: mb-4 for paragraph spacing, mb-6 for section spacing, text-gray-700 for content, font-semibold for emphasis. Do NOT include main, section, div, or container wrapper tags. Start directly with content elements like h2, p, ul, etc. Aim for 300-500 words with clear structure, specific examples, and actionable information.') {
  try {
    const encodedPrompt = encodeURIComponent(prompt);
    const encodedSystem = encodeURIComponent(system);
    const response = await fetch(`https://text.pollinations.ai/${encodedPrompt}?system=${encodedSystem}&model=${selectedModel}`);
    let content = await response.text();
    
    console.log(`Generated content using model: ${selectedModel}`);
    
    // Clean up the response
    content = cleanupContent(content);
    
    // If content doesn't contain HTML tags, wrap in paragraphs
    if (!content.includes('<') && content.length > 50) {
      const paragraphs = content.split('\n\n').filter(p => p.trim());
      return paragraphs.map(p => `<p class="mb-4">${p.trim()}</p>`).join('');
    }
    
    return content;
  } catch (error) {
    console.error('Content generation failed:', error);
    return createErrorContent(prompt);
  }
}

/**
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
    
    console.log(`Loading content ${i + 1}/${placeholders.length}: ${prompt.substring(0, 50)}...`);
    
    // Show loading state
    placeholder.innerHTML = `<div class="animate-pulse bg-blue-50 p-6 rounded border-l-4 border-blue-300">
      <div class="flex items-center space-x-3">
        <div class="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
        <div class="text-blue-700 font-medium">Generating content ${i + 1}/${placeholders.length}...</div>
      </div>
    </div>`;
    
    try {
      // Generate content with cleanup functionality
      const content = await generatetext(prompt, systemPrompt);
      placeholder.innerHTML = content;
      console.log(`Successfully loaded content ${i + 1}/${placeholders.length}`);
    } catch (error) {
      console.error(`Failed to load content ${i + 1}/${placeholders.length}:`, error);
      // Show error state with retry button
      placeholder.innerHTML = createErrorContent(prompt);
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
