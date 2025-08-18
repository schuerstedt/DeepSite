import React, { useState, useMemo } from "react";
import { Clock, Search, Trash2, Eye, Heart, Download, Filter, Grid, List, Star } from "lucide-react";
import classNames from "classnames";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  getSiteHistory, 
  deleteSiteFromHistory, 
  toggleSiteFavorite,
  SiteHistoryEntry 
} from "@/lib/prompt-history";
import { getStyleById } from "@/lib/design-styles";

interface SiteHistoryProps {
  onSelectSite: (html: string, prompt: string) => void;
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
  currentStyle?: string;
  currentMode?: 'classic' | 'enhanced';
}

export function SiteHistory({ 
  onSelectSite, 
  onSelectPrompt, 
  disabled, 
  currentStyle, 
  currentMode 
}: SiteHistoryProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<'all' | 'classic' | 'enhanced' | 'style' | 'favorites'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [history, setHistory] = useState<SiteHistoryEntry[]>([]);

  // Load history when opened
  React.useEffect(() => {
    if (open) {
      setHistory(getSiteHistory());
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
        entry.title?.toLowerCase().includes(query) ||
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
      case 'favorites':
        filtered = filtered.filter(entry => entry.isFavorite);
        break;
    }

    return filtered;
  }, [history, searchQuery, filterMode, currentStyle]);

  const handleSelectSite = (entry: SiteHistoryEntry) => {
    onSelectSite(entry.html, entry.prompt);
    setOpen(false);
  };

  const handleSelectPrompt = (prompt: string) => {
    onSelectPrompt(prompt);
    setOpen(false);
  };

  const handleDeleteSite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSiteFromHistory(id);
    setHistory(getSiteHistory());
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSiteFavorite(id);
    setHistory(getSiteHistory());
  };

  const handleDownloadHtml = (entry: SiteHistoryEntry, e: React.MouseEvent) => {
    e.stopPropagation();
    const blob = new Blob([entry.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${entry.title || 'website'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

  const extractPreview = (html: string) => {
    // Extract first meaningful text content for preview
    const textMatch = html.match(/<(?:h[1-6]|p)[^>]*>([^<]+)<\/(?:h[1-6]|p)>/i);
    if (textMatch && textMatch[1]) {
      return textMatch[1].trim().substring(0, 100);
    }
    return 'No preview available';
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
          Sites
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="!rounded-2xl p-0 !w-[42rem] overflow-hidden !bg-neutral-900"
        align="start"
      >
        <header className="flex items-center justify-between text-sm px-4 py-3 border-b bg-neutral-950 border-neutral-800">
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            <span className="font-semibold text-neutral-200">Site History</span>
            <span className="text-xs text-neutral-400">({filteredHistory.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="xs"
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              onClick={() => setViewMode('grid')}
              className="h-6 w-6 p-0"
            >
              <Grid className="size-3" />
            </Button>
            <Button
              size="xs"
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className="h-6 w-6 p-0"
            >
              <List className="size-3" />
            </Button>
          </div>
        </header>

        {/* Search and Filters */}
        <div className="p-3 space-y-2 border-b border-neutral-800">
          <div className="relative">
            <Search className="size-3 absolute left-2.5 top-2.5 text-neutral-500" />
            <Input
              placeholder="Search sites and prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs bg-neutral-800 border-neutral-700 text-neutral-200"
            />
          </div>
          
          <div className="flex gap-1">
            {['all', 'favorites', 'classic', 'enhanced', 'style'].map((filter) => (
              <Button
                key={filter}
                size="xs"
                variant={filterMode === filter ? "default" : "outline"}
                onClick={() => setFilterMode(filter as any)}
                className="h-6 text-xs capitalize"
                disabled={filter === 'style' && !currentStyle}
              >
                {filter === 'favorites' && <Star className="size-2.5 mr-1" />}
                {filter === 'style' ? `Current Style` : filter}
              </Button>
            ))}
          </div>
        </div>

        {/* History List/Grid */}
        <div className="max-h-96 overflow-y-auto">
          {filteredHistory.length === 0 ? (
            <div className="p-6 text-center text-neutral-400">
              <Clock className="size-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                {searchQuery ? 'No sites match your search' : 'No site history yet'}
              </p>
              <p className="text-xs mt-1">
                {searchQuery ? 'Try a different search term' : 'Start creating to build your history'}
              </p>
            </div>
          ) : (
            <div className={classNames(
              viewMode === 'grid' 
                ? "grid grid-cols-2 gap-3 p-3" 
                : "space-y-0"
            )}>
              {filteredHistory.map((entry) => {
                const styleConfig = getStyleById(entry.style);
                
                if (viewMode === 'grid') {
                  return (
                    <div
                      key={entry.id}
                      className="bg-neutral-800/30 rounded-lg p-3 hover:bg-neutral-800/50 transition-all cursor-pointer border border-neutral-700/50 group"
                      onClick={() => handleSelectSite(entry)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-medium text-neutral-200 line-clamp-1 flex-1">
                          {entry.title || 'Untitled Site'}
                        </h3>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                          <Button
                            size="xs"
                            variant="ghost"
                            onClick={(e) => handleToggleFavorite(entry.id, e)}
                            className="h-5 w-5 p-0"
                          >
                            <Heart className={classNames(
                              "size-3",
                              entry.isFavorite ? "fill-red-500 text-red-500" : "text-neutral-500"
                            )} />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-xs text-neutral-400 line-clamp-2 mb-2">
                        {entry.prompt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-neutral-500">
                          <span>{formatDate(entry.timestamp)}</span>
                          <span className={classNames(
                            entry.mode === 'enhanced' ? 'text-sky-400' : 'text-neutral-400'
                          )}>
                            {entry.mode === 'enhanced' ? '✨' : '⚡'}
                          </span>
                          {styleConfig && (
                            <span>{styleConfig.icon}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="xs"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectPrompt(entry.prompt);
                            }}
                            className="h-5 w-5 p-0 text-neutral-500 hover:text-neutral-300"
                            title="Use prompt only"
                          >
                            <Eye className="size-3" />
                          </Button>
                          <Button
                            size="xs"
                            variant="ghost"
                            onClick={(e) => handleDownloadHtml(entry, e)}
                            className="h-5 w-5 p-0 text-neutral-500 hover:text-neutral-300"
                            title="Download HTML"
                          >
                            <Download className="size-3" />
                          </Button>
                          <Button
                            size="xs"
                            variant="ghost"
                            onClick={(e) => handleDeleteSite(entry.id, e)}
                            className="h-5 w-5 p-0 text-neutral-500 hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="size-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={entry.id}
                      className="p-3 hover:bg-neutral-800/50 transition-colors border-b border-neutral-800/30 last:border-b-0 cursor-pointer group"
                      onClick={() => handleSelectSite(entry)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-medium text-neutral-200 truncate">
                              {entry.title || 'Untitled Site'}
                            </h3>
                            {entry.isFavorite && (
                              <Heart className="size-3 fill-red-500 text-red-500" />
                            )}
                          </div>
                          <p className="text-sm text-neutral-300 line-clamp-1 mb-1">
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
                            onClick={(e) => handleToggleFavorite(entry.id, e)}
                            className="h-6 w-6 p-0 text-neutral-500 hover:text-neutral-300"
                          >
                            <Heart className={classNames(
                              "size-3",
                              entry.isFavorite ? "fill-red-500 text-red-500" : ""
                            )} />
                          </Button>
                          <Button
                            size="xs"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectPrompt(entry.prompt);
                            }}
                            className="h-6 w-6 p-0 text-neutral-500 hover:text-neutral-300"
                          >
                            <Eye className="size-3" />
                          </Button>
                          <Button
                            size="xs"
                            variant="ghost"
                            onClick={(e) => handleDownloadHtml(entry, e)}
                            className="h-6 w-6 p-0 text-neutral-500 hover:text-neutral-300"
                          >
                            <Download className="size-3" />
                          </Button>
                          <Button
                            size="xs"
                            variant="ghost"
                            onClick={(e) => handleDeleteSite(entry.id, e)}
                            className="h-6 w-6 p-0 text-neutral-500 hover:text-red-400"
                          >
                            <Trash2 className="size-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {filteredHistory.length > 0 && (
          <div className="p-2 border-t border-neutral-800 bg-neutral-800/30">
            <p className="text-xs text-neutral-500 text-center">
              Click to load site • <kbd className="px-1 py-0.5 bg-neutral-700 rounded text-neutral-300">👁️</kbd> for prompt only • <kbd className="px-1 py-0.5 bg-neutral-700 rounded text-neutral-300">Ctrl+Shift+H</kbd> to open
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
