"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type ImageSelection = { src: string; alt: string };
type OpenImage = (image: ImageSelection) => void;

const ImageLightboxContext = createContext<OpenImage | null>(null);

type LightboxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function LightboxImage({ src, alt, sizes, priority = false, className }: LightboxImageProps) {
  const openImage = useContext(ImageLightboxContext);
  const buttonClass = className ? `lightbox-trigger ${className}` : "lightbox-trigger";

  return (
    <button
      type="button"
      className={buttonClass}
      aria-haspopup="dialog"
      aria-label={`View full image: ${alt}`}
      onClick={() => openImage?.({ src, alt })}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
    </button>
  );
}

export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<ImageSelection | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openImage = useCallback<OpenImage>((image) => setSelection(image), []);
  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selection && dialog && !dialog.open) dialog.showModal();
  }, [selection]);

  return (
    <ImageLightboxContext.Provider value={openImage}>
      {children}
      <dialog
        ref={dialogRef}
        className="lightbox-dialog"
        aria-labelledby="lightbox-title"
        onClose={() => setSelection(null)}
        onCancel={() => setSelection(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {selection && (
          <div className="lightbox__panel">
            <div className="lightbox__header">
              <h2 id="lightbox-title">FULL FRAME / PHOTO ARCHIVE</h2>
              <button type="button" className="lightbox__close" onClick={close}>
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="lightbox__media">
              <Image src={selection.src} alt={selection.alt} fill sizes="100vw" />
            </div>
            <p className="lightbox__caption">{selection.alt}</p>
          </div>
        )}
      </dialog>
    </ImageLightboxContext.Provider>
  );
}
