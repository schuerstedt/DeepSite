# Enhanced Style Guidelines & Snippet Concepts - Implementation Guide

This document outlines the new enhanced features for better style guidelines and improved text snippet rendering through the pollinations API.

## 🎨 Enhanced Style Guidelines System

### Overview

The Enhanced Style Guidelines system addresses the need for better consistency by having master LLMs create comprehensive style guides based on preselected design styles. This includes naming conventions, design principles, and implementation guidelines.

### Key Features

#### 1. **Dynamic Style Guide Generation**

```typescript
// Generate comprehensive style guide for any design style
const styleGuide = await generateStyleGuidePrompt('excalidraw');
// Returns detailed naming conventions, design principles, and code guidelines
```

#### 2. **Naming Conventions**

Each style now includes specific naming conventions:
- **CSS Classes**: Style-specific prefixes (e.g., `.sketch-`, `.corp-`, `.cyber-`)
- **Component Names**: Consistent patterns (e.g., `SketchCard`, `CorporateButton`)
- **Color Variables**: Semantic naming (e.g., `terminal-green`, `sketch-gray`)
- **Typography Classes**: Style-appropriate typography (e.g., `hand-written`, `corp-heading`)

#### 3. **Design Principles & Code Guidelines**

- Specific design principles for each style
- Implementation guidelines with CSS techniques
- Visual characteristics and aesthetics
- Layout and spacing recommendations

### Implementation

The enhanced style system integrates with both the main generation system and the pollinations API:

```typescript
// In prompts.ts
export const enhancePromptWithFeatures = async (
  originalPrompt: string,
  styleId: string = 'default',
  useConceptBreakdown: boolean = false,
  contentType: 'educational' | 'business' | 'technical' | 'creative' = 'educational'
): Promise<string>

// Enhanced system prompt with style integration
export const getEnhancedSystemPrompt = async (
  mode: 'classic' | 'enhanced' = 'classic',
  styleId: string = 'default',
  sectionMode: boolean = true
): Promise<string>
```

### Style Manifests

Each style includes:
- **Enhanced prompts** with naming conventions
- **Image prompt suffixes** for visual consistency
- **Design principles** for implementation
- **Code guidelines** for technical implementation

Example for Excalidraw style:
```typescript
{
  id: 'excalidraw',
  prompt: 'Render content with hand-drawn sketch aesthetics; prefer analogies; keep headings concise; use sketch-style class names like .sketch-border, .rough-line.',
  imagePromptSuffix: 'hand-drawn sketch style, rough strokes, no text',
  namingConventions: {
    classes: ['sketch-', 'rough-', 'hand-', 'draw-'],
    components: ['SketchCard', 'RoughButton', 'HandDrawnIcon'],
    colors: ['sketch-gray', 'pencil-black', 'paper-white'],
    typography: ['hand-written', 'sketch-font', 'rough-text']
  }
}
```

## 📝 Enhanced Snippet Concepts System

### Overview

The Snippet Concepts system addresses the issue of long, hard-to-read text snippets by breaking them into structured, visual concepts. This creates better readability with images, examples, and organized sections.

### Key Features

#### 1. **Concept Breakdown**

Master LLMs analyze content requests and create structured breakdowns:

```typescript
interface ConceptBreakdown {
  mainTopic: string;
  concepts: SnippetConcept[];
  totalSnippets: number;
  estimatedReadTime: number;
}
```

#### 2. **Snippet Types**

- **Overview**: Core definitions and context
- **Detailed**: Step-by-step instructions or deep analysis  
- **Visual**: Concrete examples with supporting imagery
- **Interactive**: Questions, challenges, hands-on activities
- **Summary**: Key takeaways and actionable insights

#### 3. **Visual Enhancement**

Each concept can include:
- Strategic image placement
- Diagrams and flowcharts
- Interactive elements
- Visual breaks and formatting

### Example: BATNA Breakdown

For "Explain BATNA in business negotiation":

```typescript
{
  mainTopic: "Understanding BATNA in Business Negotiations",
  concepts: [
    {
      id: 'batna_definition',
      title: 'What is BATNA?',
      type: 'overview',
      content: 'Core definition and importance',
      visualElements: { images: ['negotiation-diagram'] },
      priority: 5
    },
    {
      id: 'batna_development', 
      title: 'How to Develop Your BATNA',
      type: 'detailed',
      content: 'Step-by-step process with examples',
      visualElements: { diagrams: ['process-flow'] },
      priority: 4
    },
    {
      id: 'batna_example',
      title: 'BATNA in Action: Chemical Manufacturing',
      type: 'visual', 
      content: 'Real-world EU compliance scenario',
      visualElements: { images: ['scenario-diagram'], charts: ['decision-tree'] },
      priority: 5
    }
  ]
}
```

### Generated Structure

The system creates HTML with:
- **Progress indicators** showing concept progression
- **Visual breaks** between sections with appropriate imagery
- **Interactive elements** based on content type
- **Style consistency** following selected design guidelines

```html
<section class="mb-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border p-8 shadow-lg">
  <div class="flex items-center gap-3 mb-6">
    <span class="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">1</span>
    <span class="text-xs text-slate-500 uppercase tracking-wide">overview • short</span>
  </div>
  
  <div data-generatetext="Generate content for concept: What is BATNA?" 
       data-key="educational.batna_definition.excalidraw.general"
       data-length="short">
    Loading BATNA definition...
  </div>
  
  <figure class="mt-6">
    <img src="https://image.pollinations.ai/prompt/negotiation%20diagram%20visual%20illustration"
         width="800" height="400" class="w-full h-64 object-cover rounded-lg" />
  </figure>
</section>
```

## 🔧 Integration Points

### 1. **Main Generation System**

Enhanced prompts are integrated into the main ask-ai component:

```typescript
// Detect complex prompts that benefit from concept breakdown
const isComplexPrompt = prompt.length > 200 || 
                       prompt.toLowerCase().includes('explain') || 
                       prompt.toLowerCase().includes('comprehensive');

// Add concept breakdown suggestion
if (isComplexPrompt && !redesignMarkdown) {
  enhancedPrompt += `\n\nCONTENT STRATEGY: Consider breaking this into focused concepts with visual elements, examples, and structured sections for better readability.`;
}
```

### 2. **Pollinations API Integration**

Both text and image generation benefit from style consistency:

```javascript
// Enhanced generatetext with style integration
async function generatetext(prompt, system) {
  const selectedStyle = localStorage.getItem('designStyle') || 'default';
  
  if (selectedStyle !== 'default') {
    enhancedPrompt = await enhancePromptWithStyleGuidelines(prompt, selectedStyle);
  }
  
  // Generate with enhanced prompt
}

// Image generation with style suffixes
function getImageStyleSuffix(styleId) {
  const imageSuffixes = {
    'excalidraw': 'hand-drawn sketch style, rough strokes, no text',
    'corporate-slide': 'clean corporate slide aesthetic, minimal palette'
  };
  return imageSuffixes[styleId] || 'professional, clean, modern aesthetic';
}
```

### 3. **UI Integration**

New settings panel includes:
- **Content Breakdown Toggle**: Enable/disable concept breakdown for complex content
- **Style Enhancement Indicators**: Show when enhanced style guidelines are active
- **Visual Progress**: Loading states that indicate style and concept processing

## 📊 Benefits

### For Users
- **Better Readability**: Long content broken into digestible concepts
- **Visual Appeal**: Strategic images and design elements
- **Consistent Styling**: Professional naming conventions and design patterns
- **Educational Value**: Structured learning with examples and visuals

### For Developers  
- **Code Consistency**: Style-specific naming conventions and patterns
- **Maintainable Styles**: Clear guidelines for each design aesthetic
- **Scalable System**: Easy to add new styles and concept types
- **API Efficiency**: Better use of pollinations API with style-aware prompts

## 🚀 Usage Examples

### Example 1: Educational Content with Excalidraw Style

```typescript
const prompt = "Explain supply chain management for manufacturing companies";
const enhanced = await enhancePromptWithFeatures(
  prompt, 
  'excalidraw', 
  true, // Enable concept breakdown
  'educational'
);
```

Result: Hand-drawn style breakdown with sketchy diagrams, process flows, and real-world examples.

### Example 2: Business Documentation with Corporate Style  

```typescript  
const prompt = "Create comprehensive employee onboarding guide";
const enhanced = await enhancePromptWithFeatures(
  prompt,
  'corporate-slide',
  true,
  'business' 
);
```

Result: Professional presentation-style sections with clean layouts, corporate imagery, and structured information.

## 🔮 Future Enhancements

- **Custom Style Creation**: Allow users to define their own style manifests
- **AI-Generated Visuals**: More intelligent image selection based on content analysis  
- **Interactive Concept Maps**: Visual navigation between related concepts
- **Collaborative Style Guides**: Share and import style guidelines across teams
- **Performance Optimization**: Caching and pre-generation of common concept breakdowns

---

This enhanced system provides a foundation for much more sophisticated content generation that is both visually appealing and educationally effective, while maintaining consistency across different design aesthetics.

## ✅ Implementation Status - COMPLETE

### 🎯 **Both Enhancement Requests Fully Implemented:**

#### **1. Enhanced Style Guide System** ✅
- ✅ Master LLM generates comprehensive style guides with naming conventions
- ✅ Style-specific class patterns and component structures  
- ✅ Design style persistence and integration
- ✅ Files: `lib/enhanced-style-guide.ts`, `lib/modular-prompt-builder.ts`, `lib/prompts.ts`

#### **2. Data-Concept Modular Prompt System** ✅
- ✅ **NEW**: `data-concept` attribute for shared context coordination
- ✅ **NEW**: Granular control attributes (length, tone, audience, key, lang)
- ✅ **NEW**: Modular prompt builder with clean architecture
- ✅ **NEW**: Smart content caching system
- ✅ **NEW**: Master LLM system prompt updated to encourage data-concept pattern
- ✅ Files: `public/generatetext.js` (completely enhanced), `lib/prompts.ts`

### 🧠 **New Data-Concept Pattern**:

Instead of large single prompts:
```html
❌ <div data-generatetext="Explain comprehensive negotiation tactics with examples, preparation strategies, techniques, and follow-up">
```

Use coordinated focused parts:
```html
✅ <div data-concept="Comprehensive negotiation tactics guide" 
         data-generatetext="Preparation strategies for successful negotiations" 
         data-length="medium" 
         data-tone="professional">

✅ <div data-concept="Comprehensive negotiation tactics guide" 
         data-generatetext="Key techniques during active negotiation" 
         data-length="medium" 
         data-tone="professional">
```

### 🎛️ **Available Control Attributes**:
- **`data-concept`**: Overall topic/context (coordinates related parts)
- **`data-generatetext`**: Specific focused prompt  
- **`data-length`**: "short" | "medium" | "long"
- **`data-tone`**: "professional" | "friendly" | "confident" | "casual" etc.
- **`data-audience`**: "developers" | "executives" | "SMEs" | "students" etc.
- **`data-key`**: Unique identifier for smart caching
- **`data-lang`**: Language code (default: "en")

### 🏗️ **Technical Architecture**:

1. **ModularPromptBuilder Class**: Clean separation of prompt construction
2. **Context Extraction**: Reads all attributes from DOM elements
3. **Smart Caching**: Content cache based on data-key combinations
4. **Style Integration**: Seamless integration with design style system
5. **Fallback Support**: Graceful degradation for legacy prompts

## 🧪 Testing Instructions

### 1. **Data-Concept System Demo:**
```bash
# Open the new interactive demo
start data-concept-demo.html
```
This demo shows:
- Coordinated multi-part content with shared `data-concept`
- All new control attributes in action
- Smart caching with `data-key`
- Style integration across sections

### 2. **Manual Integration Test:**
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="generatetext.js"></script>
</head>
<body class="p-6">
    <!-- Test the new data-concept pattern -->
    <div data-concept="Complete project management guide"
         data-generatetext="Project planning and initialization strategies"
         data-length="medium"
         data-tone="professional"
         data-audience="project managers"
         data-key="pm.planning">
        Loading project planning...
    </div>

    <div data-concept="Complete project management guide"
         data-generatetext="Team coordination and communication best practices"
         data-length="medium"
         data-tone="collaborative"
         data-audience="project managers"
         data-key="pm.coordination">
        Loading team coordination...
    </div>

    <script>
        localStorage.setItem('designStyle', 'professional');
    </script>
</body>
</html>
```

### 3. **Caching System Test:**
```javascript
// Test in browser console after loading content

// Check cache status
console.log('Cache size:', contentCache.size);
console.log('Cached keys:', [...contentCache.keys()]);

// Verify same content is cached
const context1 = { key: 'test.key', length: 'medium', tone: 'professional' };
const builder1 = new ModularPromptBuilder(context1);
console.log('Cache key:', builder1.getCacheKey()); // Should be: test.key.medium.professional.general.en
```

### 4. **Master LLM System Prompt Test:**
Create content that should naturally use the data-concept pattern:
```
Prompt: "create a comprehensive business strategy guide"
Expected: Master LLM should generate multiple data-concept sections rather than single large data-generatetext
```

### 5. **Attribute Control Test:**
```html
<!-- Test different combinations -->
<div data-concept="API documentation guide"
     data-generatetext="REST API fundamentals and best practices"
     data-length="long"
     data-tone="technical"
     data-audience="developers"
     data-lang="en">Loading...</div>

<div data-concept="API documentation guide"
     data-generatetext="Authentication and security considerations"
     data-length="medium"
     data-tone="security-focused"
     data-audience="developers"
     data-lang="en">Loading...</div>
```

## 📋 Verification Checklist

- [ ] Style guides generate with naming conventions for each design style
- [ ] Large/complex prompts automatically trigger breakdown detection
- [ ] Master LLM creates structured content with visual elements  
- [ ] Context is preserved across broken-down content parts
- [ ] Visual elements (images, icons, callouts) appear between sections
- [ ] Fallback system works when master LLM calls fail
- [ ] Different design styles produce appropriate styling patterns
- [ ] Demo page loads and functions correctly
- [ ] Integration works with existing generatetext.js system
