"use client";

import { IntoView, Reveal, StoryButton, hindiSerif, serif, storyAction, storyFace, useBeat, type StoryLang } from "./ui";

const copy = {
  en: {
    title: "In Jain tradition, forgiveness goes both ways.",
    ask: "May I be forgiven for anything I may have done.",
    forgive: "I forgive all living beings.",
    continue: "CONTINUE →",
  },
  hi: {
    title: "जैन परंपरा में क्षमा दोनों ओर होती है।",
    ask: "जो कुछ मैंने किया हो, उसके लिए मुझे क्षमा मिले।",
    forgive: "सभी जीवों के लिए क्षमा।",
    continue: "आगे →",
  },
} as const;

export function StageBoth({ onNext, lang }: { onNext: () => void; lang: StoryLang }) {
  const beat = useBeat(4, 560);
  const text = copy[lang];
  const type = storyFace(lang);

  return (
    <div className="text-center">
      <h1
        data-stage-title=""
        tabIndex={-1}
        className={`${type} text-balance text-3xl leading-tight text-[#2a2622] outline-none sm:text-4xl`}
      >
        {text.title}
      </h1>
      {beat >= 2 ? (
        <Reveal>
          <div className="mx-auto mt-10 max-w-md">
            <p className={`${serif} text-2xl text-[#2a2622]`}>Micchami Dukkadam</p>
            <p className={`mt-3 text-pretty text-[17px] leading-relaxed text-[#5e574e] ${lang === "hi" ? hindiSerif : ""}`}>
              {text.ask}
            </p>
          </div>
        </Reveal>
      ) : null}
      {beat >= 3 ? (
        <Reveal>
          <div className="mx-auto mt-8 max-w-md">
            <p className={`${serif} text-2xl text-[#2a2622]`}>Khamemi Savva Jive.</p>
            <p className={`mt-3 text-pretty text-[17px] leading-relaxed text-[#5e574e] ${lang === "hi" ? hindiSerif : ""}`}>
              {text.forgive}
            </p>
          </div>
        </Reveal>
      ) : null}
      {beat >= 4 ? (
        <IntoView className="mt-10 flex justify-center">
          <StoryButton onClick={onNext} {...storyAction(lang)}>
            {text.continue}
          </StoryButton>
        </IntoView>
      ) : null}
    </div>
  );
}
