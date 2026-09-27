"use client";

import { motion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

export const serif = "[font-family:var(--font-md-serif),Georgia,serif]";

export const hindiSerif = "[font-family:var(--font-md-devanagari),serif]";

export type StoryLang = "en" | "hi";

export function storyFace(lang: StoryLang) {
  return lang === "hi" ? hindiSerif : serif;
}

export function storyAction(lang: StoryLang) {
  return {
    tracked: lang !== "hi",
    className: lang === "hi" ? hindiSerif : undefined,
  };
}

const ease = [0.22, 1, 0.36, 1] as const;

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function readReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function serverReducedMotion() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, readReducedMotion, serverReducedMotion);
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useBeat(total: number, stepMs = 650) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (count >= total) {
      return;
    }

    const id = window.setTimeout(() => {
      setCount((current) =>
        prefersReducedMotion() ? total : Math.min(total, current + 1),
      );
    }, prefersReducedMotion() ? 0 : stepMs);

    return () => window.clearTimeout(id);
  }, [count, stepMs, total]);

  return count;
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.7,
        delay: reduce ? 0 : delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

const buttonBase =
  "inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full px-8 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8c7044] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto";

const solidButton = `${buttonBase} bg-[#2a2622] text-[#f6f1e8] hover:bg-[#3d3833]`;

const quietButton = `${buttonBase} border border-[#2a2622]/20 bg-transparent text-[#2a2622] hover:bg-[#2a2622]/5`;

const trackedType = "text-[12px] tracking-[0.18em]";
const sentenceType = "text-[15px] tracking-normal";

export function StoryButton({
  children,
  tone = "solid",
  tracked = true,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "solid" | "quiet";
  tracked?: boolean;
}) {
  const tracking = tracked ? trackedType : sentenceType;

  return (
    <button
      type="button"
      className={`${tone === "solid" ? solidButton : quietButton} ${tracking} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function IntoView({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({
      block: "nearest",
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export const storyLinkClass = `${solidButton} ${trackedType}`;

export function storyLinkClassFor(lang: StoryLang) {
  if (lang === "hi") {
    return `${solidButton} ${sentenceType} ${hindiSerif}`;
  }

  return storyLinkClass;
}

export function LangToggle({ lang, onToggle }: { lang: StoryLang; onToggle: () => void }) {
  const hindi = lang === "hi";

  return (
    <div className="mb-8 flex justify-center">
      <button
        type="button"
        onClick={onToggle}
        aria-label={hindi ? "Read this experience in English" : "Read this experience in Hindi"}
        className={`inline-flex min-h-11 items-center text-[13px] text-[#8c7044] underline-offset-4 transition-colors hover:text-[#2a2622] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8c7044] ${hindi ? "" : hindiSerif}`}
      >
        {hindi ? "English" : "हिंदी"}
      </button>
    </div>
  );
}

export function DownMark() {
  return (
    <span aria-hidden="true" className="block py-2 text-[11px] leading-none text-[#8c7044]">
      ↓
    </span>
  );
}

export const stageMotion = {
  ease,
};
