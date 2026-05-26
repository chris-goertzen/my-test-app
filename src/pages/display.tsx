import { CheckCircle2, Clock3, XCircle } from "lucide-react"
import { PageHeader, Section, SectionGrid } from "@/components/section"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  { id: "INV-0042", status: "Paid", amount: "$1,250.00", date: "Mar 12", icon: CheckCircle2 },
  { id: "INV-0041", status: "Pending", amount: "$640.00", date: "Mar 09", icon: Clock3 },
  { id: "INV-0040", status: "Paid", amount: "$2,100.00", date: "Mar 05", icon: CheckCircle2 },
  { id: "INV-0039", status: "Failed", amount: "$340.00", date: "Feb 28", icon: XCircle },
  { id: "INV-0038", status: "Paid", amount: "$80.00", date: "Feb 18", icon: CheckCircle2 },
]

const tags = Array.from({ length: 24 }, (_, i) => `v${(i + 1).toString().padStart(2, "0")}.0.0`)

export default function DisplayPage() {
  return (
    <>
      <PageHeader
        eyebrow="Category"
        title="Data Display"
        description="Card surfaces, tabular data, badges, avatars and structural primitives."
      />

      <SectionGrid>
        <Section title="Card" description="Composable surface with header, body and footer.">
          <Card>
            <CardHeader>
              <CardTitle>Acme Inc.</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Cards anchor most surface-level work. They use the same border
                and background tokens as the rest of the gallery.
              </p>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="ghost" size="sm">Dismiss</Button>
              <Button size="sm">Open</Button>
            </CardFooter>
          </Card>
        </Section>

        <Section title="Badges" description="Tonal labels for status and metadata.">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge>v1.0.0</Badge>
            <Badge variant="outline">Beta</Badge>
            <Badge variant="secondary">2 new</Badge>
          </div>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Avatar" description="Profile photo with text fallback.">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/vercel.png" alt="vercel" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <div className="flex -space-x-2">
              <Avatar className="ring-2 ring-background">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="ring-2 ring-background">
                <AvatarFallback>RM</AvatarFallback>
              </Avatar>
              <Avatar className="ring-2 ring-background">
                <AvatarFallback>+3</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </Section>

        <Section title="Aspect ratio" description="Constrain media with a fixed ratio.">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md border bg-muted">
            <div className="grid h-full w-full place-items-center text-xs text-muted-foreground">
              16 : 9
            </div>
          </AspectRatio>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <Section title="Table" description="Tabular data with header, caption and hover row state.">
        <Table>
          <TableCaption>Recent invoices for your account.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((row) => {
              const Icon = row.icon
              return (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>
                    <Badge variant={row.status === "Failed" ? "destructive" : row.status === "Pending" ? "secondary" : "outline"}>
                      <Icon className="mr-1 h-3 w-3" />
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.date}</TableCell>
                  <TableCell className="text-right tabular-nums">{row.amount}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Section>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Separator" description="Horizontal & vertical dividers.">
          <div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
              <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Blog</div>
              <Separator orientation="vertical" />
              <div>Docs</div>
              <Separator orientation="vertical" />
              <div>Source</div>
            </div>
          </div>
        </Section>

        <Section title="Scroll area" description="Custom scrollbar for tall content.">
          <ScrollArea className="h-48 rounded-md border p-3">
            <div className="space-y-2 text-sm">
              {tags.map((t) => (
                <div key={t} className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{t}</span>
                  <Badge variant="outline" className="font-normal">released</Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Section>
      </SectionGrid>
    </>
  )
}
