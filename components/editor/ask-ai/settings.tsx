import classNames from "classnames";
import { PiGearSixFill } from "react-icons/pi";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { useMemo } from "react";
import { useUpdateEffect } from "react-use";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PROVIDERS, MODELS } from "@/lib/providers";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAnalyticsSummary } from "@/lib/prompt-analytics";
import { useTokenTracking } from "@/hooks/useTokenTracking";
import { useTextModel } from "@/hooks/useTextModel";

export function Settings({
  open,
  onClose,
  provider,
  model,
  error,
  isFollowUp = false,
  promptMode,
  sectionMode,
  onChange,
  onModelChange,
  onPromptModeChange,
  onSectionModeChange,
}: {
  open: boolean;
  provider: string;
  model: string;
  error?: string;
  isFollowUp?: boolean;
  promptMode?: 'classic' | 'enhanced';
  sectionMode?: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (provider: string) => void;
  onModelChange: (model: string) => void;
  onPromptModeChange?: (mode: 'classic' | 'enhanced') => void;
  onSectionModeChange?: (enabled: boolean) => void;
}) {
  const analytics = useMemo(() => getAnalyticsSummary(), [open]);
  const { getTokenUsageSummary } = useTokenTracking();
  const tokenUsage = useMemo(() => getTokenUsageSummary(), [open]);
  const { selectedModel: textModel, availableModels: textModels, loading: textModelsLoading, changeModel: changeTextModel } = useTextModel();
  
  const modelAvailableProviders = useMemo(() => {
    const availableProviders = MODELS.find(
      (m: { value: string }) => m.value === model
    )?.providers;
    if (!availableProviders) return Object.keys(PROVIDERS);
    return Object.keys(PROVIDERS).filter((id) =>
      availableProviders.includes(id)
    );
  }, [model]);

  useUpdateEffect(() => {
    if (provider !== "auto" && !modelAvailableProviders.includes(provider)) {
      onChange("auto");
    }
  }, [model, provider]);

  return (
    <div className="">
      <Popover open={open} onOpenChange={onClose}>
        <PopoverTrigger asChild>
          <Button variant="black" size="sm">
            <PiGearSixFill className="size-4" />
            Settings
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="!rounded-2xl p-0 !w-96 overflow-hidden !bg-neutral-900"
          align="center"
        >
          <header className="flex items-center justify-center text-sm px-4 py-3 border-b gap-2 bg-neutral-950 border-neutral-800 font-semibold text-neutral-200">
            Customize Settings
          </header>
          <main className="px-4 pt-5 pb-6 space-y-5">
            {error !== "" && (
              <p className="text-red-500 text-sm font-medium mb-2 flex items-center justify-between bg-red-500/10 p-2 rounded-md">
                {error}
              </p>
            )}
            
            {/* Analytics Summary */}
            {analytics.totalUsage > 0 && (
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-3">
                <p className="text-neutral-300 text-sm font-medium mb-2">📊 Usage Stats</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-neutral-400">
                    <span className="text-sky-400">✨ Enhanced:</span> {analytics.enhancedUsage}
                  </div>
                  <div className="text-neutral-400">
                    <span className="text-neutral-300">⚡ Classic:</span> {analytics.classicUsage}
                  </div>
                  <div className="text-neutral-400 col-span-2">
                    Total requests: {analytics.totalUsage}
                  </div>
                </div>
              </div>
            )}
            
            {/* Token Usage Summary */}
            {tokenUsage.thisMonth.tokens > 0 && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-blue-300 text-sm font-medium mb-2">🔥 Token Usage (This Month)</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-neutral-300">
                    <span>Tokens used:</span>
                    <span className="font-mono">{tokenUsage.thisMonth.tokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Requests:</span>
                    <span>{tokenUsage.thisMonth.requests}</span>
                  </div>
                  <div className="w-full bg-neutral-700 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-400 h-1.5 rounded-full"
                      style={{ width: `${Math.min((tokenUsage.thisMonth.tokens / 1000000) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>HF Pro Limit</span>
                    <span>1M tokens/month</span>
                  </div>
                </div>
              </div>
            )}
            
            <label className="block">
              <p className="text-neutral-300 text-sm mb-2.5">
                Choose a DeepSeek model
              </p>
              <Select defaultValue={model} onValueChange={onModelChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a DeepSeek model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>DeepSeek models</SelectLabel>
                    {MODELS.map(
                      ({
                        value,
                        label,
                        isNew = false,
                        isThinker = false,
                      }: {
                        value: string;
                        label: string;
                        isNew?: boolean;
                        isThinker?: boolean;
                      }) => (
                        <SelectItem
                          key={value}
                          value={value}
                          className=""
                          disabled={isThinker && isFollowUp}
                        >
                          {label}
                          {isNew && (
                            <span className="text-xs bg-gradient-to-br from-sky-400 to-sky-600 text-white rounded-full px-1.5 py-0.5">
                              New
                            </span>
                          )}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>
            
            {/* Text Generation Model Selector */}
            <label className="block">
              <p className="text-neutral-300 text-sm mb-2.5">
                Text Generation Model
              </p>
              <p className="text-xs text-neutral-400/70 mb-2">
                Choose the AI model for dynamic content generation (pollinations.ai)
              </p>
              {textModelsLoading ? (
                <div className="w-full bg-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-400">
                  Loading models...
                </div>
              ) : (
                <Select value={textModel} onValueChange={changeTextModel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a text model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available text models</SelectLabel>
                      {textModels.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </label>
            
            {/* Prompt Mode Toggle */}
            {!isFollowUp && onPromptModeChange && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-300 text-sm mb-1.5">
                      Prompt Mode
                    </p>
                    <p className="text-xs text-neutral-400/70">
                      {promptMode === 'enhanced' 
                        ? 'Enhanced mode with planning phase for better results'
                        : 'Classic mode with direct generation'
                      }
                    </p>
                  </div>
                  <div className="flex gap-1 bg-neutral-800 rounded-md p-1">
                    <button
                      onClick={() => onPromptModeChange('classic')}
                      className={classNames(
                        'px-3 py-1.5 text-xs rounded transition-all duration-200',
                        promptMode === 'classic' 
                          ? 'bg-neutral-600 text-white' 
                          : 'text-neutral-400 hover:text-neutral-300'
                      )}
                    >
                      Classic
                    </button>
                    <button
                      onClick={() => onPromptModeChange('enhanced')}
                      className={classNames(
                        'px-3 py-1.5 text-xs rounded transition-all duration-200',
                        promptMode === 'enhanced' 
                          ? 'bg-sky-500 text-white' 
                          : 'text-neutral-400 hover:text-neutral-300'
                      )}
                    >
                      Enhanced
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Section Mode Toggle */}
            {!isFollowUp && onSectionModeChange && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-300 text-sm mb-1.5">
                      Section Structure
                    </p>
                    <p className="text-xs text-neutral-400/70">
                      {sectionMode 
                        ? 'Generate single-page websites with organized sections'
                        : 'Generate websites without enforced section structure'
                      }
                    </p>
                  </div>
                  <div className="flex gap-1 bg-neutral-800 rounded-md p-1">
                    <button
                      onClick={() => onSectionModeChange(false)}
                      className={classNames(
                        'px-3 py-1.5 text-xs rounded transition-all duration-200',
                        !sectionMode 
                          ? 'bg-neutral-600 text-white' 
                          : 'text-neutral-400 hover:text-neutral-300'
                      )}
                    >
                      Free
                    </button>
                    <button
                      onClick={() => onSectionModeChange(true)}
                      className={classNames(
                        'px-3 py-1.5 text-xs rounded transition-all duration-200',
                        sectionMode 
                          ? 'bg-green-500 text-white' 
                          : 'text-neutral-400 hover:text-neutral-300'
                      )}
                    >
                      Sections
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {isFollowUp && (
              <div className="bg-amber-500/10 border-amber-500/10 p-3 text-xs text-amber-500 border rounded-lg">
                Note: You can&apos;t use a Thinker model for follow-up requests.
                We automatically switch to the default model for you.
              </div>
            )}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-300 text-sm mb-1.5">
                    Use auto-provider
                  </p>
                  <p className="text-xs text-neutral-400/70">
                    We&apos;ll automatically select the best provider for you
                    based on your prompt.
                  </p>
                </div>
                <div
                  className={classNames(
                    "bg-neutral-700 rounded-full min-w-10 w-10 h-6 flex items-center justify-between p-1 cursor-pointer transition-all duration-200",
                    {
                      "!bg-sky-500": provider === "auto",
                    }
                  )}
                  onClick={() => {
                    const foundModel = MODELS.find(
                      (m: { value: string }) => m.value === model
                    );
                    if (provider === "auto" && foundModel?.autoProvider) {
                      onChange(foundModel.autoProvider);
                    } else {
                      onChange("auto");
                    }
                  }}
                >
                  <div
                    className={classNames(
                      "w-4 h-4 rounded-full shadow-md transition-all duration-200 bg-neutral-200",
                      {
                        "translate-x-4": provider === "auto",
                      }
                    )}
                  />
                </div>
              </div>
              <label className="block">
                <p className="text-neutral-300 text-sm mb-2">
                  Inference Provider
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {modelAvailableProviders.map((id: string) => (
                    <Button
                      key={id}
                      variant={id === provider ? "default" : "secondary"}
                      size="sm"
                      onClick={() => {
                        onChange(id);
                      }}
                    >
                      <Image
                        src={`/providers/${id}.svg`}
                        alt={PROVIDERS[id as keyof typeof PROVIDERS].name}
                        className="size-5 mr-2"
                        width={20}
                        height={20}
                      />
                      {PROVIDERS[id as keyof typeof PROVIDERS].name}
                      {id === provider && (
                        <RiCheckboxCircleFill className="ml-2 size-4 text-blue-500" />
                      )}
                    </Button>
                  ))}
                </div>
              </label>
            </div>
          </main>
        </PopoverContent>
      </Popover>
    </div>
  );
}
