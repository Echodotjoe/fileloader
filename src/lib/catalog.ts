import { createServerFn } from "@tanstack/react-start";

export type ArcadeType = "html" | "swf";

export type ArcadeFile = {
  id: string;
  name: string;
  file: string;
  type: ArcadeType;
  source: "directory" | "local";
};

const SKIP_NAMES = new Set([
  "index.html",
  "og.jpg",
  "x-banner.jpg",
  "favicon.svg",
  "favicon.ico",
  "robots.txt",
]);

function displayName(filename: string): string {
  const base = filename.replace(/\.(html?|swf)$/i, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function typeFromName(filename: string): ArcadeType | null {
  if (/\.swf$/i.test(filename)) return "swf";
  if (/\.html?$/i.test(filename)) return "html";
  return null;
}

export const listArcadeFiles = createServerFn({ method: "GET" }).handler(
  async (): Promise<ArcadeFile[]> => {
    const { readdir } = await import("node:fs/promises");
    const { join } = await import("node:path");

    const roots = [
      join(process.cwd(), "public"),
      join(process.cwd(), "dist", "client"),
      process.cwd(),
    ];

    const seen = new Set<string>();
    const files: ArcadeFile[] = [];

    for (const root of roots) {
      let names: string[] = [];
      try {
        names = await readdir(root);
      } catch {
        continue;
      }
      for (const name of names) {
        if (SKIP_NAMES.has(name) || name.startsWith("__") || name.startsWith(".")) {
          continue;
        }
        const type = typeFromName(name);
        if (!type) continue;
        const key = name.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        files.push({
          id: `dir:${name}`,
          name: displayName(name),
          file: `/${name}`,
          type,
          source: "directory",
        });
      }
      if (files.length > 0) break;
    }

    files.sort((a, b) => a.name.localeCompare(b.name));
    return files;
  },
);

export function arcadeFileFromLocal(file: File, objectUrl: string): ArcadeFile | null {
  const type = typeFromName(file.name);
  if (!type) return null;
  return {
    id: `local:${file.name}:${file.size}:${file.lastModified}`,
    name: displayName(file.name),
    file: objectUrl,
    type,
    source: "local",
  };
}
