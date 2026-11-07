import type { Metadata } from "next";
import Script from "next/script";
import { ImageLightboxProvider } from "@/components/image-lightbox";
import { SiteLoader } from "@/components/site-loader";
import { profile } from "@/data/portfolio";
import { IBM_Plex_Mono, Instrument_Serif, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.scss";

const monoFont = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-ibm-plex-mono", display: "swap", preload: false });
const serifFont = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif", display: "swap", preload: false });
const bodyFont = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap", preload: false });
const displayFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap", preload: false });

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
    image: `${siteUrl}/images/adi-speaking.jpg`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${monoFont.variable} ${serifFont.variable} ${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Script id="person-schema" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(profileData)}
        </Script>
        <ImageLightboxProvider>{children}</ImageLightboxProvider>
        <SiteLoader />
      </body>
    </html>
  );
}
