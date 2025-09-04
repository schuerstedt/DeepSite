---
title: DeepSite v2 - AI Website Generator
emoji: 🐳
colorFrom: blue
colorTo: blue
sdk: docker
pinned: true
app_port: 3001
license: mit
short_description: Professional AI Website Generator with Interactive Components
models:
  - deepseek-ai/DeepSeek-V3-0324
  - deepseek-ai/DeepSeek-R1-0528
  - Qwen/Qwen3-Coder-480B-A35B-Instruct
  - moonshotai/Kimi-K2-Instruct
---

# DeepSite v2 🐳

**Professional AI Website Generator with Interactive Components**

DeepSite v2 is an advanced AI-powered website generator that transforms natural language descriptions into fully functional, professional websites with interactive components, comprehensive design systems, and intelligent content structure. Built with Next.js 15.3.3 and powered by multiple cutting-edge AI providers.

## ✨ Core Features

### 🤖 **Advanced AI Generation System**
- **Multiple AI Providers**: DeepSeek, Fireworks AI, Nebius, SambaNova, Together AI, Groq, Hyperbolic
- **Latest Models**: DeepSeek V3, DeepSeek R1, Qwen3 Coder 480B, Kimi K2 Instruct
- **Two Generation Modes**: Enhanced (with strategic planning) and Classic (direct generation)
- **Real-time Streaming**: Watch AI think and generate code with live updates
- **Smart Follow-up Editing**: Precise diff-based modifications with SEARCH/REPLACE blocks

### 🎨 **Professional Design System**
- **Comprehensive Style Guidelines**: 200+ Tailwind CSS patterns and components
- **Design Consistency**: Unified visual language across all generated content
- **Responsive Design**: Mobile-first approach with perfect breakpoint management
- **Dark/Light Modes**: Complete theme system with seamless switching
- **Professional Typography**: Hierarchical heading system and readable content
- **Semantic Colors**: Accessibility-focused color system with proper contrast

### 🔧 **Interactive Component Library**
- **Tab Systems**: Multi-section content organization with smooth animations
- **Accordion Sections**: Expandable content with proper ARIA support
- **Modal Dialogs**: Professional popup overlays for detailed content
- **Progressive Loading**: Staged content revelation with loading states
- **Form Enhancements**: Real-time validation and user feedback
- **Card Interactions**: Hover effects and enhanced visual feedback
- **Tooltip System**: Contextual help and information displays

### 🧠 **Intelligent Content Generation**
- **Three-Layer System**: System prompts + Dynamic images + Progressive text
- **Pattern Recognition**: Automatic layout selection (tabs/accordions/cards)
- **Content Mixing**: Strategic combination of text, images, and interactive elements
- **GenerateText Integration**: Dynamic content loading with consistent styling
- **Pollinations.ai Images**: Context-aware image generation with professional prompts
- **Content Structure**: 300-500 word substantial sections for engagement

### 📱 **Enhanced User Experience**
- **Comprehensive Start Page**: Interactive documentation with expandable sections
- **Quick Start Gallery**: Pre-written prompts organized by category
- **Copy-to-Clipboard**: One-click prompt copying for instant use
- **Multiline Editor**: Advanced textarea with custom resize handles
- **Device Preview**: Test across desktop, tablet, and mobile viewports
- **Element Selection**: Click any preview element for targeted editing

### 📁 **Professional Export System**
- **HTML Export**: Clean, production-ready code with all features intact
- **PNG Screenshots**: High-quality image captures with html2canvas
- **Advanced PDF**: 3-tier fallback system preserving styling and layout
- **ZIP Downloads**: Complete website packages with all assets
- **Generated Content**: Specialized exports for AI-generated components

### 🔧 **Developer Tools**
- **Monaco Editor**: Full VS Code experience with syntax highlighting
- **Prompt History**: Searchable conversation history with smart filtering
- **Token Monitoring**: Real-time usage tracking across all providers
- **Project Management**: Save, load, and organize unlimited projects
- **Error Recovery**: Comprehensive error handling with retry mechanisms
- **Performance Optimization**: Lazy loading, efficient rendering, smooth animations

## 🚀 Version 2 Enhancements

### **Strategic Content Generation**
- **Enhanced System Prompts**: Comprehensive planning before implementation
- **Interactive Component Patterns**: Automatic generation of professional UI elements
- **Content Excellence Guidelines**: 300-500 word sections with real value
- **Visual Strategy Integration**: Strategic image placement for content breaks

### **Dynamic Content System**
- **GenerateText.js**: Automatic progressive content loading
- **Pollinations.ai Integration**: Context-aware image generation
- **Content Mixing Patterns**: Optimal structure with hero → content → interactive → visual → CTA
- **Consistent Styling**: Unified design language across all dynamic content

### **Professional Output Quality**
- **Production-Ready Code**: Clean, maintainable HTML/CSS/JavaScript
- **Interactive Elements**: Rich user interface components in every website
- **Performance Optimized**: Fast loading with smooth animations
- **SEO Friendly**: Proper semantic markup and meta information

### **Comprehensive Documentation System**
- **Built-in User Guide**: Complete documentation displayed on startup
- **Feature Explanations**: Detailed guides for all system capabilities
- **Example Gallery**: Pre-written prompts for different website types
- **Training-Focused Approach**: Educational content for optimal usage

## 📖 Complete Documentation Suite

The project includes comprehensive documentation files:

- **`TECHNICAL_DOCUMENTATION.md`**: Complete technical architecture and API reference
- **`STYLE_GUIDELINES.md`**: Comprehensive design system and Tailwind patterns
- **`INTERACTIVE_COMPONENTS_GUIDE.md`**: Interactive component library reference
- **`USER_GUIDE.md`**: Complete user instructions and best practices
- **`IMPLEMENTATION_SUMMARY.md`**: Detailed feature implementation overview
- **`FEATURES.md`**: Complete feature list and capabilities
- **`TOKEN_MONITORING.md`**: Usage tracking and optimization guide

## 🎯 Quick Start Examples

### **Business & Professional**
```
"Create a modern consulting firm website with comprehensive services section, expert team profiles, and client testimonials using interactive tabs"

"Design a professional marketing agency site with case study portfolio, service offerings in accordion format, and compelling call-to-action sections"

"Build a law firm website with practice area details, attorney profiles with modal popups, and client resources section"
```

### **E-commerce & Retail**
```
"Create an elegant online jewelry store with product galleries in tabs, detailed product specifications, and customer review sections"

"Design a modern fashion boutique with lookbook gallery, size guides in accordion format, and shopping experience features"

"Build a tech gadget store with product comparison tables, detailed specifications, and user review integration"
```

### **Creative & Portfolio**
```
"Design a photographer's portfolio with image gallery tabs, service packages, and booking system integration"

"Create an artist portfolio showcasing artwork in interactive galleries, biography section, and exhibition history"

"Build a UX designer portfolio with project case studies, design process walkthroughs, and testimonial sections"
```

### **Service & Local Business**
```
"Create a restaurant website with menu tabs, reservation system, location details, and chef profiles"

"Design a fitness trainer site with program descriptions, class schedules in accordion format, and success stories"

"Build a wellness center website with service offerings, practitioner profiles, and booking integration"
```

## 🔧 Local Development Setup

### Prerequisites
- Node.js 18.17+ 
- MongoDB instance (local or cloud)
- AI provider API tokens

### Environment Configuration

```bash
# Core AI Functionality
HF_TOKEN=your_primary_huggingface_token
DEFAULT_HF_TOKEN=fallback_token_for_anonymous_users

# Database & Storage
MONGODB_URI=your_mongodb_connection_string

# Authentication (Optional)
NEXTAUTH_SECRET=your_secure_session_secret

# Development (Optional)
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Quick Setup

```bash
# Clone the repository
git clone [repository-url]
cd deepsite

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

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

# Or deploy to your preferred platform
# Vercel: vercel deploy
# Docker: docker build -t deepsite .
```

## 🌟 What Makes DeepSite v2 Special

1. **Professional Quality**: Every generated website includes professional design patterns and interactive components
2. **Intelligent Structure**: AI automatically selects optimal layouts and content patterns
3. **Dynamic Content**: Progressive loading with generatetext.js for engaging user experiences
4. **Comprehensive System**: Complete design guidelines ensure consistency across all outputs
5. **Developer-Friendly**: Clean, maintainable code that developers can easily extend
6. **User-Focused**: Intuitive interface with comprehensive documentation and examples

DeepSite v2 represents the evolution from simple AI website generation to a **comprehensive professional website creation platform** that produces production-ready, interactive websites with sophisticated design systems and intelligent content structure.

---

**Ready to create your next professional website with AI?** Start with our quick examples or explore the comprehensive documentation to unlock the full potential of DeepSite v2! 🚀
