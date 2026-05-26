import type { LucideIcon } from "lucide-react"
import {
  LayoutGrid,
  MousePointerClick,
  FormInput,
  ListChecks,
  Table2,
  PanelTopOpen,
  Bell,
  Navigation as NavigationIcon,
  Type,
} from "lucide-react"

export type SectionId =
  | "overview"
  | "buttons"
  | "forms"
  | "selection"
  | "data-display"
  | "overlays"
  | "feedback"
  | "navigation"
  | "typography"

export type NavItem = {
  id: SectionId
  label: string
  description: string
  icon: LucideIcon
  group: "Get started" | "Components"
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "overview",
    label: "Overview",
    description: "Welcome & high-level summary",
    icon: LayoutGrid,
    group: "Get started",
  },
  {
    id: "buttons",
    label: "Buttons",
    description: "Variants, sizes, states",
    icon: MousePointerClick,
    group: "Components",
  },
  {
    id: "forms",
    label: "Forms",
    description: "Inputs, textarea, labels",
    icon: FormInput,
    group: "Components",
  },
  {
    id: "selection",
    label: "Selection",
    description: "Checkbox, switch, radio, select, slider",
    icon: ListChecks,
    group: "Components",
  },
  {
    id: "data-display",
    label: "Data display",
    description: "Cards, badges, tables, separators, skeletons",
    icon: Table2,
    group: "Components",
  },
  {
    id: "overlays",
    label: "Overlays",
    description: "Dialog, sheet, popover, dropdown, tooltip",
    icon: PanelTopOpen,
    group: "Components",
  },
  {
    id: "feedback",
    label: "Feedback",
    description: "Alerts, toasts, progress",
    icon: Bell,
    group: "Components",
  },
  {
    id: "navigation",
    label: "Navigation",
    description: "Tabs, accordion, collapsible, command",
    icon: NavigationIcon,
    group: "Components",
  },
  {
    id: "typography",
    label: "Typography",
    description: "Type scale and emphasis",
    icon: Type,
    group: "Components",
  },
]

export function isSectionId(value: string): value is SectionId {
  return NAV_ITEMS.some((item) => item.id === value)
}
