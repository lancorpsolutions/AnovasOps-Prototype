"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import type { FaqSection } from "@/lib/faq-data";

export function FaqTabs({ sections }: { sections: FaqSection[] }) {
  const [activeId, setActiveId] = useState(sections[0].id);
  const active = sections.find((s) => s.id === activeId) ?? sections[0];

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
              activeId === s.id
                ? "bg-orange text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {s.title}
          </button>
        ))}
      </div>

      <FaqAccordion items={active.items} />
    </div>
  );
}
