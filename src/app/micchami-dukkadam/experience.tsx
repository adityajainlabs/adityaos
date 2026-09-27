"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { StageBoth } from "./stage-both";
import { StageClose } from "./stage-close";
import { StageHook } from "./stage-hook";
import { StageReflect } from "./stage-reflect";
import { StageReveal } from "./stage-reveal";
import { LangToggle, stageMotion, usePrefersReducedMotion, type StoryLang } from "./ui";

const TOTAL = 5;

export function Experience() {
  const [stage, setStage] = useState(0);
  const [session, setSession] = useState(0);
  const [lang, setLang] = useState<StoryLang>("hi");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const scroller = scrollerRef.current;
    scroller?.scrollTo({ top: 0 });

    const id = window.setTimeout(() => {
      scroller?.querySelector<HTMLElement>("[data-stage-title]")?.focus({ preventScroll: true });
    }, reduce ? 40 : 520);

    return () => window.clearTimeout(id);
  }, [stage, session, reduce]);

  const stepLabel = `${String(stage + 1).padStart(2, "0")} / 0${TOTAL}`;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#f6f1e8] text-[#2a2622] [color-scheme:light]">
      <header className="flex items-start justify-between gap-4 px-5 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8">
        <div className="min-w-0">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-[13px] text-[#6d655c] transition-colors hover:text-[#2a2622]"
          >
            ← Aditya OS
          </Link>
          <p className="pb-3 text-[11px] tracking-[0.22em] text-[#8c7044]">MICCHAMI DUKKADAM</p>
        </div>
        <p
          className="pt-3.5 text-[12px] tracking-[0.14em] text-[#8a8176] tabular-nums"
          aria-label={`Step ${stage + 1} of ${TOTAL}`}
        >
          {stepLabel}
        </p>
      </header>

      <div
        ref={scrollerRef}
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
      >
        <div
            className={`mx-auto flex min-h-full w-full max-w-xl flex-col justify-start px-6 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 ${stage === 4 ? "pt-4 sm:pt-10" : "pt-8 sm:pt-16"}`}
            lang={lang}
          >
          <LangToggle
            lang={lang}
            onToggle={() => setLang((current) => (current === "en" ? "hi" : "en"))}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={`${session}-${stage}`}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: stageMotion.ease }}
            >
              {stage === 0 ? <StageHook lang={lang} onNext={() => setStage(1)} /> : null}
              {stage === 1 ? <StageReveal lang={lang} onNext={() => setStage(2)} /> : null}
              {stage === 2 ? <StageReflect lang={lang} onNext={() => setStage(3)} /> : null}
              {stage === 3 ? <StageBoth lang={lang} onNext={() => setStage(4)} /> : null}
              {stage === 4 ? (
                <StageClose
                  lang={lang}
                  onAgain={() => {
                    setStage(0);
                    setSession((current) => current + 1);
                  }}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
