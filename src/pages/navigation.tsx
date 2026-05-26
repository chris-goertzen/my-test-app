import { ChevronRight } from "lucide-react"
import { PageHeader, Section, SectionGrid } from "@/components/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const queueItems = ["sign-in.tsx", "components/button.tsx", "routes/index.tsx"]

export default function NavigationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Category"
        title="Navigation"
        description="Wayfinding and structural navigation — tabs, menus, breadcrumbs and pagination."
      />

      <SectionGrid>
        <Section title="Tabs" description="Switch between sibling views.">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="pt-3 text-sm text-muted-foreground">
              Manage your account here. Edit name, email and contact information.
            </TabsContent>
            <TabsContent value="password" className="pt-3 text-sm text-muted-foreground">
              Update your password to keep your account secure.
            </TabsContent>
            <TabsContent value="api" className="pt-3 text-sm text-muted-foreground">
              Rotate keys, view logs and configure webhooks.
            </TabsContent>
          </Tabs>
        </Section>

        <Section title="Breadcrumb" description="Hierarchical path with separators.">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Navigation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <Section title="Accordion" description="Vertically stacked, expandable sections.">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it themed?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Of course. Every surface respects the active theme variables.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes, the height transition uses Radix collapsible primitives.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Collapsible" description="Single expand/collapse region.">
          <Collapsible className="w-full max-w-md">
            <div className="flex items-center justify-between gap-3 rounded-md border px-3 py-2">
              <p className="text-sm font-medium">@peduarte starred 3 repositories</p>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle">
                  <ChevronRight className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2 pt-2">
              {queueItems.map((it) => (
                <div key={it} className="rounded-md border px-3 py-2 text-sm">
                  {it}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </Section>

        <Section title="Pagination" description="Numbered navigation with prev/next.">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <Section title="Navigation menu" description="Horizontal menubar with expanding sub-panels.">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/20 to-muted p-4 no-underline outline-none" href="#">
                        <div className="mb-2 mt-4 text-lg font-medium">Gallery</div>
                        <p className="text-sm text-muted-foreground">
                          Beautifully designed components.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a href="#" className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
                        Introduction
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a href="#" className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
                        Installation
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a href="#" className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
                        Theming
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 p-4 md:grid-cols-2">
                  {["Buttons", "Forms", "Overlays", "Navigation"].map((c) => (
                    <li key={c}>
                      <NavigationMenuLink asChild>
                        <a href="#" className={cn(navigationMenuTriggerStyle(), "w-full justify-start")}>
                          {c}
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <a href="#" className={navigationMenuTriggerStyle()}>
                  Documentation
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Section>

      <div className="my-8" />

      <Section title="Menubar" description="Desktop-style menu bar with sub-menus.">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
              <MenubarItem>New window <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print… <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
              <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked>Bookmarks bar</MenubarCheckboxItem>
              <MenubarCheckboxItem>Status bar</MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarRadioGroup value="dense">
                <MenubarRadioItem value="cozy">Cozy</MenubarRadioItem>
                <MenubarRadioItem value="compact">Compact</MenubarRadioItem>
                <MenubarRadioItem value="dense">Dense</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Section>
    </>
  )
}
