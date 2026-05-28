import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CREATURES, type CreatureType } from "./data"
import { CreatureCard } from "./CreatureCard"

interface InhabitantsCardProps {
  motionActive: boolean
}

type TabKey = "all" | CreatureType

const TABS: ReadonlyArray<{ key: TabKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "pixie", label: "Pixies" },
  { key: "dragon", label: "Dragons" },
]

export function InhabitantsCard({ motionActive }: InhabitantsCardProps) {
  const filtered = (kind: TabKey) =>
    kind === "all" ? CREATURES : CREATURES.filter((c) => c.type === kind)

  return (
    <Card className="bg-card/85 backdrop-blur-md">
      <CardHeader>
        <CardTitle>Inhabitants</CardTitle>
        <CardDescription>
          Meet the residents of the realm. Hover the timing chip to see how
          each one moves.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="gap-4">
          <TabsList>
            {TABS.map((t) => (
              <TabsTrigger key={t.key} value={t.key}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {TABS.map((t) => (
            <TabsContent key={t.key} value={t.key}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filtered(t.key).map((creature) => (
                  <CreatureCard
                    key={creature.id}
                    creature={creature}
                    motionActive={motionActive}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
