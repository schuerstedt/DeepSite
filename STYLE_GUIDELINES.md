# Style Guidelines for Dynamic Content Generation

This document provides comprehensive style guidelines for consistent UI generation across the DeepSite platform.

## Table of Contents
1. [Layout & Container Classes](#layout--container-classes)
2. [Typography & Content Classes](#typography--content-classes)
3. [Interactive Elements](#interactive-elements)
4. [Component Patterns](#component-patterns)
5. [Color System](#color-system)
6. [Animations & Transitions](#animations--transitions)
7. [Responsive Design](#responsive-design)
8. [Special Elements](#special-elements)

## Layout & Container Classes

### Main Containers
```html
<!-- Page container -->
<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">

<!-- Content wrapper -->
<div class="container mx-auto px-4 py-8 max-w-6xl">

<!-- Section container -->
<section class="mb-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-8 shadow-lg">

<!-- Card containers -->
<div class="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
```

### Grid & Flex Layouts
```html
<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Flex layouts -->
<div class="flex items-center justify-between gap-4">
<div class="flex flex-col space-y-4">
<div class="flex flex-wrap gap-2">
```

## Typography & Content Classes

### Headings
```html
<h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
<h2 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
<h3 class="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-3">
<h4 class="text-xl md:text-2xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
```

### Body Text
```html
<!-- Paragraph text -->
<p class="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">

<!-- Small text -->
<span class="text-sm text-slate-500 dark:text-slate-500">

<!-- Emphasized text -->
<strong class="font-semibold text-slate-900 dark:text-slate-100">
<em class="italic text-slate-700 dark:text-slate-300">
```

### Lists
```html
<!-- Unordered list -->
<ul class="space-y-2 text-slate-600 dark:text-slate-400">
  <li class="flex items-start gap-2">
    <span class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
    <span>List item content</span>
  </li>
</ul>

<!-- Ordered list -->
<ol class="space-y-2 text-slate-600 dark:text-slate-400 list-decimal list-inside">
```

## Interactive Elements

### Buttons
```html
<!-- Primary button -->
<button class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md">

<!-- Secondary button -->
<button class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium px-4 py-2 rounded-lg transition-colors">

<!-- Outline button -->
<button class="border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium px-4 py-2 rounded-lg transition-colors">

<!-- Icon button -->
<button class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
  <svg class="w-5 h-5 text-slate-600 dark:text-slate-400">...</svg>
</button>
```

### Links
```html
<!-- Primary link -->
<a href="#" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline-offset-4 hover:underline transition-colors">

<!-- Button-style link -->
<a href="#" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
```

### Form Elements
```html
<!-- Input field -->
<input class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">

<!-- Select dropdown -->
<select class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">

<!-- Checkbox -->
<input type="checkbox" class="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600">

<!-- Textarea -->
<textarea class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical">
```

## Component Patterns

### Cards
```html
<!-- Basic card -->
<div class="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
  <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Card Title</h3>
  <p class="text-slate-600 dark:text-slate-400">Card content</p>
</div>

<!-- Feature card -->
<div class="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
  <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
    <svg class="w-6 h-6 text-blue-600 dark:text-blue-400">...</svg>
  </div>
  <h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Feature Title</h3>
  <p class="text-slate-600 dark:text-slate-400">Feature description</p>
</div>
```

### Badges & Tags
```html
<!-- Status badge -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
  Active
</span>

<!-- Category tag -->
<span class="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
  Category
</span>
```

### Alerts & Notifications
```html
<!-- Success alert -->
<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
  <div class="flex items-start gap-3">
    <svg class="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5">...</svg>
    <div>
      <h4 class="text-sm font-medium text-green-900 dark:text-green-300">Success</h4>
      <p class="text-sm text-green-700 dark:text-green-400 mt-1">Success message</p>
    </div>
  </div>
</div>

<!-- Warning alert -->
<div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
  <div class="flex items-start gap-3">
    <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5">...</svg>
    <div>
      <h4 class="text-sm font-medium text-yellow-900 dark:text-yellow-300">Warning</h4>
      <p class="text-sm text-yellow-700 dark:text-yellow-400 mt-1">Warning message</p>
    </div>
  </div>
</div>
```

## Color System

### Primary Colors
- **Blue**: `blue-500` to `blue-700` for primary actions
- **Slate**: `slate-50` to `slate-900` for neutral content
- **White/Black**: Pure whites and blacks for contrast

### Semantic Colors
- **Success**: `green-500` to `green-700`
- **Warning**: `yellow-500` to `yellow-700`
- **Error**: `red-500` to `red-700`
- **Info**: `blue-500` to `blue-700`

### Usage Guidelines
```html
<!-- Text colors -->
text-slate-900 dark:text-slate-100  <!-- Primary text -->
text-slate-600 dark:text-slate-400  <!-- Secondary text -->
text-slate-500 dark:text-slate-500  <!-- Muted text -->

<!-- Background colors -->
bg-white dark:bg-slate-800          <!-- Card backgrounds -->
bg-slate-50 dark:bg-slate-900       <!-- Page backgrounds -->
bg-slate-100 dark:bg-slate-700      <!-- Secondary backgrounds -->

<!-- Border colors -->
border-slate-200 dark:border-slate-700  <!-- Standard borders -->
border-slate-300 dark:border-slate-600  <!-- Form element borders -->
```

## Animations & Transitions

### Standard Transitions
```html
<!-- Hover transitions -->
transition-colors duration-200
transition-all duration-300
transition-transform duration-200

<!-- Hover effects -->
hover:shadow-md
hover:shadow-lg
hover:-translate-y-1
hover:scale-105
```

### Loading States
```html
<!-- Skeleton loader -->
<div class="animate-pulse bg-slate-200 dark:bg-slate-700 rounded h-4 w-full"></div>

<!-- Spinner -->
<div class="animate-spin rounded-full h-4 w-4 border-2 border-slate-300 border-t-blue-600"></div>
```

## Responsive Design

### Breakpoint Patterns
```html
<!-- Mobile-first responsive -->
text-base md:text-lg lg:text-xl
px-4 md:px-6 lg:px-8
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
space-y-4 md:space-y-6 lg:space-y-8
```

### Common Responsive Utilities
- `hidden md:block` - Hide on mobile, show on desktop
- `block md:hidden` - Show on mobile, hide on desktop
- `flex-col md:flex-row` - Stack on mobile, row on desktop
- `text-center md:text-left` - Center on mobile, left on desktop

## Special Elements

### Code Blocks
```html
<!-- Inline code -->
<code class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded text-sm font-mono">

<!-- Code block -->
<pre class="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto">
  <code class="text-sm font-mono">
```

### Images & Media
```html
<!-- Responsive image -->
<img class="w-full h-auto rounded-lg shadow-md" src="..." alt="...">

<!-- Avatar -->
<img class="w-10 h-10 rounded-full object-cover" src="..." alt="...">

<!-- Icon container -->
<div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400">...</svg>
</div>
```

### Progressive Disclosure
```html
<!-- Collapsible section -->
<details class="group bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
  <summary class="cursor-pointer font-medium text-slate-900 dark:text-slate-100 list-none flex items-center justify-between">
    Section Title
    <svg class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform">...</svg>
  </summary>
  <div class="mt-4 text-slate-600 dark:text-slate-400">
    <!-- Collapsible content -->
  </div>
</details>
```

## Usage Examples

### Complete Section Template
```html
<section class="mb-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-8 shadow-lg">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
      <svg class="w-5 h-5 text-blue-600 dark:text-blue-400">...</svg>
    </div>
    <h2 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">Section Title</h2>
  </div>
  
  <p class="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
    Section description with proper typography and spacing.
  </p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Cards or content items -->
  </div>
  
  <div class="flex flex-wrap gap-3 mt-6">
    <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
      Primary Action
    </button>
    <button class="border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium px-4 py-2 rounded-lg transition-colors">
      Secondary Action
    </button>
  </div>
</section>
```

## Implementation Notes

1. **Consistency**: Always use the same class combinations for similar elements
2. **Dark Mode**: Include dark mode variants for all color-related classes
3. **Accessibility**: Ensure proper contrast ratios and focus states
4. **Performance**: Use `transition-colors` instead of `transition-all` when possible
5. **Spacing**: Use consistent spacing scales (4, 6, 8, 12 for margins/padding)
6. **Hover States**: Always include hover states for interactive elements
7. **Mobile First**: Design for mobile first, then enhance for larger screens

This style guide ensures consistent, beautiful, and accessible UI generation across all dynamic content.
