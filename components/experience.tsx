"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/animations/gsap";
import Lenis from "lenis";

export function Experience() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    const progress = document.querySelector<HTMLElement>(".reading-progress");

    if (reduced) {
      gsap.set(revealTargets, { clearProps: "all" });
      return;
    }

    revealTargets.forEach((element) => {
      gsap.fromTo(element, { y: 24, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.72,
        ease: "power2.out",
        scrollTrigger: { trigger: element, start: "top 88%", once: true },
      });
    });

    if (progress) {
      gsap.fromTo(progress, { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true },
      });
    }


    const glowTargets = gsap.utils.toArray<HTMLElement>("[data-scroll-glow]");
    const restoreGlowMarkup: Array<() => void> = [];

    glowTargets.forEach((target) => {
      const originalMarkup = target.innerHTML;
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

      textNodes.forEach((textNode) => {
        const fragment = document.createDocumentFragment();
        (textNode.textContent ?? "").split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.append(document.createTextNode(part));
            return;
          }
          const word = document.createElement("span");
          word.className = "scroll-glow-word";
          word.textContent = part;
          fragment.append(word);
        });
        textNode.replaceWith(fragment);
      });

      const words = target.querySelectorAll<HTMLElement>(".scroll-glow-word");
      if (!words.length) return;

      gsap.fromTo(words,
        { color: "rgba(167, 169, 172, .48)", textShadow: "0 0 0 rgba(242, 166, 90, 0)" },
        {
          color: "#e8e4dc",
          textShadow: "0 0 13px rgba(242, 166, 90, .3)",
          stagger: { each: 0.055 },
          ease: "none",
          scrollTrigger: { trigger: target, start: "top 78%", end: "bottom 30%", scrub: 0.45 },
        },
      );
      restoreGlowMarkup.push(() => { target.innerHTML = originalMarkup; });
    });

    return () => restoreGlowMarkup.forEach((restore) => restore());
  }, { scope, dependencies: [] });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ autoRaf: false, anchors: true, smoothWheel: true, syncTouch: false });
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.removeEventListener("load", refresh);
    };
  }, []);

  return <div className="experience-controls" ref={scope} aria-hidden="true"><div className="reading-progress" /></div>;
}
