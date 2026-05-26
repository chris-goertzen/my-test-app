import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PageSection } from "@/components/page-section"

const INVOICES = [
  {
    id: "INV-001",
    customer: "Atelier Vier",
    email: "billing@atelier4.ch",
    amount: "CHF 480.00",
    status: "Paid",
    statusVariant: "success" as const,
  },
  {
    id: "INV-002",
    customer: "Bauhaus Co.",
    email: "ar@bauhaus.co",
    amount: "CHF 1,240.00",
    status: "Pending",
    statusVariant: "warning" as const,
  },
  {
    id: "INV-003",
    customer: "Helvetica Studio",
    email: "hello@helvetica.studio",
    amount: "CHF 980.00",
    status: "Overdue",
    statusVariant: "destructive" as const,
  },
  {
    id: "INV-004",
    customer: "Müller & Söhne",
    email: "kontakt@mueller.ch",
    amount: "CHF 320.00",
    status: "Paid",
    statusVariant: "success" as const,
  },
]

export function DataDisplayPage() {
  return (
    <div className="flex flex-col">
      <PageSection
        title="Cards"
        description="Bordered containers for grouped content."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Alpha</CardTitle>
              <CardDescription>Updated 2 days ago</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              A lightweight prototype demonstrating the Swiss grid in action,
              with hairline separators and consistent type rhythm.
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="ghost">Archive</Button>
              <Button>Open</Button>
            </CardFooter>
          </Card>
          <Card className="bg-muted/40">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>System status</CardTitle>
                <CardDescription>All systems operational</CardDescription>
              </div>
              <Badge variant="success">Healthy</Badge>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 text-sm">
                {["API", "Web", "Background workers"].map((row) => (
                  <li key={row} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{row}</span>
                    <span className="font-mono text-xs">99.99%</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection
        title="Badges"
        description="Compact status pills across six variants."
      >
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </PageSection>

      <PageSection
        title="Separators"
        description="Horizontal and vertical dividers."
      >
        <div className="grid gap-4 max-w-md">
          <div className="text-sm">
            <span className="font-medium">Above</span>
            <Separator className="my-3" />
            <span className="text-muted-foreground">Below</span>
          </div>
          <div className="flex h-10 items-center text-sm">
            <span>Item</span>
            <Separator orientation="vertical" className="mx-4" />
            <span>Another</span>
            <Separator orientation="vertical" className="mx-4" />
            <span className="text-muted-foreground">More</span>
          </div>
        </div>
      </PageSection>

      <PageSection
        title="Avatars"
        description="Image with graceful fallback to initials."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="A" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="" alt="" />
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12">
            <AvatarFallback>EF</AvatarFallback>
          </Avatar>
          <div className="flex -space-x-2">
            <Avatar className="ring-2 ring-background">
              <AvatarFallback>GH</AvatarFallback>
            </Avatar>
            <Avatar className="ring-2 ring-background">
              <AvatarFallback>IJ</AvatarFallback>
            </Avatar>
            <Avatar className="ring-2 ring-background">
              <AvatarFallback>+9</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </PageSection>

      <PageSection
        title="Skeletons"
        description="Loading placeholders that match real layout."
      >
        <div className="grid max-w-md gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </PageSection>

      <PageSection
        title="Table"
        description="Tabular data with hover affordance."
      >
        <Card className="overflow-hidden">
          <Table>
            <TableCaption>Recent invoices, Q1.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{inv.customer}</span>
                      <span className="text-xs text-muted-foreground">
                        {inv.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={inv.statusVariant}>{inv.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {inv.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </PageSection>
    </div>
  )
}
