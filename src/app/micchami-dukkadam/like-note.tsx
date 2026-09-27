"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { hindiSerif, type StoryLang } from "./ui";

const HAS_LIKED_KEY = "aadios_has_liked";

function readHasLikedFlag() {
  return window.localStorage.getItem(HAS_LIKED_KEY) === "true";
}

function subscribeHasLiked() {
  return () => {};
}

function getServerHasLiked() {
  return false;
}

export function LikeNote({ lang }: { lang: StoryLang }) {
  const [count, setCount] = useState<number | null>(null);
  const [likedNow, setLikedNow] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const storedLiked = useSyncExternalStore(
    subscribeHasLiked,
    readHasLikedFlag,
    getServerHasLiked,
  );
  const hasLiked = likedNow || storedLiked;

  useEffect(() => {
    const controller = new AbortController();

    void (async () => {
      try {
        const response = await fetch("/api/likes", { signal: controller.signal });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { count: number };
        setCount(data.count);
      } catch {
        if (!controller.signal.aborted) {
          setCount(0);
        }
      }
    })();

    return () => controller.abort();
  }, []);

  const handleLike = () => {
    setNote(null);
    setCount((previous) => (previous ?? 0) + 1);

    void fetch("/api/likes", { method: "POST" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Like request failed");
        }

        return (await response.json()) as { count: number; rateLimited: boolean };
      })
      .then((data) => {
        if (data.rateLimited) {
          setCount(data.count);
          setNote(lang === "hi" ? "थोड़ा रुकिए। कल फिर कोशिश कीजिए।" : "Slow down! Try again tomorrow.");
          return;
        }

        setCount(data.count);

        if (!readHasLikedFlag()) {
          window.localStorage.setItem(HAS_LIKED_KEY, "true");
          setLikedNow(true);
        }
      })
      .catch(() => {
        setCount((previous) => Math.max(0, (previous ?? 1) - 1));
      });
  };

  const people =
    lang === "hi"
      ? count === 1
        ? "व्यक्ति इस संदेश से जुड़ा"
        : "लोग इस संदेश से जुड़े"
      : count === 1
        ? "person connected with this message"
        : "people connected with this message";
  const face = lang === "hi" ? hindiSerif : "";

  return (
    <div className="mx-auto mt-6 max-w-sm">
      <p className={`text-[15px] leading-relaxed text-[#5e574e] ${face}`}>
        {lang === "hi" ? (
          <>
            अगर यह बात आप तक पहुँची, <span className="whitespace-nowrap">एक ❤️ छोड़ दीजिए</span>
          </>
        ) : (
          <>
            If this message meant something to you,{" "}
            <span className="whitespace-nowrap">leave a ❤️</span>
          </>
        )}
      </p>
      <p className={`mt-3 text-[15px] text-[#2a2622] ${face}`}>
        <span aria-hidden="true">❤️ </span>
        {count === null ? (
          <span className="inline-block h-4 w-12 animate-pulse rounded bg-[#2a2622]/10 align-middle" />
        ) : (
          <span className="tabular-nums">{count.toLocaleString()}</span>
        )}{" "}
        {people}
      </p>
      <button
        type="button"
        onClick={handleLike}
        aria-label={lang === "hi" ? "इस संदेश को पसंद करें" : "Like this message"}
        aria-pressed={hasLiked}
        className={`mt-3 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#2a2622]/15 bg-white/70 px-6 text-[13px] text-[#2a2622] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8c7044] ${face}`}
      >
        <span aria-hidden="true">{hasLiked ? "❤️" : "🤍"}</span>
        {lang === "hi" ? "पसंद" : "Like"}
      </button>
      {note ? (
        <p role="status" className={`mt-3 text-[13px] text-[#6d655c] ${face}`}>
          {note}
        </p>
      ) : null}
    </div>
  );
}
