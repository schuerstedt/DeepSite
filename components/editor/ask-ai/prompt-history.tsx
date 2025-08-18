import React, { useState, useMemo } from "react";
import { Clock, Search, Trash2, Edit3, Copy, Filter } from "lucide-react";
import classNames from "classnames";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPromptHistory, deletePromptFromHistory, PromptHistoryEntry } from "@/lib/prompt-history";
import { getStyleById } from "@/lib/design-styles";

interface PromptHistoryProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
  currentStyle?: string;
  currentMode?: 'classic' | 'enhanced';
}

export function PromptHistory({ onSelectPrompt, disabled, currentStyle, currentMode }: PromptHistoryProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<'all' | 'classic' | 'enhanced' | 'style'>('all');
  const [history, setHistory] = useState<PromptHistoryEntry[]>([]);

  // Load history when opened
  React.useEffect(() => {
    if (open) {
      setHistory(getPromptHistory());
    }
  }, [open]);

  // Filter history based on search and filters
  const filteredHistory = useMemo(() => {
    let filtered = history;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.prompt.toLowerCase().includes(query) ||
        entry.style.toLowerCase().includes(query)
      );
    }

    // Apply mode/style filter
    switch (filterMode) {
      case 'classic':
        filtered = filtered.filter(entry => entry.mode === 'classic');
        break;
      case 'enhanced':
        filtered = filtered.filter(entry => entry.mode === 'enhanced');
        break;
      case 'style':
        filtered = filtered.filter(entry => entry.style === currentStyle);
        break;
    }

    return filtered;
  }, [history, searchQuery, filterMode, currentStyle]);

  const handleSelectPrompt = (prompt: string) => {
    onSelectPrompt(prompt);
    setOpen(false);
  };

  const handleDeletePrompt = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deletePromptFromHistory(id);
    setHistory(getPromptHistory());
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="xs"
          disabled={disabled}
          className={classNames(
            "h-[28px] text-xs gap-1.5",
            "!border-neutral-600 !text-neutral-400 hover:!text-neutral-200 hover:!border-neutral-500"
          )}
        >
          <Clock className="size-3" />
          History
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="!rounded-2xl p-0 !w-[28rem] overflow-hidden !bg-neutral-900"
        align="start"
      >
        <header className="flex items-center justify-between text-sm px-4 py-3 border-b bg-neutral-950 border-neutral-800">
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            <span className="font-semibold text-neutral-200">Prompt History</span>
            <span className="text-xs text-neutral-400">({filteredHistory.length})</span>
          </div>
        </header>

        {/* Search and Filters */}
        <div className="p-3 space-y-2 border-b border-neutral-800">
          <div className="relative">
            <Search className="size-3 absolute left-2.5 top-2.5 text-neutral-500" />
            <Input
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs bg-neutral-800 border-neutral-700 text-neutral-200"
            />
          </div>
          
          <div className="flex gap-1">
            {['all', 'classic', 'enhanced', 'style'].map((filter) => (
              <Button
                key={filter}
                size="xs"
                variant={filterMode === filter ? "default" : "outline"}
                onClick={() => setFilterMode(filter as any)}
                className="h-6 text-xs capitalize"
                disabled={filter === 'style' && !currentStyle}
              >
                {filter === 'style' ? `Current Style` : filter}
              </Button>
            ))}
          </div>
        </div>

        {/* History List */}
        <div className="max-h-80 overflow-y-auto">
          {filteredHistory.length === 0 ? (
            <div className="p-6 text-center text-neutral-400">
              <Clock className="size-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                {searchQuery ? 'No prompts match your search' : 'No prompt history yet'}
              </p>
              <p className="text-xs mt-1">
                {searchQuery ? 'Try a different search term' : 'Start creating to build your history'}
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              {filteredHistory.map((entry) => {
                const styleConfig = getStyleById(entry.style);
                return (
                  <div
                    key={entry.id}
                    className="p-3 hover:bg-neutral-800/50 transition-colors border-b border-neutral-800/30 last:border-b-0 cursor-pointer group"
                    onClick={() => handleSelectPrompt(entry.prompt)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-neutral-200 line-clamp-2 mb-1">
                          {entry.prompt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <span>{formatDate(entry.timestamp)}</span>
                          <span>•</span>
                          <span className={classNames(
                            entry.mode === 'enhanced' ? 'text-sky-400' : 'text-neutral-400'
                          )}>
                            {entry.mode === 'enhanced' ? '✨ Enhanced' : '⚡ Classic'}
                          </span>
                          {styleConfig && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                {styleConfig.icon} {styleConfig.name}
                              </span>
                            </>
                          )}
                          {entry.isFollowUp && (
                            <>
                              <span>•</span>
                              <span className="text-orange-400">Follow-up</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(entry.prompt);
                          }}
                          className="h-6 w-6 p-0 text-neutral-500 hover:text-neutral-300"
                        >
                          <Copy className="size-3" />
                        </Button>
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={(e) => handleDeletePrompt(entry.id, e)}
                          className="h-6 w-6 p-0 text-neutral-500 hover:text-red-400"
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {filteredHistory.length > 0 && (
          <div className="p-2 border-t border-neutral-800 bg-neutral-800/30">
            <p className="text-xs text-neutral-500 text-center">
              Click to use • <kbd className="px-1 py-0.5 bg-neutral-700 rounded text-neutral-300">Ctrl+H</kbd> to open • Hover for actions
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
