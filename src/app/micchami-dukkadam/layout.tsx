import type { Metadata } from "next";
import { Instrument_Serif, Tiro_Devanagari_Hindi } from "next/font/google";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://adityajain-os.vercel.app"),
};

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-md-serif",
  display: "swap",
});

const tiroDevanagari = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-md-devanagari",
  display: "swap",
});

export default function MicchamiDukkadamLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={`${instrumentSerif.variable} ${tiroDevanagari.variable} min-h-dvh bg-[#f6f1e8] text-[#2a2622]`}>
      <style>{`body { background: #f6f1e8 !important; color: #2a2622 !important; }`}</style>
      {children}
    </div>
  );
}
