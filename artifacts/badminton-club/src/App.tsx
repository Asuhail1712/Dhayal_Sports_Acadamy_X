import { useEffect, useLayoutEffect, useRef } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
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
  const initializedRef = useRef(false);
  const currentRouteKeyRef = useRef("");
  const navigationTypeRef = useRef<"PUSH" | "REPLACE" | "POP">("PUSH");
  const scrollFrameRef = useRef<number | null>(null);

  const withInstantScroll = (action: () => void) => {
    const root = document.documentElement;
    const body = document.body;
    const previousRootBehavior = root.style.scrollBehavior;
    const previousBodyBehavior = body.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";
    action();
    root.style.scrollBehavior = previousRootBehavior;
    body.style.scrollBehavior = previousBodyBehavior;
  };

  const getRouteKey = () =>
    `${window.location.pathname}${window.location.search}${window.location.hash}`;

  const getStorageKey = (routeKey: string) => `scroll:${routeKey}`;

  const saveScroll = (routeKey: string, top: number = window.scrollY) => {
    sessionStorage.setItem(getStorageKey(routeKey), String(top));
  };

  const restoreScroll = (routeKey: string) => {
    const raw = sessionStorage.getItem(getStorageKey(routeKey));
    const top = raw === null ? 0 : Number(raw);

    withInstantScroll(() => {
      window.scrollTo(0, Number.isFinite(top) ? top : 0);
    });
  };

  const scrollToTopInstant = () => {
    withInstantScroll(() => {
      window.scrollTo(0, 0);
    });
  };

  const scrollToHashTarget = (hash: string) => {
    const id = hash.replace(/^#/, "");
    if (!id) return false;

    const element = document.getElementById(id);
    if (!element) return false;

    withInstantScroll(() => {
      element.scrollIntoView({ block: "start" });
    });

    return true;
  };

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    currentRouteKeyRef.current = getRouteKey();

    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = function pushState(state, unused, url) {
      saveScroll(currentRouteKeyRef.current);
      navigationTypeRef.current = "PUSH";
      return originalPushState(state, unused, url);
    };

    window.history.replaceState = function replaceState(state, unused, url) {
      saveScroll(currentRouteKeyRef.current);
      navigationTypeRef.current = "REPLACE";
      return originalReplaceState(state, unused, url);
    };

    const handlePopState = () => {
      saveScroll(currentRouteKeyRef.current);
      navigationTypeRef.current = "POP";
    };

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current);
      }

      scrollFrameRef.current = requestAnimationFrame(() => {
        saveScroll(currentRouteKeyRef.current);
      });
    };

    const handlePageHide = () => {
      saveScroll(currentRouteKeyRef.current);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current);
      }

      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.history.scrollRestoration = "auto";
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  useLayoutEffect(() => {
    const currentRouteKey = getRouteKey();

    if (!initializedRef.current) {
      initializedRef.current = true;
      currentRouteKeyRef.current = currentRouteKey;
      if (!scrollToHashTarget(window.location.hash)) {
        scrollToTopInstant();
      }
      return;
    }

    if (navigationTypeRef.current === "POP") {
      restoreScroll(currentRouteKey);
    } else if (!scrollToHashTarget(window.location.hash)) {
      scrollToTopInstant();
    } else {
      saveScroll(currentRouteKey);
    }

    currentRouteKeyRef.current = currentRouteKey;
    navigationTypeRef.current = "REPLACE";
  }, [location]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollManager />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
