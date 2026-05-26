import { PageHeader, Section, SectionGrid } from "@/components/section"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Kbd } from "@/components/ui/kbd"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export default function UtilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Category"
        title="Utilities"
        description="Smaller helpers — resizable panels, keyboard hints and loading skeletons."
      />

      <Section title="Resizable panels" description="Drag the handle to redistribute space.">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-48 rounded-lg border"
        >
          <ResizablePanel defaultSize={30}>
            <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
              Sidebar
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60}>
                <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
                  Main
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40}>
                <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
                  Console
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Section>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Keyboard hints (Kbd)" description="Inline keyboard chord display.">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-muted-foreground">Open command palette</span>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
            <span className="ml-4 text-muted-foreground">Save</span>
            <Kbd>⌘</Kbd>
            <Kbd>S</Kbd>
            <span className="ml-4 text-muted-foreground">Undo</span>
            <Kbd>⌘</Kbd>
            <Kbd>Z</Kbd>
          </div>
        </Section>

        <Section title="Skeleton patterns" description="Compose to match the final layout.">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <Section title="Status badges in context" description="Mix of variants to communicate state.">
        <div className="grid gap-2 md:grid-cols-2">
          {[
            { label: "Production", variant: "default" as const },
            { label: "Preview", variant: "secondary" as const },
            { label: "Draft", variant: "outline" as const },
            { label: "Failed", variant: "destructive" as const },
          ].map((b) => (
            <div key={b.label} className="flex items-center justify-between rounded-md border p-3">
              <span className="text-sm">deployment.{b.label.toLowerCase()}.app</span>
              <Badge variant={b.variant}>{b.label}</Badge>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
