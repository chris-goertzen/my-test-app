import { Link } from "react-router-dom"
import { ArrowUpRight, CheckCircle2, Layers, Palette, Type, Sparkles } from "lucide-react"
import { PageHeader, Section } from "@/components/section"
import { navigation } from "@/lib/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const tokens = [
  { label: "background", className: "bg-background border" },
  { label: "card", className: "bg-card border" },
  { label: "muted", className: "bg-muted" },
  { label: "primary", className: "bg-primary" },
  { label: "secondary", className: "bg-secondary" },
  { label: "accent", className: "bg-accent" },
  { label: "destructive", className: "bg-destructive" },
  { label: "border", className: "bg-border" },
  { label: "input", className: "bg-input" },
  { label: "ring", className: "bg-ring" },
]

const chartTokens = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"]

export default function OverviewPage() {
  const sections = navigation.filter((n) => n.to !== "/")
  const componentCount = sections.reduce((acc, s) => acc + s.components.length, 0)

  return (
    <>
      <PageHeader
        eyebrow="Gallery · v1"
        title="A complete shadcn/ui showcase."
        description="A Swiss-minimalist component gallery exploring buttons, forms, overlays, navigation, feedback and typography. Built with React, Tailwind v4 and Radix primitives — every component supports light and dark themes."
      />

      <div className="mb-10 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{sections.length}</div>
            <p className="text-xs text-muted-foreground">Organised by purpose</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Component demos</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{componentCount}+</div>
            <p className="text-xs text-muted-foreground">Live, interactive examples</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Themes</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">Light · Dark</div>
            <p className="text-xs text-muted-foreground">Toggle from the top bar</p>
          </CardContent>
        </Card>
      </div>

      <Section
        title="Design tokens"
        description="Every component derives from the same CSS variables. Switching theme rewrites the palette in place."
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {tokens.map((t) => (
            <div key={t.label} className="space-y-2">
              <div className={`h-12 w-full rounded-md ${t.className}`} />
              <div className="text-xs text-muted-foreground">{t.label}</div>
            </div>
          ))}
        </div>
        <Separator className="my-6" />
        <div className="space-y-2">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Chart palette
          </div>
          <div className="flex gap-2">
            {chartTokens.map((c, i) => (
              <div key={c} className="space-y-1">
                <div className={`h-10 w-16 rounded-md ${c}`} />
                <div className="text-[10px] text-muted-foreground">chart-{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="my-10" />

      <Section
        title="Typography rhythm"
        description="Built on an 8pt grid. Display headings sit tight, body copy uses generous leading."
      >
        <div className="space-y-4">
          <div>
            <Type className="mb-2 h-4 w-4 text-muted-foreground" />
            <h1 className="typo-display text-4xl font-semibold leading-tight">
              The quick brown fox jumps over the lazy dog.
            </h1>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Section heading</h2>
          <h3 className="text-lg font-medium">Subsection title</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Body copy — designed for sustained reading at sixteen pixels. The
            base palette uses neutral greys with a single emphasis tone for
            destructive intent.
          </p>
          <p className="text-xs text-muted-foreground">
            Footnote · meta · captions
          </p>
        </div>
      </Section>

      <div className="my-10" />

      <Section
        title="Explore categories"
        description="Each category collects related primitives in one place. Browse the live demos."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <Link
                key={s.to}
                to={s.to}
                className="group flex items-start gap-3 rounded-md border bg-card p-4 transition-colors hover:border-foreground/30"
              >
                <span className="grid h-8 w-8 place-items-center rounded-md border bg-background">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{s.label}</CardTitle>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <CardDescription className="mt-1 line-clamp-2 text-xs">
                    {s.description}
                  </CardDescription>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {s.components.slice(0, 4).map((c) => (
                      <Badge key={c} variant="outline" className="font-normal">
                        {c}
                      </Badge>
                    ))}
                    {s.components.length > 4 && (
                      <Badge variant="secondary" className="font-normal">
                        +{s.components.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-between rounded-md border border-dashed p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />
            All components support keyboard navigation and dark mode.
          </div>
          <Button asChild size="sm" variant="outline">
            <Link to="/buttons">Start the tour</Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
