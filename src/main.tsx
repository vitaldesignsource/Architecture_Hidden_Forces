import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { RouteError } from "@/components/RouteError";
import { healStaleBuild, markPreloadError } from "@/lib/stale";
import "./styles.css";

// A module that cannot be fetched is almost always a page left open across a
// deploy: the chunk it is asking for no longer exists. Vite reports it here
// before the router ever sees it, so the page heals itself at once.
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();
  markPreloadError();
  healStaleBuild();
});

const router = createRouter({ routeTree, defaultErrorComponent: RouteError });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
