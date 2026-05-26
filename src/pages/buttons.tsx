import { useState } from "react"
import {
  ArrowRight,
  Check,
  Download,
  Heart,
  Loader2,
  Mail,
  Plus,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageSection, Demo } from "@/components/page-section"

export function ButtonsPage() {
  const [loading, setLoading] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <div className="flex flex-col">
      <PageSection
        title="Variants"
        description="Six baseline variants spanning emphasis levels."
      >
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </PageSection>

      <PageSection
        title="Sizes"
        description="Four sizes including a square icon-only variant."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Add">
            <Plus />
          </Button>
        </div>
      </PageSection>

      <PageSection
        title="With icons"
        description="Icons compose naturally on either side of the label."
      >
        <div className="flex flex-wrap gap-3">
          <Button>
            <Mail />
            Email
          </Button>
          <Button variant="outline">
            <Download />
            Download
          </Button>
          <Button variant="secondary">
            Continue
            <ArrowRight />
          </Button>
          <Button variant="destructive">
            <Trash2 />
            Delete
          </Button>
        </div>
      </PageSection>

      <PageSection
        title="States"
        description="Loading, disabled, and toggled — the same component."
      >
        <div className="flex flex-wrap gap-3">
          <Button
            disabled={loading}
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 1400)
            }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Saving
              </>
            ) : (
              <>
                <Check />
                Save
              </>
            )}
          </Button>
          <Button disabled>Disabled</Button>
          <Button
            variant={liked ? "default" : "outline"}
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
          >
            <Heart
              className={liked ? "fill-current" : ""}
            />
            {liked ? "Liked" : "Like"}
          </Button>
        </div>
      </PageSection>

      <PageSection
        title="Composition"
        description="Use asChild to render as anchors or other elements."
      >
        <Demo label="Anchor as button">
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="#overview">Anchor as primary</a>
            </Button>
            <Button asChild variant="link">
              <a href="#overview">Documentation</a>
            </Button>
          </div>
        </Demo>
      </PageSection>
    </div>
  )
}
