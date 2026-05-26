import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type SelectContextValue = {
  value?: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
  registerItem: (value: string, label: React.ReactNode) => void
  unregisterItem: (value: string) => void
  labels: Map<string, React.ReactNode>
}

const SelectContext = React.createContext<SelectContextValue | undefined>(
  undefined
)

function useSelect() {
  const ctx = React.useContext(SelectContext)
  if (!ctx) throw new Error("Select components must be used within <Select>")
  return ctx
}

export interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children?: React.ReactNode
  disabled?: boolean
}

function Select({
  value,
  defaultValue,
  onValueChange,
  children,
}: SelectProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState<string | undefined>(
    defaultValue
  )
  const current = isControlled ? value : internal
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [labels, setLabels] = React.useState<Map<string, React.ReactNode>>(
    () => new Map()
  )

  const handleChange = React.useCallback(
    (v: string) => {
      if (!isControlled) setInternal(v)
      onValueChange?.(v)
      setOpen(false)
    },
    [isControlled, onValueChange]
  )

  const registerItem = React.useCallback(
    (v: string, label: React.ReactNode) => {
      setLabels((prev) => {
        if (prev.get(v) === label) return prev
        const next = new Map(prev)
        next.set(v, label)
        return next
      })
    },
    []
  )

  const unregisterItem = React.useCallback((v: string) => {
    setLabels((prev) => {
      if (!prev.has(v)) return prev
      const next = new Map(prev)
      next.delete(v)
      return next
    })
  }, [])

  return (
    <SelectContext.Provider
      value={{
        value: current,
        onValueChange: handleChange,
        open,
        setOpen,
        triggerRef,
        registerItem,
        unregisterItem,
        labels,
      }}
    >
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const { open, setOpen, triggerRef } = useSelect()
  return (
    <button
      ref={(node) => {
        triggerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) (ref as React.RefObject<HTMLButtonElement | null>).current = node
      }}
      type="button"
      role="combobox"
      aria-expanded={open}
      onClick={(e) => {
        onClick?.(e)
        setOpen(!open)
      }}
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&>span]:line-clamp-1",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ placeholder, className, ...props }, ref) => {
    const { value, labels } = useSelect()
    const label = value !== undefined ? labels.get(value) : undefined
    return (
      <span
        ref={ref}
        className={cn(!label && "text-muted-foreground", className)}
        {...props}
      >
        {label ?? placeholder}
      </span>
    )
  }
)
SelectValue.displayName = "SelectValue"

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "popper" | "item-aligned"
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen, triggerRef } = useSelect()
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

    return (
      <div
        ref={(node) => {
          contentRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.RefObject<HTMLDivElement | null>).current = node
        }}
        role="listbox"
        className={cn(
          "absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-slide-in-down",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SelectContent.displayName = "SelectContent"

interface SelectItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, disabled, ...props }, ref) => {
    const {
      value: current,
      onValueChange,
      registerItem,
      unregisterItem,
    } = useSelect()
    const selected = current === value

    React.useEffect(() => {
      registerItem(value, children)
      return () => unregisterItem(value)
    }, [value, children, registerItem, unregisterItem])

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={selected}
        data-state={selected ? "checked" : "unchecked"}
        data-disabled={disabled ? "" : undefined}
        onClick={() => !disabled && onValueChange(value)}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
          "hover:bg-accent hover:text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {selected && <Check className="h-4 w-4" />}
        </span>
        {children}
      </div>
    )
  }
)
SelectItem.displayName = "SelectItem"

const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground",
      className
    )}
    {...props}
  />
))
SelectLabel.displayName = "SelectLabel"

const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
SelectSeparator.displayName = "SelectSeparator"

const SelectGroup = ({ children }: { children?: React.ReactNode }) => (
  <div role="group">{children}</div>
)

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
}
