import React, { useState } from "react";
import { Plus, Save, X, Palette, Type, Layout, Sparkles, Eye } from "lucide-react";
import classNames from "classnames";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DesignStyle, STYLE_CATEGORIES } from "@/lib/design-styles";
import { saveCustomStyle, getCustomStyles } from "@/lib/custom-styles";

interface StyleEditorProps {
  onStyleCreated: (style: DesignStyle) => void;
  disabled?: boolean;
}

interface StyleTemplate {
  name: string;
  description: string;
  prompt: string;
  icon: string;
}

const STYLE_TEMPLATES: Record<string, StyleTemplate[]> = {
  layout: [
    { name: "Grid Layout", description: "CSS Grid-based structured layout", prompt: "Use CSS Grid layout with structured sections, clean alignment, and organized content blocks", icon: "📊" },
    { name: "Card Interface", description: "Card-based design with shadows", prompt: "Design with card components, subtle shadows, rounded corners, and layered information architecture", icon: "🗃️" },
    { name: "Dashboard", description: "Analytics dashboard with widgets", prompt: "Create a dashboard-style layout with widgets, metrics, charts, and data visualization components", icon: "📈" },
    { name: "Landing Page", description: "Hero-focused marketing layout", prompt: "Design as a landing page with hero section, features, testimonials, and clear call-to-action flow", icon: "🚀" }
  ],
  visual: [
    { name: "Gradient Design", description: "Modern gradients and smooth transitions", prompt: "Use modern gradient backgrounds, smooth color transitions, and contemporary visual effects", icon: "🌈" },
    { name: "Minimalist", description: "Clean, white space focused", prompt: "Design with minimalist principles, abundant white space, clean typography, and subtle visual elements", icon: "⚪" },
    { name: "Dark Mode", description: "Dark theme with accent colors", prompt: "Create a dark theme design with dark backgrounds, light text, and strategic accent colors", icon: "🌙" },
    { name: "Glass Effect", description: "Glassmorphism with blur effects", prompt: "Use glassmorphism design with frosted glass effects, backdrop blur, and translucent elements", icon: "🔍" }
  ],
  typography: [
    { name: "Modern Sans", description: "Clean sans-serif typography", prompt: "Use modern sans-serif fonts, clear hierarchy, excellent readability, and contemporary typography", icon: "🔤" },
    { name: "Serif Classic", description: "Traditional serif fonts", prompt: "Design with classic serif typography, traditional elegance, and sophisticated text styling", icon: "📜" },
    { name: "Monospace Tech", description: "Developer-focused monospace", prompt: "Use monospace fonts, code-like aesthetics, developer-friendly design, and technical typography", icon: "💻" },
    { name: "Display Headers", description: "Bold display fonts for headers", prompt: "Feature bold display fonts for headers, strong visual hierarchy, and impactful typography", icon: "🎯" }
  ],
  theme: [
    { name: "Corporate", description: "Professional business theme", prompt: "Design with corporate aesthetics, professional colors, business-appropriate layout, and formal presentation", icon: "🏢" },
    { name: "Creative Agency", description: "Bold and artistic design", prompt: "Create an artistic, creative agency style with bold colors, unique layouts, and innovative design elements", icon: "🎨" },
    { name: "Tech Startup", description: "Modern tech company vibe", prompt: "Design with tech startup aesthetics, innovation-focused layout, modern UI patterns, and future-forward design", icon: "⚡" },
    { name: "E-commerce", description: "Product-focused shopping design", prompt: "Create e-commerce design with product showcases, shopping cart elements, conversion-focused layout", icon: "🛒" }
  ]
};

const EMOJI_CATEGORIES = [
  { name: "Interface", emojis: ["🎨", "🖥️", "📱", "⚡", "🔧", "⚙️", "🎯", "📊", "📈", "🗃️"] },
  { name: "Creative", emojis: ["✨", "🌟", "💫", "🎭", "🎪", "🎨", "🌈", "🎬", "📸", "🖼️"] },
  { name: "Tech", emojis: ["💻", "🤖", "🧠", "⚡", "🔬", "🧪", "🔍", "📡", "💾", "🖲️"] },
  { name: "Business", emojis: ["🏢", "📊", "💼", "📈", "💰", "🎯", "🚀", "⭐", "🏆", "📋"] },
  { name: "Design", emojis: ["🎨", "✏️", "📐", "🖌️", "🎭", "🌈", "💫", "✨", "🔷", "🔶"] }
];

export function StyleEditor({ onStyleCreated, disabled }: StyleEditorProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    prompt: "",
    category: "flat" as const,
    icon: "🎨"
  });
  const [previewPrompt, setPreviewPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'preview'>('basic');

  const handleSave = () => {
    if (!formData.name.trim() || !formData.description.trim() || !formData.prompt.trim()) {
      return;
    }

    const customStyle: DesignStyle = {
      id: `custom-${crypto.randomUUID()}`,
      name: formData.name,
      description: formData.description,
      prompt: formData.prompt,
      category: formData.category,
      icon: formData.icon
    };

    saveCustomStyle(customStyle);
    onStyleCreated(customStyle);
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      prompt: "",
      category: "flat",
      icon: "🎨"
    });
    setPreviewPrompt("");
    setSelectedTemplate("");
    setOpen(false);
  };

  const applyTemplate = (template: StyleTemplate) => {
    setFormData(prev => ({
      ...prev,
      name: template.name,
      description: template.description,
      prompt: template.prompt,
      icon: template.icon
    }));
    setSelectedTemplate(template.name);
  };

  const generatePreview = () => {
    const testPrompt = previewPrompt || "Create a modern landing page for a tech startup";
    const fullPrompt = `${testPrompt}\n\nSTYLE REQUIREMENT: ${formData.prompt}`;
    
    // Show preview in a simple format
    alert(`Preview of your custom style:\n\nTest prompt: "${testPrompt}"\n\nFull prompt that will be sent to AI:\n"${fullPrompt}"`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="xs"
          disabled={disabled}
          className="h-[28px] text-xs gap-1.5 !border-purple-600 !text-purple-400 hover:!text-purple-200 hover:!border-purple-500"
        >
          <Plus className="size-3" />
          Custom
        </Button>
      </DialogTrigger>
      <DialogContent className="!rounded-2xl !w-[50rem] max-h-[90vh] overflow-hidden !bg-neutral-900 border-neutral-700">
        <DialogHeader className="border-b border-neutral-800 pb-4">
          <DialogTitle className="flex items-center gap-2 text-neutral-200">
            <Palette className="size-5" />
            Custom Style Editor
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Create your own design style with custom prompts and settings
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex border-b border-neutral-800">
          {[
            { id: 'basic', label: 'Basic Info', icon: Type },
            { id: 'advanced', label: 'Style Prompt', icon: Sparkles },
            { id: 'preview', label: 'Preview', icon: Eye }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={classNames(
                "flex items-center gap-2 px-4 py-2 text-sm transition-colors",
                activeTab === id
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-neutral-400 hover:text-neutral-200"
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-4 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-200 mb-1">
                    Style Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="My Awesome Style"
                    className="bg-neutral-800 border-neutral-700 text-neutral-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-200 mb-1">
                    Category
                  </label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as any }))}>
                    <SelectTrigger className="bg-neutral-800 border-neutral-700 text-neutral-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-700">
                      {Object.entries(STYLE_CATEGORIES).map(([categoryId, category]) => (
                        <SelectItem key={categoryId} value={categoryId} className="text-neutral-200">
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-1">
                  Description
                </label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of your style"
                  className="bg-neutral-800 border-neutral-700 text-neutral-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-1">
                  Icon
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="🎨"
                    className="bg-neutral-800 border-neutral-700 text-neutral-200 w-20 text-center text-lg"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="bg-neutral-800 border-neutral-700">
                        Pick Icon
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="!w-80 bg-neutral-800 border-neutral-700">
                      <div className="space-y-3">
                        {EMOJI_CATEGORIES.map(category => (
                          <div key={category.name}>
                            <h4 className="text-xs font-medium text-neutral-300 mb-1">{category.name}</h4>
                            <div className="grid grid-cols-10 gap-1">
                              {category.emojis.map(emoji => (
                                <button
                                  key={emoji}
                                  onClick={() => setFormData(prev => ({ ...prev, icon: emoji }))}
                                  className="w-6 h-6 text-lg hover:bg-neutral-700 rounded flex items-center justify-center"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Style Templates */}
              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-2">
                  Quick Templates
                </label>
                <div className="space-y-3">
                  {Object.entries(STYLE_TEMPLATES).map(([categoryName, templates]) => (
                    <div key={categoryName}>
                      <h4 className="text-xs font-medium text-neutral-400 mb-1 capitalize">{categoryName}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {templates.map(template => (
                          <button
                            key={template.name}
                            onClick={() => applyTemplate(template)}
                            className={classNames(
                              "p-2 text-left text-xs rounded border transition-colors",
                              selectedTemplate === template.name
                                ? "bg-purple-500/20 border-purple-500 text-purple-200"
                                : "bg-neutral-800/50 border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                            )}
                          >
                            <div className="flex items-center gap-1 mb-1">
                              <span>{template.icon}</span>
                              <span className="font-medium">{template.name}</span>
                            </div>
                            <p className="text-neutral-400">{template.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Advanced Prompt Tab */}
          {activeTab === 'advanced' && (
            <div className="space-y-4 p-4">
              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-1">
                  Style Prompt
                </label>
                <p className="text-xs text-neutral-400 mb-2">
                  This prompt will be appended to user requests to apply your custom style.
                </p>
                <textarea
                  value={formData.prompt}
                  onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                  placeholder="Design this with clean modern aesthetics, using a blue and white color scheme with rounded corners, subtle shadows, and contemporary typography..."
                  className="w-full h-32 p-3 bg-neutral-800 border border-neutral-700 text-neutral-200 text-sm rounded-lg resize-none"
                />
              </div>

              <div className="bg-neutral-800/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-neutral-200 mb-2">💡 Prompt Tips</h4>
                <ul className="text-xs text-neutral-400 space-y-1">
                  <li>• Be specific about colors, layouts, and visual elements</li>
                  <li>• Mention typography preferences (fonts, sizes, hierarchy)</li>
                  <li>• Include spacing and layout instructions</li>
                  <li>• Specify UI patterns (cards, grids, navigation styles)</li>
                  <li>• Add atmosphere or mood descriptions</li>
                </ul>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-4 p-4">
              <div>
                <label className="block text-sm font-medium text-neutral-200 mb-1">
                  Test Prompt
                </label>
                <Input
                  value={previewPrompt}
                  onChange={(e) => setPreviewPrompt(e.target.value)}
                  placeholder="Create a landing page for a tech startup"
                  className="bg-neutral-800 border-neutral-700 text-neutral-200"
                />
              </div>

              <div className="bg-neutral-800/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-neutral-200 mb-2">Style Preview</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{formData.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-neutral-200">{formData.name || "Untitled Style"}</p>
                    <p className="text-xs text-neutral-400">{formData.description || "No description"}</p>
                  </div>
                </div>
                <div className="text-xs text-neutral-500 bg-neutral-900 p-2 rounded border">
                  <strong>Category:</strong> {formData.category}<br />
                  <strong>Prompt Length:</strong> {formData.prompt.length} characters
                </div>
              </div>

              <Button
                onClick={generatePreview}
                disabled={!formData.prompt.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Eye className="size-4 mr-2" />
                Preview Style Prompt
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
          <p className="text-xs text-neutral-500">
            Custom styles are saved locally in your browser
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} size="sm">
              <X className="size-4 mr-1" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.name.trim() || !formData.description.trim() || !formData.prompt.trim()}
              className="bg-purple-600 hover:bg-purple-700"
              size="sm"
            >
              <Save className="size-4 mr-1" />
              Save Style
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
