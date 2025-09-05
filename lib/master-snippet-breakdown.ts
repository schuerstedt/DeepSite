// Master LLM Content Breakdown System
// Transforms single large snippets into structured multi-part content with visual elements

interface ContentConcept {
  mainTopic: string;
  overallContext: string;
  parts: ContentPart[];
  visualElements: VisualElement[];
}

interface ContentPart {
  id: string;
  title: string;
  prompt: string;
  contextPrompt: string; // Includes the overall concept context
  length: 'short' | 'medium';
  position: number;
}

interface VisualElement {
  type: 'image' | 'icon' | 'divider' | 'callout';
  position: number; // Where to insert (after which part)
  content: string;
  prompt?: string; // For images
}

/**
 * Master LLM breaks down a large snippet request into structured parts
 */
export async function breakdownLargeSnippet(originalPrompt: string): Promise<string> {
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
  <figure class="text-center">
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
- Progress indicators`;

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
function cleanupMasterContent(content: string): string {
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
function createFallbackBreakdown(originalPrompt: string): string {
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
  <figure class="text-center">
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

export default {
  breakdownLargeSnippet
};
