"use client";

import { Reveal, StoryButton, storyAction, storyFace, useBeat, type StoryLang } from "./ui";

const copy = {
  en: {
    title: "Have you ever hurt someone without realizing it?",
    line: "What if saying sorry was only the beginning?",
    action: "FIND OUT",
  },
  hi: {
    title: "क्या आपने कभी अनजाने में किसी को ठेस पहुँचाई है?",
    line: "अगर माफ़ी माँगना सिर्फ़ शुरुआत हो?",
    action: "जानिए",
  },
} as const;

export function StageHook({ onNext, lang }: { onNext: () => void; lang: StoryLang }) {
  const beat = useBeat(3, 1200);
  const text = copy[lang];
  const type = storyFace(lang);

  return (
    <div className="text-center">
      <h1
        data-stage-title=""
        tabIndex={-1}
        className={`${type} text-balance text-[2rem] leading-[1.15] text-[#2a2622] outline-none sm:text-5xl`}
      >
        {text.title}
      </h1>
      {beat >= 2 ? (
        <Reveal>
          <p className={`${type} mx-auto mt-8 max-w-md text-balance text-xl italic leading-snug text-[#5e574e] sm:text-2xl`}>
            {text.line}
          </p>
        </Reveal>
      ) : null}
      {beat >= 3 ? (
        <Reveal className="mt-12 flex justify-center">
          <StoryButton onClick={onNext} {...storyAction(lang)}>
            {text.action}
          </StoryButton>
        </Reveal>
      ) : null}
    </div>
  );
}
