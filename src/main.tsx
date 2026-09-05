import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { RouteError } from "@/components/RouteError";
import { NotFound } from "@/components/NotFound";
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

// The first screen's backdrop is asked for before the app has rendered a
// single element: measured, the hero was otherwise requested a second after
// the route chunk had long arrived, behind the whole tree's commit.
const HERO: Record<string, string> = {
  "/": "/bg/threshold-arches-in-misted-vault.webp",
  "/phos": "/bg/door-of-light-in-flooded-chamber.webp",
  "/phos/portal": "/bg/gorge-at-dawn-with-burst-of-sun.webp",
  "/ecology": "/bg/moon-over-tidal-flats-and-channel.webp",
};
const hero = HERO[window.location.pathname.replace(/\/+$/, "") || "/"];
if (hero) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = hero;
  link.setAttribute("fetchpriority", "high");
  document.head.appendChild(link);
}

const router = createRouter({ routeTree, defaultErrorComponent: RouteError, defaultNotFoundComponent: NotFound });

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
