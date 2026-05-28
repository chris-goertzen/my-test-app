import { useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CREATURES, type Creature, type CreatureKind } from "./creatures";

interface InhabitantsCardProps {
  reduceMotion: boolean;
  onToggleReduceMotion: (next: boolean) => void;
}

function CreatureRow({
  creature,
  reduceMotion,
}: {
  creature: Creature;
  reduceMotion: boolean;
}) {
  const stateLabel = reduceMotion ? "resting" : "active";

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">{creature.name}</span>
          <span className="text-xs uppercase tracking-wider text-white/60">
            {creature.kind}
          </span>
        </div>
        <p className="mt-1 text-sm leading-snug text-white/80">
          {creature.lore}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant={reduceMotion ? "secondary" : "default"}
              className="cursor-help"
              aria-label={`${creature.name} is ${stateLabel}`}
            >
              {stateLabel}
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="left">
            <div className="flex flex-col gap-0.5 text-left">
              <span>
                motion: <code>{creature.duration}</code> /{" "}
                <code>{creature.easing}</code>
              </span>
              {creature.delay ? (
                <span>
                  delay: <code>{creature.delay}</code>
                </span>
              ) : null}
              <span>
                {creature.secondary.label}:{" "}
                <code>{creature.secondary.duration}</code> /{" "}
                <code>{creature.secondary.easing}</code>
              </span>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export function InhabitantsCard({
  reduceMotion,
  onToggleReduceMotion,
}: InhabitantsCardProps) {
  const groups = useMemo(() => {
    const filter = (kind: CreatureKind | "all") =>
      kind === "all" ? CREATURES : CREATURES.filter((c) => c.kind === kind);
    return {
      all: filter("all"),
      pixies: filter("pixie"),
      dragons: filter("dragon"),
    };
  }, []);

  return (
    <TooltipProvider delayDuration={150}>
      <Card className="border border-white/15 bg-slate-900/60 text-white shadow-2xl backdrop-blur-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl text-white">Inhabitants</CardTitle>
              <CardDescription className="text-white/70">
                Creatures of the realm — their lore and their living rhythms.
              </CardDescription>
            </div>
            <label className="flex shrink-0 items-center gap-3 text-sm text-white/80">
              <span className="select-none">Reduce motion</span>
              <Switch
                checked={reduceMotion}
                onCheckedChange={onToggleReduceMotion}
                aria-label="Reduce motion"
              />
            </label>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="bg-white/10">
              <TabsTrigger value="pixies" className="text-white/80">
                Pixies
              </TabsTrigger>
              <TabsTrigger value="dragons" className="text-white/80">
                Dragons
              </TabsTrigger>
              <TabsTrigger value="all" className="text-white/80">
                All
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pixies" className="mt-4">
              <div className="flex flex-col gap-3">
                {groups.pixies.map((c) => (
                  <CreatureRow
                    key={c.id}
                    creature={c}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="dragons" className="mt-4">
              <div className="flex flex-col gap-3">
                {groups.dragons.map((c) => (
                  <CreatureRow
                    key={c.id}
                    creature={c}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="mt-4">
              <div className="flex flex-col gap-3">
                {groups.all.map((c) => (
                  <CreatureRow
                    key={c.id}
                    creature={c}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
