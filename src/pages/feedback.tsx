import { useEffect, useState } from "react"
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Rocket,
  Terminal,
  XCircle,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PageSection } from "@/components/page-section"
import { useToast } from "@/components/ui/toast"

export function FeedbackPage() {
  const { toast } = useToast()
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 13 : p + 7))
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col">
      <PageSection
        title="Alerts"
        description="Inline messaging across status levels."
      >
        <div className="grid gap-3">
          <Alert>
            <Terminal />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the CLI.
            </AlertDescription>
          </Alert>
          <Alert variant="success">
            <CheckCircle2 />
            <AlertTitle>Deployed</AlertTitle>
            <AlertDescription>
              Build artifact is live on production.
            </AlertDescription>
          </Alert>
          <Alert variant="info">
            <Info />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
              We will pause writes during the migration window.
            </AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTriangle />
            <AlertTitle>Approaching limit</AlertTitle>
            <AlertDescription>
              You have used 92% of your quota for the month.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <XCircle />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
              We could not save your changes. Try again in a few moments.
            </AlertDescription>
          </Alert>
        </div>
      </PageSection>

      <PageSection
        title="Toasts"
        description="Transient feedback shown in the corner of the screen."
      >
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() =>
              toast({
                title: "Scheduled",
                description: "Friday, 14 May at 5:00pm",
              })
            }
          >
            Show default
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast({
                title: "Saved",
                description: "Settings synced to your account.",
                variant: "success",
              })
            }
          >
            Success toast
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              toast({
                title: "Uh oh!",
                description: "There was a problem with your request.",
                variant: "destructive",
              })
            }
          >
            Destructive toast
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              toast({
                title: "Launched",
                description: "Your app is rolling out.",
              })
            }
          >
            <Rocket />
            Trigger with icon hint
          </Button>
        </div>
      </PageSection>

      <PageSection
        title="Progress"
        description="Determinate progress communicates duration."
      >
        <div className="grid max-w-md gap-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Migrating data</span>
            <span className="font-mono">{progress}%</span>
          </div>
          <Progress value={progress} />
          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div>
              <Progress value={25} className="mb-1" />
              25%
            </div>
            <div>
              <Progress value={50} className="mb-1" />
              50%
            </div>
            <div>
              <Progress value={75} className="mb-1" />
              75%
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  )
}
