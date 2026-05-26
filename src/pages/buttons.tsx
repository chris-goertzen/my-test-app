import { Check, ChevronsUpDown, Copy, Heart, Italic, MoreHorizontal, Trash, Underline, Bold } from "lucide-react"
import { PageHeader, Section, SectionGrid } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function ButtonsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Category"
        title="Buttons & Actions"
        description="The primary surface for triggering work — buttons, toggles, and contextual triggers."
      />

      <Section title="Button variants" description="Six tone variants from the canonical shadcn set.">
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </Section>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Sizes" description="Default, small, large, icon.">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="More">
              <MoreHorizontal />
            </Button>
          </div>
        </Section>

        <Section title="With icons" description="Icon + label combinations and loading state.">
          <div className="flex flex-wrap items-center gap-3">
            <Button>
              <Copy /> Copy link
            </Button>
            <Button variant="outline">
              <Heart /> Like
            </Button>
            <Button variant="destructive">
              <Trash /> Delete
            </Button>
            <Button disabled>
              <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-current" /> Loading…
            </Button>
          </div>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Toggle" description="Single press state with on/off semantics.">
          <div className="flex items-center gap-3">
            <Toggle aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle variant="outline" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
              <span className="text-sm">Underline</span>
            </Toggle>
          </div>
        </Section>

        <Section title="Toggle group" description="Mutually exclusive or multi-select.">
          <div className="space-y-4">
            <ToggleGroup type="single" defaultValue="left" variant="outline">
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="multiple">
              <ToggleGroupItem value="bold" aria-label="Bold">
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Dropdown menu" description="Menus, sub-menus and keyboard shortcuts.">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-44 justify-between">
                Account <ChevronsUpDown className="opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title="Context menu" description="Right-click on the surface below.">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-28 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>Actions</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Check className="mr-2 h-4 w-4" /> Approve
              </ContextMenuItem>
              <ContextMenuItem>
                <Copy className="mr-2 h-4 w-4" /> Duplicate
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem className="text-destructive">
                <Trash className="mr-2 h-4 w-4" /> Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Section>
      </SectionGrid>
    </>
  )
}
