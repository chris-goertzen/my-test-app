import {
  ArrowUpRight,
  Boxes,
  Layers,
  Palette,
  Sparkles,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { NAV_ITEMS, type SectionId } from "@/lib/navigation"

type OverviewProps = {
  onNavigate: (id: SectionId) => void
}

const STATS = [
  { label: "Components", value: "27+", icon: Boxes },
  { label: "Sections", value: "9", icon: Layers },
  { label: "Themes", value: "Light · Dark", icon: Palette },
  { label: "Tokens", value: "Single source", icon: Sparkles },
]

export function OverviewPage({ onNavigate }: OverviewProps) {
  const componentNav = NAV_ITEMS.filter((n) => n.group === "Components")

  return (
    <div className="flex flex-col gap-10">
      {/* Hero */}
      <Card className="overflow-hidden">
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest">
              v1.0
            </Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
            <Badge variant="info">Swiss minimalist</Badge>
          </div>
          <CardTitle className="text-2xl md:text-3xl">
            A grid-disciplined gallery for every primitive
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm md:text-base">
            Galleria is a tightly composed showcase of the shadcn/ui
            language. Components share a single Swiss-style token system —
            generous whitespace, hairline dividers, and neutral palettes
            that resolve identically in light and dark mode.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={() => onNavigate("buttons")}>
            Browse components
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate("typography")}
          >
            View typography
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {stat.label}
                </span>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-4 text-2xl font-semibold tracking-tight">
                {stat.value}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Sections */}
      <div>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            Component categories
          </h2>
          <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {componentNav.length} sections
          </span>
        </div>
        <Separator className="mb-6" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {componentNav.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 text-left transition-colors hover:border-foreground/30 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-8 w-8 place-items-center rounded-sm border border-border bg-background">
                    <Icon className="h-4 w-4" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Theme progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Token coverage</CardTitle>
          <CardDescription>
            Every component opts into the shared token surface for
            background, foreground, border, ring, and accent — verified
            across both color schemes.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Surface tokens</span>
              <span>100%</span>
            </div>
            <Progress value={100} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Component parity</span>
              <span>96%</span>
            </div>
            <Progress value={96} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Dark mode QA</span>
              <span>92%</span>
            </div>
            <Progress value={92} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
