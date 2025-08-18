import React from "react";
import { ChevronDown, Trash2, Edit3 } from "lucide-react";
import classNames from "classnames";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DESIGN_STYLES, STYLE_CATEGORIES, getStyleById, DesignStyle } from "@/lib/design-styles";
import { getCustomStyles, deleteCustomStyle } from "@/lib/custom-styles";
import { StyleEditor } from "./style-editor";

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
  disabled?: boolean;
}

export function StyleSelector({ selectedStyle, onStyleChange, disabled }: StyleSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [customStyles, setCustomStyles] = React.useState<DesignStyle[]>([]);
  const [isClient, setIsClient] = React.useState(false);
  
  // Set client state after hydration to prevent SSR mismatches
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Load custom styles when component mounts or when opened - only on client
  React.useEffect(() => {
    if (isClient && open) {
      setCustomStyles(getCustomStyles());
    }
  }, [open, isClient]);
  
  // Find current style in both built-in and custom styles
  const currentStyle = React.useMemo(() => {
    // During SSR or before client hydration, only use built-in styles
    if (!isClient) {
      return getStyleById(selectedStyle) || DESIGN_STYLES[0];
    }
    
    return getStyleById(selectedStyle) || 
           customStyles.find(s => s.id === selectedStyle) || 
           DESIGN_STYLES[0];
  }, [selectedStyle, customStyles, isClient]);
  
  const handleStyleSelect = (styleId: string) => {
    onStyleChange(styleId);
    setOpen(false);
  };
  
  const handleCustomStyleCreated = (newStyle: DesignStyle) => {
    if (isClient) {
      setCustomStyles(getCustomStyles()); // Refresh list
      onStyleChange(newStyle.id); // Auto-select the new style
    }
  };
  
  const handleDeleteCustomStyle = (styleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isClient) {
      deleteCustomStyle(styleId);
      setCustomStyles(getCustomStyles());
      
      // If deleted style was selected, switch to default
      if (selectedStyle === styleId) {
        onStyleChange('default');
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="xs"
          disabled={disabled}
          className={classNames(
            "h-[28px] text-xs gap-1.5 min-w-[100px] justify-between",
            currentStyle.id === 'default' 
              ? "!border-neutral-600 !text-neutral-400 hover:!text-neutral-200 hover:!border-neutral-500"
              : "!border-purple-500/50 !text-purple-400 hover:!text-purple-300 hover:!border-purple-400 bg-purple-500/10"
          )}
        >
          <span className="flex items-center gap-1">
            <span>{currentStyle.icon}</span>
            <span className="truncate max-w-20">{currentStyle.name}</span>
          </span>
          <ChevronDown className="size-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="!rounded-2xl p-0 !w-96 overflow-hidden !bg-neutral-900"
        align="start"
      >
        <header className="flex items-center justify-center text-sm px-4 py-3 border-b gap-2 bg-neutral-950 border-neutral-800 font-semibold text-neutral-200">
          🎨 Choose Design Style
          <span className="text-xs text-neutral-400 ml-auto">
            {DESIGN_STYLES.length + customStyles.length} styles
          </span>
        </header>
        
        {/* Custom Style Editor */}
        <div className="p-3 border-b border-neutral-800 bg-neutral-800/30">
          <StyleEditor 
            onStyleCreated={handleCustomStyleCreated} 
            disabled={disabled}
          />
        </div>
        
        <div className="max-h-[32rem] overflow-y-auto">
          {/* Custom Styles Section */}
          {customStyles.length > 0 && (
            <div className="border-b border-neutral-800">
              <div className="px-4 py-2 bg-neutral-800/50">
                <p className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                  <span>✨</span>
                  Custom Styles ({customStyles.length})
                </p>
              </div>
              <div className="space-y-0">
                {customStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleStyleSelect(style.id)}
                    className={classNames(
                      "w-full text-left px-4 py-3 hover:bg-neutral-800/50 transition-colors border-b border-neutral-800/30 last:border-b-0 group",
                      {
                        "bg-neutral-800 border-l-2 border-l-purple-500": selectedStyle === style.id,
                      }
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">{style.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className={classNames(
                          "text-sm font-medium",
                          selectedStyle === style.id ? "text-purple-400" : "text-neutral-200"
                        )}>
                          {style.name}
                        </p>
                        <p className="text-xs text-neutral-400 mt-0.5 line-clamp-2">
                          {style.description}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteCustomStyle(style.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-neutral-500 hover:text-red-400 transition-all"
                        title="Delete custom style"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Built-in Styles */}
          {Object.entries(STYLE_CATEGORIES).map(([categoryKey, category]) => {
            const categoryStyles = DESIGN_STYLES.filter(style => style.category === categoryKey);
            
            return (
              <div key={categoryKey} className="border-b border-neutral-800 last:border-b-0">
                <div className="px-4 py-2 bg-neutral-800/50">
                  <p className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                    <span>{category.icon}</span>
                    {category.name}
                  </p>
                </div>
                <div className="space-y-0">
                  {categoryStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleStyleSelect(style.id)}
                      className={classNames(
                        "w-full text-left px-4 py-3 hover:bg-neutral-800/50 transition-colors border-b border-neutral-800/30 last:border-b-0",
                        {
                          "bg-neutral-800 border-l-2 border-l-blue-500": selectedStyle === style.id,
                        }
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg mt-0.5">{style.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={classNames(
                            "text-sm font-medium",
                            selectedStyle === style.id ? "text-blue-400" : "text-neutral-200"
                          )}>
                            {style.name}
                          </p>
                          <p className="text-xs text-neutral-400 mt-0.5 line-clamp-2">
                            {style.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
