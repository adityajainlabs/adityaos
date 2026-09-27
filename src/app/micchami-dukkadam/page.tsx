import type { Metadata } from "next";

import { Experience } from "./experience";

const title = "Micchami Dukkadam — A Digital Experience";
const description =
  "A short interactive experience exploring reflection, forgiveness and growth through the Jain tradition of Micchami Dukkadam.";

export const metadata: Metadata = {
  metadataBase: new URL("https://adityajain-os.vercel.app"),
  title,
  description,
  alternates: {
    canonical: "/micchami-dukkadam",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/micchami-dukkadam",
    siteName: "Aditya OS",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function MicchamiDukkadamPage() {
  return <Experience />;
}
