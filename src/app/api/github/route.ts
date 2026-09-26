import { NextResponse } from "next/server";
import { buildGitHubDashboardData, GITHUB_USERNAME } from "@/lib/github";
import type { GitHubProfile, GitHubRepo } from "@/types/github";

export const revalidate = 1800;

const GITHUB_API_BASE = "https://api.github.com/users";

function getGitHubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "aditya-os-portfolio",
  };

  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function readGitHubError(response: Response, label: string) {
  const rateLimitRemaining = response.headers.get("x-ratelimit-remaining");
  const rateLimitReset = response.headers.get("x-ratelimit-reset");
  let detail = "";

  try {
    const body = (await response.json()) as { message?: string };
    if (body.message) {
      detail = body.message;
    }
  } catch {
    /* ignore non-JSON error bodies */
  }

  const parts = [
    `${label} failed (${response.status})`,
    detail || undefined,
    rateLimitRemaining !== null ? `rate-limit-remaining=${rateLimitRemaining}` : undefined,
    rateLimitReset ? `rate-limit-reset=${rateLimitReset}` : undefined,
  ].filter(Boolean);

  return parts.join(" — ");
}

async function fetchGitHubData() {
  const headers = getGitHubHeaders();
  const profileUrl = `${GITHUB_API_BASE}/${GITHUB_USERNAME}`;
  const repositoriesUrl = `${profileUrl}/repos?per_page=100&sort=updated`;

  const [profileResponse, repositoriesResponse] = await Promise.all([
    fetch(profileUrl, {
      headers,
      next: { revalidate },
    }),
    fetch(repositoriesUrl, {
      headers,
      next: { revalidate },
    }),
  ]);

  if (!profileResponse.ok) {
    throw new Error(await readGitHubError(profileResponse, "GitHub profile"));
  }

  if (!repositoriesResponse.ok) {
    throw new Error(await readGitHubError(repositoriesResponse, "GitHub repos"));
  }

  const profile = (await profileResponse.json()) as GitHubProfile;
  const repositories = (await repositoriesResponse.json()) as GitHubRepo[];
  return buildGitHubDashboardData(profile, repositories);
}

export async function GET() {
  try {
    const data = await fetchGitHubData();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown GitHub fetch error";
    console.error("[api/github]", message);

    const isRateLimited = /rate limit|403|429/i.test(message);
    return NextResponse.json(
      {
        error: isRateLimited
          ? "GitHub rate limit hit. Add GITHUB_TOKEN to raise the limit."
          : "Unable to load GitHub profile.",
      },
      { status: isRateLimited ? 429 : 500 },
    );
  }
}
