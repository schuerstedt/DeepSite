# Interactive Component Library Reference

This document provides a comprehensive reference for implementing interactive features using the available component libraries in the DeepSite project.

## Available Libraries

### Radix UI Components
- **@radix-ui/react-accordion** - Expandable content sections
- **@radix-ui/react-alert-dialog** - Modal dialogs for important actions
- **@radix-ui/react-avatar** - User profile images with fallbacks
- **@radix-ui/react-checkbox** - Custom styled checkboxes
- **@radix-ui/react-collapsible** - Show/hide content sections
- **@radix-ui/react-dialog** - Modal overlays and popups
- **@radix-ui/react-dropdown-menu** - Context menus and dropdowns
- **@radix-ui/react-popover** - Floating content containers
- **@radix-ui/react-select** - Custom select dropdowns
- **@radix-ui/react-switch** - Toggle switches
- **@radix-ui/react-tabs** - Tabbed content organization
- **@radix-ui/react-toggle** - Toggle buttons
- **@radix-ui/react-toggle-group** - Group of toggle buttons
- **@radix-ui/react-tooltip** - Hover and focus tooltips

### Icon Library
- **Lucide React** - Comprehensive icon set with consistent styling

### Animation Library
- **tw-animate-css** - CSS animations with Tailwind integration

## Interactive Component Patterns

## 1. Tabbed Content Sections

Perfect for organizing related content into switchable views.

```jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="overview" className="w-full">
  <TabsList className="grid w-full grid-cols-3 mb-6">
    <TabsTrigger value="overview" className="text-sm font-medium">Overview</TabsTrigger>
    <TabsTrigger value="features" className="text-sm font-medium">Features</TabsTrigger>
    <TabsTrigger value="pricing" className="text-sm font-medium">Pricing</TabsTrigger>
  </TabsList>
  
  <TabsContent value="overview" className="space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">Product Overview</h3>
      <p class="text-slate-600 dark:text-slate-400">Comprehensive overview content...</p>
    </div>
  </TabsContent>
  
  <TabsContent value="features" className="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Feature cards -->
    </div>
  </TabsContent>
  
  <TabsContent value="pricing" className="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Pricing cards -->
    </div>
  </TabsContent>
</Tabs>
```

### HTML Implementation (for generated content):
```html
<div class="w-full" data-component="tabs">
  <div class="flex space-x-1 rounded-lg bg-slate-100 dark:bg-slate-800 p-1 mb-6" role="tablist">
    <button class="flex-1 rounded-md py-2 px-3 text-sm font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 shadow-sm" role="tab" data-tab="overview">Overview</button>
    <button class="flex-1 rounded-md py-2 px-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100" role="tab" data-tab="features">Features</button>
    <button class="flex-1 rounded-md py-2 px-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100" role="tab" data-tab="pricing">Pricing</button>
  </div>
  
  <div class="space-y-4" data-tab-content="overview">
    <!-- Overview content -->
  </div>
  
  <div class="space-y-4 hidden" data-tab-content="features">
    <!-- Features content -->
  </div>
  
  <div class="space-y-4 hidden" data-tab-content="pricing">
    <!-- Pricing content -->
  </div>
</div>
```

## 2. Expandable Accordion Sections

Great for FAQ sections, feature lists, or progressive content disclosure.

```jsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

<Accordion type="single" collapsible className="w-full space-y-2">
  <AccordionItem value="item-1" className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 px-4">
    <AccordionTrigger className="text-left font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">
      What features are included?
    </AccordionTrigger>
    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
      Detailed feature list and descriptions...
    </AccordionContent>
  </AccordionItem>
  
  <AccordionItem value="item-2" className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 px-4">
    <AccordionTrigger className="text-left font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400">
      How does pricing work?
    </AccordionTrigger>
    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
      Pricing structure and options...
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### HTML Implementation:
```html
<div class="w-full space-y-2" data-component="accordion">
  <div class="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700" data-accordion-item="1">
    <button class="w-full px-4 py-4 text-left font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between" data-accordion-trigger="1">
      <span>What features are included?</span>
      <svg class="w-4 h-4 transition-transform" data-accordion-icon="1">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div class="px-4 pb-4 text-slate-600 dark:text-slate-400 hidden" data-accordion-content="1">
      Detailed feature list and descriptions...
    </div>
  </div>
  
  <div class="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700" data-accordion-item="2">
    <button class="w-full px-4 py-4 text-left font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between" data-accordion-trigger="2">
      <span>How does pricing work?</span>
      <svg class="w-4 h-4 transition-transform" data-accordion-icon="2">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div class="px-4 pb-4 text-slate-600 dark:text-slate-400 hidden" data-accordion-content="2">
      Pricing structure and options...
    </div>
  </div>
</div>
```

## 3. Interactive Cards with Hover Effects

Cards that respond to user interaction with smooth animations.

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
    <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
      <svg class="w-6 h-6 text-blue-600 dark:text-blue-400">
        <!-- Icon -->
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
      Interactive Feature
    </h3>
    <p class="text-slate-600 dark:text-slate-400 mb-4">
      Feature description that explains the functionality...
    </p>
    <div class="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
      Learn more
      <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </div>
  </div>
</div>
```

## 4. Modal Dialogs for Detailed Content

Great for showcasing detailed information without page navigation.

```jsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline" className="w-full">View Details</Button>
  </DialogTrigger>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold">Feature Details</DialogTitle>
      <DialogDescription className="text-slate-600 dark:text-slate-400">
        Comprehensive information about this feature
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      <!-- Detailed content -->
    </div>
  </DialogContent>
</Dialog>
```

### HTML Implementation:
```html
<button class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium px-4 py-2 rounded-lg transition-colors w-full" data-modal-trigger="feature-details">
  View Details
</button>

<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden" data-modal-overlay="feature-details">
  <div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl">
    <div class="p-6 border-b border-slate-200 dark:border-slate-700">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">Feature Details</h2>
          <p class="text-slate-600 dark:text-slate-400 mt-1">Comprehensive information about this feature</p>
        </div>
        <button class="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" data-modal-close="feature-details">
          <svg class="w-5 h-5 text-slate-500">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M6 18L18 6"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="p-6 space-y-4">
      <!-- Detailed content -->
    </div>
  </div>
</div>
```

## 5. Progressive Content Loading

Sections that load content progressively with loading states.

```html
<div class="space-y-8" data-progressive-loader>
  <!-- Initial loaded content -->
  <section class="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">Loaded Content</h3>
    <p class="text-slate-600 dark:text-slate-400">This content is immediately visible...</p>
  </section>
  
  <!-- Loading placeholder -->
  <div class="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700" data-loading-placeholder>
    <div class="animate-pulse space-y-3">
      <div class="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
      <div class="space-y-2">
        <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
        <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
      </div>
    </div>
  </div>
  
  <!-- Content that will be loaded -->
  <div class="hidden" data-progressive-content>
    <section class="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">Progressive Content</h3>
      <p class="text-slate-600 dark:text-slate-400">This content loads after the initial view...</p>
    </section>
  </div>
</div>
```

## 6. Interactive Toggle Switches

For settings, preferences, and feature toggles.

```jsx
import { Switch } from "@/components/ui/switch"

<div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
  <div>
    <h4 className="font-medium text-slate-900 dark:text-slate-100">Dark Mode</h4>
    <p className="text-sm text-slate-600 dark:text-slate-400">Switch between light and dark themes</p>
  </div>
  <Switch defaultChecked />
</div>
```

### HTML Implementation:
```html
<div class="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
  <div>
    <h4 class="font-medium text-slate-900 dark:text-slate-100">Dark Mode</h4>
    <p class="text-sm text-slate-600 dark:text-slate-400">Switch between light and dark themes</p>
  </div>
  <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" data-toggle-switch="dark-mode" aria-pressed="true">
    <span class="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform"></span>
  </button>
</div>
```

## 7. Tooltip Enhanced Elements

Add helpful information on hover without cluttering the interface.

```jsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
        <svg className="w-5 h-5 text-slate-600 dark:text-slate-400">
          <!-- Info icon -->
        </svg>
      </button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Additional helpful information</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### HTML Implementation:
```html
<div class="relative group">
  <button class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" data-tooltip="Additional helpful information">
    <svg class="w-5 h-5 text-slate-600 dark:text-slate-400">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  </button>
  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
    Additional helpful information
    <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
  </div>
</div>
```

## JavaScript for Interactive Features

Create a JavaScript file to handle the interactive functionality:

```javascript
// Interactive features handler
class InteractiveFeatures {
  constructor() {
    this.initializeTabs();
    this.initializeAccordions();
    this.initializeModals();
    this.initializeToggles();
    this.initializeProgressiveLoader();
  }

  initializeTabs() {
    document.querySelectorAll('[data-component="tabs"]').forEach(tabsContainer => {
      const buttons = tabsContainer.querySelectorAll('[role="tab"]');
      const contents = tabsContainer.querySelectorAll('[data-tab-content]');

      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const targetTab = button.dataset.tab;
          
          // Update button states
          buttons.forEach(btn => {
            btn.classList.remove('bg-white', 'dark:bg-slate-700', 'shadow-sm');
            btn.classList.add('text-slate-600', 'dark:text-slate-400');
          });
          button.classList.add('bg-white', 'dark:bg-slate-700', 'shadow-sm');
          button.classList.remove('text-slate-600', 'dark:text-slate-400');
          
          // Update content visibility
          contents.forEach(content => {
            content.classList.add('hidden');
          });
          tabsContainer.querySelector(`[data-tab-content="${targetTab}"]`).classList.remove('hidden');
        });
      });
    });
  }

  initializeAccordions() {
    document.querySelectorAll('[data-accordion-trigger]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const itemId = trigger.dataset.accordionTrigger;
        const content = document.querySelector(`[data-accordion-content="${itemId}"]`);
        const icon = document.querySelector(`[data-accordion-icon="${itemId}"]`);
        
        if (content.classList.contains('hidden')) {
          content.classList.remove('hidden');
          icon.style.transform = 'rotate(180deg)';
        } else {
          content.classList.add('hidden');
          icon.style.transform = 'rotate(0deg)';
        }
      });
    });
  }

  initializeModals() {
    document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const modalId = trigger.dataset.modalTrigger;
        const overlay = document.querySelector(`[data-modal-overlay="${modalId}"]`);
        overlay.classList.remove('hidden');
      });
    });

    document.querySelectorAll('[data-modal-close]').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        const modalId = closeBtn.dataset.modalClose;
        const overlay = document.querySelector(`[data-modal-overlay="${modalId}"]`);
        overlay.classList.add('hidden');
      });
    });

    // Close modal on overlay click
    document.querySelectorAll('[data-modal-overlay]').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.add('hidden');
        }
      });
    });
  }

  initializeToggles() {
    document.querySelectorAll('[data-toggle-switch]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const isPressed = toggle.getAttribute('aria-pressed') === 'true';
        const newState = !isPressed;
        
        toggle.setAttribute('aria-pressed', newState);
        const slider = toggle.querySelector('span');
        
        if (newState) {
          slider.classList.remove('translate-x-1');
          slider.classList.add('translate-x-6');
          toggle.classList.add('bg-blue-600');
          toggle.classList.remove('bg-slate-400');
        } else {
          slider.classList.remove('translate-x-6');
          slider.classList.add('translate-x-1');
          toggle.classList.remove('bg-blue-600');
          toggle.classList.add('bg-slate-400');
        }
      });
    });
  }

  initializeProgressiveLoader() {
    const progressiveLoaders = document.querySelectorAll('[data-progressive-loader]');
    
    progressiveLoaders.forEach(loader => {
      // Simulate progressive loading
      setTimeout(() => {
        const placeholder = loader.querySelector('[data-loading-placeholder]');
        const content = loader.querySelector('[data-progressive-content]');
        
        if (placeholder && content) {
          placeholder.classList.add('hidden');
          content.classList.remove('hidden');
        }
      }, 2000); // Load after 2 seconds
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new InteractiveFeatures();
  });
} else {
  new InteractiveFeatures();
}
```

## Icon Reference (Lucide React)

Common icons for interactive elements:

```javascript
const commonIcons = {
  chevronDown: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>',
  chevronRight: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/>',
  x: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/>',
  info: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  external: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3"/>',
  check: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"/>',
  plus: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m7-7H5"/>',
  minus: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/>',
  settings: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>',
  heart: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  star: '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>'
};
```

This component library reference provides a comprehensive set of interactive patterns that can be implemented using the available Radix UI components and standard HTML/CSS/JavaScript for generated content.
