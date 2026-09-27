import { MicchamiOgImage, ogAlt, ogContentType, ogSize } from "./og-card";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return MicchamiOgImage();
}
