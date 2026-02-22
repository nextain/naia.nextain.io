import type { Dictionary } from "@/i18n/dictionaries/types";
import { SectionReveal } from "@/components/home/section-reveal";

export function Comparison({ dict }: { dict: Dictionary }) {
  const { title, subtitle, headers, rows } = dict.home.comparison;
  const rowEntries = Object.values(rows);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <SectionReveal>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </SectionReveal>

      <SectionReveal delay={80}>
        <div className="overflow-x-auto rounded-xl border border-border/60 bg-card/70 shadow-sm backdrop-blur-sm">
          <table className="w-full min-w-[540px] text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  {headers.category}
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  {headers.others}
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                    {headers.naia}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rowEntries.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border/30 last:border-b-0 transition hover:bg-muted/20"
                >
                  <td className="px-4 py-3 font-medium">{row.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.others}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {row.naia}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionReveal>
    </section>
  );
}
