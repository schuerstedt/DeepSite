import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getAnalyticsSummary, getPromptAnalytics } from "@/lib/prompt-analytics";

export function AnalyticsDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const analytics = getPromptAnalytics();
  const summary = getAnalyticsSummary();

  if (summary.totalUsage === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        size="sm"
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-neutral-900 border-neutral-700 text-neutral-300 hover:bg-neutral-800"
      >
        📊 Stats ({summary.totalUsage})
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 bg-neutral-900 border border-neutral-700 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white">Prompt Mode Performance</h3>
            <Button
              size="xs"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1"
            >
              ×
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-neutral-800 rounded p-3">
                <div className="text-xs text-neutral-400 mb-1">⚡ Classic Mode</div>
                <div className="text-lg font-semibold text-white">{summary.classicUsage}</div>
                <div className="text-xs text-neutral-500">
                  {summary.totalUsage > 0 ? ((summary.classicUsage / summary.totalUsage) * 100).toFixed(0) : 0}% of usage
                </div>
              </div>
              
              <div className="bg-neutral-800 rounded p-3">
                <div className="text-xs text-neutral-400 mb-1">✨ Enhanced Mode</div>
                <div className="text-lg font-semibold text-sky-400">{summary.enhancedUsage}</div>
                <div className="text-xs text-neutral-500">
                  {summary.totalUsage > 0 ? ((summary.enhancedUsage / summary.totalUsage) * 100).toFixed(0) : 0}% of usage
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-800/50 rounded p-3">
              <div className="text-xs text-neutral-400 mb-2">Recent Activity</div>
              <div className="text-sm text-white">
                Last 30 days: {summary.last30Days} requests
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                Total lifetime: {summary.totalUsage} requests
              </div>
            </div>
            
            {summary.totalUsage >= 5 && (
              <div className="text-xs text-neutral-400">
                💡 Try both modes with similar prompts to see which works better for your use case!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
