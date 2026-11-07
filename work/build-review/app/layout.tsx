import type { Metadata } from "next";
import Script from "next/script";
import { profile } from "@/data/portfolio";
import "./globals.scss";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adi Midla — From curiosity to code",
    template: "%s — Adi Midla",
  },
  description:
    "Adi Midla is a Computer Science student at VIT Bhopal University exploring software, gaming technology, XR, and interactive experiences.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Adi Midla — From curiosity to code",
    description:
      "A personal archive of projects, experiments, and the journey from ideas to interactive experiences.",
    images: [{ url: "/images/adi-speaking.jpg", width: 759, height: 1048, alt: "Adi Midla speaking at an event" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adi Midla — From curiosity to code",
    description: "Computer Science student exploring software, gaming technology, XR, and interactive experiences.",
    images: ["/images/adi-speaking.jpg"],
  },
  robots: { index: true, follow: true },
};

const profileData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Adi Midla — Personal Portfolio",
  description: "Computer Science student exploring software, gaming technology, and interactive experiences.",
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    email: profile.email,
    description: `${profile.year} ${profile.degree} student at ${profile.university}.`,
    affiliation: { "@type": "CollegeOrUniversity", name: profile.university },
    knowsAbout: ["C++", "Python", "Java", "Data structures and algorithms", "Software engineering", "Unity", "Game development", "XR", "Virtual reality", "Web development", "Artificial intelligence"],
    sameAs: [profile.github, profile.linkedin],
    image: `${siteUrl}/images/adi-portrait.jpg`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Script id="person-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(profileData)}
        </Script>
        {children}
      </body>
    </html>
  );
}
