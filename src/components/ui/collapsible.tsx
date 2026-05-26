import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@/components/ui/slot"

type CollapsibleContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}
const CollapsibleContext = React.createContext<
  CollapsibleContextValue | undefined
>(undefined)

function useCollapsible() {
  const ctx = React.useContext(CollapsibleContext)
  if (!ctx)
    throw new Error("Collapsible components must be used within <Collapsible>")
  return ctx
}

export interface CollapsibleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ open, defaultOpen, onOpenChange, children, className, ...props }, ref) => {
    const isControlled = open !== undefined
    const [internal, setInternal] = React.useState<boolean>(
      defaultOpen ?? false
    )
    const value = isControlled ? !!open : internal
    const setOpen = (next: boolean) => {
      if (!isControlled) setInternal(next)
      onOpenChange?.(next)
    }
    return (
      <CollapsibleContext.Provider value={{ open: value, setOpen }}>
        <div ref={ref} className={cn(className)} data-state={value ? "open" : "closed"} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    )
  }
)
Collapsible.displayName = "Collapsible"

interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ onClick, asChild, ...props }, ref) => {
  const { open, setOpen } = useCollapsible()
  const Comp = (asChild ? Slot : "button") as React.ElementType
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : "button"}
      aria-expanded={open}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        setOpen(!open)
      }}
      {...props}
    />
  )
})
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open } = useCollapsible()
  if (!open) return null
  return (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  )
})
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
