// Snippet Concept Generator for Enhanced Text Rendering
// Breaks long content into structured, visual concepts for better readability

interface SnippetConcept {
  id: string;
  title: string;
  type: 'overview' | 'detailed' | 'visual' | 'interactive' | 'summary';
  content: string;
  visualElements?: {
    images?: string[];
    diagrams?: string[];
    charts?: string[];
  };
  subConcepts?: SnippetConcept[];
  estimatedLength: 'short' | 'medium' | 'long';
  priority: number; // 1-5, higher is more important
}

interface ConceptBreakdown {
  mainTopic: string;
  concepts: SnippetConcept[];
  totalSnippets: number;
  estimatedReadTime: number;
}

/**
 * Master LLM creates concept breakdown for long content
 */
export async function createConceptBreakdown(
  originalPrompt: string,
  contentType: 'educational' | 'business' | 'technical' | 'creative' = 'educational'
): Promise<ConceptBreakdown | null> {
  
  const masterPrompt = `You are a master content strategist. Break down this content request into digestible, visual concepts.

ORIGINAL REQUEST: ${originalPrompt}
CONTENT TYPE: ${contentType}

Create a structured breakdown with the following:

1. MAIN TOPIC: Single sentence describing the core subject

2. CONCEPT BREAKDOWN: Break into 3-7 logical sections, each with:
   - ID: Simple identifier (e.g., "batna_concept", "batna_example")
   - Title: Clear, specific heading
   - Type: overview/detailed/visual/interactive/summary
   - Content: Brief description of what this section covers
   - Visual Elements: Suggest images, diagrams, or charts
   - Sub-concepts: If complex, break into smaller parts
   - Length: short (100-200 words), medium (300-500), long (600+ words)
   - Priority: 1-5 importance rating

3. VISUAL STRATEGY: How to make each concept engaging with:
   - Strategic image placement
   - Interactive elements
   - Visual breaks and formatting
   - Design elements that enhance understanding

4. READING FLOW: Logical progression from concept to concept

Example for "Explain BATNA in business negotiation":

MAIN TOPIC: Understanding and applying BATNA (Best Alternative to Negotiated Agreement) in business negotiations

CONCEPTS:
1. batna_definition (overview, priority 5)
   - Title: "What is BATNA?"
   - Content: Core definition and importance
   - Visual: Simple diagram showing negotiation paths
   - Length: short

2. batna_development (detailed, priority 4)  
   - Title: "How to Develop Your BATNA"
   - Content: Step-by-step process
   - Visual: Process diagram, checklist infographic
   - Length: medium

3. batna_example (visual, priority 5)
   - Title: "BATNA in Action: Chemical Manufacturing Case"
   - Content: Real-world scenario with EU compliance
   - Visual: Scenario diagram, decision tree
   - Length: medium

Return structured JSON format for easy processing.`;

  try {
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(masterPrompt)}?model=openai`);
    let result = await response.text();
    
    // Try to parse JSON, or create a fallback structure
    try {
      return JSON.parse(result);
    } catch {
      // Create a basic breakdown if parsing fails
      return createFallbackBreakdown(originalPrompt, contentType);
    }
  } catch (error) {
    console.error('Failed to create concept breakdown:', error);
    return createFallbackBreakdown(originalPrompt, contentType);
  }
}

/**
 * Create fallback concept breakdown when LLM fails
 */
function createFallbackBreakdown(originalPrompt: string, contentType: string): ConceptBreakdown {
  // Analyze prompt to create basic structure
  const words = originalPrompt.toLowerCase().split(' ');
  const isHowTo = words.includes('how') || words.includes('steps') || words.includes('process');
  const isExplanation = words.includes('explain') || words.includes('what') || words.includes('understand');
  const isComparison = words.includes('compare') || words.includes('vs') || words.includes('difference');

  const concepts: SnippetConcept[] = [];

  if (isExplanation) {
    concepts.push({
      id: 'overview',
      title: 'Overview & Definition',
      type: 'overview',
      content: 'Core concepts and definitions',
      visualElements: { images: ['concept-diagram'] },
      estimatedLength: 'short',
      priority: 5
    });
  }

  if (isHowTo) {
    concepts.push({
      id: 'process',
      title: 'Step-by-Step Process',
      type: 'detailed',
      content: 'Detailed implementation steps',
      visualElements: { diagrams: ['process-flow'] },
      estimatedLength: 'medium',
      priority: 4
    });
  }

  concepts.push({
    id: 'example',
    title: 'Real-World Example',
    type: 'visual',
    content: 'Practical application with specific scenario',
    visualElements: { images: ['example-scenario'], diagrams: ['case-study'] },
    estimatedLength: 'medium',
    priority: 5
  });

  if (isComparison) {
    concepts.push({
      id: 'comparison',
      title: 'Comparison & Analysis',
      type: 'detailed',
      content: 'Comparative analysis of different approaches',
      visualElements: { charts: ['comparison-table'] },
      estimatedLength: 'medium',
      priority: 4
    });
  }

  concepts.push({
    id: 'summary',
    title: 'Key Takeaways',
    type: 'summary',
    content: 'Main points and actionable insights',
    visualElements: { diagrams: ['summary-infographic'] },
    estimatedLength: 'short',
    priority: 4
  });

  return {
    mainTopic: originalPrompt,
    concepts,
    totalSnippets: concepts.length,
    estimatedReadTime: concepts.reduce((total, concept) => {
      const wordCount = concept.estimatedLength === 'short' ? 150 : 
                       concept.estimatedLength === 'medium' ? 400 : 700;
      return total + Math.ceil(wordCount / 200); // 200 words per minute
    }, 0)
  };
}

/**
 * Generate individual snippet with enhanced prompting
 */
export async function generateConceptSnippet(
  concept: SnippetConcept,
  parentTopic: string,
  styleId: string = 'default',
  audience: string = 'general'
): Promise<string> {
  
  const snippetPrompt = `Create engaging content for this specific concept:

PARENT TOPIC: ${parentTopic}
CONCEPT: ${concept.title}
TYPE: ${concept.type}
TARGET LENGTH: ${concept.estimatedLength}
AUDIENCE: ${audience}

CONCEPT DESCRIPTION: ${concept.content}

REQUIREMENTS:
1. Create ${concept.estimatedLength === 'short' ? '100-200' : concept.estimatedLength === 'medium' ? '300-500' : '600-800'} words
2. Use engaging headings (h3, h4) for structure
3. Include specific examples and practical applications
4. Make it visually scannable with bullet points and short paragraphs
5. Add context for how this relates to the broader topic

${concept.visualElements ? `VISUAL ELEMENTS TO REFERENCE:
${concept.visualElements.images ? `- Images: ${concept.visualElements.images.join(', ')}` : ''}
${concept.visualElements.diagrams ? `- Diagrams: ${concept.visualElements.diagrams.join(', ')}` : ''}
${concept.visualElements.charts ? `- Charts: ${concept.visualElements.charts.join(', ')}` : ''}` : ''}

CONTENT FOCUS:
${concept.type === 'overview' ? 'Provide clear definitions and context. Focus on the "what" and "why".' : ''}
${concept.type === 'detailed' ? 'Give step-by-step instructions or detailed analysis. Focus on the "how".' : ''}
${concept.type === 'visual' ? 'Use concrete examples and scenarios. Make it relatable and memorable.' : ''}
${concept.type === 'interactive' ? 'Include questions, challenges, or hands-on activities.' : ''}
${concept.type === 'summary' ? 'Synthesize key points and provide actionable takeaways.' : ''}

Return HTML content with proper Tailwind CSS classes for professional styling.`;

  try {
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(snippetPrompt)}?model=openai`);
    const content = await response.text();
    
    // Clean up the content
    return cleanupContent(content);
  } catch (error) {
    console.error('Failed to generate concept snippet:', error);
    return createFallbackSnippet(concept);
  }
}

/**
 * Create fallback snippet content
 */
function createFallbackSnippet(concept: SnippetConcept): string {
  return `
    <div class="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-6 shadow-lg">
      <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">${concept.title}</h3>
      <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
        ${concept.content}
      </p>
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-400">
        <p class="text-sm text-blue-800 dark:text-blue-300">
          This section covers ${concept.type} content with ${concept.estimatedLength} detail level.
        </p>
      </div>
    </div>
  `.trim();
}

/**
 * Clean up generated content
 */
function cleanupContent(content: string): string {
  // Remove unwanted wrapper tags
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
 * Generate complete structured content with concept breakdown
 */
export async function generateStructuredContent(
  originalPrompt: string,
  contentType: 'educational' | 'business' | 'technical' | 'creative' = 'educational',
  styleId: string = 'default',
  audience: string = 'general'
): Promise<string> {
  
  // First, get concept breakdown from master LLM
  const breakdown = await createConceptBreakdown(originalPrompt, contentType);
  
  if (!breakdown) {
    // Fall back to simple generation
    return `<div data-generatetext="${originalPrompt}">Loading content...</div>`;
  }

  // Generate HTML structure with concept-based sections
  let html = `
    <div class="space-y-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          ${breakdown.mainTopic}
        </h2>
        <p class="text-slate-600 dark:text-slate-400">
          ${breakdown.totalSnippets} concepts • ~${breakdown.estimatedReadTime} min read
        </p>
      </div>
  `;

  // Generate each concept as a separate section
  breakdown.concepts.forEach((concept, index) => {
    const conceptKey = `${contentType}.${concept.id}.${styleId}.${audience}`;
    
    html += `
      <section class="mb-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-8 shadow-lg">
        <div class="flex items-center gap-3 mb-6">
          <span class="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
            ${index + 1}
          </span>
          <span class="text-xs text-slate-500 uppercase tracking-wide">
            ${concept.type} • ${concept.estimatedLength}
          </span>
        </div>
        
        <div 
          data-generatetext="Generate content for concept: ${concept.title}. Focus: ${concept.content}. Type: ${concept.type}. Length: ${concept.estimatedLength}. Include specific examples and make it engaging."
          data-key="${conceptKey}"
          data-length="${concept.estimatedLength}"
          data-tone="engaging"
          data-audience="${audience}">
          Loading ${concept.title}...
        </div>
        
        ${concept.visualElements && concept.visualElements.images ? 
          concept.visualElements.images.map(img => `
            <figure class="mt-6">
              <img 
                src="https://image.pollinations.ai/prompt/${encodeURIComponent(img + ' ' + concept.title + ' visual illustration')}"
                width="800" 
                height="400" 
                alt="${concept.title} illustration" 
                class="w-full h-64 object-cover rounded-lg shadow-md" />
              <figcaption class="text-sm text-slate-600 dark:text-slate-400 mt-2 text-center">
                ${concept.title} - Visual illustration
              </figcaption>
            </figure>
          `).join('') : ''
        }
        
        ${concept.subConcepts ? `
          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            ${concept.subConcepts.map(subConcept => `
              <div class="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
                <h4 class="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  ${subConcept.title}
                </h4>
                <div 
                  data-generatetext="Brief explanation of: ${subConcept.content}"
                  data-length="short"
                  class="text-sm">
                  Loading...
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </section>
    `;
  });

  html += `
    </div>
    
    <!-- Progress indicator -->
    <div class="fixed bottom-6 right-6 bg-white dark:bg-slate-800 rounded-full p-3 shadow-lg border border-slate-200 dark:border-slate-700">
      <div class="text-xs text-slate-600 dark:text-slate-400">
        ${breakdown.totalSnippets} concepts
      </div>
    </div>
  `;

  return html;
}

export default {
  createConceptBreakdown,
  generateConceptSnippet,
  generateStructuredContent
};
