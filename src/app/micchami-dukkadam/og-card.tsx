import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt =
  "Micchami Dukkadam — a short experience of reflection and forgiveness";

async function loadSerifFont() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const cssResponse = await fetch(
      "https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap",
      {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko",
        },
      },
    );

    if (!cssResponse.ok) {
      return null;
    }

    const css = await cssResponse.text();
    const fontUrl = css.match(/url\((https:\/\/[^)]+\.ttf)\)/)?.[1];
    if (!fontUrl) {
      return null;
    }

    const fontResponse = await fetch(fontUrl, { signal: controller.signal });
    if (!fontResponse.ok) {
      return null;
    }

    return await fontResponse.arrayBuffer();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function MicchamiOgImage() {
  const font = await loadSerifFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f6f1e8",
          color: "#2a2622",
          padding: "76px 84px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 5,
            color: "#8c7044",
          }}
        >
          ADITYA OS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: font ? "Instrument Serif" : "sans-serif",
              fontSize: 92,
              lineHeight: 0.95,
              letterSpacing: -1,
            }}
          >
            Micchami Dukkadam
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 760,
              fontSize: 32,
              lineHeight: 1.35,
              color: "#5e574e",
            }}
          >
            A short experience of reflection and forgiveness.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 64,
              height: 1,
              backgroundColor: "#8c7044",
              marginRight: 18,
            }}
          />
          <div style={{ display: "flex", fontSize: 24, color: "#8c7044" }}>
            May we hold no enmity.
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: font
        ? [
            {
              name: "Instrument Serif",
              data: font,
              style: "normal",
              weight: 400,
            },
          ]
        : undefined,
    },
  );
}
