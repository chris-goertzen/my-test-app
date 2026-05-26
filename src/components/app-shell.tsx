import * as React from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { Menu, Github, Shapes } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/theme-toggle"
import { navigation } from "@/lib/navigation"

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="px-3 py-4">
      <div className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Components
      </div>
      <ul className="space-y-0.5">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={onNavigate}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function AppShell() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(() => {
    setMobileOpen(false)
    if (typeof window !== "undefined") window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="flex h-14 items-center gap-3 px-4 md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="border-b px-5 py-4 text-left">
                  <SheetTitle className="flex items-center gap-2 text-base">
                    <Shapes className="h-4 w-4" /> shadcn/ui Gallery
                  </SheetTitle>
                  <SheetDescription className="text-xs">
                    A Swiss-minimalist showcase
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-72px)]">
                  <NavList onNavigate={() => setMobileOpen(false)} />
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>

          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md border bg-card">
              <Shapes className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              shadcn/ui Gallery
            </span>
            <span className="hidden text-xs text-muted-foreground md:inline">
              · component showcase
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-1">
            <Button asChild variant="ghost" size="icon" aria-label="GitHub">
              <a href="https://github.com/shadcn-ui/ui" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Separator orientation="vertical" className="mx-1 h-5" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1400px]">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r bg-sidebar text-sidebar-foreground md:block">
          <ScrollArea className="h-full">
            <NavList />
          </ScrollArea>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-10 md:py-12">
            <Outlet />
          </div>
          <footer className="border-t">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 text-xs text-muted-foreground md:px-10">
              <span>Built with React, Tailwind v4 and shadcn/ui primitives.</span>
              <span className="hidden md:inline">Swiss minimalist · 8pt grid</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
