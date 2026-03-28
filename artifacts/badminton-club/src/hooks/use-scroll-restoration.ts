import { useEffect, useLayoutEffect, useRef } from "react";

const ROUTE_TRANSITION_START = "dhayal:route-transition-start";
const ROUTE_TRANSITION_COMPLETE = "dhayal:route-transition-complete";
let pendingLoaderRouteKey: string | null = null;
const POP_LOADER_DURATION_MS = 800;

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

function shouldSkipLoaderForUrl(url: string | URL | null | undefined) {
  if (!url) {
    return false;
  }

  const resolvedUrl =
    typeof url === "string"
      ? new URL(url, window.location.origin)
      : new URL(url.toString(), window.location.origin);

  return resolvedUrl.pathname === "/" && Boolean(resolvedUrl.hash);
}

export function startRouteTransition(url: string, options?: { fixedDuration?: number }) {
  const nextRouteKey = getRouteKeyFromUrl(url);

  if (
    nextRouteKey === getRouteKey() ||
    shouldSkipLoaderForUrl(url) ||
    pendingLoaderRouteKey === nextRouteKey
  ) {
    return;
  }

  pendingLoaderRouteKey = nextRouteKey;
  window.dispatchEvent(
    new CustomEvent(ROUTE_TRANSITION_START, {
      detail:
        typeof options?.fixedDuration === "number"
          ? { fixedDuration: options.fixedDuration }
          : undefined,
    }),
  );
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

function dispatchTransitionComplete(navigationType: NavigationType) {
  if (navigationType === "POP") {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent(ROUTE_TRANSITION_COMPLETE));
      });
    });
    return;
  }

  requestAnimationFrame(() => {
    window.dispatchEvent(new CustomEvent(ROUTE_TRANSITION_COMPLETE));
  });
}

export function useScrollRestoration(location: string) {
  const initializedRef = useRef(false);
  const currentRouteKeyRef = useRef("");
  const navigationTypeRef = useRef<NavigationType>("PUSH");
  const handledLocationRef = useRef("");

  useEffect(() => {
    window.history.scrollRestoration = "auto";
    currentRouteKeyRef.current = getRouteKey();
    handledLocationRef.current = location;

    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = function pushState(state, unused, url) {
      const nextRouteKey = getRouteKeyFromUrl(url);
      navigationTypeRef.current = "PUSH";

      if (
        nextRouteKey !== currentRouteKeyRef.current &&
        !shouldSkipLoaderForUrl(url) &&
        pendingLoaderRouteKey !== nextRouteKey
      ) {
        window.dispatchEvent(new CustomEvent(ROUTE_TRANSITION_START));
      }

      pendingLoaderRouteKey = null;

      return originalPushState(state, unused, url);
    };

    window.history.replaceState = function replaceState(state, unused, url) {
      const nextRouteKey = getRouteKeyFromUrl(url);
      navigationTypeRef.current = "REPLACE";

      if (
        nextRouteKey !== currentRouteKeyRef.current &&
        !shouldSkipLoaderForUrl(url) &&
        pendingLoaderRouteKey !== nextRouteKey
      ) {
        window.dispatchEvent(new CustomEvent(ROUTE_TRANSITION_START));
      }

      pendingLoaderRouteKey = null;

      return originalReplaceState(state, unused, url);
    };

    const handlePopState = () => {
      navigationTypeRef.current = "POP";
      window.dispatchEvent(
        new CustomEvent(ROUTE_TRANSITION_START, {
          detail: { fixedDuration: POP_LOADER_DURATION_MS },
        }),
      );
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useLayoutEffect(() => {
    const routeKey = getRouteKey();

    if (!initializedRef.current) {
      initializedRef.current = true;
      currentRouteKeyRef.current = routeKey;
      handledLocationRef.current = location;
      return;
    }

    if (handledLocationRef.current === location) {
      currentRouteKeyRef.current = routeKey;
      return;
    }

    handledLocationRef.current = location;
    currentRouteKeyRef.current = routeKey;

    const navigationType = navigationTypeRef.current;

    if (navigationType !== "POP") {
      withInstantScroll(() => {
        window.scrollTo(0, 0);
      });
    }

    navigationTypeRef.current = "REPLACE";
    if (navigationType === "POP") {
      return;
    }

    dispatchTransitionComplete(navigationType);
  }, [location]);
}
