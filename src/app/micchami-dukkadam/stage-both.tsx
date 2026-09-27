"use client";

import { DownMark, IntoView, Reveal, StoryButton, hindiSerif, serif, storyAction, storyFace, useBeat, type StoryLang } from "./ui";

const copy = {
  en: {
    title: "In Jain tradition, forgiveness goes both ways.",
    listLabel: "Asking, forgiving, and letting go",
    steps: ["I ASK FOR FORGIVENESS.", "I FORGIVE.", "I LET GO OF ENMITY."],
    ask: "May I be forgiven for anything I may have done knowingly or unknowingly.",
    forgive: "I forgive all living beings.",
    continue: "CONTINUE →",
  },
  hi: {
    title: "जैन परंपरा में क्षमा दोनों ओर होती है।",
    listLabel: "क्षमा माँगना, क्षमा करना, और बैर छोड़ना",
    steps: ["क्षमा माँगना।", "क्षमा करना।", "बैर छोड़ना।"],
    ask: "जो कुछ मैंने जानकर या अनजाने में किया हो, उसके लिए मुझे क्षमा मिले।",
    forgive: "सभी जीवों के लिए क्षमा।",
    continue: "आगे →",
  },
} as const;

export function StageBoth({ onNext, lang }: { onNext: () => void; lang: StoryLang }) {
  const beat = useBeat(7, 560);
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
      <ol className="mt-8" aria-label={text.listLabel}>
        {text.steps.map((step, index) =>
          beat > index + 1 ? (
            <li key={index}>
              <Reveal>
                {index > 0 ? <DownMark /> : null}
                <p className={`${type} text-2xl text-[#2a2622] sm:text-3xl ${lang === "en" ? "tracking-wide" : ""}`}>
                  {step}
                </p>
              </Reveal>
            </li>
          ) : null,
        )}
      </ol>
      {beat >= 5 ? (
        <Reveal>
          <div className="mx-auto mt-10 max-w-md">
            <p className={`${serif} text-2xl text-[#2a2622]`}>Micchami Dukkadam</p>
            <p className={`mt-3 text-pretty text-[17px] leading-relaxed text-[#5e574e] ${lang === "hi" ? hindiSerif : ""}`}>
              {text.ask}
            </p>
          </div>
        </Reveal>
      ) : null}
      {beat >= 6 ? (
        <Reveal>
          <div className="mx-auto mt-8 max-w-md">
            <p className={`${serif} text-2xl text-[#2a2622]`}>Khamemi Savva Jive.</p>
            <p className={`mt-3 text-pretty text-[17px] leading-relaxed text-[#5e574e] ${lang === "hi" ? hindiSerif : ""}`}>
              {text.forgive}
            </p>
          </div>
        </Reveal>
      ) : null}
      {beat >= 7 ? (
        <IntoView className="mt-10 flex justify-center">
          <StoryButton onClick={onNext} {...storyAction(lang)}>
            {text.continue}
          </StoryButton>
        </IntoView>
      ) : null}
    </div>
  );
}
