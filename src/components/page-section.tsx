import * as React from "react"
import { cn } from "@/lib/utils"

type PageSectionProps = {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export function PageSection({
  title,
  description,
  children,
  className,
  contentClassName,
}: PageSectionProps) {
  return (
    <section
      className={cn(
        "grid gap-6 border-t border-border py-10 first:border-t-0 first:pt-0 md:grid-cols-[260px_1fr] md:gap-12",
        className
      )}
    >
      <header className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </header>
      <div className={cn("min-w-0", contentClassName)}>{children}</div>
    </section>
  )
}

export function Demo({
  label,
  children,
  className,
}: {
  label?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label && (
        <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </div>
      )}
      {children}
    </div>
  )
}
