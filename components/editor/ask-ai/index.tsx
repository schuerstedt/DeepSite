"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useMemo, useEffect } from "react";
import classNames from "classnames";
import { toast } from "sonner";
import { useLocalStorage, useUpdateEffect } from "react-use";
import { ArrowUp, ChevronDown, Crosshair, Lightbulb } from "lucide-react";
import { FaStopCircle } from "react-icons/fa";

import ProModal from "@/components/pro-modal";
import { Button } from "@/components/ui/button";
import { MODELS } from "@/lib/providers";
import { HtmlHistory } from "@/types";
import { InviteFriends } from "@/components/invite-friends";
import { Settings } from "@/components/editor/ask-ai/settings";
import { LoginModal } from "@/components/login-modal";
import { ReImagine } from "@/components/editor/ask-ai/re-imagine";
import Loading from "@/components/loading";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { SelectedHtmlElement } from "./selected-html-element";
import { FollowUpTooltip } from "./follow-up-tooltip";
import { isTheSameHtml } from "@/lib/compare-html-diff";
import { getPromptRecommendation } from "@/lib/prompt-recommendations";
import { trackPromptUsage } from "@/lib/prompt-analytics";
import { useTokenTracking, estimateTokens } from "@/hooks/useTokenTracking";
import { DESIGN_STYLES, getStyleById } from "@/lib/design-styles";
import { StyleSelector } from "./style-selector";
import { PromptHistory } from "./prompt-history";
import { SiteHistory } from "./site-history";
import { savePromptToHistory, saveSiteToHistory } from "@/lib/prompt-history";

export function AskAI({
  html,
  setHtml,
  onScrollToBottom,
  isAiWorking,
  setisAiWorking,
  isEditableModeEnabled = false,
  selectedElement,
  setSelectedElement,
  setIsEditableModeEnabled,
  onNewPrompt,
  onSuccess,
}: {
  html: string;
  setHtml: (html: string) => void;
  onScrollToBottom: () => void;
  isAiWorking: boolean;
  onNewPrompt: (prompt: string) => void;
  htmlHistory?: HtmlHistory[];
  setisAiWorking: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: (h: string, p: string, n?: number[][]) => void;
  isEditableModeEnabled: boolean;
  setIsEditableModeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  selectedElement?: HTMLElement | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}) {
  const refThink = useRef<HTMLDivElement | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [hasAsked, setHasAsked] = useState(false);
  const [previousPrompt, setPreviousPrompt] = useState("");
  const [provider, setProvider] = useLocalStorage("provider", "auto");
  const [model, setModel] = useLocalStorage("model", MODELS[0].value);
  const [promptMode, setPromptMode] = useLocalStorage<'classic' | 'enhanced'>("promptMode_v2", "enhanced");
  const [sectionMode, setSectionMode] = useLocalStorage("sectionMode", true);
  const [openProvider, setOpenProvider] = useState(false);
  const [providerError, setProviderError] = useState("");
  const [openProModal, setOpenProModal] = useState(false);
  const [think, setThink] = useState<string | undefined>(undefined);
  const [openThink, setOpenThink] = useState(false);
  const [isThinking, setIsThinking] = useState(true);
  const [controller, setController] = useState<AbortController | null>(null);
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [recommendation, setRecommendation] = useState<ReturnType<typeof getPromptRecommendation>>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [selectedStyle, setSelectedStyle] = useLocalStorage("designStyle", "default");
  const [showHistory, setShowHistory] = useState(false);
  const [isManuallyResized, setIsManuallyResized] = useState(false);
  
  const { trackTokenUsage } = useTokenTracking();
  const lastRenderTimeRef = useRef(0);

  const selectedModel = useMemo(() => {
    return MODELS.find((m: { value: string }) => m.value === model);
  }, [model]);

  // Analyze prompt and provide recommendations - DISABLED to prevent auto-switching
  // useEffect(() => {
  //   if (prompt.trim().length > 10) {
  //     const rec = getPromptRecommendation(prompt);
  //     setRecommendation(rec);
  //     setShowRecommendation(!!rec && rec.recommendedMode !== promptMode);
  //   } else {
  //     setRecommendation(null);
  //     setShowRecommendation(false);
  //   }
  // }, [prompt, promptMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+H to open history
      if (e.ctrlKey && e.key === 'h' && !isAiWorking) {
        e.preventDefault();
        setShowHistory(!showHistory);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAiWorking, showHistory]);

  const callAi = async (redesignMarkdown?: string) => {
    if (isAiWorking) return;
    if (!redesignMarkdown && !prompt.trim()) return;
    setisAiWorking(true);
    setProviderError("");
    setThink("");
    setOpenThink(false);
    setIsThinking(true);

    // Enhance prompt with style information
    const selectedStyleConfig = getStyleById(selectedStyle as string);
    const enhancedPrompt = selectedStyleConfig && selectedStyleConfig.id !== 'default' 
      ? `${prompt}\n\nSTYLE REQUIREMENT: ${selectedStyleConfig.prompt}` 
      : prompt;

    let contentResponse = "";
    let thinkResponse = "";

    const abortController = new AbortController();
    setController(abortController);
    try {
      onNewPrompt(prompt);
      if (isFollowUp && !redesignMarkdown && !isSameHtml) {
        const selectedElementHtml = selectedElement
          ? selectedElement.outerHTML
          : "";
        const request = await fetch("/api/ask-ai", {
          method: "PUT",
          body: JSON.stringify({
            prompt: enhancedPrompt,
            provider,
            previousPrompt,
            model,
            html,
            selectedElementHtml,
          }),
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": window.location.hostname,
          },
          signal: abortController.signal,
        });
        if (request && request.body) {
          const res = await request.json();
          if (!request.ok) {
            if (res.openLogin) {
              setOpen(true);
            } else if (res.openSelectProvider) {
              setOpenProvider(true);
              setProviderError(res.message);
            } else if (res.openProModal) {
              setOpenProModal(true);
            } else {
              toast.error(res.message);
            }
            setisAiWorking(false);
            return;
          }
          setHtml(res.html);
          toast.success("AI responded successfully");
          
          // Track analytics
          trackPromptUsage({
            mode: 'classic', // Follow-up requests always use classic mode
            prompt,
            timestamp: new Date(),
            userSatisfaction: 'positive'
          });
          
          // Save to prompt history
          savePromptToHistory({
            prompt: enhancedPrompt,
            style: selectedStyle as string,
            mode: 'classic',
            provider: provider as string,
            model: model as string,
            isFollowUp: true,
            originalPrompt: previousPrompt
          });
          
          // Save complete site to history (follow-up)
          saveSiteToHistory({
            prompt,
            html: res.html,
            style: selectedStyle as string,
            mode: 'classic' as const,
            provider: provider as string,
            model: model as string,
            isFollowUp: true,
            parentId: undefined // Could link to parent if we tracked it
          });
          
          // Track token usage for follow-up request
          const selectedElementHtml = selectedElement ? selectedElement.outerHTML : "";
          const inputText = `${prompt} ${html} ${selectedElementHtml}`;
          const outputText = res.html || '';
          trackTokenUsage({
            requestId: crypto.randomUUID(),
            timestamp: new Date(),
            model: model || 'unknown',
            provider: (provider === 'auto' ? 'auto-selected' : provider) || 'unknown',
            promptTokens: estimateTokens(inputText),
            completionTokens: estimateTokens(outputText),
            totalTokens: estimateTokens(inputText + outputText)
          });
          
          setPreviousPrompt(prompt);
          setPrompt("");
          setisAiWorking(false);
          onSuccess(res.html, prompt, res.updatedLines);
          if (audio.current) audio.current.play();
        }
      } else {
        const request = await fetch("/api/ask-ai", {
          method: "POST",
          body: JSON.stringify({
            prompt: enhancedPrompt,
            provider,
            model,
            html: isSameHtml ? "" : html,
            redesignMarkdown,
            promptMode,
            sectionMode,
          }),
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": window.location.hostname,
          },
          signal: abortController.signal,
        });
        if (request && request.body) {
          const reader = request.body.getReader();
          const decoder = new TextDecoder("utf-8");
          const selectedModel = MODELS.find(
            (m: { value: string }) => m.value === model
          );
          let contentThink: string | undefined = undefined;
          const read = async () => {
            const { done, value } = await reader.read();
            if (done) {
              const isJson =
                contentResponse.trim().startsWith("{") &&
                contentResponse.trim().endsWith("}");
              const jsonResponse = isJson ? JSON.parse(contentResponse) : null;
              if (jsonResponse && !jsonResponse.ok) {
                if (jsonResponse.openLogin) {
                  setOpen(true);
                } else if (jsonResponse.openSelectProvider) {
                  setOpenProvider(true);
                  setProviderError(jsonResponse.message);
                } else if (jsonResponse.openProModal) {
                  setOpenProModal(true);
                } else {
                  toast.error(jsonResponse.message);
                }
                setisAiWorking(false);
                return;
              }

              toast.success("AI responded successfully");
              
              // Track analytics
              trackPromptUsage({
                mode: promptMode as 'classic' | 'enhanced',
                prompt: redesignMarkdown ? 'Website redesign' : prompt,
                timestamp: new Date(),
                userSatisfaction: 'positive' // Default to positive on successful completion
              });
              
              // Save to prompt history
              savePromptToHistory({
                prompt: redesignMarkdown ? `Redesign: ${redesignMarkdown}` : enhancedPrompt,
                style: selectedStyle as string,
                mode: promptMode as 'classic' | 'enhanced',
                provider: provider as string,
                model: model as string,
                isFollowUp: false
              });
              
              // Save complete site to history (initial)
              const finalHtml = finalDoc ?? contentResponse;
              saveSiteToHistory({
                prompt: redesignMarkdown ? `Redesign: ${redesignMarkdown}` : prompt,
                html: finalHtml,
                style: selectedStyle as string,
                mode: promptMode as 'classic' | 'enhanced',
                provider: provider as string,
                model: model as string,
                isFollowUp: false
              });
              
              // Track token usage for initial request
              const inputText = redesignMarkdown 
                ? `Redesign: ${redesignMarkdown}` 
                : (html ? `Current HTML: ${html}\nPrompt: ${prompt}` : prompt);
              trackTokenUsage({
                requestId: crypto.randomUUID(),
                timestamp: new Date(),
                model: model || 'unknown',
                provider: (provider === 'auto' ? 'auto-selected' : provider) || 'unknown',
                promptTokens: estimateTokens(inputText),
                completionTokens: estimateTokens(contentResponse),
                totalTokens: estimateTokens(inputText + contentResponse)
              });
              
              setPreviousPrompt(prompt);
              setPrompt("");
              setisAiWorking(false);
              setHasAsked(true);
              if (selectedModel?.isThinker) {
                setModel(MODELS[0].value);
              }
              if (audio.current) audio.current.play();

              // Now we have the complete HTML including </html>, so set it to be sure
              const finalDoc = contentResponse.match(
                /<!DOCTYPE html>[\s\S]*<\/html>/
              )?.[0];
              if (finalDoc) {
                setHtml(finalDoc);
              }
              onSuccess(finalDoc ?? contentResponse, prompt);

              return;
            }

            const chunk = decoder.decode(value, { stream: true });
            thinkResponse += chunk;
            if (selectedModel?.isThinker) {
              const thinkMatch = thinkResponse.match(/<think>[\s\S]*/)?.[0];
              if (thinkMatch && !thinkResponse?.includes("</think>")) {
                if ((contentThink?.length ?? 0) < 3) {
                  setOpenThink(true);
                }
                setThink(thinkMatch.replace("<think>", "").trim());
                contentThink += chunk;
                return read();
              }
            }

            contentResponse += chunk;

            const newHtml = contentResponse.match(
              /<!DOCTYPE html>[\s\S]*/
            )?.[0];
            if (newHtml) {
              setIsThinking(false);
              let partialDoc = newHtml;
              if (
                partialDoc.includes("<head>") &&
                !partialDoc.includes("</head>")
              ) {
                partialDoc += "\n</head>";
              }
              if (
                partialDoc.includes("<body") &&
                !partialDoc.includes("</body>")
              ) {
                partialDoc += "\n</body>";
              }
              if (!partialDoc.includes("</html>")) {
                partialDoc += "\n</html>";
              }

              // Throttle the re-renders to avoid flashing/flicker
              const now = performance.now();
              if (now - lastRenderTimeRef.current > 300) {
                setHtml(partialDoc);
                lastRenderTimeRef.current = now;
              }

              if (partialDoc.length > 200) {
                onScrollToBottom();
              }
            }
            read();
          };

          read();
        }
      }
    } catch (error: any) {
      setisAiWorking(false);
      toast.error(error.message);
      if (error.openLogin) {
        setOpen(true);
      }
    }
  };

  const stopController = () => {
    if (controller) {
      controller.abort();
      setController(null);
      setisAiWorking(false);
      setThink("");
      setOpenThink(false);
      setIsThinking(false);
    }
  };

  useUpdateEffect(() => {
    if (refThink.current) {
      refThink.current.scrollTop = refThink.current.scrollHeight;
    }
  }, [think]);

  useUpdateEffect(() => {
    if (!isThinking) {
      setOpenThink(false);
    }
  }, [isThinking]);

  const isSameHtml = useMemo(() => {
    return isTheSameHtml(html);
  }, [html]);

  // Site history handlers
  const handleSelectSite = (siteHtml: string, sitePrompt: string) => {
    setHtml(siteHtml);
    setPrompt(sitePrompt);
    setPreviousPrompt(sitePrompt);
    toast.success("Site loaded from history");
  };

  const handleSelectPromptOnly = (sitePrompt: string) => {
    setPrompt(sitePrompt);
  };

  return (
    <div className="px-3">
      <div className="relative bg-neutral-800 border border-neutral-700 rounded-2xl ring-[4px] focus-within:ring-neutral-500/30 focus-within:border-neutral-600 ring-transparent z-10 w-full group">
        {think && (
          <div className="w-full border-b border-neutral-700 relative overflow-hidden">
            <header
              className="flex items-center justify-between px-5 py-2.5 group hover:bg-neutral-600/20 transition-colors duration-200 cursor-pointer"
              onClick={() => {
                setOpenThink(!openThink);
              }}
            >
              <p className="text-sm font-medium text-neutral-300 group-hover:text-neutral-200 transition-colors duration-200">
                {isThinking ? "DeepSite is thinking..." : "DeepSite's plan"}
              </p>
              <ChevronDown
                className={classNames(
                  "size-4 text-neutral-400 group-hover:text-neutral-300 transition-all duration-200",
                  {
                    "rotate-180": openThink,
                  }
                )}
              />
            </header>
            <main
              ref={refThink}
              className={classNames(
                "overflow-y-auto transition-all duration-200 ease-in-out",
                {
                  "max-h-[0px]": !openThink,
                  "min-h-[250px] max-h-[250px] border-t border-neutral-700":
                    openThink,
                }
              )}
            >
              <p className="text-[13px] text-neutral-400 whitespace-pre-line px-5 pb-4 pt-3">
                {think}
              </p>
            </main>
          </div>
        )}
        {selectedElement && (
          <div className="px-4 pt-3">
            <SelectedHtmlElement
              element={selectedElement}
              isAiWorking={isAiWorking}
              onDelete={() => setSelectedElement(null)}
            />
          </div>
        )}
        <div className="w-full relative">
          {/* Custom Resize Handle */}
          <div 
            className={`w-full h-1 transition-all duration-200 relative group cursor-row-resize ${
              isManuallyResized 
                ? 'bg-gradient-to-r from-orange-500/40 to-red-500/40 hover:from-orange-500/60 hover:to-red-500/60' 
                : 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:from-blue-500/50 hover:to-purple-500/50'
            }`}
            title={isManuallyResized ? "Manual size locked. Double-click to reset to auto-resize" : "Drag up to expand, down to shrink. Double-click to reset to auto-resize"}
            onDoubleClick={() => {
              setIsManuallyResized(false);
              const textarea = document.querySelector('textarea');
              if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = Math.min(textarea.scrollHeight, window.innerHeight / 2) + 'px';
              }
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              const startY = e.clientY;
              const textarea = e.currentTarget.parentElement?.querySelector('textarea');
              const startHeight = textarea ? parseInt(getComputedStyle(textarea).height) : 52;
              
              const handleMouseMove = (e: MouseEvent) => {
                if (textarea) {
                  const deltaY = startY - e.clientY; // Inverted: moving up = positive = larger
                  const newHeight = Math.max(52, Math.min(window.innerHeight / 2, startHeight + deltaY));
                  textarea.style.height = `${newHeight}px`;
                  setIsManuallyResized(true); // Mark as manually resized
                }
              };
              
              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
              };
              
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
              document.body.style.cursor = 'row-resize';
              document.body.style.userSelect = 'none';
            }}
          >
            {/* Visual indicator dots */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            {isAiWorking && (
              <div className="absolute bg-neutral-800 rounded-lg bottom-0 left-4 w-[calc(100%-30px)] h-full z-1 flex items-center justify-between max-lg:text-sm">
                <div className="flex items-center justify-start gap-2">
                  <Loading overlay={false} className="!size-4" />
                  <p className="text-neutral-400 text-sm">
                    AI is {isThinking ? "thinking" : "coding"}...{" "}
                  </p>
                </div>
                <div
                  className="text-xs text-neutral-400 px-1 py-0.5 rounded-md border border-neutral-600 flex items-center justify-center gap-1.5 bg-neutral-800 hover:brightness-110 transition-all duration-200 cursor-pointer"
                  onClick={stopController}
                >
                  <FaStopCircle />
                  Stop generation
                </div>
              </div>
            )}
          <textarea
            disabled={isAiWorking}
            className={classNames(
              "w-full bg-transparent text-sm outline-none text-white placeholder:text-neutral-400 p-4 resize-none min-h-[52px] overflow-y-auto",
              {
                "!pt-2.5": selectedElement && !isAiWorking,
              }
            )}
            placeholder={
              selectedElement
                ? `Ask DeepSite about ${selectedElement.tagName.toLowerCase()}... (Shift+Enter for new line)`
                : hasAsked
                ? "Ask DeepSite for edits (Shift+Enter for new line)"
                : "Describe your website idea... (Example: 'Create a modern portfolio for a web developer') (Shift+Enter for new line)"
            }
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              // Auto-resize textarea only if not manually resized
              if (!isManuallyResized) {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, window.innerHeight / 2) + 'px';
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                callAi();
              }
            }}
            rows={1}
            style={{ height: '52px' }}
          />
          </div>
        </div>
        
        {/* Smart Recommendation Banner */}
        {showRecommendation && recommendation && !isFollowUp && (
          <div className="mx-4 mb-3 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Lightbulb className="size-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-blue-200 font-medium mb-1">
                  💡 Smart Recommendation
                </p>
                <p className="text-xs text-blue-300/80 mb-2">
                  {recommendation.reasoning}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    size="xs"
                    onClick={() => {
                      setPromptMode(recommendation.recommendedMode);
                      setShowRecommendation(false);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 h-auto"
                  >
                    Switch to {recommendation.recommendedMode === 'enhanced' ? '✨ Enhanced' : '⚡ Classic'}
                  </Button>
                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => setShowRecommendation(false)}
                    className="text-blue-400 hover:text-blue-300 text-xs py-1 px-2 h-auto"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between gap-2 px-4 pb-3">
          <div className="flex-1 flex items-center justify-start gap-1.5">
            <ReImagine onRedesign={(md) => callAi(md)} />
            <PromptHistory 
              onSelectPrompt={setPrompt}
              disabled={isAiWorking}
              currentStyle={selectedStyle as string}
              currentMode={promptMode}
            />
            <SiteHistory
              onSelectSite={handleSelectSite}
              onSelectPrompt={handleSelectPromptOnly}
              disabled={isAiWorking}
              currentStyle={selectedStyle as string}
              currentMode={promptMode}
            />
            {!isSameHtml && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="xs"
                    variant={isEditableModeEnabled ? "default" : "outline"}
                    onClick={() => {
                      setIsEditableModeEnabled?.(!isEditableModeEnabled);
                    }}
                    className={classNames("h-[28px]", {
                      "!text-neutral-400 hover:!text-neutral-200 !border-neutral-600 !hover:!border-neutral-500":
                        !isEditableModeEnabled,
                    })}
                  >
                    <Crosshair className="size-4" />
                    Edit
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  align="start"
                  className="bg-neutral-950 text-xs text-neutral-200 py-1 px-2 rounded-md -translate-y-0.5"
                >
                  Select an element on the page to ask DeepSite edit it
                  directly.
                </TooltipContent>
              </Tooltip>
            )}
            <InviteFriends />
          </div>
          <div className="flex items-center justify-end gap-2">
            {/* Style Selector */}
            <StyleSelector
              selectedStyle={selectedStyle as string}
              onStyleChange={setSelectedStyle}
              disabled={isAiWorking}
            />
            
            {/* Prompt Mode Indicator */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => setOpenProvider(true)}
                  className={classNames("h-[28px] text-xs", {
                    "!border-sky-500 !text-sky-400": promptMode === 'enhanced',
                    "!border-neutral-600 !text-neutral-400": promptMode === 'classic',
                  })}
                >
                  {promptMode === 'enhanced' ? '✨ Enhanced' : '⚡ Classic'}
                  {sectionMode && <span className="ml-1 text-green-400">📋</span>}
                </Button>
              </TooltipTrigger>
              <TooltipContent
                align="start"
                className="bg-neutral-950 text-xs text-neutral-200 py-1 px-2 rounded-md -translate-y-0.5"
              >
                {promptMode === 'enhanced' 
                  ? 'Enhanced mode: AI plans before implementing for better results'
                  : 'Classic mode: Direct generation for faster results'
                }
                {sectionMode && <><br />📋 Section-based structure enabled</>}
              </TooltipContent>
            </Tooltip>
            
            <Settings
              provider={provider as string}
              model={model as string}
              promptMode={promptMode}
              sectionMode={sectionMode}
              onChange={setProvider}
              onModelChange={setModel}
              onPromptModeChange={setPromptMode}
              onSectionModeChange={setSectionMode}
              open={openProvider}
              error={providerError}
              isFollowUp={!isSameHtml && isFollowUp}
              onClose={setOpenProvider}
            />
            <Button
              size="iconXs"
              disabled={isAiWorking || !prompt.trim()}
              onClick={() => callAi()}
            >
              <ArrowUp className="size-4" />
            </Button>
          </div>
        </div>
        <LoginModal open={open} onClose={() => setOpen(false)} html={html} />
        <ProModal
          html={html}
          open={openProModal}
          onClose={() => setOpenProModal(false)}
        />
        {!isSameHtml && (
          <div className="absolute top-0 right-0 -translate-y-[calc(100%+8px)] select-none text-xs text-neutral-400 flex items-center justify-center gap-2 bg-neutral-800 border border-neutral-700 rounded-md p-1 pr-2.5">
            <label
              htmlFor="diff-patch-checkbox"
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <Checkbox
                id="diff-patch-checkbox"
                checked={isFollowUp}
                onCheckedChange={(e) => {
                  if (e === true && !isSameHtml && selectedModel?.isThinker) {
                    setModel(MODELS[0].value);
                  }
                  setIsFollowUp(e === true);
                }}
              />
              Diff-Patch Update
            </label>
            <FollowUpTooltip />
          </div>
        )}
      </div>
      <audio ref={audio} id="audio" className="hidden">
        <source src="/success.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
