"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import {
  Reveal,
  StoryButton,
  hindiSerif,
  storyAction,
  storyFace,
  usePrefersReducedMotion,
  type StoryLang,
} from "./ui";

const CHOICES = [
  {
    id: "harsh",
    en: "I was too harsh with someone",
    hi: "किसी के साथ बहुत सख्ती हो गई",
  },
  {
    id: "unmeant",
    en: "I said something I didn't mean",
    hi: "ऐसी बात कह दी जो मन से नहीं थी",
  },
  {
    id: "listen",
    en: "I didn't listen when I should have",
    hi: "जब सुनना चाहिए था, नहीं सुना",
  },
  {
    id: "understanding",
    en: "I could have been more understanding",
    hi: "और समझदारी दिखाई जा सकती थी",
  },
  {
    id: "regret",
    en: "I regret something I did",
    hi: "कुछ ऐसा किया जिसका पछतावा है",
  },
  {
    id: "else",
    en: "Something else",
    hi: "कुछ और",
  },
] as const;

const copy = {
  en: {
    title: "Now, your turn.",
    intro: "Think of one moment this year you wish you had handled differently.",
    prompt: "What would you have done differently?",
    reflect: "REFLECT",
    acknowledged: "You don't have to explain it.",
    note: "Sometimes acknowledging a mistake is the first step toward changing it.",
    next: "ONE LAST THING →",
  },
  hi: {
    title: "अब, आपकी बारी।",
    intro: "इस साल के एक पल को याद कीजिए, जिसे आप अलग तरह से निभाना चाहते।",
    prompt: "आप क्या अलग कर सकते थे?",
    reflect: "सोचिए",
    acknowledged: "आपको इसे समझाने की ज़रूरत नहीं।",
    note: "कभी-कभी गलती को मान लेना ही उसे बदलने का पहला कदम होता है।",
    next: "एक आख़िरी बात →",
  },
} as const;

export function StageReflect({ onNext, lang }: { onNext: () => void; lang: StoryLang }) {
  const reduce = usePrefersReducedMotion();
  const [choice, setChoice] = useState<(typeof CHOICES)[number]["id"] | null>(null);
  const [done, setDone] = useState(false);
  const text = copy[lang];
  const type = storyFace(lang);
  const body = lang === "hi" ? hindiSerif : "";

  return (
    <div className="text-center">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="acknowledged"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.45 }}
          >
            <h1
              data-stage-title=""
              tabIndex={-1}
              className={`${type} text-balance text-3xl leading-tight text-[#2a2622] outline-none sm:text-4xl`}
            >
              {text.acknowledged}
            </h1>
            <Reveal delay={0.35}>
              <p className={`mx-auto mt-6 max-w-md text-pretty text-[17px] leading-relaxed text-[#5e574e] ${body}`}>
                {text.note}
              </p>
            </Reveal>
            <Reveal delay={0.7} className="mt-10 flex justify-center">
              <StoryButton onClick={onNext} {...storyAction(lang)}>
                {text.next}
              </StoryButton>
            </Reveal>
          </motion.div>
        ) : (
          <motion.div
            key="ask"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
          >
            <h1
              data-stage-title=""
              tabIndex={-1}
              className={`${type} text-balance text-4xl leading-tight text-[#2a2622] outline-none sm:text-5xl`}
            >
              {text.title}
            </h1>
            <p className={`mx-auto mt-6 max-w-md text-pretty text-[17px] leading-relaxed text-[#5e574e] ${body}`}>
              {text.intro}
            </p>
            <p
              id="reflect-prompt"
              className={`mx-auto mt-8 max-w-md text-pretty text-[17px] leading-relaxed text-[#2a2622] ${body}`}
            >
              {text.prompt}
            </p>
            <div
              role="radiogroup"
              aria-labelledby="reflect-prompt"
              className="mx-auto mt-4 flex max-w-md flex-col gap-2 sm:mt-5 sm:gap-2.5"
            >
              {CHOICES.map((option) => {
                const selected = choice === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setChoice(option.id)}
                    className={`w-full cursor-pointer rounded-2xl border px-4 py-3 text-center text-[15px] leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c7044] sm:py-3.5 sm:text-base ${body} ${
                      selected
                        ? "border-[#8c7044] bg-white text-[#2a2622] shadow-[inset_0_0_0_1px_#8c7044]"
                        : "border-[#2a2622]/12 bg-white/45 text-[#2a2622] hover:border-[#8c7044]/40 hover:bg-white/80"
                    }`}
                  >
                    {option[lang]}
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex justify-center">
              <StoryButton
                onClick={() => {
                  if (!choice) {
                    return;
                  }
                  setDone(true);
                }}
                disabled={!choice}
                {...storyAction(lang)}
              >
                {text.reflect}
              </StoryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
