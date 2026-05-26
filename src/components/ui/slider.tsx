import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "type"
  > {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      value,
      defaultValue,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined
    const [internal, setInternal] = React.useState<number>(
      defaultValue?.[0] ?? min
    )
    const current = isControlled ? value![0] ?? min : internal
    const pct = ((current - min) / (max - min)) * 100

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value)
      if (!isControlled) setInternal(v)
      onValueChange?.([v])
    }

    return (
      <div
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          disabled && "opacity-50",
          className
        )}
      >
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
          <div
            className="absolute h-full bg-primary"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={current}
          onChange={handleChange}
          disabled={disabled}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
          {...props}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute block h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background shadow"
          style={{ left: `${pct}%` }}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
