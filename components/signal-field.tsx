import Link from "next/link";
import { categoryName } from "@/lib/catalog";

// A visual index: every small square represents a paper, grouped by category.
// The waveform is an abstract speech motif, not a recording or a measured signal.
export function SignalField({
  counts,
}: {
  counts: { name: string; count: number }[];
}) {
  return (
    <div className="signal-art">
      <div className="signal-caption">
        <span>THE SPEECH RESEARCH FRONTIER</span>
        <span>IS / 26</span>
      </div>
      <div className="signal-plot">
        <svg
          className="voice-lines"
          viewBox="0 0 560 205"
          fill="none"
          aria-hidden="true"
        >
          {Array.from({ length: 33 }, (_, row) => {
            const d = Array.from({ length: 113 }, (_, i) => {
              const x = i * 5;
              const envelope = Math.exp(-Math.pow((i - 58) / 27, 2));
              const phase = (i - 50) * 0.068;
              const y =
                102 +
                (row - 16) * 3.5 +
                Math.sin(phase + row * 0.075) *
                  envelope *
                  (74 - Math.abs(row - 16) * 1.4);
              return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(2)}`;
            }).join(" ");
            return (
              <path
                key={row}
                d={d}
                stroke={row > 12 && row < 21 ? "#c15a35" : "#58754a"}
                strokeWidth={row % 3 === 0 ? 1.1 : 0.65}
                opacity={0.3 + (1 - Math.abs(row - 16) / 17) * 0.65}
              />
            );
          })}
        </svg>
        <div className="signal-cross one">+</div>
        <div className="signal-cross two">+</div>
      </div>
      <div className="corpus-map" aria-label="Paper distribution by category">
        {counts.map((category, i) => (
          <Link prefetch={false}
            key={category.name}
            href={`/?category=${category.name}#explore`}
            title={`${categoryName(category.name)} · ${category.count} papers`}
            aria-label={`${categoryName(category.name)}, ${category.count} papers`}
            className="corpus-band"
          >
            <span className="corpus-code">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="corpus-cells" aria-hidden="true">
              {Array.from({ length: category.count }, (_, j) => (
                <span key={j} className={i % 4 === 0 ? "hot" : ""} />
              ))}
            </span>
          </Link>
        ))}
      </div>
      <div className="signal-caption bottom">
        <span>1 MARK = 1 PAPER</span>
        <span>14 CONNECTED RESEARCH AREAS ↗</span>
      </div>
    </div>
  );
}
