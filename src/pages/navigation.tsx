import { useState } from "react"
import { ChevronsUpDown, FileCode, Layers, Settings } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { PageSection } from "@/components/page-section"

export function NavigationPage() {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex flex-col">
      <PageSection
        title="Tabs"
        description="Switch between sibling views."
      >
        <Tabs defaultValue="account" className="max-w-lg">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="rounded-md border border-border p-4 text-sm text-muted-foreground">
              Manage your account details — name, email, and timezone.
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className="rounded-md border border-border p-4 text-sm text-muted-foreground">
              Update your password. Use 12+ characters with mixed case.
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <div className="rounded-md border border-border p-4 text-sm text-muted-foreground">
              Choose what we email you about and how often.
            </div>
          </TabsContent>
        </Tabs>
      </PageSection>

      <PageSection
        title="Accordion"
        description="Reveal grouped content one section at a time."
      >
        <Accordion type="single" collapsible defaultValue="item-1" className="max-w-lg">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is the design system accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. Components ship with keyboard support, ARIA roles, and
              visible focus rings derived from the theme tokens.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
            <AccordionContent>
              Of course. Every token has a paired value, switched at the
              <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs">html.dark</code>
              scope.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I theme it?</AccordionTrigger>
            <AccordionContent>
              Override any CSS variable in <code className="rounded bg-muted px-1 py-0.5 text-xs">index.css</code>
              and the entire surface adapts.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </PageSection>

      <PageSection
        title="Collapsible"
        description="Single-section show/hide primitive."
      >
        <Collapsible
          open={open}
          onOpenChange={setOpen}
          className="max-w-md space-y-2"
        >
          <div className="flex items-center justify-between rounded-md border border-border px-4 py-2">
            <div className="flex flex-col">
              <span className="text-sm font-medium">@ada · starred 3 repos</span>
              <span className="text-xs text-muted-foreground">
                Toggle to view the full list
              </span>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle">
                <ChevronsUpDown />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            {["@radix-ui/primitives", "@vercel/swr", "tailwindcss"].map((r) => (
              <div
                key={r}
                className="rounded-md border border-border px-4 py-2 font-mono text-sm"
              >
                {r}
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </PageSection>

      <PageSection
        title="Command"
        description="Searchable command palette pattern."
      >
        <Command className="max-w-md">
          <CommandInput placeholder="Type a command or search…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <FileCode className="h-4 w-4" /> New file
              </CommandItem>
              <CommandItem>
                <Layers className="h-4 w-4" /> New layer
              </CommandItem>
              <CommandItem>
                <Settings className="h-4 w-4" /> Settings
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Projects">
              <CommandItem>Atelier Vier</CommandItem>
              <CommandItem>Bauhaus Co.</CommandItem>
              <CommandItem>Helvetica Studio</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PageSection>
    </div>
  )
}
