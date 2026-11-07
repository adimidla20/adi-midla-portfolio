"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

function PhysicsLabPlaceholder() {
  return (
    <div className="physics-lab-placeholder" aria-hidden="true">
      <div className="physics-lab-placeholder__plot">
        <div className="physics-lab-placeholder__graph" />
      </div>
      <div className="physics-lab-placeholder__controls">
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

const PhysicsLab = dynamic(
  () => import("@/components/physics-lab").then((module) => module.PhysicsLab),
  { ssr: false, loading: PhysicsLabPlaceholder },
);

export function DeferredPhysicsLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {shouldLoad ? <PhysicsLab /> : <PhysicsLabPlaceholder />}
    </div>
  );
}
