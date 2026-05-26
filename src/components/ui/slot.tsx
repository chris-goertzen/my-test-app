import * as React from "react"

type AnyProps = Record<string, unknown>

/** Lightweight Slot — clones a single child element and merges props. */
export const Slot = React.forwardRef<HTMLElement, AnyProps>(
  ({ children, ...slotProps }, ref) => {
    if (!React.isValidElement(children)) return null
    const child = children as React.ReactElement<AnyProps>

    const mergedProps: AnyProps = { ...child.props }
    for (const [key, value] of Object.entries(slotProps)) {
      const childValue = (child.props as AnyProps)[key]
      if (key === "className") {
        mergedProps[key] = [childValue, value].filter(Boolean).join(" ")
      } else if (key === "style") {
        mergedProps[key] = {
          ...(childValue as React.CSSProperties | undefined),
          ...(value as React.CSSProperties | undefined),
        }
      } else if (key.startsWith("on") && typeof value === "function") {
        // Compose event handlers, child's first so it can preventDefault
        const childHandler = childValue as
          | ((...args: unknown[]) => void)
          | undefined
        const parentHandler = value as (...args: unknown[]) => void
        mergedProps[key] = (...args: unknown[]) => {
          childHandler?.(...args)
          parentHandler(...args)
        }
      } else if (value !== undefined) {
        mergedProps[key] = value
      }
    }
    mergedProps.ref = ref

    return React.cloneElement(child, mergedProps)
  }
)
Slot.displayName = "Slot"
