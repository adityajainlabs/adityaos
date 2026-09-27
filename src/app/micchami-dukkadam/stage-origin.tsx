"use client";

import { DownMark, IntoView, Reveal, StoryButton, hindiSerif, storyAction, storyFace, useBeat, type StoryLang } from "./ui";

const copy = {
  en: {
    title: "Where it comes from",
    listLabel: "From Jain tradition to forgiveness",
    steps: ["JAIN TRADITION", "PARYUSHANA", "SAMVATSARI", "FORGIVENESS"],
    first: "Jain tradition connects Micchami Dukkadam with a period of deep reflection, self-correction, and forgiveness.",
    second:
      "It is a time to look back at our thoughts, words, and actions, acknowledge where we may have caused harm, and ask for forgiveness.",
    close: "And this is where Micchami Dukkadam becomes more than a phrase.",
    continue: "CONTINUE →",
  },
  hi: {
    title: "यह कहाँ से आता है",
    listLabel: "जैन परंपरा से क्षमा तक",
    steps: ["जैन परंपरा", "पर्युषण", "संवत्सरी", "क्षमा"],
    first: "जैन परंपरा Micchami Dukkadam को गहरे मनन, आत्मसुधार और क्षमा के समय से जोड़ती है।",
    second:
      "यह वह समय है जब हम अपने विचार, वचन और कर्म देखते हैं, यह मानते हैं कि हमने कहाँ दुख पहुँचाया होगा, और क्षमा माँगते हैं।",
    close: "और यहीं Micchami Dukkadam एक वाक्य से कहीं बढ़कर हो जाता है।",
    continue: "आगे →",
  },
} as const;

export function StageOrigin({ onNext, lang }: { onNext: () => void; lang: StoryLang }) {
  const beat = useBeat(7, 520);
  const text = copy[lang];
  const type = storyFace(lang);

  return (
    <div className="text-center">
      <h1 data-stage-title="" tabIndex={-1} className="sr-only">
        {text.title}
      </h1>
      <ol aria-label={text.listLabel}>
        {text.steps.map((step, index) =>
          beat > index ? (
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
          <div className={`mx-auto mt-8 max-w-md space-y-4 text-pretty text-[17px] leading-relaxed text-[#5e574e] ${lang === "hi" ? hindiSerif : ""}`}>
            <p>{text.first}</p>
            <p>{text.second}</p>
          </div>
        </Reveal>
      ) : null}
      {beat >= 6 ? (
        <Reveal>
          <p className={`${type} mx-auto mt-6 max-w-md text-balance text-xl italic leading-snug text-[#2a2622] sm:text-2xl`}>
            {text.close}
          </p>
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
