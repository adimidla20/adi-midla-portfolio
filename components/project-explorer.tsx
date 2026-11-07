"use client";

import { Children, isValidElement, useState, type ReactNode } from "react";

const filters = [
  { value: "all", label: "All work" },
  { value: "software", label: "Software" },
  { value: "interactive", label: "Games & XR" },
  { value: "planning", label: "Student life" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

export function ProjectExplorer({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<FilterValue>("all");
  const cards = Children.toArray(children).filter(isValidElement);
  const visibleCards = cards.filter((card) => {
    const kind = (card.props as { "data-project-kind"?: string })["data-project-kind"];
    return filter === "all" || kind === filter;
  });
  const label = filters.find((item) => item.value === filter)?.label ?? "All work";

  return (
    <div className="project-explorer">
      <div className="project-filters" role="group" aria-label="Filter projects">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            className={filter === item.value ? "project-filter is-active" : "project-filter"}
            aria-pressed={filter === item.value}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visibleCards.map((card) => card)}
      </div>
      <p className="sr-only" aria-live="polite">Showing {visibleCards.length} projects in {label}.</p>
    </div>
  );
}
