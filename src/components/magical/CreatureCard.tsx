import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Sparkles, Flame, HelpCircle } from "lucide-react"
import type { Creature } from "./data"

interface CreatureCardProps {
  creature: Creature
  /** Whether motion is currently running. Drives the active/resting badge. */
  motionActive: boolean
}

function TimingLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 font-mono text-[11px] leading-relaxed">
      <span className="text-background/70">{label}</span>
      <span className="text-background">{value}</span>
    </div>
  )
}

export function CreatureCard({ creature, motionActive }: CreatureCardProps) {
  const Icon = creature.type === "pixie" ? Sparkles : Flame
  const accent =
    creature.type === "pixie" ? "text-amber-500" : "text-rose-500"

  return (
    <Card className="bg-card/85 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Icon className={`size-5 ${accent}`} aria-hidden="true" />
          <div className="flex-1">
            <CardTitle className="capitalize">{creature.name}</CardTitle>
            <CardDescription className="capitalize">
              {creature.type}
            </CardDescription>
          </div>
          <Badge
            variant={motionActive ? "default" : "secondary"}
            aria-live="polite"
          >
            {motionActive ? "Active" : "Resting"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">{creature.lore}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                aria-label={`Show animation timing for ${creature.name}`}
              >
                <HelpCircle className="size-3.5" aria-hidden="true" />
                Animation timing
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="w-56 p-3">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-background/80">
                  Motion
                </p>
                <TimingLine label="@keyframes" value={creature.motion.keyframe} />
                <TimingLine label="duration" value={creature.motion.duration} />
                <TimingLine label="delay" value={creature.motion.delay} />
                <TimingLine label="easing" value={creature.motion.easing} />
                {creature.wingFlap ? (
                  <>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-background/80">
                      Wing flap
                    </p>
                    <TimingLine
                      label="@keyframes"
                      value={creature.wingFlap.keyframe}
                    />
                    <TimingLine
                      label="duration"
                      value={creature.wingFlap.duration}
                    />
                    <TimingLine
                      label="delay"
                      value={creature.wingFlap.delay}
                    />
                    <TimingLine
                      label="easing"
                      value={creature.wingFlap.easing}
                    />
                  </>
                ) : null}
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  )
}
