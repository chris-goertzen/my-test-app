import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { PageSection, Demo } from "@/components/page-section"

export function SelectionPage() {
  const [terms, setTerms] = useState(true)
  const [marketing, setMarketing] = useState(false)
  const [notify, setNotify] = useState(true)
  const [plan, setPlan] = useState("studio")
  const [framework, setFramework] = useState<string | undefined>("react")
  const [volume, setVolume] = useState<number[]>([45])

  return (
    <div className="flex flex-col">
      <PageSection
        title="Checkbox"
        description="Binary state with indeterminate-friendly visuals."
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Checkbox
              id="terms"
              checked={terms}
              onCheckedChange={setTerms}
            />
            <Label htmlFor="terms">Accept terms & conditions</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="marketing"
              checked={marketing}
              onCheckedChange={setMarketing}
            />
            <Label htmlFor="marketing">Send me product updates</Label>
          </div>
          <div className="flex items-center gap-3 opacity-60">
            <Checkbox id="locked" disabled />
            <Label htmlFor="locked">Disabled option</Label>
          </div>
        </div>
      </PageSection>

      <PageSection
        title="Switch"
        description="Single-action settings toggle."
      >
        <div className="grid max-w-sm gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Label htmlFor="notify">Push notifications</Label>
              <span className="text-xs text-muted-foreground">
                Browser alerts for new activity.
              </span>
            </div>
            <Switch id="notify" checked={notify} onCheckedChange={setNotify} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Label htmlFor="beta">Beta features</Label>
              <span className="text-xs text-muted-foreground">
                Opt-in to experimental builds.
              </span>
            </div>
            <Switch id="beta" defaultChecked={false} />
          </div>
          <div className="flex items-center justify-between opacity-60">
            <Label htmlFor="locked-switch">Disabled</Label>
            <Switch id="locked-switch" disabled />
          </div>
        </div>
      </PageSection>

      <PageSection
        title="Radio group"
        description="Mutually exclusive choices."
      >
        <RadioGroup value={plan} onValueChange={setPlan} className="grid max-w-sm gap-3">
          {[
            { v: "free", l: "Free", d: "Solo projects and tinkering." },
            { v: "studio", l: "Studio", d: "Small teams shipping fast." },
            { v: "enterprise", l: "Enterprise", d: "Org-wide controls." },
          ].map((opt) => (
            <label
              key={opt.v}
              htmlFor={`plan-${opt.v}`}
              className="flex cursor-pointer items-start gap-3 rounded-md border border-border p-3 transition-colors has-[[data-state=checked]]:border-foreground"
            >
              <RadioGroupItem
                id={`plan-${opt.v}`}
                value={opt.v}
                className="mt-1"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{opt.l}</span>
                <span className="text-xs text-muted-foreground">{opt.d}</span>
              </div>
            </label>
          ))}
        </RadioGroup>
      </PageSection>

      <PageSection
        title="Select"
        description="Dropdown selection with grouped items."
      >
        <Demo label="Framework">
          <div className="max-w-xs">
            <Label className="mb-2 block">Framework</Label>
            <Select value={framework} onValueChange={setFramework}>
              <SelectTrigger>
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectLabel>JavaScript</SelectLabel>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="solid">SolidJS</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
                <SelectSeparator />
                <SelectLabel>Other</SelectLabel>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="qwik" disabled>
                  Qwik (soon)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Demo>
      </PageSection>

      <PageSection
        title="Slider"
        description="Continuous range input."
      >
        <div className="grid max-w-sm gap-3">
          <div className="flex items-center justify-between text-sm">
            <Label htmlFor="vol">Volume</Label>
            <span className="font-mono text-muted-foreground">{volume[0]}</span>
          </div>
          <Slider
            id="vol"
            value={volume}
            onValueChange={setVolume}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </PageSection>
    </div>
  )
}
