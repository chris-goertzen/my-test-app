import { useState } from "react"
import { Mail, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PageSection, Demo } from "@/components/page-section"
import { useToast } from "@/components/ui/toast"

export function FormsPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState<string | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes("@")) {
      setEmailError("Enter a valid email address.")
      return
    }
    setEmailError(null)
    toast({
      title: "Subscribed",
      description: `We sent a confirmation to ${email}.`,
    })
  }

  return (
    <div className="flex flex-col">
      <PageSection
        title="Inputs"
        description="Text inputs across types and adornments."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Demo label="Default">
            <Label htmlFor="default-input">Username</Label>
            <Input id="default-input" placeholder="ada.lovelace" />
          </Demo>
          <Demo label="With icon">
            <Label htmlFor="search-input">Search</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="search-input" className="pl-9" placeholder="Find anything" />
            </div>
          </Demo>
          <Demo label="Email">
            <Label htmlFor="email-input">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email-input"
                type="email"
                className="pl-9"
                placeholder="you@studio.com"
              />
            </div>
          </Demo>
          <Demo label="Disabled">
            <Label htmlFor="disabled-input">Read-only</Label>
            <Input id="disabled-input" disabled defaultValue="locked" />
          </Demo>
          <Demo label="Number">
            <Label htmlFor="num-input">Quantity</Label>
            <Input id="num-input" type="number" defaultValue={1} min={0} />
          </Demo>
          <Demo label="File">
            <Label htmlFor="file-input">Attachment</Label>
            <Input id="file-input" type="file" />
          </Demo>
        </div>
      </PageSection>

      <PageSection
        title="Textarea & labels"
        description="Multi-line input with helper text and counter."
      >
        <div className="grid max-w-lg gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Tell us what you think…" rows={5} />
          <p className="text-xs text-muted-foreground">
            Your message will be read by a human within one business day.
          </p>
        </div>
      </PageSection>

      <PageSection
        title="Validated form"
        description="A small form with live validation and toast feedback."
      >
        <Card className="max-w-lg">
          <form onSubmit={submit}>
            <CardHeader>
              <CardTitle>Subscribe</CardTitle>
              <CardDescription>
                Monthly digest, never spam. Cancel any time.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sub-name">Name</Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="sub-name" className="pl-9" placeholder="Your name" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sub-email">Email</Label>
                <Input
                  id="sub-email"
                  type="email"
                  placeholder="you@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!emailError}
                />
                {emailError && (
                  <p className="text-xs text-destructive">{emailError}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="ghost" type="button" onClick={() => setEmail("")}>
                Reset
              </Button>
              <Button type="submit">Subscribe</Button>
            </CardFooter>
          </form>
        </Card>
      </PageSection>
    </div>
  )
}
