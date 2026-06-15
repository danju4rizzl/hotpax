import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LockGatePage } from "./pages/LockGatePage";
import { ComingSoonPage } from "./pages/ComingSoonPage";
import { MaintenancePage } from "./pages/MaintenancePage";
import { PaywallPage } from "./pages/PaywallPage";
import { PreviewThemeProvider } from "./components/PreviewShell";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PreviewThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lock-gate" element={<LockGatePage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/paywall" element={<PaywallPage />} />
        </Routes>
      </BrowserRouter>
    </PreviewThemeProvider>
  </StrictMode>
);
