# 📝 Prompt History Feature Guide

## Overview

DeepSite now includes a comprehensive prompt history system that saves every prompt you use, making it easy to iterate, refine, and reuse your ideas. Never lose a great prompt again!

## 🎯 **Key Features**

### **Automatic Prompt Saving**
- **Every prompt is saved** automatically when you generate a website
- **Includes context**: Style, mode (Classic/Enhanced), provider, model
- **Follow-up tracking**: Distinguishes between initial prompts and follow-ups
- **Persistent storage**: History is saved in your browser's localStorage

### **Smart Organization**
- **Chronological order**: Most recent prompts appear first
- **Rich metadata**: Timestamp, style used, generation mode, provider info
- **Follow-up linking**: See which prompts were edits of previous ones
- **Style context**: Know which design style was active for each prompt

### **Powerful Search & Filtering**
- **Text search**: Find prompts by content or style name
- **Mode filtering**: Show only Classic or Enhanced mode prompts
- **Style filtering**: See prompts used with your current style
- **Real-time filtering**: Results update as you type

## 🚀 **How to Use Prompt History**

### **Accessing History**
1. **Click the History button** (🕒) in the AI interface toolbar
2. **Use keyboard shortcut** `Ctrl+H` for quick access
3. **Browse your saved prompts** in the dropdown

### **Finding Prompts**
1. **Search by text**: Type keywords to find specific prompts
2. **Filter by mode**: Click "Classic" or "Enhanced" to filter
3. **Filter by style**: Click "Current Style" to see prompts using your active style
4. **Browse chronologically**: Scroll through recent prompts

### **Using Saved Prompts**
1. **Click any prompt** to copy it to the input field
2. **Edit and refine** the prompt as needed
3. **Generate** with your modifications
4. **The new version** will be saved as a separate entry

### **Managing History**
1. **Copy prompts**: Hover and click the copy icon
2. **Delete prompts**: Hover and click the trash icon
3. **View details**: See timestamp, style, mode, and follow-up status

## 📊 **Prompt History Interface**

### **Header Information**
- **Total count**: Shows number of filtered prompts
- **Search bar**: Real-time text search
- **Filter buttons**: Mode and style filtering options

### **Prompt Entries Display**
Each saved prompt shows:
- **📝 Prompt text**: The actual prompt content (truncated if long)
- **⏰ Timestamp**: When the prompt was used (relative time)
- **🎨 Mode indicator**: ✨ Enhanced or ⚡ Classic
- **🎨 Style info**: Icon and name of design style used
- **🔄 Follow-up flag**: If it was an edit of previous prompt

### **Hover Actions**
- **📋 Copy button**: Copy prompt to clipboard
- **🗑️ Delete button**: Remove from history

## 🛠️ **Technical Details**

### **Data Storage**
- **Location**: Browser localStorage
- **Key**: `promptHistory`
- **Retention**: Last 50 prompts (auto-trimmed)
- **Format**: JSON array with rich metadata

### **Prompt Entry Schema**
```typescript
interface PromptHistoryEntry {
  id: string;                    // Unique identifier
  prompt: string;                // The actual prompt text
  timestamp: Date;               // When it was used
  style: string;                 // Design style ID
  mode: 'classic' | 'enhanced';  // Generation mode
  provider: string;              // AI provider used
  model: string;                 // AI model used
  isFollowUp: boolean;           // Whether it was a follow-up
  originalPrompt?: string;       // Reference for follow-ups
  tags?: string[];              // Future: custom tags
}
```

### **Search Algorithm**
- **Case-insensitive** text matching
- **Searches both** prompt content and style names
- **Real-time filtering** with debounced updates
- **Multiple filter** combinations supported

## 💡 **Best Practices**

### **Effective Prompt Management**
1. **Use descriptive prompts**: Make them easy to find later
2. **Iterate systematically**: Build on previous prompts for refinement
3. **Try different styles**: Test the same prompt with various design styles
4. **Organize with keywords**: Include searchable terms in your prompts

### **Workflow Optimization**
1. **Start broad**: Begin with a general prompt, then refine
2. **Save variations**: Create multiple versions of successful prompts
3. **Cross-reference styles**: See how different styles affect the same concept
4. **Use follow-ups**: Edit existing designs rather than starting from scratch

### **History Maintenance**
1. **Regular cleanup**: Delete outdated or unsuccessful prompts
2. **Copy important prompts**: Save your best prompts elsewhere as backup
3. **Use search effectively**: Learn to find prompts quickly with keywords

## 🎯 **Practical Examples**

### **Iterative Design Process**
1. **Initial prompt**: "Create an e-commerce website for handmade jewelry"
2. **Save automatically** when generated
3. **Select from history** and modify: "Create an e-commerce website for handmade jewelry with vintage Art Deco styling"
4. **Try different styles**: Use same prompt with different design styles
5. **Refine further**: "Add customer reviews section and wishlist functionality"

### **Style Exploration**
1. **Base prompt**: "Design a portfolio website for a photographer"
2. **Try with Watercolor**: Artistic, soft aesthetic
3. **Try with Neon Synthwave**: Retro, futuristic look
4. **Try with Material Design**: Clean, modern interface
5. **Compare results** and iterate on the most promising

### **Project Development**
1. **Phase 1**: Basic structure and layout
2. **Phase 2**: Add specific features (from history)
3. **Phase 3**: Styling and polish (style variations)
4. **Phase 4**: Final refinements (follow-up edits)

## 🔧 **Keyboard Shortcuts**

- **`Ctrl+H`**: Open/close prompt history
- **`Esc`**: Close history panel (when open)
- **`Enter`**: Select first search result (when searching)

## 🚀 **Future Enhancements**

### **Planned Features**
- **Custom tags**: Add your own tags to organize prompts
- **Prompt templates**: Save and reuse prompt patterns
- **Export/import**: Share prompt collections with others
- **Advanced search**: Filter by date ranges, success metrics
- **Prompt analytics**: See your most used patterns and styles

### **Integration Possibilities**
- **Project linking**: Associate prompts with specific projects
- **Collaboration**: Share prompt histories with team members
- **Version control**: Track prompt evolution over time
- **Success metrics**: Rate prompts based on results

---

## 🎉 **Start Building Your Prompt Library**

The prompt history feature transforms DeepSite from a single-use tool into a comprehensive design iteration platform. Start building your library of effective prompts and discover new creative possibilities through systematic experimentation!

**Pro Tip**: Use the search and filter features to quickly find and build upon your most successful prompts. The combination of prompt history with the style selector creates endless possibilities for creative exploration! 🎨✨
