"use client";
import { useState } from "react";
import { Book, Palette, Code, Zap, FileText, ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentationSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
  isExpanded: boolean;
  onToggle: () => void;
}

const DocumentationSection = ({ icon, title, description, examples, isExpanded, onToggle }: DocumentationSectionProps) => (
  <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
    <button 
      onClick={onToggle}
      className="w-full p-4 flex items-center gap-3 hover:bg-slate-700/30 transition-colors text-left"
    >
      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      {isExpanded ? (
        <ChevronDown className="w-5 h-5 text-slate-400" />
      ) : (
        <ChevronRight className="w-5 h-5 text-slate-400" />
      )}
    </button>
    
    {isExpanded && (
      <div className="px-4 pb-4 border-t border-slate-700/30">
        <div className="mt-3 space-y-2">
          {examples.map((example, index) => (
            <div key={index} className="bg-slate-900/50 rounded p-3 text-sm">
              <code className="text-green-400">{example}</code>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

interface UserDocumentationProps {
  onStartCreating: () => void;
}

export const UserDocumentation = ({ onStartCreating }: UserDocumentationProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const documentationSections = [
    {
      id: "getting-started",
      icon: <Zap className="w-5 h-5" />,
      title: "Getting Started",
      description: "Learn how to create websites with AI in seconds",
      examples: [
        "Create a modern portfolio website for a web developer",
        "Build a restaurant website with menu and contact info",
        "Design a landing page for a SaaS product",
        "Make a photography portfolio with gallery"
      ]
    },
    {
      id: "style-guidelines",
      icon: <Palette className="w-5 h-5" />,
      title: "Style Guidelines & Design System",
      description: "Consistent, professional styling patterns for all websites",
      examples: [
        "• Professional gradients: bg-gradient-to-br from-slate-50 to-slate-100",
        "• Card containers: bg-white/50 backdrop-blur-sm rounded-xl shadow-lg",
        "• Typography: text-4xl font-bold for headings, text-slate-600 for body",
        "• Interactive elements: hover:shadow-lg transition-all duration-300"
      ]
    },
    {
      id: "interactive-components",
      icon: <Code className="w-5 h-5" />,
      title: "Interactive Components Library",
      description: "Rich interactive elements that enhance user experience",
      examples: [
        "• Tab Systems: Multi-section content organization",
        "• Accordion Sections: Expandable FAQ and feature lists",
        "• Modal Dialogs: Detailed content overlays and popups",
        "• Progressive Loading: Staged content revelation with animations"
      ]
    },
    {
      id: "content-generation",
      icon: <FileText className="w-5 h-5" />,
      title: "Smart Content Generation",
      description: "Intelligent content structure with dynamic text generation",
      examples: [
        "Automatic generatetext integration for substantial content (300-500 words)",
        "Visual content mixing: text + images + interactive elements",
        "Pattern-based layouts: tabs, accordions, or cards based on content type",
        "Consistent styling across all generated content sections"
      ]
    }
  ];

  const quickStartExamples = [
    {
      category: "Business Websites",
      prompts: [
        "Create a professional consulting firm website with services, team, and contact",
        "Design a modern marketing agency site with case studies and portfolio",
        "Build a law firm website with practice areas and attorney profiles"
      ]
    },
    {
      category: "E-commerce & Retail",
      prompts: [
        "Create an online store for handmade jewelry with product gallery",
        "Design a fashion boutique website with lookbook and shopping features",
        "Build a tech gadget store with product reviews and specifications"
      ]
    },
    {
      category: "Creative Portfolios",
      prompts: [
        "Design a photographer's portfolio with image galleries and booking",
        "Create an artist portfolio with artwork showcase and biography",
        "Build a designer portfolio with project case studies and process"
      ]
    },
    {
      category: "Service Providers",
      prompts: [
        "Create a restaurant website with menu, reservations, and location",
        "Design a fitness trainer site with programs, schedules, and testimonials",
        "Build a wellness center website with services, staff, and booking"
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
          <Book className="w-4 h-4" />
          DeepSite Documentation
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          I'm ready to work,<br />
          <span className="text-blue-400">Ask me anything!</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Create professional, interactive websites with AI-powered content generation, 
          comprehensive style guidelines, and rich interactive components.
        </p>
      </div>

      {/* Quick Start Button */}
      <div className="flex justify-center">
        <Button 
          onClick={onStartCreating}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          Start Creating Now
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Feature Documentation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">🚀 Powerful Features</h2>
        {documentationSections.map((section) => (
          <DocumentationSection
            key={section.id}
            icon={section.icon}
            title={section.title}
            description={section.description}
            examples={section.examples}
            isExpanded={expandedSections[section.id]}
            onToggle={() => toggleSection(section.id)}
          />
        ))}
      </div>

      {/* Quick Start Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">💡 Quick Start Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickStartExamples.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/30">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.prompts.map((prompt, promptIndex) => (
                  <div 
                    key={promptIndex}
                    className="bg-slate-900/50 rounded p-3 text-sm text-slate-300 hover:bg-slate-900/70 transition-colors cursor-pointer border border-slate-700/30 hover:border-slate-600/50"
                    onClick={() => {
                      // Copy to clipboard for easy use
                      navigator.clipboard.writeText(prompt);
                      // You could also trigger the AI with this prompt directly
                    }}
                  >
                    "{prompt}"
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-blue-500/20">
        <h2 className="text-2xl font-bold text-white mb-6">✨ What Makes DeepSite Special</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-white">Lightning Fast</h3>
            <p className="text-sm text-slate-400">Generate complete websites in seconds with AI</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto">
              <Palette className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white">Professional Design</h3>
            <p className="text-sm text-slate-400">Consistent style guidelines and modern UI patterns</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
              <Code className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white">Interactive Components</h3>
            <p className="text-sm text-slate-400">Rich tabs, accordions, modals, and animations</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="font-semibold text-white">Smart Content</h3>
            <p className="text-sm text-slate-400">Intelligent content generation with proper structure</p>
          </div>
        </div>
      </div>

      {/* Getting Started CTA */}
      <div className="text-center space-y-4 pt-8">
        <h2 className="text-2xl font-bold text-white">Ready to Create Something Amazing?</h2>
        <p className="text-slate-400">Click the button above or start typing your website idea in the prompt box!</p>
      </div>
    </div>
  );
};
