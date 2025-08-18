# DeepSite - AI Website Generator Technical Documentation

## 🏗️ Architecture Overview

DeepSite is a **Next.js-based AI website generator** that uses multiple LLM providers to generate and modify HTML/CSS/JS websites in real-time. It's essentially a smart code editor with AI capabilities that turns website creation into a conversational experience between human creativity and AI technical implementation.

## 🤖 AI/LLM Integration

### Supported Providers

The system supports multiple AI providers through the **Hugging Face Inference API** (`lib/providers.ts`):

| Provider | Max Tokens | ID |
|----------|------------|-----|
| **Fireworks AI** | 131,000 | `fireworks-ai` |
| **Nebius AI Studio** | 131,000 | `nebius` |
| **SambaNova** | 32,000 | `sambanova` |
| **NovitaAI** (Default) | 16,000 | `novita` |
| **Hyperbolic** | 131,000 | `hyperbolic` |
| **Together AI** | 128,000 | `together` |
| **Groq** | 16,384 | `groq` |

### Supported Models

- **DeepSeek V3 O324** (`deepseek-ai/DeepSeek-V3-0324`) - Primary model
- **DeepSeek R1 0528** (`deepseek-ai/DeepSeek-R1-0528`) - Thinking model
- **Qwen3 Coder 480B** (`Qwen/Qwen3-Coder-480B-A35B-Instruct`) 
- **Kimi K2 Instruct** (`moonshotai/Kimi-K2-Instruct`)

### Two-Mode AI System

#### Mode 1: Initial Generation (`POST /api/ask-ai`)
- **Purpose**: Generates complete HTML files from scratch
- **System Prompt**: `INITIAL_SYSTEM_PROMPT`
- **Response Type**: Streaming response with real-time AI thinking
- **Special Features**: Handles "thinking" models with `<think>` tags

#### Mode 2: Follow-up Editing (`PUT /api/ask-ai`)
- **Purpose**: Smart diff-based editing of existing HTML
- **System Prompt**: `FOLLOW_UP_SYSTEM_PROMPT`
- **Response Type**: SEARCH/REPLACE blocks for precise modifications
- **Special Features**: Element-specific targeting, context preservation

## 🧠 Prompting System

### Initial Generation Prompt

```typescript
INITIAL_SYSTEM_PROMPT = `ONLY USE HTML, CSS AND JAVASCRIPT. 
If you want to use ICON make sure to import the library first. 
Try to create the best UI possible by using only HTML, CSS and JAVASCRIPT. 
MAKE IT RESPONSIVE USING TAILWINDCSS. 
Use as much as you can TailwindCSS for the CSS, if you can't do something with TailwindCSS, then use custom CSS 
(make sure to import <script src="https://cdn.tailwindcss.com"></script> in the head). 
Also, try to ellaborate as much as you can, to create something unique. 
ALWAYS GIVE THE RESPONSE INTO A SINGLE HTML FILE. 
AVOID CHINESE CHARACTERS IN THE CODE IF NOT ASKED BY THE USER.`
```

### Follow-up Editing System

The follow-up system uses a **SEARCH/REPLACE block format**:

```typescript
FOLLOW_UP_SYSTEM_PROMPT = `You are an expert web developer modifying an existing HTML file.
The user wants to apply changes based on their request.
You MUST output ONLY the changes required using the following SEARCH/REPLACE block format.

Format Rules:
1. Start with <<<<<<< SEARCH
2. Provide the exact lines from the current code that need to be replaced.
3. Use ======= to separate the search block from the replacement.
4. Provide the new lines that should replace the original lines.
5. End with >>>>>>> REPLACE
6. You can use multiple SEARCH/REPLACE blocks if changes are needed in different parts.
7. The SEARCH block must exactly match the current code, including indentation and whitespace.

Example:
<<<<<<< SEARCH
    <h1>Old Title</h1>
=======
    <h1>New Title</h1>
>>>>>>> REPLACE
`
```

## 🔄 How the Editing Flow Works

### 1. Element Selection Mode

Users can enable **"Edit Mode"** for targeted editing:

1. Click the crosshair button to enable edit mode
2. Click on any element in the preview to select it
3. Selected element's HTML is captured for targeted editing
4. Chat interface switches to focus mode for that element

### 2. Intelligent Context Building

When making follow-up requests, the system builds rich context:

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

### 5. Intelligent Prompting
- Builds rich context including:
  - Previous prompts and responses
  - Current HTML state
  - Selected element information
  - User preferences and settings

## 📁 File Structure

```
/app
  /api
    /ask-ai/route.ts          # Main AI endpoint (POST & PUT)
    /re-design/route.ts       # Website redesign from URLs
    /auth/route.ts            # Authentication
  /(public)/                  # Public pages
  /projects/                  # Project management pages

/components
  /editor/
    index.tsx                 # Main editor component
    /ask-ai/
      index.tsx              # AI chat interface
      settings.tsx           # Provider/model settings
      follow-up-tooltip.tsx  # Help for follow-up mode
      selected-html-element.tsx # Element selection UI
    /preview/index.tsx       # Live preview component

/lib
  prompts.ts                 # System prompts and constants
  providers.ts               # AI provider configurations
  api.ts                     # API utilities
  auth.ts                    # Authentication utilities

/hooks
  useEditor.ts               # Editor state management
  useUser.ts                 # User state management
```

## 🚀 Getting Started

### Environment Variables

```bash
# Required for AI functionality
HF_TOKEN=your_huggingface_token
DEFAULT_HF_TOKEN=fallback_token

# Required for database
MONGODB_URI=your_mongodb_connection_string

# Optional for authentication
NEXTAUTH_SECRET=your_auth_secret
```

### Running Locally

```bash
npm install
npm run dev
```

## 🔄 Development Workflow

1. **Frontend**: User types prompt in chat interface
2. **Context Building**: System determines if initial generation or follow-up edit
3. **API Call**: POST (initial) or PUT (follow-up) to `/api/ask-ai`
4. **AI Processing**: Stream response from selected provider/model
5. **Response Handling**: Parse and apply changes to HTML
6. **UI Update**: Update editor, preview, and provide visual feedback
7. **History**: Save to project history and user session

## 🛡️ SSR & Hydration Protection

DeepSite implements comprehensive SSR-safe patterns to prevent hydration mismatches:

### **Client-Side Protection Pattern**
```typescript
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

// Usage throughout components
if (!isClient) return null; // or fallback UI
```

### **Dynamic Imports for Browser-Only Libraries**
```typescript
// SSR-safe dynamic imports
const html2canvas = (await import('html2canvas')).default;
const jsPDF = (await import('jspdf')).jsPDF;
```

### **Protected Browser APIs**
- `window` object access wrapped in `isClient` checks
- `Date.now()` fallbacks for server/client consistency  
- localStorage operations with client-side validation
- Custom styles loading with hydration protection

### **Layout Stability**
- Initial state management prevents layout shifts
- Responsive behavior consistent across SSR/client
- Tab navigation state properly initialized
- Preview component layout fixes for proper initial visibility

This creates a **conversational website building experience** where users can iteratively refine websites through natural language instructions, similar to pair programming with an AI developer!
