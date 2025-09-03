export const defaultHTML = `<!DOCTYPE html>
<html>
  <head>
    <title>DeepSite - AI Website Builder</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      .documentation-section {
        display: none;
      }
      .documentation-section.expanded {
        display: block;
      }
      .rotate-180 {
        transform: rotate(180deg);
      }
    </style>
  </head>
  <body class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"></div>
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-2xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-2xl"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto p-6 space-y-8">
      <!-- Header -->
      <div class="text-center space-y-4 py-12">
        <div class="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <span>📚</span>
          DeepSite Documentation
        </div>
        <h1 class="text-4xl md:text-6xl font-bold">
          <span class="text-2xl md:text-4xl text-gray-400 block font-medium">I'm ready to work,</span>
          <span class="text-blue-400">Ask me anything!</span>
        </h1>
        <p class="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Create professional, interactive websites with AI-powered content generation, 
          comprehensive style guidelines, and rich interactive components.
        </p>
      </div>

      <!-- Quick Start CTA -->
      <div class="flex justify-center mb-12">
        <div class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg text-lg flex items-center gap-2 shadow-lg cursor-pointer transition-all">
          Start Creating Now
          <span>→</span>
        </div>
      </div>

      <!-- Feature Documentation -->
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-white mb-6">🚀 Powerful Features</h2>
        
        <!-- Getting Started -->
        <div class="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
          <button onclick="toggleSection('getting-started')" class="w-full p-4 flex items-center gap-3 hover:bg-slate-700/30 transition-colors text-left">
            <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
              ⚡
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white">Getting Started</h3>
              <p class="text-sm text-slate-400">Learn how to create websites with AI in seconds</p>
            </div>
            <span id="getting-started-icon" class="text-slate-400 transition-transform">▶</span>
          </button>
          
          <div id="getting-started-content" class="documentation-section px-4 pb-4 border-t border-slate-700/30">
            <div class="mt-3 space-y-2">
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-green-400">"Create a modern portfolio website for a web developer"</code>
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-green-400">"Build a restaurant website with menu and contact info"</code>
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-green-400">"Design a landing page for a SaaS product"</code>
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-green-400">"Make a photography portfolio with gallery"</code>
              </div>
            </div>
          </div>
        </div>

        <!-- Style Guidelines -->
        <div class="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
          <button onclick="toggleSection('style-guidelines')" class="w-full p-4 flex items-center gap-3 hover:bg-slate-700/30 transition-colors text-left">
            <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
              🎨
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white">Style Guidelines & Design System</h3>
              <p class="text-sm text-slate-400">Consistent, professional styling patterns for all websites</p>
            </div>
            <span id="style-guidelines-icon" class="text-slate-400 transition-transform">▶</span>
          </button>
          
          <div id="style-guidelines-content" class="documentation-section px-4 pb-4 border-t border-slate-700/30">
            <div class="mt-3 space-y-2">
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-blue-400">• Professional gradients: bg-gradient-to-br from-slate-50 to-slate-100</code>
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-blue-400">• Card containers: bg-white/50 backdrop-blur-sm rounded-xl shadow-lg</code>
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-blue-400">• Typography: text-4xl font-bold for headings, text-slate-600 for body</code>
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-blue-400">• Interactive elements: hover:shadow-lg transition-all duration-300</code>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Components -->
        <div class="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
          <button onclick="toggleSection('interactive-components')" class="w-full p-4 flex items-center gap-3 hover:bg-slate-700/30 transition-colors text-left">
            <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
              💻
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white">Interactive Components Library</h3>
              <p class="text-sm text-slate-400">Rich interactive elements that enhance user experience</p>
            </div>
            <span id="interactive-components-icon" class="text-slate-400 transition-transform">▶</span>
          </button>
          
          <div id="interactive-components-content" class="documentation-section px-4 pb-4 border-t border-slate-700/30">
            <div class="mt-3 space-y-2">
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-purple-400">• Tab Systems: Multi-section content organization</code>
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-purple-400">• Accordion Sections: Expandable FAQ and feature lists</code>
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-purple-400">• Modal Dialogs: Detailed content overlays and popups</code>
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-purple-400">• Progressive Loading: Staged content revelation with animations</code>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Generation -->
        <div class="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
          <button onclick="toggleSection('content-generation')" class="w-full p-4 flex items-center gap-3 hover:bg-slate-700/30 transition-colors text-left">
            <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
              📝
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white">Smart Content Generation</h3>
              <p class="text-sm text-slate-400">Intelligent content structure with dynamic text generation</p>
            </div>
            <span id="content-generation-icon" class="text-slate-400 transition-transform">▶</span>
          </button>
          
          <div id="content-generation-content" class="documentation-section px-4 pb-4 border-t border-slate-700/30">
            <div class="mt-3 space-y-2">
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-orange-400">Automatic generatetext integration for substantial content (300-500 words)</code>
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-orange-400">Visual content mixing: text + images + interactive elements</code>
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-orange-400">Pattern-based layouts: tabs, accordions, or cards based on content type</code>
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm">
                <code class="text-orange-400">Consistent styling across all generated content sections</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Start Examples -->
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-white">💡 Quick Start Examples</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-slate-800/30 rounded-lg p-6 border border-slate-700/30">
            <h3 class="text-lg font-semibold text-blue-400 mb-4">Business Websites</h3>
            <div class="space-y-3">
              <div class="bg-slate-900/50 rounded p-3 text-sm text-slate-300 hover:bg-slate-900/70 transition-colors cursor-pointer border border-slate-700/30 hover:border-slate-600/50">
                "Create a professional consulting firm website with services, team, and contact"
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm text-slate-300 hover:bg-slate-900/70 transition-colors cursor-pointer border border-slate-700/30 hover:border-slate-600/50">
                "Design a modern marketing agency site with case studies and portfolio"
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm text-slate-300 hover:bg-slate-900/70 transition-colors cursor-pointer border border-slate-700/30 hover:border-slate-600/50">
                "Build a law firm website with practice areas and attorney profiles"
              </div>
            </div>
          </div>

          <div class="bg-slate-800/30 rounded-lg p-6 border border-slate-700/30">
            <h3 class="text-lg font-semibold text-blue-400 mb-4">E-commerce & Retail</h3>
            <div class="space-y-3">
              <div class="bg-slate-900/50 rounded p-3 text-sm text-slate-300 hover:bg-slate-900/70 transition-colors cursor-pointer border border-slate-700/30 hover:border-slate-600/50">
                "Create an online store for handmade jewelry with product gallery"
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm text-slate-300 hover:bg-slate-900/70 transition-colors cursor-pointer border border-slate-700/30 hover:border-slate-600/50">
                "Design a fashion boutique website with lookbook and shopping features"
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm text-slate-300 hover:bg-slate-900/70 transition-colors cursor-pointer border border-slate-700/30 hover:border-slate-600/50">
                "Build a tech gadget store with product reviews and specifications"
              </div>
            </div>
          </div>

          <div class="bg-slate-800/30 rounded-lg p-6 border border-slate-700/30">
            <h3 class="text-lg font-semibold text-blue-400 mb-4">Creative Portfolios</h3>
            <div class="space-y-3">
              <div class="bg-slate-900/50 rounded p-3 text-sm text-slate-300 hover:bg-slate-900/70 transition-colors cursor-pointer border border-slate-700/30 hover:border-slate-600/50">
                "Design a photographer's portfolio with image galleries and booking"
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm text-slate-300 hover:bg-slate-900/70 transition-colors cursor-pointer border border-slate-700/30 hover:border-slate-600/50">
                "Create an artist portfolio with artwork showcase and biography"
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm text-slate-300 hover:bg-slate-900/70 transition-colors cursor-pointer border border-slate-700/30 hover:border-slate-600/50">
                "Build a designer portfolio with project case studies and process"
              </div>
            </div>
          </div>

          <div class="bg-slate-800/30 rounded-lg p-6 border border-slate-700/30">
            <h3 class="text-lg font-semibold text-blue-400 mb-4">Service Providers</h3>
            <div class="space-y-3">
              <div class="bg-slate-900/50 rounded p-3 text-sm text-slate-300 hover:bg-slate-900/70 transition-colors cursor-pointer border border-slate-700/30 hover:border-slate-600/50">
                "Create a restaurant website with menu, reservations, and location"
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm text-slate-300 hover:bg-slate-900/70 transition-colors cursor-pointer border border-slate-700/30 hover:border-slate-600/50">
                "Design a fitness trainer site with programs, schedules, and testimonials"
              </div>
              <div class="bg-slate-900/50 rounded p-3 text-sm text-slate-300 hover:bg-slate-900/70 transition-colors cursor-pointer border border-slate-700/30 hover:border-slate-600/50">
                "Build a wellness center website with services, staff, and booking"
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Highlights -->
      <div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-blue-500/20">
        <h2 class="text-2xl font-bold text-white mb-6">✨ What Makes DeepSite Special</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center space-y-2">
            <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto text-green-400 text-xl">
              ⚡
            </div>
            <h3 class="font-semibold text-white">Lightning Fast</h3>
            <p class="text-sm text-slate-400">Generate complete websites in seconds with AI</p>
          </div>
          <div class="text-center space-y-2">
            <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto text-blue-400 text-xl">
              🎨
            </div>
            <h3 class="font-semibold text-white">Professional Design</h3>
            <p class="text-sm text-slate-400">Consistent style guidelines and modern UI patterns</p>
          </div>
          <div class="text-center space-y-2">
            <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto text-purple-400 text-xl">
              💻
            </div>
            <h3 class="font-semibold text-white">Interactive Components</h3>
            <p class="text-sm text-slate-400">Rich tabs, accordions, modals, and animations</p>
          </div>
          <div class="text-center space-y-2">
            <div class="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto text-orange-400 text-xl">
              📝
            </div>
            <h3 class="font-semibold text-white">Smart Content</h3>
            <p class="text-sm text-slate-400">Intelligent content generation with proper structure</p>
          </div>
        </div>
      </div>

      <!-- Getting Started CTA -->
      <div class="text-center space-y-4 pt-8">
        <h2 class="text-2xl font-bold text-white">Ready to Create Something Amazing?</h2>
        <p class="text-slate-400">Start typing your website idea in the prompt box on the left!</p>
        <div class="flex justify-center">
          <img src="https://enzostvs-deepsite.hf.space/arrow.svg" class="w-[100px] transform rotate-[30deg] opacity-60" />
        </div>
      </div>
    </div>

    <script>
      function toggleSection(sectionId) {
        const content = document.getElementById(sectionId + '-content');
        const icon = document.getElementById(sectionId + '-icon');
        
        if (content.classList.contains('expanded')) {
          content.classList.remove('expanded');
          icon.style.transform = 'rotate(0deg)';
          icon.textContent = '▶';
        } else {
          content.classList.add('expanded');
          icon.style.transform = 'rotate(90deg)';
          icon.textContent = '▼';
        }
      }

      // Add click handlers for example prompts
      document.querySelectorAll('.bg-slate-900\\/50').forEach(element => {
        if (element.textContent.includes('"')) {
          element.addEventListener('click', function() {
            // Copy to clipboard
            const text = this.textContent.replace(/"/g, '');
            navigator.clipboard.writeText(text).then(() => {
              // Show feedback
              const original = this.innerHTML;
              this.innerHTML = '✓ Copied! Click in the prompt box and paste (Ctrl+V)';
              this.classList.add('bg-green-900/50');
              setTimeout(() => {
                this.innerHTML = original;
                this.classList.remove('bg-green-900/50');
              }, 2000);
            });
          });
        }
      });
    </script>
  </body>
</html>
`;
