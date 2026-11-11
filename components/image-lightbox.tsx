"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type LightboxSelection =
  | { kind: "image"; src: string; alt: string }
  | { kind: "pdf"; src: string; title: string };
type OpenLightbox = (selection: LightboxSelection) => void;

const ImageLightboxContext = createContext<OpenLightbox | null>(null);

type LightboxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function LightboxImage({ src, alt, sizes, priority = false, className }: LightboxImageProps) {
  const openLightbox = useContext(ImageLightboxContext);
  const buttonClass = className ? `lightbox-trigger ${className}` : "lightbox-trigger";

  return (
    <button
      type="button"
      className={buttonClass}
      aria-haspopup="dialog"
      aria-label={`View full image: ${alt}`}
      onClick={() => openLightbox?.({ kind: "image", src, alt })}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
    </button>
  );
}

type PdfPreviewButtonProps = {
  src: string;
  title: string;
  children: ReactNode;
  className: string;
};

export function PdfPreviewButton({ src, title, children, className }: PdfPreviewButtonProps) {
  const openLightbox = useContext(ImageLightboxContext);

  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      aria-label={`Open ${title} PDF preview`}
      onClick={() => openLightbox?.({ kind: "pdf", src, title })}
    >
      {children}
    </button>
  );
}

export function ResumePreview() {
  return (
    <PdfPreviewButton
      src="/My-Resume.pdf"
      title="My Resume"
      className="resume-note resume-trigger"
    >
      <i aria-hidden="true" />
      <span>My Resume</span>
      <span aria-hidden="true">↗</span>
    </PdfPreviewButton>
  );
}

export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<LightboxSelection | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openLightbox = useCallback<OpenLightbox>((nextSelection) => setSelection(nextSelection), []);
  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selection && dialog && !dialog.open) dialog.showModal();
  }, [selection]);

  return (
    <ImageLightboxContext.Provider value={openLightbox}>
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
              <h2 id="lightbox-title">
                {selection.kind === "pdf" ? `${selection.title.toUpperCase()} / PDF PREVIEW` : "FULL FRAME / PHOTO ARCHIVE"}
              </h2>
              <div className="lightbox__actions">
                {selection.kind === "pdf" && (
                  <a className="lightbox__open" href={selection.src} target="_blank" rel="noreferrer">
                    Open PDF <span aria-hidden="true">↗</span>
                  </a>
                )}
                <button type="button" className="lightbox__close" onClick={close}>
                  Close <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className={`lightbox__media${selection.kind === "pdf" ? " lightbox__media--pdf" : ""}`}>
              {selection.kind === "pdf" ? (
                <iframe src={selection.src} title={`${selection.title} PDF preview`} />
              ) : (
                <Image src={selection.src} alt={selection.alt} fill sizes="100vw" />
              )}
            </div>
            <p className="lightbox__caption">
              {selection.kind === "pdf" ? "Use the PDF viewer controls to read or download this document." : selection.alt}
            </p>
          </div>
        )}
      </dialog>
    </ImageLightboxContext.Provider>
  );
}
