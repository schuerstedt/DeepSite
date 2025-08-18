import { HtmlHistory } from "@/types";
import { useState } from "react";

export const useEditor = (defaultHtml: string) => {
  /**
   * State to manage the HTML content of the editor.
   * This will be the main content that users edit.
   */
  const [html, setHtml] = useState(defaultHtml);
  /**
   * State to manage the history of HTML edits.
   * This will store previous versions of the HTML content along with metadata. (not saved to DB)
   */
  const [htmlHistory, setHtmlHistory] = useState<HtmlHistory[]>([]);

  /**
   * State to manage the prompts used for generating HTML content.
   * This can be used to track what prompts were used in the editor.
   */
  const [prompts, setPrompts] = useState<string[]>([]);

  return {
    html,
    setHtml,
    htmlHistory,
    setHtmlHistory,
    prompts,
    setPrompts,
  };
};
