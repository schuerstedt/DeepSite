"use client";

import { useState } from "react";

export interface AssetCard {
  title: string;
  text: string;
  summary: string;
  tags: string[];
  vector: number[];
}

export default function ResearchMode() {
  const [cards, setCards] = useState<AssetCard[]>([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name);
      const res = await fetch("/api/rack/ingest", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const card = await res.json();
        setCards((prev) => [...prev, card]);
      }
    }
  };

  const accept = async (card: AssetCard) => {
    await fetch("/api/rack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });
    setCards((prev) => prev.filter((c) => c !== card));
  };

  const reject = (card: AssetCard) => {
    setCards((prev) => prev.filter((c) => c !== card));
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        multiple
        accept=".pdf,.ppt,.pptx,.doc,.docx"
        onChange={handleUpload}
        className="block"
      />
      <div className="grid gap-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="border rounded p-4 bg-neutral-900 text-neutral-100"
          >
            <h3 className="font-semibold">{card.title}</h3>
            <p className="text-sm mt-2">{card.summary}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-neutral-800 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => accept(card)}
                className="px-3 py-1 bg-green-600 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => reject(card)}
                className="px-3 py-1 bg-red-600 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
