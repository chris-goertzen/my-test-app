import { useEffect, useState } from "react"
import { toast as sonnerToast } from "sonner"
import { AlertTriangle, Info, ShieldAlert } from "lucide-react"
import { PageHeader, Section, SectionGrid } from "@/components/section"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

export default function FeedbackPage() {
  const [progress, setProgress] = useState(13)
  const { toast } = useToast()

  useEffect(() => {
    const t = setTimeout(() => setProgress(72), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Category"
        title="Feedback"
        description="Status messaging, progress, loading skeletons and confirmation dialogs."
      />

      <Section title="Alert" description="Inline tonal alert with optional icon.">
        <div className="space-y-3">
          <Alert>
            <Info />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the CLI.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <ShieldAlert />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
              Your session has expired. Please sign in again to continue.
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertTriangle />
            <AlertTitle>Maintenance window</AlertTitle>
            <AlertDescription>
              Scheduled downtime on Saturday between 02:00–04:00 UTC.
            </AlertDescription>
          </Alert>
        </div>
      </Section>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Progress" description="Continuous indicator for known durations.">
          <div className="space-y-3">
            <Progress value={progress} />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{progress}%</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  setProgress((p) => (p >= 100 ? 0 : Math.min(100, p + 17)))
                }
              >
                Advance
              </Button>
            </div>
          </div>
        </Section>

        <Section title="Skeleton" description="Loading placeholder while content fetches.">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <SectionGrid>
        <Section title="Toast (Radix)" description="Stacked notifications with action.">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  title: "Saved",
                  description: "Your changes have been stored.",
                })
              }
            >
              Show toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  variant: "destructive",
                  title: "Uh oh!",
                  description: "There was a problem with your request.",
                })
              }
            >
              Destructive toast
            </Button>
          </div>
        </Section>

        <Section title="Sonner" description="Lightweight notification system from emilkowalski.">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => sonnerToast("Event has been created")}>
              Sonner: simple
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                sonnerToast.success("Project deployed", {
                  description: "Build #324 published to production.",
                })
              }
            >
              Sonner: success
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                sonnerToast.error("Deploy failed", {
                  description: "Type error in main.tsx",
                  action: { label: "Retry", onClick: () => sonnerToast("Retrying…") },
                })
              }
            >
              Sonner: error + action
            </Button>
          </div>
        </Section>
      </SectionGrid>

      <div className="my-8" />

      <Section title="Alert dialog" description="Confirm a destructive action.">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => sonnerToast("Account deleted")}
              >
                Confirm delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Section>
    </>
  )
}
