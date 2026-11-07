"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { href: "#story", label: "Story" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#work", label: "Selected work" },
  { href: "#proof", label: "Proof" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none"><path d="M3 13 13 3M4 3h9v9" stroke="currentColor" strokeWidth="1.4" /></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none"><path d="M2.5 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.4" /></svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <a className="site-header__identity" href="#top" aria-label="Adi Midla, back to top">
          <span>ADI MIDLA</span>
          <small>PERSONAL ARCHIVE / 01</small>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <a className="site-header__contact" href="#contact">Let’s talk <Arrow diagonal /></a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? "CLOSE" : "MENU"}</span><i aria-hidden="true" />
        </button>
      </header>
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((link, index) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                <small>0{index + 1}</small><span>{link.label}</span><Arrow diagonal />
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}><small>05</small><span>Contact</span><Arrow diagonal /></a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
