import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { SITE } from "@/lib/constants";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zenia Álvarez Gulfo | Psicóloga clínica en Montería",
    template: "%s | Zenia Álvarez Gulfo",
  },
  description:
    "Acompañamiento psicológico profesional para ansiedad y depresión, con terapias de tercera generación como mindfulness y ACT, en Montería y modalidad virtual.",
  keywords: [
    "psicóloga en Montería",
    "psicóloga clínica Montería",
    "terapia para ansiedad Montería",
    "psicóloga para depresión Montería",
    "mindfulness Montería",
    "ACT Montería",
    "terapia psicológica Montería",
    "psicóloga virtual Colombia",
  ],
  authors: [{ name: "Zenia Álvarez Gulfo" }],
  creator: "Zenia Álvarez Gulfo",
  metadataBase: new URL("https://zenia-web.vercel.app"),
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Zenia Álvarez Gulfo - Psicóloga clínica",
    title: "Zenia Álvarez Gulfo | Psicóloga clínica en Montería",
    description:
      "Acompañamiento psicológico profesional para ansiedad y depresión, con terapias de tercera generación como mindfulness y ACT.",
    images: [
      {
        url: "/images/hero-zenia.webp",
        width: 1200,
        height: 630,
        alt: "Zenia Álvarez Gulfo - Psicóloga clínica en Montería",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenia Álvarez Gulfo | Psicóloga clínica en Montería",
    description:
      "Acompañamiento psicológico profesional para ansiedad y depresión, con terapias de tercera generación como mindfulness y ACT.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${instrumentSerif.variable} ${inter.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Psychologist", "LocalBusiness"],
              name: SITE.name,
              jobTitle: SITE.profession,
              image: "/images/hero-zenia.webp",
              url: "https://zenia-web.vercel.app",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Cra 19 #10-25 Centro",
                addressLocality: "Montería",
                addressRegion: "Córdoba",
                addressCountry: "CO",
              },
              areaServed: {
                "@type": "City",
                name: "Montería",
              },
              knowsAbout: [
                "Ansiedad",
                "Depresión",
                "Mindfulness",
                "Terapia ACT",
                "Terapias de tercera generación",
              ],
              priceRange: "$$",
              telephone: SITE.phone,
              email: SITE.email,
              openingHours: "Mo-Fr 08:00-18:00",
              sameAs: [
                `https://wa.me/${SITE.phone}`,
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-sage-dark focus:px-4 focus:py-3 focus:font-medium focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-sage-dark"
        >
          Saltar al contenido principal
        </a>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#ede6dc",
              border: "1px solid #ddd2c2",
              color: "#2c3e50",
              fontFamily: "var(--font-sans)",
            },
          }}
          richColors
          closeButton
        />
        {children}
      </body>
    </html>
  );
}
