import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@/components/ui/slot"

type PopoverContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
}

const PopoverContext = React.createContext<PopoverContextValue | undefined>(
  undefined
)

function usePopover() {
  const ctx = React.useContext(PopoverContext)
  if (!ctx) throw new Error("Popover components must be used within <Popover>")
  return ctx
}

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function Popover({
  open,
  defaultOpen,
  onOpenChange,
  children,
}: PopoverProps) {
  const isControlled = open !== undefined
  const [internal, setInternal] = React.useState<boolean>(defaultOpen ?? false)
  const value = isControlled ? !!open : internal
  const triggerRef = React.useRef<HTMLElement | null>(null)

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternal(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  return (
    <PopoverContext.Provider value={{ open: value, setOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  )
}

interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ onClick, asChild, ...props }, ref) => {
    const { open, setOpen, triggerRef } = usePopover()
    const Comp = (asChild ? Slot : "button") as React.ElementType
    return (
      <Comp
        ref={(node: HTMLElement | null) => {
          triggerRef.current = node
          if (typeof ref === "function") ref(node as HTMLButtonElement | null)
          else if (ref) (ref as React.RefObject<HTMLButtonElement | null>).current = node as HTMLButtonElement | null
        }}
        type={asChild ? undefined : "button"}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(e)
          setOpen(!open)
        }}
        {...props}
      />
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      className,
      align = "center",
      side = "bottom",
      sideOffset = 4,
      children,
      ...props
    },
    ref
  ) => {
    const { open, setOpen, triggerRef } = usePopover()
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
      if (!open) return
      const onClick = (e: MouseEvent) => {
        const t = e.target as Node
        if (
          contentRef.current &&
          !contentRef.current.contains(t) &&
          triggerRef.current &&
          !triggerRef.current.contains(t)
        ) {
          setOpen(false)
        }
      }
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false)
      }
      document.addEventListener("mousedown", onClick)
      document.addEventListener("keydown", onKey)
      return () => {
        document.removeEventListener("mousedown", onClick)
        document.removeEventListener("keydown", onKey)
      }
    }, [open, setOpen, triggerRef])

    if (!open) return null

    const sideStyles: Record<string, string> = {
      bottom: "top-full mt-1",
      top: "bottom-full mb-1",
      right: "left-full ml-1 top-0",
      left: "right-full mr-1 top-0",
    }
    const alignStyles: Record<string, string> = {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    }

    return (
      <div
        ref={(node) => {
          contentRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.RefObject<HTMLDivElement | null>).current = node
        }}
        role="dialog"
        style={{ marginTop: sideOffset }}
        className={cn(
          "absolute z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-slide-in-down",
          sideStyles[side],
          (side === "top" || side === "bottom") && alignStyles[align],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
