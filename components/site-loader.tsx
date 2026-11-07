"use client";

import { useEffect, useState } from "react";

const MINIMUM_DISPLAY_MS = 420;
const MAXIMUM_DISPLAY_MS = 1150;

export function SiteLoader() {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsDone(true);
      return;
    }

    const startedAt = performance.now();
    let completed = false;
    let active = true;
    let maximumTimer = 0;
    let finishTimer = 0;
    let removeImageListeners = () => {};

    const finish = () => {
      if (completed || !active) return;
      completed = true;
      window.clearTimeout(maximumTimer);
      finishTimer = window.setTimeout(
        () => setIsDone(true),
        Math.max(0, MINIMUM_DISPLAY_MS - (performance.now() - startedAt)),
      );
    };

    maximumTimer = window.setTimeout(finish, MAXIMUM_DISPLAY_MS);

    const image = document.querySelector<HTMLImageElement>(".hero__portrait img");
    const imageReady = image && !image.complete
      ? new Promise<void>((resolve) => {
          const onReady = () => resolve();
          image.addEventListener("load", onReady, { once: true });
          image.addEventListener("error", onReady, { once: true });
          removeImageListeners = () => {
            image.removeEventListener("load", onReady);
            image.removeEventListener("error", onReady);
          };
        })
      : Promise.resolve();
    const fontsReady = document.fonts?.ready.then(() => undefined).catch(() => undefined) ?? Promise.resolve();

    Promise.all([imageReady, fontsReady]).then(finish);

    return () => {
      window.clearTimeout(maximumTimer);
      window.clearTimeout(finishTimer);
      removeImageListeners();
    };
  }, []);

  return (
    <div className={`site-loader${isDone ? " is-done" : ""}`} aria-hidden="true">
      <div className="site-loader__top">
        <strong>ADI MIDLA</strong>
        <span>PERSONAL ARCHIVE / 01</span>
      </div>
      <div className="site-loader__center">
        <span className="site-loader__label">PORTFOLIO · 2026</span>
        <p>PLEASE <em>WAIT</em></p>
      </div>
      <div className="site-loader__bottom">
        <span>FROM CURIOSITY TO CODE</span>
        <span>LOADING</span>
        <div className="site-loader__track"><i /></div>
      </div>
    </div>
  );
}