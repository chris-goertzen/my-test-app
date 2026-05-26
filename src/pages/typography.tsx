import { Separator } from "@/components/ui/separator"
import { PageSection } from "@/components/page-section"

export function TypographyPage() {
  return (
    <div className="flex flex-col">
      <PageSection
        title="Display"
        description="Section-leading headers."
      >
        <div className="grid gap-4">
          <h1 className="scroll-m-20 text-5xl font-semibold tracking-tight">
            The quick brown fox
          </h1>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Sets the rhythm for the page
          </h2>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            A grid is a tool — not a religion
          </h3>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Typography is the voice of the system
          </h4>
        </div>
      </PageSection>

      <PageSection
        title="Body"
        description="Prose and inline elements."
      >
        <div className="grid max-w-2xl gap-4 text-sm leading-7 text-foreground">
          <p>
            Swiss typographic tradition prizes clarity, hierarchy, and a
            relentless adherence to the grid. This page is set in Inter,
            our system sans-serif, with consistent line-heights and
            tracking across all levels.
          </p>
          <p className="text-muted-foreground">
            Muted prose softens the visual weight of supporting copy
            without breaking rhythm.
          </p>
          <blockquote className="mt-2 border-l-2 pl-6 italic">
            “Typography has one plain duty before it and that is to convey
            information in writing.”
          </blockquote>
          <ul className="ml-6 list-disc [&>li]:mt-2">
            <li>Generous whitespace</li>
            <li>Hairline dividers</li>
            <li>Restrained color, intentional emphasis</li>
          </ul>
        </div>
      </PageSection>

      <PageSection
        title="Inline"
        description="Code, links, and emphasis."
      >
        <div className="grid max-w-2xl gap-3 text-sm">
          <p>
            Use <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">cn()</code>
            to merge Tailwind classes idiomatically.
          </p>
          <p>
            Links use the primary token —{" "}
            <a href="#" className="font-medium underline underline-offset-4">
              read the docs
            </a>
            .
          </p>
          <p>
            <strong className="font-semibold">Strong</strong>,{" "}
            <em className="italic">emphasised</em>, or{" "}
            <span className="line-through">retracted</span> emphasis.
          </p>
        </div>
      </PageSection>

      <PageSection
        title="Scale"
        description="Reference of every step in the type scale."
      >
        <div className="grid gap-3">
          {[
            ["text-xs", "Xtra small"],
            ["text-sm", "Small"],
            ["text-base", "Base"],
            ["text-lg", "Large"],
            ["text-xl", "Extra large"],
            ["text-2xl", "2x large"],
            ["text-3xl", "3x large"],
            ["text-4xl", "4x large"],
          ].map(([cls, label]) => (
            <div key={cls} className="flex items-baseline gap-6">
              <span className="w-20 font-mono text-xs text-muted-foreground">
                {cls}
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className={cls}>{label}</span>
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  )
}
