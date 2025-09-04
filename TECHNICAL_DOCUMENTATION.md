# DeepSite v2 - AI Website Generator Technical Documentation

## 🏗️ Architecture Overview

DeepSite v2 is a **Next.js 15.3.3-based AI website generator** that combines multiple AI providers with comprehensive design systems to create professional, interactive websites. The system features dynamic content generation, interactive component libraries, and intelligent content structure patterns.

## 🧠 Core Concept: Three-Layer Generation System

### Layer 1: System Prompts (Foundation)
The system uses sophisticated prompts that define the generation behavior:

**Enhanced Mode System Prompt** (`lib/prompts.ts`):
- **Strategic Planning**: Purpose, content architecture, visual strategy, UX, technical requirements
- **Design System Integration**: Comprehensive Tailwind CSS patterns and component guidelines
- **Interactive Component Patterns**: Tab systems, accordions, modals, progressive loading
- **Content Excellence**: 300-500 word sections with real value and engagement focus

**Classic Mode System Prompt**:
- Traditional single-stage generation with image integration
- Content richness guidelines for substantial, meaningful content
- Pollinations.ai image generation with detailed prompts

### Layer 2: Dynamic Image Generation (Visual Content)
**Pollinations.ai Integration** with intelligent prompt generation:

```typescript
// API Format
https://image.pollinations.ai/prompt/{URL-encoded-prompt}?width={width}&height={height}&model=flux&enhance=true&seed=42

// Enhanced Prompt Guidelines
- 20-40 words focusing on visual elements, style, lighting, composition
- No text/words in prompts (Flux limitation)
- URL-encoded with proper dimensions
- Professional context-aware descriptions
```

**Image Strategy**:
- Strategic placement between content sections for visual breaks
- Context-aware prompts based on website purpose and content
- Consistent styling with Tailwind classes (`rounded-lg`, `shadow-md`)
- Performance optimization with proper width/height attributes

### Layer 3: Dynamic Text Generation (Content Snippets)
**GenerateText.js System** for progressive content loading:

```javascript
// Usage Pattern
<div data-generatetext="Create detailed testimonials with specific results" data-system="optional-system-prompt">Loading...</div>

// Features
- Auto-loading on page load (no user interaction required)
- Consistent system prompts across entire page
- 300-500 word substantial content per section
- Integration with interactive components
```

**Content Generation Strategy**:
- **Pattern Recognition**: Automatic layout selection (tabs, accordions, cards)
- **Progressive Structure**: Hero → Content → Interactive → Visual → CTA
- **Content Mixing**: generatetext + images + interactive elements
- **Consistent Styling**: Unified design language across all generated content

## 🤖 AI/LLM Integration

### Supported Providers & Models

**Primary Providers** (`lib/providers.ts`):

| Provider | Models | Max Tokens | Features |
|----------|---------|------------|----------|
| **DeepSeek** | V3-0324, R1-0528 | 131,000 | Primary generation, thinking models |
| **Fireworks AI** | Qwen3-Coder-480B | 131,000 | Code generation specialist |
| **Nebius AI** | Multiple models | 131,000 | High-performance generation |
| **SambaNova** | Various models | 32,000 | Fast inference |
| **Together AI** | Community models | 128,000 | Model variety |
| **Groq** | Optimized models | 16,384 | Ultra-fast inference |

**Text Generation Models** (Pollinations.ai):
- Dynamic model fetching from `https://text.pollinations.ai/models`
- Model selection interface in settings
- Cross-component synchronization via localStorage
- Fallback to default models if API unavailable

### Two-Mode AI System

#### Mode 1: Enhanced Planning Mode
- **Strategic Thinking**: Systematic planning before implementation
- **Component Integration**: Automatic interactive element generation
- **Content Strategy**: Intelligent content structure with generatetext integration
- **Design System**: Consistent professional styling patterns

#### Mode 2: Classic Mode  
- **Direct Generation**: Traditional prompt-to-website conversion
- **Image Integration**: Comprehensive pollinations.ai image generation
- **Content Richness**: Substantial content creation guidelines
- **Flexibility**: User-controlled generation approach

## 🎨 Style Guidelines System

### Comprehensive Design Patterns (`STYLE_GUIDELINES.md`)

**Layout Containers**:
```css
/* Page Structure */
.page-container { @apply min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800; }
.content-wrapper { @apply container mx-auto px-4 py-8 max-w-6xl; }
.section-container { @apply mb-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-8 shadow-lg; }
```

**Typography System**:
```css
/* Heading Hierarchy */
.heading-1 { @apply text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6; }
.heading-2 { @apply text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4; }
.body-text { @apply text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4; }
```

**Interactive Elements**:
```css
/* Button Patterns */
.primary-button { @apply bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md; }
.card-hover { @apply group hover:shadow-lg transition-all duration-300 hover:-translate-y-1; }
```

## 🔧 Interactive Component System

### Component Library (`INTERACTIVE_COMPONENTS_GUIDE.md`)

**Available Components**:
- **Tab Systems**: Multi-section content organization
- **Accordion Sections**: Expandable FAQ and features
- **Modal Dialogs**: Detailed content overlays
- **Progressive Loading**: Staged content revelation
- **Form Enhancements**: Real-time validation
- **Tooltip System**: Contextual help
- **Card Interactions**: Enhanced hover effects

**JavaScript Integration** (`public/interactive-features.js`):
```javascript
// Auto-initialization
class InteractiveFeatures {
  constructor() {
    this.initializeTabs();
    this.initializeAccordions();
    this.initializeModals();
    this.initializeProgressiveLoader();
  }
}
```

**Usage in Generated Content**:
```html
<!-- Tab System -->
<div class="w-full" data-component="tabs">
  <div class="flex space-x-1 rounded-lg bg-slate-100 dark:bg-slate-800 p-1 mb-6" role="tablist">
    <button role="tab" data-tab="overview">Overview</button>
  </div>
  <div data-tab-content="overview">
    <div data-generatetext="Create comprehensive overview">Loading...</div>
  </div>
</div>
```

## 🔄 Content Generation Workflow

### Intelligent Content Structure

**Pattern Selection Logic**:
1. **Content Analysis**: Determine optimal layout pattern (tabs, accordions, cards)
2. **Component Generation**: Create interactive elements with generatetext integration
3. **Visual Integration**: Strategic image placement for content breaks
4. **Consistency Application**: Unified styling across all elements

**Progressive Loading Strategy**:
```javascript
// GenerateText Integration
1. Page loads with structured HTML + interactive components
2. generatetext.js automatically processes data-generatetext attributes
3. Content generates in background with loading states
4. Progressive revelation with animations
5. Final state: Fully interactive website with rich content
```

### Content Mixing Pattern

**Optimal Structure**:
```html
<!-- Hero Section -->
<section class="hero-with-background">
  <!-- Initial content -->
</section>

<!-- Progressive Content -->
<div data-generatetext="Introduction content">Loading...</div>
<img src="pollinations-api-call" class="visual-break">
<div data-generatetext="Feature details">Loading...</div>

<!-- Interactive Component -->
<div data-component="tabs">
  <!-- Rich interactive content -->
</div>
```

## 📡 API Architecture

### Core Endpoints

**Primary Generation** (`/api/ask-ai`):
- **Method**: POST (initial) / PUT (follow-up)
- **Features**: Streaming responses, provider selection, model switching
- **Integration**: System prompt selection (enhanced/classic)

**Text Generation Proxy** (Future - TODO):
- **Endpoint**: `/api/proxy/pollinations/text/*`
- **Purpose**: Rate limiting, authentication, model switching
- **Benefits**: Centralized control, fallback mechanisms

**Image Generation Proxy** (Future - TODO):
- **Endpoint**: `/api/proxy/pollinations/image/*`
- **Purpose**: Caching, rate limiting, alternative model support
- **Benefits**: Performance optimization, cost control

### Model Selection System

**DeepSeek Models** (`hooks/useTextModel.ts`):
- Settings panel integration
- localStorage persistence
- Cross-component synchronization

**Text Generation Models**:
- Dynamic fetching from pollinations.ai
- Real-time model switching
- Fallback to default models

## 🎯 Advanced Features

### User Documentation System

**Comprehensive Start Page** (`lib/consts.ts` - defaultHTML):
- Interactive documentation with expandable sections
- Quick start examples organized by category
- Copy-to-clipboard functionality for example prompts
- Training-focused approach for user education

**Documentation Suite**:
- `STYLE_GUIDELINES.md`: Complete design system
- `INTERACTIVE_COMPONENTS_GUIDE.md`: Component library reference
- `USER_GUIDE.md`: Comprehensive user instructions
- `IMPLEMENTATION_SUMMARY.md`: Technical implementation overview

### Export & Download System

**Enhanced Download Options** (`components/editor/download-generated-content.tsx`):
- **HTML Export**: Complete websites with all features
- **ZIP Downloads**: Packaged websites with assets
- **Image Export**: High-quality screenshots
- **PDF Generation**: Professional document output

### Performance Optimization

**Loading Strategies**:
- Lazy image loading with intersection observer
- Progressive content revelation
- Smooth animations with optimized transitions
- Client-side hydration protection

**SSR Safety**:
- Comprehensive client-side checks
- Dynamic imports for browser-only features
- Consistent state management
- Layout stability patterns

## � Future Architecture (Phase 2 TODO)

### Inline Editing System
- Three-icon control system for each content block
- Direct HTML editing with validation
- Regeneration with seed control
- Prompt modification for specific elements

### Local API Proxy
- Rate limiting with authentication
- Request/response logging
- Easy model switching
- Performance optimization with caching

### Multi-LLM Architecture
- Specialized LLMs for different tasks
- Master LLM for architecture planning
- Worker LLMs for content generation
- Integration specialist for final polish

This architecture creates a **comprehensive website generation platform** that combines AI intelligence with professional design systems, interactive components, and intelligent content structure for producing high-quality, engaging websites.

```typescript
messages: [
  {
    role: "system",
    content: FOLLOW_UP_SYSTEM_PROMPT
  },
  {
    role: "user", 
    content: previousPrompt || "You are modifying the HTML file based on the user's request."
  },
  {
    role: "assistant",
    content: `The current code is: \n\`\`\`html\n${html}\n\`\`\` ${
      selectedElementHtml 
        ? `\n\nYou have to update ONLY the following element, NOTHING ELSE: \n\n\`\`\`html\n${selectedElementHtml}\n\`\`\``
        : ""
    }`
  },
  {
    role: "user",
    content: newPrompt
  }
]
```

### 3. Smart Diff Application

The backend parses AI responses for SEARCH/REPLACE blocks:

```typescript
// Parse SEARCH/REPLACE blocks
const searchStartIndex = chunk.indexOf(SEARCH_START, position);
const dividerIndex = chunk.indexOf(DIVIDER, searchStartIndex);
const replaceEndIndex = chunk.indexOf(REPLACE_END, dividerIndex);

const searchBlock = chunk.substring(searchStartIndex + SEARCH_START.length, dividerIndex);
const replaceBlock = chunk.substring(dividerIndex + DIVIDER.length, replaceEndIndex);

// Apply changes and track line numbers
const blockPosition = newHtml.indexOf(searchBlock);
if (blockPosition !== -1) {
  const beforeText = newHtml.substring(0, blockPosition);
  const startLineNumber = beforeText.split("\n").length;
  const replaceLines = replaceBlock.split("\n").length;
  const endLineNumber = startLineNumber + replaceLines - 1;
  
  updatedLines.push([startLineNumber, endLineNumber]);
  newHtml = newHtml.replace(searchBlock, replaceBlock);
}
```

## 🎨 User Interface Features

### Split-Screen Editor

- **Left Panel**: Monaco Editor (VS Code editor) showing HTML source
- **Right Panel**: Live preview with device responsive testing
- **Real-time Synchronization**: Changes reflect immediately between editor and preview

### Smart Features

| Feature | Description |
|---------|-------------|
| **Streaming AI Responses** | See AI "thinking" and generating code in real-time |
| **Visual Diff Highlighting** | Changed lines are highlighted in the editor |
| **Element Selection** | Click elements in preview to edit them specifically |
| **History Tracking** | Maintains history of all changes and prompts |
| **Sound Notifications** | Success sound when AI completes tasks |
| **Advanced Export System** | HTML, PNG, and PDF with 3-tier fallback rendering |
| **Multiline Resizable Input** | Custom drag handles with manual/auto resize modes |
| **Device Preview** | Test responsive design (mobile, tablet, desktop) |
| **Follow-up Toggle** | Switch between full regeneration and incremental editing |

### Export System Architecture

DeepSite includes a comprehensive export system supporting multiple formats:

#### **HTML Export**
- Clean, production-ready code output
- Preserves all styling and functionality
- One-click download with proper file naming

#### **PNG Screenshot Export**  
- High-quality image capture using html2canvas
- Preserves visual styling and layout
- Optimized for sharing and presentations

#### **PDF Generation (3-Tier Fallback)**
```typescript
// Advanced PDF with full styling preservation
downloadAsPdf() -> html2canvas + jsPDF with styling

// Simple PDF for compatibility
downloadAsPdfSimple() -> basic rendering without complex styles  

// Text extraction as final fallback
downloadAsPdfText() -> pure text content extraction
```

**Key Features:**
- SSR-safe dynamic imports for browser-only libraries
- Visual loading states with color-coded feedback
- Graceful degradation through fallback levels
- Comprehensive error handling and user notifications

### Chat Interface Components

- **Enhanced Prompt Input**: Multiline textarea with custom resize handles
  - Manual resize with visual feedback (blue border)
  - Auto-resize functionality with height preservation
  - Intuitive drag direction (up = larger, down = smaller)
  - State preservation between manual and automatic modes
- **Provider Selection**: Choose between different AI providers
- **Model Selection**: Choose between different AI models  
- **Settings Panel**: Configure provider, model, and follow-up behavior
- **Progress Indicators**: Show AI thinking/working state with export feedback

## 🔧 Technical Implementation Details

### Authentication & Rate Limiting

```typescript
// Multiple authentication methods supported:

// 1. User tokens (authenticated users)
const userToken = request.cookies.get(MY_TOKEN_KEY())?.value;

// 2. Environment HF_TOKEN (local development)
if (process.env.HF_TOKEN && process.env.HF_TOKEN.length > 0) {
  token = process.env.HF_TOKEN;
}

// 3. DEFAULT_HF_TOKEN (fallback for anonymous users)
if (!token) {
  token = process.env.DEFAULT_HF_TOKEN as string;
  billTo = "huggingface";
}

// 4. IP-based rate limiting (2 requests per IP for anonymous)
if (ipAddresses.get(ip) > MAX_REQUESTS_PER_IP) {
  return NextResponse.json({
    ok: false,
    openLogin: true,
    message: "Log In to continue using the service"
  }, { status: 429 });
}
```

### Streaming Implementation

```typescript
// Real-time AI response streaming
const encoder = new TextEncoder();
const stream = new TransformStream();
const writer = stream.writable.getWriter();

const chatCompletion = client.chatCompletionStream({
  model: selectedModel.value,
  provider: selectedProvider.id,
  messages: [...],
  max_tokens: selectedProvider.max_tokens
});

while (true) {
  const { done, value } = await chatCompletion.next();
  if (done) break;
  
  const chunk = value.choices[0]?.delta?.content;
  if (chunk) {
    await writer.write(encoder.encode(chunk));
    completeResponse += chunk;
    
    // Stop when HTML is complete
    if (completeResponse.includes("</html>")) {
      break;
    }
  }
}
```

### Error Handling

```typescript
// Provider-specific error handling
if (error.message?.includes("exceeded your monthly included credits")) {
  return NextResponse.json({
    ok: false,
    openProModal: true,
    message: error.message
  }, { status: 402 });
}

// Model compatibility checking
if (!selectedModel.providers.includes(provider) && provider !== "auto") {
  return NextResponse.json({
    ok: false,
    error: `The selected model does not support the ${provider} provider.`,
    openSelectProvider: true
  }, { status: 400 });
}
```

## 🌐 Additional Features

### Website Redesign from URLs

Uses **Jina AI Reader** to extract website content:

```typescript
// /api/re-design endpoint
const response = await fetch(
  `https://r.jina.ai/${encodeURIComponent(url)}`,
  { method: "POST" }
);
const markdown = await response.text();

// Then feed markdown to AI:
const prompt = `Here is my current design as a markdown:\n\n${redesignMarkdown}\n\nNow, please create a new design based on this markdown.`
```

### Project Management

- **Save/Load Projects**: Store projects in MongoDB
- **User Authentication**: Cookie-based auth system
- **Project Sharing**: Share projects between users
- **History Tracking**: Maintain edit history for each project

### Export/Deploy Options

- **Copy HTML**: One-click copy to clipboard
- **Direct Export**: Download HTML files
- **Deploy Integration**: Connect to hosting services

## 🎯 Key Innovation: Follow-up Editing System

The most sophisticated part of DeepSite is the **conversational follow-up editing system**:

### 1. Context Preservation
- Maintains conversation context between edits
- Remembers previous prompts and changes
- Builds cumulative understanding of user intent

### 2. Precise Targeting
- Can edit specific elements without affecting the rest
- Uses element selection for surgical precision
- Maintains overall page structure and functionality

### 3. Diff-based Changes
- Uses SEARCH/REPLACE format for surgical precision
- Tracks exact line numbers of changes
- Provides visual feedback on what changed

### 4. Visual Feedback
- Highlights exactly what changed in the editor
- Scrolls to changed sections automatically
- Shows diff decorations in Monaco Editor

## 🔧 Security & Performance Features

### Rate Limiting & Authentication
- **IP-based Rate Limiting**: Anonymous users limited to 2 requests per IP
- **User Authentication**: Cookie-based token system for unlimited access
- **Fallback Token System**: Environment variables for development/production
- **Provider Billing Tracking**: Separate billing for different token sources

### Token Monitoring System
- **Real-time Token Tracking**: Monitor usage across all providers (`hooks/useTokenTracking.ts`)
- **Cost Estimation**: Track approximate costs for different model usage
- **Usage Analytics**: Historical usage patterns and optimization recommendations
- **Provider Comparison**: Compare costs and performance across providers

### Content Security
- **Input Sanitization**: Clean user prompts before AI processing
- **Output Validation**: Validate generated HTML for security
- **XSS Prevention**: Comprehensive sanitization of generated content
- **CORS Protection**: Secure API endpoints with proper headers

## 📁 Project Structure

```
/app
  /api
    /ask-ai/route.ts          # Main AI endpoint with dual mode support
    /re-design/route.ts       # Website redesign from URL analysis
    /auth/route.ts            # Authentication and session management
    /me/route.ts              # User profile and settings
  /(public)/                  # Public marketing pages
  /projects/                  # Project management interface
  /auth/                      # Authentication flow pages

/components
  /editor/                    # Core editor interface
    index.tsx                 # Main split-screen editor
    /ask-ai/                  # AI interaction components
      index.tsx              # Chat interface with streaming
      settings.tsx           # Provider/model configuration
      prompt-history.tsx     # Conversation history
    /preview/                 # Live website preview
    /download/                # Export system components
    /header/                  # Editor toolbar
    /footer/                  # Status and controls

  /analytics-dashboard.tsx    # Usage analytics and monitoring
  /contexts/                  # React context providers
  /magic-ui/                  # Reusable UI components
  /providers/                 # External service integrations

/lib
  prompts.ts                 # System prompts (enhanced/classic modes)
  providers.ts               # AI provider configurations
  custom-styles.ts           # Dynamic style system
  design-styles.ts           # Comprehensive design patterns
  token-monitoring.ts        # Usage tracking utilities
  prompt-analytics.ts        # Conversation analytics
  download-utils.ts          # Export system utilities

/hooks
  useEditor.ts               # Editor state and HTML management
  useTokenTracking.ts        # Real-time usage monitoring
  useUser.ts                 # Authentication and user data

/types
  index.ts                   # TypeScript definitions
  declare.d.ts               # Global type declarations

/public
  /providers/                # Provider logos and assets
  /interactive-features.js   # Client-side interactive components
```

## 🚀 Setup & Development

### Environment Configuration

```bash
# Core AI Functionality
HF_TOKEN=your_primary_huggingface_token
DEFAULT_HF_TOKEN=fallback_token_for_anonymous_users

# Database & Storage
MONGODB_URI=mongodb_connection_string

# Authentication (Optional)
NEXTAUTH_SECRET=secure_session_secret
AUTH_PROVIDERS=github,google  # Supported OAuth providers

# Development (Optional)
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your tokens

# Start development server
npm run dev

# Access the application
open http://localhost:3000
```

### Production Deployment

```bash
# Build optimized version
npm run build

# Start production server
npm start

# Or deploy to Vercel/Netlify/Docker
```

## 🔄 Enhanced Development Workflow

### 1. **User Interaction**
- User selects generation mode (Enhanced/Classic)
- Configures provider/model preferences
- Types natural language prompt

### 2. **Intelligent Processing**
- System analyzes prompt for optimal generation strategy
- Selects appropriate system prompt and components
- Builds context with conversation history

### 3. **AI Generation**
- Streams real-time response with thinking process
- Generates structured HTML with interactive components
- Integrates dynamic content generation markers

### 4. **Progressive Enhancement**
- Initial HTML loads with interactive framework
- GenerateText.js processes dynamic content sections
- Images load progressively with pollinizations.ai
- Interactive components activate automatically

### 5. **User Refinement**
- Follow-up prompts for targeted editing
- Element-specific modifications
- Style and content adjustments
- Export to multiple formats

### 6. **Project Management**
- Auto-save to MongoDB with version history
- Share projects with other users
- Export complete websites or components
- Track usage and optimize performance

## 🛡️ Advanced SSR & Performance

### **Hydration Safety Patterns**
```typescript
// Universal client-side protection
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <LoadingSkeleton />;

// Dynamic imports with error boundaries
const LazyComponent = dynamic(() => import('./BrowserOnlyComponent'), {
  ssr: false,
  loading: () => <Skeleton />,
  error: ({ error }) => <ErrorFallback error={error} />
});
```

### **Performance Optimization**
- **Code Splitting**: Dynamic imports for heavy components
- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Caching Strategy**: Redis caching for API responses
- **CDN Integration**: Static asset optimization

### **Progressive Web App Features**
- **Service Worker**: Offline functionality for generated websites
- **Manifest**: Installable PWA with custom icons
- **Caching**: Intelligent caching of generated content
- **Push Notifications**: Update notifications for saved projects

This comprehensive architecture delivers a **professional-grade AI website generator** that combines cutting-edge AI capabilities with robust software engineering practices, creating websites that are both impressive and production-ready.
