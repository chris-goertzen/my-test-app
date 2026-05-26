import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-md border p-4 pr-8 shadow-lg animate-slide-in-right",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        destructive:
          "border-destructive/50 bg-destructive text-destructive-foreground",
        success: "border-success/50 bg-background text-success",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface Toast {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: VariantProps<typeof toastVariants>["variant"]
  duration?: number
}

type ToastInput = Omit<Toast, "id"> & { id?: string }

type ToastContextValue = {
  toasts: Toast[]
  toast: (t: ToastInput) => string
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined
)

let toastIdCounter = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = React.useCallback(
    (t: ToastInput) => {
      const id = t.id ?? `toast-${++toastIdCounter}`
      const duration = t.duration ?? 4500
      setToasts((prev) => [...prev, { ...t, id }])
      if (duration > 0) {
        window.setTimeout(() => dismiss(id), duration)
      }
      return id
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}

export function Toaster() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) return null
  if (typeof document === "undefined") return null

  return createPortal(
    <div className="pointer-events-none fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {ctx.toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          aria-live="polite"
          className={cn(toastVariants({ variant: t.variant }))}
        >
          <div className="grid gap-1">
            {t.title && (
              <div className="text-sm font-semibold leading-none tracking-tight">
                {t.title}
              </div>
            )}
            {t.description && (
              <div className="text-sm opacity-90">{t.description}</div>
            )}
          </div>
          {t.action}
          <button
            type="button"
            onClick={() => ctx.dismiss(t.id)}
            className="absolute right-2 top-2 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>,
    document.body
  )
}
