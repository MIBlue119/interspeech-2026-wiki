"use client";
import { useState } from "react";
export function InstitutionLogo({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(false);
  const words = name
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w && !/^(of|the|and|for|de|du|des|in|at)$/i.test(w));
  const initials =
    words.length === 1
      ? words[0].slice(0, 3).toUpperCase()
      : words
          .slice(0, 3)
          .map((w) => w[0])
          .join("")
          .toUpperCase();
  const tone = [...name].reduce((n, c) => n + c.charCodeAt(0), 0) % 4;
  return (
    <span
      className={`institution-logo ${src && !failed ? "has-logo" : `monogram monogram-${tone}`}`}
      aria-hidden="true"
    >
      {src && !failed ? (
        <img
          src={src}
          alt=""
          width="32"
          height="32"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span>{initials || "R"}</span>
      )}
    </span>
  );
}
