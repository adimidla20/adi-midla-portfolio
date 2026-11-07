"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/animations/gsap";
import Lenis from "lenis";
import { animate } from "animejs";

export function Experience() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const introTargets = gsap.utils.toArray<HTMLElement>("[data-intro]");
    const revealTargets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    const progress = document.querySelector<HTMLElement>(".reading-progress");

    if (reduced) {
      gsap.set([...introTargets, ...revealTargets], { clearProps: "all" });
      return;
    }

    if (introTargets.length) {
      gsap.fromTo(introTargets, { y: 20, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.12,
      });
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

    const orbitLabel = document.querySelector<HTMLElement>("[data-anime-intro]");
    const animeIntro = orbitLabel
      ? animate(orbitLabel, { opacity: [0, 1], translateY: [8, 0], duration: 680, ease: "outQuart", delay: 480 })
      : null;

    return () => animeIntro?.pause();
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
