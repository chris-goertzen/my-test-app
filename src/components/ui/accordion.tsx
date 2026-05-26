import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type AccordionContextValue = {
  type: "single" | "multiple"
  value: string[]
  toggle: (value: string) => void
  collapsible: boolean
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined
)

function useAccordion() {
  const ctx = React.useContext(AccordionContext)
  if (!ctx)
    throw new Error("Accordion items must be used within <Accordion>")
  return ctx
}

interface AccordionPropsBase
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  collapsible?: boolean
}

interface AccordionSingleProps extends AccordionPropsBase {
  type: "single"
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

interface AccordionMultipleProps extends AccordionPropsBase {
  type: "multiple"
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

type AccordionProps = AccordionSingleProps | AccordionMultipleProps

function Accordion(props: AccordionProps) {
  const { type, className, children, collapsible, ...rest } = props

  const isControlled =
    type === "single"
      ? (props as AccordionSingleProps).value !== undefined
      : (props as AccordionMultipleProps).value !== undefined

  const [internal, setInternal] = React.useState<string[]>(() => {
    if (type === "single") {
      const v = (props as AccordionSingleProps).defaultValue
      return v ? [v] : []
    }
    return (props as AccordionMultipleProps).defaultValue ?? []
  })

  const controlled: string[] = isControlled
    ? type === "single"
      ? (props as AccordionSingleProps).value
        ? [(props as AccordionSingleProps).value as string]
        : []
      : (props as AccordionMultipleProps).value ?? []
    : internal

  const setValue = (next: string[]) => {
    if (!isControlled) setInternal(next)
    if (type === "single") {
      ;(props as AccordionSingleProps).onValueChange?.(next[0] ?? "")
    } else {
      ;(props as AccordionMultipleProps).onValueChange?.(next)
    }
  }

  const toggle = (val: string) => {
    if (type === "single") {
      if (controlled.includes(val)) {
        if (collapsible) setValue([])
      } else {
        setValue([val])
      }
    } else {
      if (controlled.includes(val)) {
        setValue(controlled.filter((v) => v !== val))
      } else {
        setValue([...controlled, val])
      }
    }
  }

  // Strip non-DOM props from rest
  const {
    value: _v,
    defaultValue: _d,
    onValueChange: _o,
    ...domProps
  } = rest as Record<string, unknown>
  void _v; void _d; void _o;

  return (
    <AccordionContext.Provider
      value={{
        type,
        value: controlled,
        toggle,
        collapsible: !!collapsible,
      }}
    >
      <div className={cn("w-full", className)} {...(domProps as React.HTMLAttributes<HTMLDivElement>)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

type AccordionItemContextValue = {
  value: string
  open: boolean
}
const AccordionItemContext = React.createContext<
  AccordionItemContextValue | undefined
>(undefined)

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const ctx = useAccordion()
    const open = ctx.value.includes(value)
    return (
      <AccordionItemContext.Provider value={{ value, open }}>
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          className={cn("border-b border-border", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const ctx = useAccordion()
  const item = React.useContext(AccordionItemContext)
  if (!item) throw new Error("AccordionTrigger must be inside AccordionItem")
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={item.open}
      onClick={() => ctx.toggle(item.value)}
      className={cn(
        "flex flex-1 w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          item.open && "rotate-180"
        )}
      />
    </button>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const item = React.useContext(AccordionItemContext)
  if (!item) throw new Error("AccordionContent must be inside AccordionItem")
  if (!item.open) return null
  return (
    <div
      ref={ref}
      className={cn("overflow-hidden text-sm", className)}
      {...props}
    >
      <div className="pb-4 pt-0 text-muted-foreground">{children}</div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
