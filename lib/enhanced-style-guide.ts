// Enhanced Style Guide Generator for DeepSite
// This module creates detailed style guides based on selected design styles

import { DesignStyle, getStyleById } from './design-styles';

interface StyleManifest {
  id: string;
  name: string;
  prompt: string;
  imagePromptSuffix: string;
  namingConventions: {
    classes: string[];
    components: string[];
    colors: string[];
    typography: string[];
  };
  designPrinciples: string[];
  codeGuidelines: string[];
}

// Enhanced style manifests with detailed naming conventions and guidelines
const STYLE_MANIFESTS: Record<string, StyleManifest> = {
  'excalidraw': {
    id: 'excalidraw',
    name: 'Excalidraw',
    prompt: 'Render content with hand-drawn sketch aesthetics; prefer analogies; keep headings concise; avoid dense tables; describe diagrams plainly. Use sketch-style class names like .sketch-border, .rough-line, .hand-drawn.',
    imagePromptSuffix: 'hand-drawn sketch style, rough strokes, no text',
    namingConventions: {
      classes: ['sketch-', 'rough-', 'hand-', 'draw-', 'scribble-'],
      components: ['SketchCard', 'RoughButton', 'HandDrawnIcon', 'ScribbleContainer'],
      colors: ['sketch-gray', 'pencil-black', 'paper-white', 'eraser-pink'],
      typography: ['hand-written', 'sketch-font', 'rough-text', 'scribble-heading']
    },
    designPrinciples: [
      'Embrace imperfection and asymmetry',
      'Use rough, hand-drawn lines',
      'Prefer simple black lines on white background',
      'Include sketchy annotations and arrows',
      'Maintain whiteboard aesthetic'
    ],
    codeGuidelines: [
      'Use SVG for custom sketchy borders and lines',
      'Apply transform: rotate() for slight tilts',
      'Use CSS filter: drop-shadow() for pencil-like shadows',
      'Implement hover effects that simulate drawing motion'
    ]
  },
  'material-design': {
    id: 'material-design',
    name: 'Material Design',
    prompt: 'Follow Google Material Design principles with elevation layers, consistent spacing (8dp grid), flat colors, subtle shadows, and modern UI components. Use material-style class names like .mat-card, .mat-button, .elevation-z2.',
    imagePromptSuffix: 'clean material design aesthetic, flat colors, subtle shadows',
    namingConventions: {
      classes: ['mat-', 'md-', 'material-', 'elevation-z', 'surface-'],
      components: ['MaterialCard', 'ElevatedButton', 'MaterialIcon', 'SurfaceContainer'],
      colors: ['primary-500', 'secondary-200', 'surface-variant', 'on-primary'],
      typography: ['headline-large', 'body-medium', 'label-small', 'display-small']
    },
    designPrinciples: [
      'Use 8dp grid system for all spacing',
      'Apply appropriate elevation levels (0-24dp)',
      'Follow Material color system guidelines',
      'Implement consistent interaction patterns',
      'Maintain proper touch target sizes (48dp minimum)'
    ],
    codeGuidelines: [
      'Use CSS custom properties for Material color tokens',
      'Implement proper focus indicators',
      'Apply appropriate box-shadow for elevation',
      'Use transform3d for smooth animations'
    ]
  },
  'cyberpunk-terminal': {
    id: 'cyberpunk-terminal',
    name: 'Cyberpunk Terminal',
    prompt: 'Create Matrix-style green text on black backgrounds with glowing terminal effects, monospace fonts, hacker interface elements, and futuristic command-line aesthetics. Use cyber-style class names like .terminal-, .matrix-, .cyber-, .glow-.',
    imagePromptSuffix: 'cyberpunk terminal interface, green text, black background, Matrix-style',
    namingConventions: {
      classes: ['terminal-', 'matrix-', 'cyber-', 'glow-', 'scan-'],
      components: ['TerminalCard', 'MatrixText', 'CyberButton', 'GlowContainer'],
      colors: ['terminal-green', 'matrix-black', 'cyber-blue', 'neon-pink'],
      typography: ['mono-terminal', 'cyber-font', 'matrix-text', 'hacker-code']
    },
    designPrinciples: [
      'Use monospace fonts exclusively',
      'Implement green glowing text effects',
      'Apply scan line animations',
      'Include terminal-style prompts and cursors',
      'Maintain high contrast (green on black)'
    ],
    codeGuidelines: [
      'Use CSS text-shadow for glow effects',
      'Implement typing animation with JavaScript',
      'Apply CSS animation for scan lines',
      'Use transform: matrix() for glitch effects'
    ]
  },
  'corporate-slide': {
    id: 'corporate-slide',
    name: 'Corporate Slide',
    prompt: 'Design in corporate presentation style with professional typography, clean layouts, business-appropriate colors, consistent alignment, and PowerPoint-like aesthetics. Use corporate-style class names like .corp-, .slide-, .business-, .professional-.',
    imagePromptSuffix: 'clean corporate slide aesthetic, minimal palette, professional',
    namingConventions: {
      classes: ['corp-', 'slide-', 'business-', 'professional-', 'exec-'],
      components: ['SlideCard', 'BusinessButton', 'CorporateIcon', 'PresentationContainer'],
      colors: ['corporate-blue', 'business-gray', 'professional-white', 'exec-navy'],
      typography: ['corp-heading', 'slide-title', 'business-body', 'professional-caption']
    },
    designPrinciples: [
      'Maintain consistent alignment and spacing',
      'Use professional color palette (blues, grays)',
      'Apply clear hierarchy with typography',
      'Include bullet points and structured content',
      'Ensure high readability and professionalism'
    ],
    codeGuidelines: [
      'Use CSS Grid for precise alignment',
      'Implement consistent margin and padding',
      'Apply professional font stacks (system fonts)',
      'Use subtle shadows and borders only'
    ]
  }
};

/**
 * Generate enhanced style guide prompt for a given style
 */
export async function generateStyleGuidePrompt(styleId: string): Promise<string> {
  const baseStyle = getStyleById(styleId);
  const manifest = STYLE_MANIFESTS[styleId];
  
  if (!baseStyle || !manifest) {
    return baseStyle?.prompt || '';
  }

  // Create a comprehensive style guide prompt
  const enhancedPrompt = `
DESIGN STYLE: ${manifest.name}

VISUAL AESTHETICS:
${manifest.prompt}

NAMING CONVENTIONS:
- CSS Classes: Use prefixes like ${manifest.namingConventions.classes.join(', ')}
- Component Names: Follow patterns like ${manifest.namingConventions.components.join(', ')}
- Color Variables: Use names like ${manifest.namingConventions.colors.join(', ')}
- Typography Classes: Apply styles like ${manifest.namingConventions.typography.join(', ')}

DESIGN PRINCIPLES:
${manifest.designPrinciples.map(principle => `- ${principle}`).join('\n')}

CODE GUIDELINES:
${manifest.codeGuidelines.map(guideline => `- ${guideline}`).join('\n')}

IMAGE GENERATION: ${manifest.imagePromptSuffix}

Apply these guidelines consistently throughout the design while maintaining functionality and user experience.
`.trim();

  return enhancedPrompt;
}

/**
 * Get style manifest for pollinations API
 */
export function getStyleManifest(styleId: string): StyleManifest | null {
  return STYLE_MANIFESTS[styleId] || null;
}

/**
 * Generate enhanced prompt with style guidelines for both text and image generation
 */
export async function enhancePromptWithStyle(
  originalPrompt: string, 
  styleId: string,
  isImagePrompt: boolean = false
): Promise<string> {
  const manifest = STYLE_MANIFESTS[styleId];
  
  if (!manifest || styleId === 'default') {
    return originalPrompt;
  }

  if (isImagePrompt) {
    return `${originalPrompt}, ${manifest.imagePromptSuffix}`;
  }

  const styleGuide = await generateStyleGuidePrompt(styleId);
  return `${originalPrompt}\n\nSTYLE REQUIREMENTS:\n${styleGuide}`;
}

/**
 * Ask master LLM to create style guide based on selected style
 */
export async function createDynamicStyleGuide(styleId: string): Promise<StyleManifest | null> {
  const baseStyle = getStyleById(styleId);
  if (!baseStyle || baseStyle.id === 'default') return null;

  try {
    // Ask master LLM to create detailed style guide
    const prompt = `Create a comprehensive style guide for "${baseStyle.name}" design style.

CONTEXT: This is for a web design system that needs consistent naming conventions, design principles, and implementation guidelines.

BASE DESCRIPTION: ${baseStyle.description}
BASE PROMPT: ${baseStyle.prompt}

Please create a detailed style guide including:

1. NAMING CONVENTIONS:
   - CSS class prefixes (5 examples)
   - Component naming patterns (4 examples)
   - Color variable names (4 examples)  
   - Typography class names (4 examples)

2. DESIGN PRINCIPLES:
   - 5 core design principles specific to this style
   - Visual characteristics and aesthetics
   - Layout and spacing guidelines

3. IMPLEMENTATION GUIDELINES:
   - CSS techniques and properties to use
   - Animation and interaction patterns
   - Best practices for this style

4. IMAGE PROMPT SUFFIX:
   - Short phrase to add to image generation prompts
   - Should maintain visual consistency

Return as structured JSON with fields: namingConventions, designPrinciples, codeGuidelines, imagePromptSuffix`;

    // This would typically call the pollinations API or another LLM service
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai`);
    const result = await response.text();
    
    // Parse and structure the response
    // For now, return the existing manifest or create a basic one
    return STYLE_MANIFESTS[styleId] || {
      id: styleId,
      name: baseStyle.name,
      prompt: baseStyle.prompt,
      imagePromptSuffix: baseStyle.description.toLowerCase(),
      namingConventions: {
        classes: [`${styleId.replace('-', '')}-`, 'custom-', 'style-', 'design-', 'ui-'],
        components: ['CustomCard', 'StyleButton', 'DesignIcon', 'UIContainer'],
        colors: ['primary', 'secondary', 'accent', 'neutral'],
        typography: ['heading', 'body', 'caption', 'label']
      },
      designPrinciples: [
        'Maintain visual consistency',
        'Follow established patterns',
        'Ensure accessibility standards',
        'Optimize for user experience',
        'Keep design scalable'
      ],
      codeGuidelines: [
        'Use semantic HTML elements',
        'Apply consistent spacing',
        'Implement responsive design',
        'Follow naming conventions'
      ]
    };
  } catch (error) {
    console.error('Failed to create dynamic style guide:', error);
    return null;
  }
}

export default {
  generateStyleGuidePrompt,
  getStyleManifest,
  enhancePromptWithStyle,
  createDynamicStyleGuide
};
