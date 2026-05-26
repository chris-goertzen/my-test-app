import * as React from "react"
import { cn } from "@/lib/utils"

type SectionProps = {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function Section({ title, description, children, className }: SectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <header className="space-y-1">
        <h3 className="text-base font-medium tracking-tight">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-2xl">{description}</p>
        )}
      </header>
      <div className="rounded-lg border bg-card p-6 shadow-sm">{children}</div>
    </section>
  )
}

export function SectionGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid gap-6 md:grid-cols-2", className)}>{children}</div>
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-10 border-b pb-8">
      {eyebrow && (
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </div>
      )}
      <h1 className="typo-display text-3xl font-semibold leading-tight md:text-4xl">{title}</h1>
      {description && (
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">{description}</p>
      )}
    </div>
  )
}
