import * as React from "react"
import { Menu, Github, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  NAV_ITEMS,
  type SectionId,
  type NavItem,
} from "@/lib/navigation"
import { cn } from "@/lib/utils"

type AppShellProps = {
  section: SectionId
  onSectionChange: (id: SectionId) => void
  children: React.ReactNode
}

function groupItems(items: NavItem[]) {
  return items.reduce<Record<string, NavItem[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {})
}

function NavList({
  items,
  current,
  onSelect,
}: {
  items: NavItem[]
  current: SectionId
  onSelect: (id: SectionId) => void
}) {
  const groups = groupItems(items)
  return (
    <nav className="flex flex-col gap-6" aria-label="Primary">
      {Object.entries(groups).map(([group, groupItems]) => (
        <div key={group} className="flex flex-col gap-1">
          <div className="px-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {group}
          </div>
          <ul className="flex flex-col gap-0.5">
            {groupItems.map((item) => {
              const Icon = item.icon
              const active = current === item.id
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(item.id)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      active
                        ? "bg-secondary text-secondary-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function Brand({ subtle = false }: { subtle?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-7 w-7 place-items-center rounded-sm bg-foreground text-background">
        <Sparkles className="h-3.5 w-3.5" strokeWidth={2.25} />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold tracking-tight">Galleria</span>
        <span
          className={cn(
            "text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
            subtle && "opacity-70"
          )}
        >
          shadcn shell
        </span>
      </div>
    </div>
  )
}

export function AppShell({ section, onSectionChange, children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const current = NAV_ITEMS.find((i) => i.id === section) ?? NAV_ITEMS[0]

  const handleSelect = (id: SectionId) => {
    onSectionChange(id)
    setMobileOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md md:px-6">
        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="px-5 pt-5 pb-3">
                <SheetTitle className="text-left">
                  <Brand />
                </SheetTitle>
                <SheetDescription className="text-left">
                  Component gallery shell
                </SheetDescription>
              </SheetHeader>
              <Separator />
              <div className="px-3 py-4">
                <NavList
                  items={NAV_ITEMS}
                  current={section}
                  onSelect={handleSelect}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:block">
          <Brand />
        </div>

        <div className="md:hidden flex items-center">
          <Brand subtle />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            asChild
            aria-label="Source"
          >
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex md:w-64 md:shrink-0 md:border-r md:border-border md:bg-background">
          <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] w-full flex-col overflow-y-auto px-3 py-6">
            <NavList
              items={NAV_ITEMS}
              current={section}
              onSelect={handleSelect}
            />
            <div className="mt-auto pt-6">
              <Separator className="mb-4" />
              <p className="px-2 text-[11px] leading-relaxed text-muted-foreground">
                Swiss-minimalist design tokens, single-source theme,
                cohesive light & dark.
              </p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-10 md:py-12">
            <div className="mb-8 flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {current.group}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {current.label}
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                {current.description}
              </p>
            </div>
            <Separator className="mb-10" />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
