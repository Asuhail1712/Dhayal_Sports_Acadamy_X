import { useEffect, useLayoutEffect, useRef } from "react";

const STORAGE_PREFIX = "scroll-position:";
const scrollPositions = new Map<string, number>();
const ROUTE_TRANSITION_START = "dhayal:route-transition-start";
const ROUTE_TRANSITION_COMPLETE = "dhayal:route-transition-complete";

type NavigationType = "PUSH" | "REPLACE" | "POP";

function getRouteKey() {
  return `${window.location.pathname}${window.location.search}`;
}

function getRouteKeyFromUrl(url: string | URL | null | undefined) {
  if (!url) {
    return getRouteKey();
  }

  const resolvedUrl =
    typeof url === "string"
      ? new URL(url, window.location.origin)
      : new URL(url.toString(), window.location.origin);

  return `${resolvedUrl.pathname}${resolvedUrl.search}`;
}

function getStorageKey(routeKey: string) {
  return `${STORAGE_PREFIX}${routeKey}`;
}

function writeScrollPosition(routeKey: string, top: number) {
  const nextTop = Math.max(0, Math.round(top));
  scrollPositions.set(routeKey, nextTop);
  window.sessionStorage.setItem(getStorageKey(routeKey), String(nextTop));
}

function readScrollPosition(routeKey: string) {
  const memoryValue = scrollPositions.get(routeKey);
  if (typeof memoryValue === "number" && Number.isFinite(memoryValue)) {
    return memoryValue;
  }

  const storedValue = window.sessionStorage.getItem(getStorageKey(routeKey));
  if (storedValue === null) {
    return 0;
  }

  const parsed = Number(storedValue);
  return Number.isFinite(parsed) ? parsed : 0;
}

function withInstantScroll(action: () => void) {
  const root = document.documentElement;
  const body = document.body;
  const previousRootBehavior = root.style.scrollBehavior;
  const previousBodyBehavior = body.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  action();
  root.style.scrollBehavior = previousRootBehavior;
  body.style.scrollBehavior = previousBodyBehavior;
}

export function useScrollRestoration(location: string) {
  const initializedRef = useRef(false);
  const currentRouteKeyRef = useRef("");
  const navigationTypeRef = useRef<NavigationType>("PUSH");
  const saveFrameRef = useRef<number | null>(null);
  const lastHandledKeyRef = useRef("");

  const saveCurrentScroll = () => {
    const routeKey = currentRouteKeyRef.current;
    if (!routeKey) {
      return;
    }

    writeScrollPosition(routeKey, window.scrollY);
  };

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    currentRouteKeyRef.current = getRouteKey();
    lastHandledKeyRef.current = currentRouteKeyRef.current;
    writeScrollPosition(currentRouteKeyRef.current, window.scrollY);

    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = function pushState(state, unused, url) {
      saveCurrentScroll();
      navigationTypeRef.current = "PUSH";
      if (getRouteKeyFromUrl(url) !== currentRouteKeyRef.current) {
        window.dispatchEvent(new CustomEvent(ROUTE_TRANSITION_START));
      }
      return originalPushState(state, unused, url);
    };

    window.history.replaceState = function replaceState(state, unused, url) {
      saveCurrentScroll();
      navigationTypeRef.current = "REPLACE";
      if (getRouteKeyFromUrl(url) !== currentRouteKeyRef.current) {
        window.dispatchEvent(new CustomEvent(ROUTE_TRANSITION_START));
      }
      return originalReplaceState(state, unused, url);
    };

    const handlePopState = () => {
      saveCurrentScroll();
      navigationTypeRef.current = "POP";
      if (getRouteKey() !== currentRouteKeyRef.current) {
        window.dispatchEvent(new CustomEvent(ROUTE_TRANSITION_START));
      }
    };

    const handleScroll = () => {
      if (saveFrameRef.current !== null) {
        cancelAnimationFrame(saveFrameRef.current);
      }

      saveFrameRef.current = requestAnimationFrame(() => {
        saveCurrentScroll();
      });
    };

    const handlePageHide = () => {
      saveCurrentScroll();
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      if (saveFrameRef.current !== null) {
        cancelAnimationFrame(saveFrameRef.current);
      }

      saveCurrentScroll();
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.history.scrollRestoration = "auto";
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  useLayoutEffect(() => {
    const routeKey = getRouteKey();

    if (!initializedRef.current) {
      initializedRef.current = true;
      currentRouteKeyRef.current = routeKey;
      lastHandledKeyRef.current = routeKey;
      return;
    }

    if (lastHandledKeyRef.current === routeKey) {
      currentRouteKeyRef.current = routeKey;
      return;
    }

    if (navigationTypeRef.current === "POP") {
      const savedTop = readScrollPosition(routeKey);
      withInstantScroll(() => {
        window.scrollTo(0, savedTop);
      });
    } else {
      withInstantScroll(() => {
        window.scrollTo(0, 0);
      });
      writeScrollPosition(routeKey, 0);
    }

    currentRouteKeyRef.current = routeKey;
    lastHandledKeyRef.current = routeKey;
    navigationTypeRef.current = "REPLACE";

    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent(ROUTE_TRANSITION_COMPLETE));
    });
  }, [location]);
}
