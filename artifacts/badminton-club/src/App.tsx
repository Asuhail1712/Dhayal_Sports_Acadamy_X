import { useEffect, useRef, useState } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useScrollRestoration } from "@/hooks/use-scroll-restoration";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Programs from "./pages/Programs";
import ProgramDetail from "./pages/ProgramDetail";
import CoachesPage from "./pages/CoachesPage";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/blogs" component={Blogs} />
      <Route path="/blogs/:slug">
        {(params) => <BlogDetail slug={params.slug} />}
      </Route>
      <Route path="/programs" component={Programs} />
      <Route path="/programs/:slug">
        {(params) => <ProgramDetail slug={params.slug} />}
      </Route>
      <Route path="/coaches" component={CoachesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollManager() {
  const [location] = useLocation();
  useScrollRestoration(location);

  return null;
}

function AppContent() {
  const [location] = useLocation();
  const isHomeRoute = location === "/" || location.startsWith("/#");

  return (
    <div className="route-transition-app">
      <div
        className={isHomeRoute ? "block" : "hidden"}
        aria-hidden={!isHomeRoute}
      >
        <Home />
      </div>

      {!isHomeRoute ? <Router /> : null}
    </div>
  );
}

function RouteTransitionOverlay() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const startedAtRef = useRef(0);
  const hideTimeoutRef = useRef<number | null>(null);
  const forceHideTimeoutRef = useRef<number | null>(null);
  const fixedDurationRef = useRef<number | null>(null);

  useEffect(() => {
    visibleRef.current = visible;
    document.body.dataset.routeTransition = visible ? "active" : "idle";
  }, [visible]);

  useEffect(() => {
    const clearTimers = () => {
      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      if (forceHideTimeoutRef.current !== null) {
        window.clearTimeout(forceHideTimeoutRef.current);
        forceHideTimeoutRef.current = null;
      }
    };

    const hideOverlay = () => {
      visibleRef.current = false;
      fixedDurationRef.current = null;
      setVisible(false);
      window.dispatchEvent(new CustomEvent("dhayal:route-transition-hidden"));
    };

    const handleStart = (event: Event) => {
      clearTimers();
      startedAtRef.current = performance.now();
      const customEvent = event as CustomEvent<{ fixedDuration?: number }>;
      fixedDurationRef.current =
        typeof customEvent.detail?.fixedDuration === "number"
          ? customEvent.detail.fixedDuration
          : null;
      visibleRef.current = true;
      setVisible(true);

      const fixedDuration = fixedDurationRef.current;
      if (fixedDuration !== null) {
        forceHideTimeoutRef.current = window.setTimeout(() => {
          hideOverlay();
          forceHideTimeoutRef.current = null;
        }, fixedDuration);
        return;
      }

      forceHideTimeoutRef.current = window.setTimeout(() => {
        hideOverlay();
        forceHideTimeoutRef.current = null;
      }, 520);
    };

    const handleComplete = () => {
      if (fixedDurationRef.current !== null) {
        return;
      }

      const elapsed = performance.now() - startedAtRef.current;
      const remaining = Math.max(0, 890 - elapsed);

      if (forceHideTimeoutRef.current !== null) {
        window.clearTimeout(forceHideTimeoutRef.current);
        forceHideTimeoutRef.current = null;
      }

      if (!visibleRef.current) {
        return;
      }

      hideTimeoutRef.current = window.setTimeout(() => {
        hideOverlay();
        hideTimeoutRef.current = null;
      }, remaining);
    };

    window.addEventListener("dhayal:route-transition-start", handleStart);
    window.addEventListener("dhayal:route-transition-complete", handleComplete);

    return () => {
      clearTimers();
      window.removeEventListener("dhayal:route-transition-start", handleStart);
      window.removeEventListener("dhayal:route-transition-complete", handleComplete);
    };
  }, []);

  return (
    <div
      className={`route-transition-overlay ${visible ? "is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="route-transition-overlay__backdrop" />
      <div className="route-transition-overlay__panel bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-lg">
        <div className="route-transition-overlay__aura" />
        <div className="route-transition-overlay__core">
          <div className="route-transition-overlay__spinner" />
          <div className="route-transition-overlay__spinner route-transition-overlay__spinner--secondary" />
          <div className="route-transition-overlay__dot" />
        </div>
        <div className="route-transition-overlay__label">Loading</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollManager />
          <AppContent />
          <RouteTransitionOverlay />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
