// Design style configurations for DeepSite
export interface DesignStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: 'sketch' | 'technical' | 'flat' | 'playful' | 'presentation' | 'artistic' | 'gaming' | 'retro';
  icon: string;
}

export const DESIGN_STYLES: DesignStyle[] = [
  // Default
  {
    id: 'default',
    name: 'Modern Web',
    description: 'Clean, modern web design with good UX practices',
    prompt: '',
    category: 'flat',
    icon: '🌐'
  },
  
  // Sketch styles
  {
    id: 'excalidraw',
    name: 'Excalidraw',
    description: 'Hand-drawn sketch style with rough edges',
    prompt: 'Design this in Excalidraw hand-drawn sketch style with rough, sketchy lines, imperfect shapes, and a whiteboard aesthetic. Use simple black lines on white background with minimal colors.',
    category: 'sketch',
    icon: '✏️'
  },
  {
    id: 'pencil-sketch',
    name: 'Pencil Sketch',
    description: 'Quick design doodle with pencil-like strokes',
    prompt: 'Create this design in pencil sketch style - less cartoonish than hand-drawn, more like a professional design doodle with clean pencil strokes, subtle shading, and architectural sketching techniques.',
    category: 'sketch',
    icon: '✎'
  },
  {
    id: 'chalkboard',
    name: 'Chalkboard',
    description: 'White chalk lines on dark background for teaching vibes',
    prompt: 'Design this in chalkboard diagram style with white or colored chalk lines on a dark background. Use a teaching-friendly aesthetic with clear diagrams, arrows, and educational visual elements.',
    category: 'sketch',
    icon: '🖤'
  },
  
  // Technical styles
  {
    id: 'blueprint',
    name: 'Blueprint',
    description: 'Technical plans with white lines on blue grid',
    prompt: 'Create this design in blueprint style with white lines on a blue grid background. Use technical drawing conventions, precise measurements, clean geometry, and architectural blueprint aesthetics.',
    category: 'technical',
    icon: '📐'
  },
  {
    id: 'monoline-wireframe',
    name: 'Monoline Wireframe',
    description: 'Single line thickness, no fills, low-fidelity UX',
    prompt: 'Design this as a monoline wireframe with consistent single line thickness, no fills or colors, just clean outlines. Focus on UX structure and layout hierarchy with minimal visual noise.',
    category: 'technical',
    icon: '📱'
  },
  {
    id: 'process-diagram',
    name: 'Process Diagram',
    description: 'Clean workflow visualization with connected steps',
    prompt: 'Design this as a process diagram with rounded rectangles, dashed border containers for grouping, flowing arrows connecting elements, and a soft pastel color palette (blues, greens, yellows, pinks). Use clean typography, hierarchical layout with logical flow, and organize content in clear sections with boundaries. Include subtle icons and maintain a professional technical documentation aesthetic.',
    category: 'technical',
    icon: '🔄'
  },
  {
    id: 'knowledge-graph',
    name: 'Knowledge Graph',
    description: 'AI agent workflow with connected nodes and reasoning',
    prompt: 'Design this as a knowledge graph/AI agent interface with interconnected nodes, circular elements, speech bubbles for AI thinking, network diagrams with coherence scores, multi-turn interaction flows, and robot/agent avatars. Use a clean technical aesthetic with connected knowledge networks, query-response patterns, and visual reasoning chains. Include graph visualizations, node relationships, and AI conversation elements.',
    category: 'technical',
    icon: '🧠'
  },
  
  // Flat design styles
  {
    id: 'material-design',
    name: 'Material Design',
    description: 'Google Material Design with solid colors and shadows',
    prompt: 'Create this design following Google Material Design principles with flat colors, subtle shadows, elevation layers, and modern UI components. Use the Material Design color palette and typography.',
    category: 'flat',
    icon: '🎨'
  },
  {
    id: 'isometric',
    name: 'Isometric',
    description: '3D-like angled views for architectural feel',
    prompt: 'Design this in isometric illustration style with angled 3D-like views. Use consistent isometric perspective, clean geometric shapes, and modern flat colors with subtle depth.',
    category: 'flat',
    icon: '📦'
  },
  {
    id: 'vector-icons',
    name: 'Vector Icon Set',
    description: 'Simplified icons with consistent stroke width',
    prompt: 'Create this design as a vector icon set style with simplified shapes, consistent stroke width throughout, minimal details, and a cohesive visual system. Focus on clarity and recognition.',
    category: 'flat',
    icon: '🔷'
  },
  
  // Playful styles
  {
    id: 'comic-panel',
    name: 'Comic Panel',
    description: 'Speech bubbles and halftone patterns',
    prompt: 'Design this in comic panel style with speech bubbles, thought clouds, halftone patterns, bold outlines, and vibrant colors. Use comic book visual language and dynamic layouts.',
    category: 'playful',
    icon: '💭'
  },
  {
    id: 'cartoon-doodle',
    name: 'Cartoon Doodle',
    description: 'Exaggerated, child-like shapes',
    prompt: 'Create this design in cartoon doodle style with exaggerated, child-like shapes, playful proportions, bright colors, and fun, approachable aesthetics. More animated than hand-drawn sketches.',
    category: 'playful',
    icon: '🎭'
  },
  {
    id: 'storybook',
    name: 'Storybook',
    description: 'Soft edges with watercolor-like whimsical feel',
    prompt: 'Design this in storybook illustration style with soft edges, watercolor-like fills, whimsical characters, gentle curves, and a dreamy, narrative-friendly aesthetic.',
    category: 'playful',
    icon: '📚'
  },
  
  // Presentation styles
  {
    id: 'infographic',
    name: 'Infographic',
    description: 'Clean data visuals with clear typography',
    prompt: 'Create this design as an infographic with clean data visualizations, clear typography hierarchy, charts and graphs, professional color scheme, and excellent readability for information presentation.',
    category: 'presentation',
    icon: '📊'
  },
  {
    id: 'corporate-slide',
    name: 'Corporate Slide',
    description: 'Professional presentation template style',
    prompt: 'Design this in corporate slide style similar to PowerPoint templates with semi-flat design, professional typography, consistent alignment, business-appropriate colors, and presentation-ready layout.',
    category: 'presentation',
    icon: '📋'
  },

  // Artistic & Creative styles
  {
    id: 'neon-synthwave',
    name: 'Neon Synthwave',
    description: 'Retro 80s with neon colors and cyber aesthetics',
    prompt: 'Create this design in neon synthwave style with vibrant neon colors (pink, cyan, purple), retro 80s aesthetics, glowing gradients, dark backgrounds, geometric patterns, and cyberpunk-inspired elements. Use futuristic fonts and grid overlays.',
    category: 'artistic',
    icon: '🌈'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft artistic watercolor effects with bleeding colors',
    prompt: 'Design this in watercolor painting style with soft, bleeding color effects, organic shapes, artistic brush strokes, gentle gradients, and a hand-painted aesthetic. Use muted, natural color palettes and fluid transitions.',
    category: 'artistic',
    icon: '🎨'
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    description: 'Bold colors and comic-style dots, Warhol-inspired',
    prompt: 'Create this design in pop art style with bold, contrasting colors, halftone dot patterns, comic book aesthetics, repetitive elements, and Andy Warhol-inspired visuals. Use bright, saturated colors and graphic elements.',
    category: 'artistic',
    icon: '🎭'
  },
  {
    id: 'art-deco',
    name: 'Art Deco',
    description: '1920s geometric patterns with gold accents',
    prompt: 'Design this in Art Deco style with geometric patterns, gold and black color schemes, elegant typography, symmetrical layouts, ornate details, and 1920s luxury aesthetics. Use metallic accents and classic proportions.',
    category: 'artistic',
    icon: '✨'
  },

  // Gaming & Interactive styles
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    description: 'Retro 8-bit video game aesthetics',
    prompt: 'Create this design in pixel art / 8-bit style with blocky, pixelated graphics, retro video game aesthetics, limited color palettes, sharp edges, and nostalgic gaming visuals. Use pixel-perfect alignment and classic game UI elements.',
    category: 'gaming',
    icon: '🎮'
  },
  {
    id: 'cyberpunk-terminal',
    name: 'Cyberpunk Terminal',
    description: 'Matrix-style green text on black, hacker aesthetic',
    prompt: 'Design this in cyberpunk terminal style with green monospace text on black backgrounds, Matrix-inspired aesthetics, glowing terminal effects, hacker interface elements, and futuristic command-line visuals.',
    category: 'gaming',
    icon: '💻'
  },
  {
    id: 'sci-fi-hud',
    name: 'Sci-Fi HUD',
    description: 'Futuristic heads-up display with glowing elements',
    prompt: 'Create this design as a sci-fi HUD (heads-up display) with futuristic interface elements, glowing blue/orange accents, holographic effects, transparent panels, and space-age technology aesthetics.',
    category: 'gaming',
    icon: '🚀'
  },

  // Retro & Vintage styles
  {
    id: 'retro-computer',
    name: 'Retro Computer',
    description: 'Early computer interface with CRT monitor aesthetics',
    prompt: 'Design this in retro computer style mimicking early personal computers with CRT monitor effects, scan lines, amber or green monochrome displays, blocky fonts, and 1980s computer interface aesthetics.',
    category: 'retro',
    icon: '🖥️'
  },
  {
    id: 'vintage-poster',
    name: 'Vintage Poster',
    description: 'Classic advertising poster with aged textures',
    prompt: 'Create this design as a vintage poster with aged paper textures, classic typography, muted color palettes, distressed effects, and retro advertising aesthetics from the 1940s-1960s era.',
    category: 'retro',
    icon: '📰'
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave',
    description: 'Aesthetic with pink/purple gradients and marble statues',
    prompt: 'Design this in vaporwave aesthetic with pink and purple gradients, classical marble statues, geometric grids, retro computer graphics, palm trees, and dreamy nostalgic elements with a surreal, internet culture vibe.',
    category: 'retro',
    icon: '🌴'
  },

  // Additional Gaming styles
  {
    id: 'minecraft',
    name: 'Minecraft',
    description: 'Blocky, voxel-based design elements',
    prompt: 'Create this design in Minecraft style with blocky, voxel-based elements, pixelated textures, cubic shapes, earthy color palettes, and the distinctive block-building aesthetic of the popular game.',
    category: 'gaming',
    icon: '🟫'
  },

  // Additional Artistic styles
  {
    id: 'glitch-art',
    name: 'Glitch Art',
    description: 'Digital corruption effects and data moshing',
    prompt: 'Design this in glitch art style with digital corruption effects, RGB channel shifts, pixelated distortions, data moshing aesthetics, broken textures, and intentional digital artifacts for a cyberpunk, experimental feel.',
    category: 'artistic',
    icon: '📺'
  },
  {
    id: 'memphis-design',
    name: 'Memphis Design',
    description: 'Bold 80s postmodern with geometric shapes',
    prompt: 'Create this design in Memphis Design style with bold geometric shapes, bright contrasting colors, squiggly lines, abstract patterns, playful asymmetry, and 1980s postmodern aesthetics.',
    category: 'artistic',
    icon: '🔺'
  }
];

export const STYLE_CATEGORIES = {
  sketch: { name: 'Sketch & Hand-drawn', icon: '✏️' },
  technical: { name: 'Technical & Wireframes', icon: '📐' },
  flat: { name: 'Flat & Modern', icon: '🎨' },
  playful: { name: 'Playful & Creative', icon: '🎭' },
  presentation: { name: 'Professional & Data', icon: '📊' },
  artistic: { name: 'Artistic & Visual', icon: '🌈' },
  gaming: { name: 'Gaming & Futuristic', icon: '🎮' },
  retro: { name: 'Retro & Vintage', icon: '📼' }
} as const;

export const getStyleById = (id: string): DesignStyle | undefined => {
  // First check built-in styles
  const builtInStyle = DESIGN_STYLES.find(style => style.id === id);
  if (builtInStyle) return builtInStyle;
  
  // Then check custom styles if in browser environment
  if (typeof window !== 'undefined') {
    try {
      const customStyles = JSON.parse(localStorage.getItem('customDesignStyles') || '[]') as DesignStyle[];
      return customStyles.find(style => style.id === id);
    } catch {
      return undefined;
    }
  }
  
  return undefined;
};

export const getStylesByCategory = (category: keyof typeof STYLE_CATEGORIES): DesignStyle[] => {
  return DESIGN_STYLES.filter(style => style.category === category);
};
