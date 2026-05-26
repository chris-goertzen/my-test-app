import { useState } from "react"
import {
  CalendarDays,
  Copy,
  Info,
  LifeBuoy,
  LogOut,
  MoreHorizontal,
  Settings,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PageSection } from "@/components/page-section"

export function OverlaysPage() {
  const [statusBar, setStatusBar] = useState(true)
  const [activityBar, setActivityBar] = useState(false)

  return (
    <div className="flex flex-col">
      <PageSection
        title="Dialog"
        description="Modal dialog for focused tasks."
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile. Click save when you’re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Ada Lovelace"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@ada"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageSection>

      <PageSection
        title="Sheet"
        description="Edge-anchored panel for secondary tasks."
      >
        <div className="flex flex-wrap gap-3">
          {(["right", "left", "top", "bottom"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline" className="capitalize">
                  Open {side}
                </Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>From the {side}</SheetTitle>
                  <SheetDescription>
                    Sheets anchor to any edge of the viewport. Press
                    escape to close.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-3 py-4">
                  <Label htmlFor="sheet-input">Project name</Label>
                  <Input
                    id="sheet-input"
                    placeholder="Untitled project"
                  />
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button>Save</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Popover"
        description="Lightweight floating layer for inline editing."
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarDays />
              Dimensions
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="grid gap-3">
              <div>
                <h4 className="text-sm font-medium">Dimensions</h4>
                <p className="text-xs text-muted-foreground">
                  Set the width and height for the layer.
                </p>
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label htmlFor="w" className="col-span-1">Width</Label>
                <Input id="w" defaultValue="100%" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label htmlFor="h" className="col-span-1">Height</Label>
                <Input id="h" defaultValue="25px" className="col-span-2 h-8" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </PageSection>

      <PageSection
        title="Dropdown menu"
        description="Action menu with separators and checkboxes."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open menu">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4" />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4" />
              Settings
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={statusBar}
              onCheckedChange={setStatusBar}
            >
              Status bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activityBar}
              onCheckedChange={setActivityBar}
            >
              Activity bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LifeBuoy className="h-4 w-4" />
              Support
            </DropdownMenuItem>
            <DropdownMenuItem destructive>
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PageSection>

      <PageSection
        title="Tooltip"
        description="Concise hover or focus hints."
      >
        <TooltipProvider>
          <div className="flex flex-wrap gap-3">
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="icon" aria-label="Info">
                  <Info />
                </Button>
              </TooltipTrigger>
              <TooltipContent>This is a helpful hint.</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline">
                  <Copy />
                  Copy link
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Copy to clipboard</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </PageSection>
    </div>
  )
}
