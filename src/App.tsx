import { useCallback, useEffect, useState } from "react"
import { AppShell } from "@/components/app-shell"
import { OverviewPage } from "@/pages/overview"
import { ButtonsPage } from "@/pages/buttons"
import { FormsPage } from "@/pages/forms"
import { SelectionPage } from "@/pages/selection"
import { DataDisplayPage } from "@/pages/data-display"
import { OverlaysPage } from "@/pages/overlays"
import { FeedbackPage } from "@/pages/feedback"
import { NavigationPage } from "@/pages/navigation"
import { TypographyPage } from "@/pages/typography"
import { isSectionId, type SectionId } from "@/lib/navigation"

const DEFAULT_SECTION: SectionId = "overview"

function readHashSection(): SectionId {
  if (typeof window === "undefined") return DEFAULT_SECTION
  const hash = window.location.hash.replace(/^#\/?/, "")
  return isSectionId(hash) ? hash : DEFAULT_SECTION
}

function App() {
  const [section, setSection] = useState<SectionId>(() => readHashSection())

  // Sync state -> URL hash
  useEffect(() => {
    const targetHash = `#/${section}`
    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, "", targetHash)
    }
  }, [section])

  // Sync URL hash -> state (back/forward)
  useEffect(() => {
    const onHash = () => setSection(readHashSection())
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  const handleNavigate = useCallback((id: SectionId) => {
    setSection(id)
    // Scroll to top on section change
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [])

  return (
    <AppShell section={section} onSectionChange={handleNavigate}>
      {renderSection(section, handleNavigate)}
    </AppShell>
  )
}

function renderSection(
  section: SectionId,
  onNavigate: (id: SectionId) => void
) {
  switch (section) {
    case "overview":
      return <OverviewPage onNavigate={onNavigate} />
    case "buttons":
      return <ButtonsPage />
    case "forms":
      return <FormsPage />
    case "selection":
      return <SelectionPage />
    case "data-display":
      return <DataDisplayPage />
    case "overlays":
      return <OverlaysPage />
    case "feedback":
      return <FeedbackPage />
    case "navigation":
      return <NavigationPage />
    case "typography":
      return <TypographyPage />
    default:
      return <OverviewPage onNavigate={onNavigate} />
  }
}

export default App
