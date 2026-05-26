import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { AppShell } from "@/components/app-shell"
import OverviewPage from "@/pages/overview"
import ButtonsPage from "@/pages/buttons"
import InputsPage from "@/pages/inputs"
import DisplayPage from "@/pages/display"
import FeedbackPage from "@/pages/feedback"
import OverlaysPage from "@/pages/overlays"
import NavigationPage from "@/pages/navigation"
import TypographyPage from "@/pages/typography"
import UtilitiesPage from "@/pages/utilities"

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <TooltipProvider delayDuration={200}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<OverviewPage />} />
              <Route path="buttons" element={<ButtonsPage />} />
              <Route path="inputs" element={<InputsPage />} />
              <Route path="display" element={<DisplayPage />} />
              <Route path="feedback" element={<FeedbackPage />} />
              <Route path="overlays" element={<OverlaysPage />} />
              <Route path="navigation" element={<NavigationPage />} />
              <Route path="typography" element={<TypographyPage />} />
              <Route path="utilities" element={<UtilitiesPage />} />
              <Route path="*" element={<OverviewPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
        <SonnerToaster />
      </TooltipProvider>
    </ThemeProvider>
  )
}
