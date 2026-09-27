"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  IntoView,
  StoryButton,
  hindiSerif,
  prefersReducedMotion,
  serif,
  storyAction,
  storyFace,
  usePrefersReducedMotion,
  type StoryLang,
} from "./ui";

const copy = {
  en: {
    body: "Today, millions of Jains use these words to ask forgiveness for harm they may have caused — knowingly or unknowingly.",
    contrast: "Micchami Dukkadam ≠ just “Sorry.”",
    ask: "What does it really mean?",
    continue: "CONTINUE →",
    meanings: ["I REFLECT.", "I ACKNOWLEDGE.", "I ASK FORGIVENESS.", "I TRY TO DO BETTER."],
  },
  hi: {
    body: "आज करोड़ों जैन इन शब्दों से क्षमा माँगते हैं — उस पीड़ा के लिए जो उन्होंने जानकर या अनजाने में पहुँचाई हो।",
    contrast: "Micchami Dukkadam ≠ सिर्फ़ “माफ़ कीजिए।”",
    ask: "इसका असल मतलब क्या है?",
    continue: "आगे →",
    meanings: ["मनन करना।", "स्वीकार करना।", "क्षमा माँगना।", "बेहतर बनने की कोशिश करना।"],
  },
} as const;

export function StageReveal({ onNext, lang }: { onNext: () => void; lang: StoryLang }) {
  const reduce = usePrefersReducedMotion();
  const [asked, setAsked] = useState(false);
  const [visible, setVisible] = useState(0);
  const text = copy[lang];
  const type = storyFace(lang);

  useEffect(() => {
    if (!asked || prefersReducedMotion()) {
      return;
    }

    if (visible === 0 || visible >= text.meanings.length) {
      return;
    }

    const id = window.setTimeout(() => {
      setVisible((current) => Math.min(text.meanings.length, current + 1));
    }, 700);

    return () => window.clearTimeout(id);
  }, [asked, text.meanings.length, visible]);

  return (
    <div className="text-center">
      <h1
        data-stage-title=""
        tabIndex={-1}
        className={`${serif} text-balance text-[2.4rem] leading-none tracking-tight text-[#2a2622] outline-none sm:text-6xl`}
      >
        Micchami Dukkadam
      </h1>
      <p className={`mx-auto mt-8 max-w-md text-pretty text-[17px] leading-relaxed text-[#5e574e] ${lang === "hi" ? hindiSerif : ""}`}>
        {text.body}
      </p>
      <p className={`${type} mt-8 text-balance text-xl text-[#2a2622] sm:text-2xl`}>
        {text.contrast}
      </p>

      {!asked ? (
        <div className="mt-10 flex justify-center">
          <StoryButton
            tracked={false}
            className={lang === "hi" ? hindiSerif : undefined}
            onClick={() => {
              setAsked(true);
              setVisible(prefersReducedMotion() ? text.meanings.length : 1);
            }}
          >
            {text.ask}
          </StoryButton>
        </div>
      ) : (
        <div className="mt-10">
          <ul className="space-y-3">
            {text.meanings.slice(0, visible).map((line, index) => (
              <motion.li
                key={index}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.45 }}
                className={`${type} text-2xl text-[#2a2622] sm:text-3xl ${lang === "en" ? "tracking-wide" : ""}`}
              >
                {line}
              </motion.li>
            ))}
          </ul>
          {visible >= text.meanings.length ? (
            <IntoView className="mt-10 flex justify-center">
              <StoryButton onClick={onNext} {...storyAction(lang)}>
                {text.continue}
              </StoryButton>
            </IntoView>
          ) : null}
        </div>
      )}
    </div>
  );
}
