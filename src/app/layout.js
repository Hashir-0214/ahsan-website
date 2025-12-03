// app/layout.js 

import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://ahsan.sabeelulhidaya.info";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AHSAn Students Union – Sabeelul Hidaya Islamic College",
    template: "%s | AHSAn Students Union",
  },
  description:
    "Official website of AHSAn Students Union at Sabeelul Hidaya Islamic College, Parappur, Kottakkal, Malappuram (affiliated to Darul Huda Islamic University, Hudawi graduation). News, events, activities, and student initiatives.",
  keywords: [
    "AHSAn",
    "Students Union",
    "Sabeelul Hidaya Islamic College",
    "Parappur",
    "Kottakkal",
    "Malappuram",
    "Darul Huda Islamic University",
    "Hudawi",
    "student activities",
    "ahsan parappur",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "AHSAn Students Union - Sabeelul Hidaya Islamic College",
    description:
      "Official AHSAn Students Union website of Sabeelul Hidaya Islamic College, Parappur, Kottakkal, Malappuram.",
    siteName: "AHSAn Students Union",
    locale: "en_IN",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "AHSAn Students Union - Sabeelul Hidaya Islamic College",
      },
    ],
  },
  verification: {
    google: "gNoxfU6z9VxyKeCyCK6DI5zGOs9K7gaPYJYORPg9SNo",
  },
  twitter: {
    card: "summary_large_image",
    title: "AHSAn Students Union  Sabeelul Hidaya Islamic College",
    description:
      "Official AHSAn Students Union website of Sabeelul Hidaya Islamic College, Parappur, Kottakkal, Malappuram.",
    images: ["/assets/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
