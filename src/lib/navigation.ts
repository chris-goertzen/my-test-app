import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  MousePointerClick,
  TextCursorInput,
  ListChecks,
  AppWindow,
  Bell,
  PanelsTopLeft,
  Table2,
  Type,
} from "lucide-react"

export type NavItem = {
  to: string
  label: string
  icon: LucideIcon
  description: string
  components: string[]
}

export const navigation: NavItem[] = [
  {
    to: "/",
    label: "Overview",
    icon: LayoutDashboard,
    description: "Tour the gallery and design system tokens",
    components: ["Theme tokens", "Typography scale", "Color palette"],
  },
  {
    to: "/buttons",
    label: "Buttons & Actions",
    icon: MousePointerClick,
    description: "Buttons, toggles and contextual triggers",
    components: ["Button", "Toggle", "Toggle Group", "Dropdown Menu", "Context Menu"],
  },
  {
    to: "/inputs",
    label: "Form & Inputs",
    icon: TextCursorInput,
    description: "Text inputs, selection controls and validation",
    components: [
      "Input",
      "Textarea",
      "Label",
      "Checkbox",
      "Radio Group",
      "Switch",
      "Slider",
      "Select",
      "Input OTP",
    ],
  },
  {
    to: "/display",
    label: "Data Display",
    icon: Table2,
    description: "Tabular data, summaries and structural layout",
    components: ["Table", "Card", "Badge", "Avatar", "Aspect Ratio", "Separator", "Scroll Area"],
  },
  {
    to: "/feedback",
    label: "Feedback",
    icon: Bell,
    description: "Status, progress and toast messaging",
    components: ["Alert", "Progress", "Skeleton", "Toast", "Sonner", "Alert Dialog"],
  },
  {
    to: "/overlays",
    label: "Overlays & Popovers",
    icon: AppWindow,
    description: "Dialogs, sheets, drawers, popovers and tooltips",
    components: ["Dialog", "Sheet", "Drawer", "Popover", "Hover Card", "Tooltip", "Command"],
  },
  {
    to: "/navigation",
    label: "Navigation",
    icon: PanelsTopLeft,
    description: "Wayfinding patterns and structural nav",
    components: ["Tabs", "Navigation Menu", "Menubar", "Breadcrumb", "Pagination", "Accordion", "Collapsible"],
  },
  {
    to: "/typography",
    label: "Typography",
    icon: Type,
    description: "Headings, body, lead, quote, list and code",
    components: ["Heading", "Paragraph", "Lead", "Blockquote", "List", "Inline code"],
  },
  {
    to: "/utilities",
    label: "Utilities",
    icon: ListChecks,
    description: "Resizable panels, keyboard hints and small helpers",
    components: ["Resizable", "Kbd", "Skeleton"],
  },
]
