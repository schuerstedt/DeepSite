// Enhanced DeepSite with Multi-Step Planning
// This could be added to /app/api/ask-ai/route.ts

const PLANNING_ENHANCED_PROMPT = `You are an expert web developer. Before implementing, think through the project systematically:

🎯 PLANNING PHASE:
1. **Requirements Analysis**: What does the user really need?
2. **Content Strategy**: What content and sections are required?
3. **User Experience**: How should users interact with this site?
4. **Visual Design**: What aesthetic will best serve the purpose?
5. **Technical Architecture**: What components and structure are needed?
6. **Responsive Strategy**: How will this work across devices?

🛠️ IMPLEMENTATION PHASE:
Now implement your plan as a complete, beautiful HTML file.

TECHNICAL CONSTRAINTS:
- ONLY USE HTML, CSS AND JAVASCRIPT
- MAKE IT RESPONSIVE USING TAILWINDCSS
- Use <script src="https://cdn.tailwindcss.com"></script>
- ALWAYS GIVE THE RESPONSE IN A SINGLE HTML FILE
- Try to create the best UI possible
- Elaborate as much as you can to create something unique
- AVOID CHINESE CHARACTERS unless specifically requested

Show your planning thoughts, then provide the complete implementation.`;

// Alternative: Two-stage approach
const implementTwoStageGeneration = async (prompt: string) => {
  // Stage 1: Planning
  const planningResponse = await client.chatCompletion({
    model: selectedModel.value,
    messages: [
      {
        role: "system", 
        content: `You are a web development strategist. Create a detailed plan for the following website request. Focus on:
        1. Content requirements and organization
        2. User experience flow
        3. Visual design strategy  
        4. Technical implementation approach
        5. Responsive design considerations
        
        Provide a structured plan, not code.`
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });
  
  const plan = planningResponse.choices[0]?.message?.content;
  
  // Stage 2: Implementation using the plan
  const implementationResponse = await client.chatCompletion({
    model: selectedModel.value,
    messages: [
      {
        role: "system",
        content: INITIAL_SYSTEM_PROMPT
      },
      {
        role: "user", 
        content: `Here is the project plan:\n\n${plan}\n\nNow implement this plan as a complete HTML file for: ${prompt}`
      }
    ]
  });
  
  return implementationResponse;
};

// Enhanced prompt with explicit step structure
const STEP_BY_STEP_PROMPT = `You are an expert web developer. Work through this project systematically:

<planning>
🎯 STEP 1 - REQUIREMENTS ANALYSIS:
- What is the core purpose of this website?
- Who is the target audience?
- What key actions should users be able to take?

🎨 STEP 2 - DESIGN STRATEGY:
- What visual style fits the brand/purpose?
- What color scheme and typography?
- What layout approach (grid, sections, navigation)?

🏗️ STEP 3 - TECHNICAL ARCHITECTURE:
- What HTML structure is needed?
- How to organize CSS classes efficiently?
- What interactive elements are required?

📱 STEP 4 - RESPONSIVE STRATEGY:
- How will layout adapt to mobile/tablet/desktop?
- What content might be prioritized on smaller screens?
- How will navigation work across devices?
</planning>

<implementation>
[Complete HTML implementation here]
</implementation>

TECHNICAL REQUIREMENTS:
- HTML, CSS, JavaScript only
- Responsive with TailwindCSS
- Single file output
- Professional, modern design
- Include TailwindCSS CDN in head`;
