# DeepSite Enhanced Prompting Mode - A/B Testing Guide

## 🚀 **New Feature: Dual Prompting System**

You can now switch between two different prompting modes to compare output quality and choose what works best for different types of requests.

## 🎯 **How to Use**

### **1. Access the Mode Selector**
- Look for the mode indicator button next to the Settings gear icon
- **Classic Mode**: Shows `⚡ Classic` (neutral colors)
- **Enhanced Mode**: Shows `✨ Enhanced` (blue/sky colors)

### **2. Switch Between Modes**
- Click the mode indicator button to open Settings
- In the Settings panel, toggle between "Classic" and "Enhanced" 
- Your preference is saved locally for future sessions

### **3. Compare Outputs**
Try the same prompt in both modes to see the difference:

**Example Prompt**: *"Create a modern portfolio website for a photographer"*

## 📊 **Mode Differences**

### **⚡ Classic Mode**
- **Direct generation** - AI jumps straight to HTML
- **Faster response** - Less thinking, quicker output  
- **Simpler prompting** - Original system prompt
- **Good for**: Simple requests, quick iterations, basic websites

### **✨ Enhanced Mode**  
- **Planning phase** - AI thinks through the project systematically
- **Structured approach** - Considers UX, design, technical architecture
- **Better quality** - More thoughtful, cohesive results
- **Good for**: Complex projects, professional sites, detailed requirements

## 🔍 **What Enhanced Mode Adds**

The Enhanced mode includes a planning phase where the AI considers:

1. **Content Strategy**: What sections and information are needed?
2. **User Experience**: How should users navigate and interact?
3. **Visual Design**: What aesthetic and style will work best?
4. **Technical Structure**: What components and layout approach?
5. **Responsive Strategy**: How will this adapt across devices?

## 🧪 **A/B Testing Recommendations**

### **Test Scenarios**:

**Simple Requests** (try both modes):
- "Create a landing page for a coffee shop"
- "Make a simple contact form"
- "Build a basic blog layout"

**Complex Requests** (Enhanced mode should excel):
- "Create a comprehensive SaaS product website with pricing tiers, feature comparisons, and user testimonials"
- "Build an e-commerce site for handmade jewelry with product galleries and shopping cart"
- "Design a professional consulting firm website with case studies and client portal"

**Creative Requests** (compare creativity):
- "Create an interactive portfolio for a digital artist"
- "Build a unique restaurant website with menu and reservation system"
- "Design a futuristic tech startup landing page"

## 📈 **Quality Indicators to Look For**

### **Enhanced Mode Should Show**:
- ✅ Better content organization and hierarchy
- ✅ More cohesive visual design systems
- ✅ Thoughtful responsive behavior
- ✅ More sophisticated interactions
- ✅ Professional-grade layouts
- ✅ Better semantic HTML structure

### **Classic Mode Advantages**:
- ⚡ Faster generation time
- ⚡ Good for simple, straightforward requests
- ⚡ Less verbose output
- ⚡ Quick iterations and edits

## 🎨 **Visual Indicators**

- **Mode Button**: Shows current mode with emoji and color coding
- **Settings Panel**: Toggle between modes with descriptive text
- **Tooltips**: Explain what each mode does
- **Follow-up Note**: Enhanced mode only available for initial generation (not follow-up edits)

## 💡 **Best Practices**

1. **Start with Enhanced** for complex, important projects
2. **Use Classic** for quick tests and simple layouts
3. **Compare both** for medium complexity requests
4. **Save your preferences** - the mode persists between sessions
5. **Consider your use case** - planning vs speed tradeoff

## 🔧 **Technical Details**

- Mode selection is saved in localStorage as `promptMode`
- Enhanced mode uses `ENHANCED_SYSTEM_PROMPT` with planning instructions  
- Classic mode uses original `INITIAL_SYSTEM_PROMPT`
- Both modes maintain same follow-up editing capabilities
- No breaking changes to existing functionality

---

**Try both modes with the same prompt and see the difference!** 🚀
