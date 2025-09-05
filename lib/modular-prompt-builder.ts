/**
 * Modular Prompt Builder for Enhanced Content Generation
 * Creates clean, maintainable prompts with proper separation of concerns
 */

export interface PromptContext {
  specificPrompt: string;
  concept?: string;
  styleGuide?: string;
  length?: 'short' | 'medium' | 'long';
  tone?: string;
  audience?: string;
  language?: string;
  key?: string;
}

export class ModularPromptBuilder {
  private context: PromptContext;

  constructor(context: PromptContext) {
    this.context = context;
  }

  /**
   * Build the complete enhanced prompt
   */
  build(): string {
    const sections: string[] = [];

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

  /**
   * Base content generation request
   */
  private buildBasePrompt(): string {
    return `Generate content: "${this.context.specificPrompt}"`;
  }

  /**
   * Concept context for coordinated multi-part content
   */
  private buildContextModule(): string {
    return `CONTEXT: This is part of explaining "${this.context.concept}". Ensure this section aligns with and supports the overall concept while focusing specifically on the requested topic.`;
  }

  /**
   * Style guide integration
   */
  private buildStyleModule(): string {
    return `STYLE GUIDE: ${this.context.styleGuide}`;
  }

  /**
   * Specifications module (length, tone, audience, language)
   */
  private buildSpecificationsModule(): string | null {
    const specs: string[] = [];

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

  /**
   * Technical constraints and formatting
   */
  private buildTechnicalConstraints(): string {
    return `FORMATTING: Use proper HTML formatting with semantic elements. Make content scannable with headings, lists, and clear structure. Avoid overly long paragraphs.`;
  }

  /**
   * Convert length codes to clear guidance
   */
  private getLengthGuidance(length: string): string {
    const lengthMap = {
      'short': '1-2 concise paragraphs (100-200 words)',
      'medium': '3-4 well-developed paragraphs (300-500 words)', 
      'long': '5+ comprehensive paragraphs with examples (600+ words)'
    };

    return lengthMap[length as keyof typeof lengthMap] || length;
  }

  /**
   * Get cache key for this prompt configuration
   */
  getCacheKey(): string | null {
    if (!this.context.key) return null;

    // Create deterministic cache key including all context
    const keyComponents = [
      this.context.key,
      this.context.length || 'default',
      this.context.tone || 'default',
      this.context.audience || 'general',
      this.context.language || 'en'
    ];

    return keyComponents.join('.');
  }

  /**
   * Debug information for prompt construction
   */
  getDebugInfo(): any {
    return {
      hasContext: !!this.context.concept,
      hasStyleGuide: !!this.context.styleGuide,
      specifications: {
        length: this.context.length,
        tone: this.context.tone,
        audience: this.context.audience,
        language: this.context.language
      },
      cacheKey: this.getCacheKey(),
      promptLength: this.build().length
    };
  }
}

/**
 * Convenience function to build enhanced prompts
 */
export function buildEnhancedPrompt(context: PromptContext): string {
  const builder = new ModularPromptBuilder(context);
  return builder.build();
}

/**
 * Extract prompt context from DOM element
 */
export function extractPromptContext(element: HTMLElement): PromptContext {
  return {
    specificPrompt: element.dataset.generatetext || '',
    concept: element.dataset.concept,
    length: element.dataset.length as any,
    tone: element.dataset.tone,
    audience: element.dataset.audience,
    language: element.dataset.lang || 'en',
    key: element.dataset.key
  };
}
