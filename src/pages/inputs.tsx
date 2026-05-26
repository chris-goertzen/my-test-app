import { useState } from "react"
import { PageHeader, Section, SectionGrid } from "@/components/section"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function InputsPage() {
  const [otp, setOtp] = useState("")
  const [volume, setVolume] = useState([42])

  return (
    <>
      <PageHeader
        eyebrow="Category"
        title="Form & Inputs"
        description="Text fields, selection controls, sliders and a complete sample form."
      />

      <SectionGrid>
        <Section title="Input" description="Email, password, number, file and disabled states.">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pass">Password</Label>
              <Input id="pass" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="file">Avatar</Label>
              <Input id="file" type="file" />
            </div>
            <Input disabled placeholder="Disabled input" />
          </div>
        </Section>

        <Section title="Textarea" description="Multi-line input with placeholder.">
          <div className="space-y-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" rows={6} placeholder="Tell us a little about yourself." />
            <p className="text-xs text-muted-foreground">Max 280 characters.</p>
          </div>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Checkbox" description="With label, helper text and disabled state.">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Checkbox id="terms" defaultChecked />
              <div className="grid gap-1">
                <Label htmlFor="terms">Accept terms and conditions</Label>
                <p className="text-xs text-muted-foreground">
                  You agree to our policy. You may opt out at any time.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="news" />
              <Label htmlFor="news">Subscribe to newsletter</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="disabled" disabled />
              <Label htmlFor="disabled">Disabled</Label>
            </div>
          </div>
        </Section>

        <Section title="Radio group" description="Single-select from a list of options.">
          <RadioGroup defaultValue="standard">
            <div className="flex items-center gap-3">
              <RadioGroupItem id="r1" value="standard" />
              <Label htmlFor="r1">Standard delivery — 5 days</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem id="r2" value="express" />
              <Label htmlFor="r2">Express — 2 days</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem id="r3" value="overnight" />
              <Label htmlFor="r3">Overnight</Label>
            </div>
          </RadioGroup>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Switch" description="Inline toggle for settings.">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="notif">Email notifications</Label>
              <Switch id="notif" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing">Marketing emails</Label>
              <Switch id="marketing" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="public">Public profile</Label>
              <Switch id="public" defaultChecked />
            </div>
          </div>
        </Section>

        <Section title="Slider" description="Range input — drag to adjust.">
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <Label>Volume</Label>
                <span className="text-muted-foreground">{volume[0]}%</span>
              </div>
              <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <Label>Brightness</Label>
                <span className="text-muted-foreground">defaults</span>
              </div>
              <Slider defaultValue={[25, 75]} max={100} step={1} />
            </div>
          </div>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Select" description="Single-select dropdown with groups and labels.">
          <div className="max-w-sm space-y-1.5">
            <Label htmlFor="fruit">Favorite fruit</Label>
            <Select>
              <SelectTrigger id="fruit">
                <SelectValue placeholder="Pick one" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Citrus</SelectLabel>
                  <SelectItem value="lemon">Lemon</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Berries</SelectLabel>
                  <SelectItem value="strawberry">Strawberry</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </Section>

        <Section title="Input OTP" description="Six-digit verification input.">
          <div className="space-y-3">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-xs text-muted-foreground">Code: {otp || "—"}</p>
          </div>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <Section title="Composed form" description="A complete form composition using Card + inputs.">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-xl"
        >
          <Card>
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>Deploy your new app in one click.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="acme-inc" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Pick a framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="remix">Remix</SelectItem>
                    <SelectItem value="vite">Vite</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="private">Private repository</Label>
                <Switch id="private" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="ghost" type="button">Cancel</Button>
              <Button type="submit">Deploy</Button>
            </CardFooter>
          </Card>
        </form>
      </Section>
    </>
  )
}
