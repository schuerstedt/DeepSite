# Design Style Selector Guide

## Overview

DeepSite now includes a comprehensive design style selector that allows you to generate websites in various artistic and functional styles. From hand-drawn sketches to professional presentations, you can choose the perfect aesthetic for your project.

## How to Use the Style Selector

### Accessing the Style Selector
1. Open any AI chat interface in DeepSite
2. Look for the style dropdown button (🌐) in the bottom toolbar
3. Click the style selector to open the style picker
4. Browse through different categories and styles
5. Select your desired style and proceed with your prompt

### Style Categories

#### 🎨 **Sketch & Hand-drawn**
Perfect for brainstorming, wireframing, and creative exploration:

- **✏️ Excalidraw**: Hand-drawn sketch style with rough edges and whiteboard aesthetic
- **✎ Pencil Sketch**: Professional design doodles with clean pencil strokes
- **🖤 Chalkboard**: White chalk lines on dark background for teaching vibes

#### 📐 **Technical & Wireframes**
Ideal for planning, architecture, and technical documentation:

- **📐 Blueprint**: Technical plans with white lines on blue grid background
- **📱 Monoline Wireframe**: Single line thickness, no fills, low-fidelity UX mockups

#### 🎨 **Flat & Modern**
Contemporary web design styles:

- **🌐 Modern Web**: Default clean, modern web design (no style modification)
- **🎨 Material Design**: Google Material Design with solid colors and shadows
- **📦 Isometric**: 3D-like angled views for architectural feel
- **🔷 Vector Icon Set**: Simplified icons with consistent stroke width

#### 🎭 **Playful & Creative**
Fun, engaging, and narrative styles:

- **💭 Comic Panel**: Speech bubbles and halftone patterns
- **🎭 Cartoon Doodle**: Exaggerated, child-like shapes
- **📚 Storybook**: Soft edges with watercolor-like whimsical feel

#### 📊 **Professional & Data**
Business-ready presentation styles:

- **📊 Infographic**: Clean data visuals with clear typography
- **📋 Corporate Slide**: Professional presentation template style

## Style Application

### How Styles Work
- Styles are applied through enhanced AI prompts that guide the design generation
- Each style includes specific instructions for visual elements, colors, and aesthetics
- The AI interprets these style guidelines while implementing your functional requirements

### Style Persistence
- Your selected style is remembered across sessions using localStorage
- The style applies to both initial website generation and follow-up edits
- You can change styles at any time during the design process

### Combining Styles with Prompts
- The style selector enhances your existing prompts
- Your functional requirements remain the primary focus
- Style instructions are added as additional context for the AI

## Best Practices

### Choosing the Right Style

**For Prototyping & Planning:**
- Use **Excalidraw** or **Pencil Sketch** for early concepts
- Use **Monoline Wireframe** for UX structure planning
- Use **Blueprint** for technical specifications

**For Modern Web Applications:**
- Use **Modern Web** for clean, standard designs
- Use **Material Design** for Google-style interfaces
- Use **Isometric** for unique, modern aesthetics

**For Creative Projects:**
- Use **Comic Panel** for interactive stories or games
- Use **Storybook** for children's content or narratives
- Use **Cartoon Doodle** for playful, fun interfaces

**For Business & Presentations:**
- Use **Corporate Slide** for professional websites
- Use **Infographic** for data-heavy content
- Use **Vector Icon Set** for clean, minimalist designs

### Tips for Better Results

1. **Be Specific**: Combine style selection with detailed functional prompts
2. **Iterate**: Try different styles for the same concept to see variations
3. **Context Matters**: Consider your audience when choosing styles
4. **Test Combinations**: Some styles work better with certain types of content

## Examples

### Example 1: E-commerce Site
- **Prompt**: "Create an online store for handmade jewelry with product grid, shopping cart, and checkout"
- **With Material Design**: Creates a modern, Google-style shopping interface
- **With Excalidraw**: Creates a sketchy, artisanal-feeling mockup
- **With Corporate Slide**: Creates a professional, business-ready design

### Example 2: Portfolio Website
- **Prompt**: "Design a portfolio website for a graphic designer with project showcase and contact form"
- **With Isometric**: Creates unique 3D-style project displays
- **With Vector Icon Set**: Creates clean, minimalist portfolio layout
- **With Storybook**: Creates narrative-driven, whimsical portfolio

### Example 3: Educational Platform
- **Prompt**: "Build a learning platform with course cards, progress tracking, and video player"
- **With Chalkboard**: Creates classroom-style learning interface
- **With Infographic**: Creates data-focused, analytics-heavy design
- **With Comic Panel**: Creates engaging, gamified learning experience

## Technical Implementation

### Files Structure
- `lib/design-styles.ts` - Style definitions and configurations
- `components/editor/ask-ai/style-selector.tsx` - UI component for style selection
- Integration in `components/editor/ask-ai/index.tsx` - Main AI interface

### Style Configuration
Each style includes:
- **ID**: Unique identifier
- **Name**: Display name
- **Description**: User-friendly explanation
- **Prompt**: AI instruction text
- **Category**: Grouping for organization
- **Icon**: Visual indicator

### Customization
Developers can easily add new styles by:
1. Adding entries to `DESIGN_STYLES` array
2. Creating new categories in `STYLE_CATEGORIES`
3. Defining appropriate AI prompt instructions

## Troubleshooting

### Style Not Applied
- Verify style selector shows your chosen style
- Check if prompt includes style requirements in API network tab
- Try being more specific in your functional prompt

### Unexpected Results
- Some styles may interpret prompts differently
- Try adjusting your prompt to be more explicit about desired functionality
- Consider switching between Classic and Enhanced prompt modes

### Style Conflicts
- If mixing multiple styling requests in prompt, the style selector takes precedence
- Remove style-specific language from your prompts and rely on the selector

## Future Enhancements

### Planned Features
- Custom style creation and saving
- Style preview examples
- Style-specific templates and starting points
- Import/export of custom style configurations
- Community style sharing

---

*Experiment with different styles to discover unique design possibilities and find the perfect aesthetic for your project!*
