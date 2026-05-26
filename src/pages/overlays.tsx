import { useState } from "react"
import { CalendarDays } from "lucide-react"
import { PageHeader, Section, SectionGrid } from "@/components/section"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Calendar, Calculator, CreditCard, Settings, Smile, User } from "lucide-react"
import { Kbd } from "@/components/ui/kbd"

export default function OverlaysPage() {
  const [cmdOpen, setCmdOpen] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Category"
        title="Overlays & Popovers"
        description="Modal dialogs, sheets, drawers, popovers, tooltips and the command palette."
      />

      <SectionGrid>
        <Section title="Dialog" description="Modal overlay with header, body, footer.">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Update your account preferences. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="dn">Display name</Label>
                  <Input id="dn" defaultValue="@shadcn" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="un">Username</Label>
                  <Input id="un" defaultValue="shadcn" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost">Cancel</Button>
                <Button>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Sheet" description="Side-anchored panel for secondary tasks.">
          <div className="flex flex-wrap gap-2">
            {(["left", "right", "top", "bottom"] as const).map((side) => (
              <Sheet key={side}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    {side}
                  </Button>
                </SheetTrigger>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>Sheet · {side}</SheetTitle>
                    <SheetDescription>
                      Sheets anchor from any edge.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 text-sm text-muted-foreground">
                    Body content goes here.
                  </div>
                  <SheetFooter>
                    <Button size="sm">Confirm</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Drawer" description="Bottom-anchored sheet (vaul) tuned for mobile.">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Move goal</DrawerTitle>
                  <DrawerDescription>Set your daily activity target.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="text-7xl font-bold tracking-tighter">350</div>
                    <div className="text-sm text-muted-foreground">CAL/DAY</div>
                  </div>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </Section>

        <Section title="Popover" description="Inline floating surface anchored to a trigger.">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Dimensions</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">Set the box for this element.</p>
                <div className="grid gap-2 pt-2">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <Label htmlFor="w">Width</Label>
                    <Input id="w" defaultValue="100%" className="col-span-2 h-8" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <Label htmlFor="h">Height</Label>
                    <Input id="h" defaultValue="240px" className="col-span-2 h-8" />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Hover card" description="Rich preview on hover or focus.">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="px-0">@shadcn</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex space-x-3">
                <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@shadcn</h4>
                  <p className="text-xs text-muted-foreground">Building beautiful, accessible UI.</p>
                  <div className="flex items-center pt-1 text-xs text-muted-foreground">
                    <CalendarDays className="mr-1 h-3 w-3" /> Joined December 2021
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </Section>

        <Section title="Tooltip" description="Short hint anchored to a control.">
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>Tooltip content</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="settings">
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open settings</TooltipContent>
            </Tooltip>
          </div>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <Section title="Command" description="Searchable command list with shortcuts. Use the dialog with ⌘K.">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="outline" onClick={() => setCmdOpen(true)} className="gap-2">
            Open command <Kbd>⌘ K</Kbd>
          </Button>
          <div className="w-full max-w-sm">
            <Command className="rounded-lg border shadow-sm">
              <CommandInput placeholder="Type a command…" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <Calendar className="mr-2 h-4 w-4" /> Calendar
                  </CommandItem>
                  <CommandItem>
                    <Smile className="mr-2 h-4 w-4" /> Emoji
                  </CommandItem>
                  <CommandItem>
                    <Calculator className="mr-2 h-4 w-4" /> Calculator
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <User className="mr-2 h-4 w-4" /> Profile <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <CreditCard className="mr-2 h-4 w-4" /> Billing <CommandShortcut>⌘B</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
        <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
          <CommandInput placeholder="Type a command…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setCmdOpen(false)}>
                <Calendar className="mr-2 h-4 w-4" /> Calendar
              </CommandItem>
              <CommandItem onSelect={() => setCmdOpen(false)}>
                <Smile className="mr-2 h-4 w-4" /> Emoji
              </CommandItem>
              <CommandItem onSelect={() => setCmdOpen(false)}>
                <Calculator className="mr-2 h-4 w-4" /> Calculator
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Section>
    </>
  )
}
