import * as React from "react"
import { cn } from "@/lib/utils"

type TooltipContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(
  undefined
)

function useTooltip() {
  const ctx = React.useContext(TooltipContext)
  if (!ctx) throw new Error("Tooltip components must be used within <Tooltip>")
  return ctx
}

export interface TooltipProviderProps {
  children?: React.ReactNode
  delayDuration?: number
}

function TooltipProvider({ children }: TooltipProviderProps) {
  return <>{children}</>
}

export interface TooltipProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  delayDuration?: number
  children?: React.ReactNode
}

function Tooltip({
  open,
  defaultOpen,
  onOpenChange,
  children,
}: TooltipProps) {
  const isControlled = open !== undefined
  const [internal, setInternal] = React.useState<boolean>(defaultOpen ?? false)
  const value = isControlled ? !!open : internal
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternal(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  return (
    <TooltipContext.Provider value={{ open: value, setOpen }}>
      <span className="relative inline-flex">{children}</span>
    </TooltipContext.Provider>
  )
}

interface TooltipTriggerProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean
}

const TooltipTrigger = React.forwardRef<HTMLSpanElement, TooltipTriggerProps>(
  ({ children, ...props }, ref) => {
    const { setOpen } = useTooltip()
    return (
      <span
        ref={ref}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex"
        {...props}
      >
        {children}
      </span>
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", sideOffset = 6, children, ...props }, ref) => {
    const { open } = useTooltip()
    if (!open) return null

    const sideStyles: Record<string, string> = {
      top: "bottom-full left-1/2 -translate-x-1/2",
      bottom: "top-full left-1/2 -translate-x-1/2",
      left: "right-full top-1/2 -translate-y-1/2",
      right: "left-full top-1/2 -translate-y-1/2",
    }
    const offsetStyle: React.CSSProperties =
      side === "top"
        ? { marginBottom: sideOffset }
        : side === "bottom"
        ? { marginTop: sideOffset }
        : side === "left"
        ? { marginRight: sideOffset }
        : { marginLeft: sideOffset }

    return (
      <div
        ref={ref}
        role="tooltip"
        style={offsetStyle}
        className={cn(
          "absolute z-50 whitespace-nowrap rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-fade-in pointer-events-none",
          sideStyles[side],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
