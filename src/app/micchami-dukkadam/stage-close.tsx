"use client";

import Link from "next/link";

import { LikeNote } from "./like-note";
import { Reveal, serif, storyAction, storyFace, storyLinkClassFor, StoryButton, useBeat, type StoryLang } from "./ui";

const copy = {
  en: {
    forgiveness: `To anyone I may have hurt,
knowingly or unknowingly,
through my thoughts, words or actions —

I ask for forgiveness.`,
    forgive: "May we forgive.",
    forgiven: "May we be forgiven.",
    enmity: "May we hold no enmity.",
    technology: "Sometimes the most human thing technology can do is remind us to be better humans.",
    explore: "EXPLORE ADITYA OS",
    again: "EXPERIENCE AGAIN",
    built: "Built by Aditya Jain",
    part: "Part of Aditya OS",
    experiment: "A small experiment by Aditya Jain",
    ecosystem: "Built inside the Aditya OS ecosystem.",
  },
  hi: {
    forgiveness: `जिस किसी को दुख पहुँचा हो,
जानकर या अनजाने,
विचार, वचन या कर्म से —

उसके लिए क्षमा।`,
    forgive: "हम क्षमा करें।",
    forgiven: "हमें क्षमा मिले।",
    enmity: "हमारा कोई बैर न रहे।",
    technology: "कभी-कभी तकनीक का सबसे मानवीय काम यही होता है कि वह हमें बेहतर इंसान बनना याद दिलाए।",
    explore: "Aditya OS देखें",
    again: "फिर से देखें",
    built: "Aditya Jain की रचना",
    part: "Aditya OS का हिस्सा",
    experiment: "Aditya Jain का एक छोटा प्रयोग",
    ecosystem: "Aditya OS के भीतर रचा गया।",
  },
} as const;

export function StageClose({ onAgain, lang }: { onAgain: () => void; lang: StoryLang }) {
  const beat = useBeat(7, 680);
  const text = copy[lang];
  const type = storyFace(lang);

  return (
    <div className="text-center">
      {beat >= 1 ? (
        <h1
          data-stage-title=""
          tabIndex={-1}
          className={`${serif} text-balance text-[2rem] leading-tight tracking-tight text-[#2a2622] outline-none sm:text-5xl`}
        >
          <span className="mx-auto mb-4 block h-px w-10 bg-[#8c7044]" aria-hidden="true" />
          Micchami Dukkadam <span aria-hidden="true">🙏</span>
        </h1>
      ) : (
        <h1 data-stage-title="" tabIndex={-1} className="sr-only">
          Micchami Dukkadam
        </h1>
      )}
      {beat >= 2 ? (
        <Reveal>
          <p className={`${type} mx-auto mt-5 max-w-md whitespace-pre-line text-balance text-xl leading-snug text-[#2a2622] sm:text-2xl`}>
            {text.forgiveness}
          </p>
        </Reveal>
      ) : null}
      {beat >= 3 ? (
        <Reveal>
          <p className={`${type} mt-5 text-xl text-[#2a2622] sm:text-2xl`}>{text.forgive}</p>
        </Reveal>
      ) : null}
      {beat >= 4 ? (
        <Reveal>
          <p className={`${type} mt-3 text-xl text-[#2a2622] sm:text-2xl`}>{text.forgiven}</p>
        </Reveal>
      ) : null}
      {beat >= 5 ? (
        <Reveal>
          <p className={`${type} mt-3 text-xl text-[#2a2622] sm:text-2xl`}>{text.enmity}</p>
        </Reveal>
      ) : null}
      {beat >= 6 ? (
        <Reveal>
          <p className={`mx-auto mt-6 max-w-sm text-pretty text-[15px] leading-relaxed text-[#6d655c] ${lang === "hi" ? type : ""}`}>
            {text.technology}
          </p>
        </Reveal>
      ) : null}
      {beat >= 7 ? (
        <>
          <LikeNote lang={lang} />
          <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <Link href="/" className={storyLinkClassFor(lang)}>
              {text.explore}
            </Link>
            <StoryButton tone="quiet" onClick={onAgain} {...storyAction(lang)}>
              {text.again}
            </StoryButton>
          </div>
          <div className={`mt-6 text-[13px] leading-relaxed text-[#6d655c] ${lang === "hi" ? type : "tracking-wide"}`}>
            <p>{text.built}</p>
            <p>{text.part}</p>
            <p className="mt-3 text-[12px] text-[#8a8176]">{text.experiment}</p>
            <p className="text-[12px] text-[#8a8176]">{text.ecosystem}</p>
          </div>
        </>
      ) : null}
    </div>
  );
}
