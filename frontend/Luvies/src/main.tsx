// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// dnd
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Import pages
import { HomePage } from "./pages/HomePage";
import { CraftPuzzleTag } from "./pages/CraftPuzzleTag";

// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "tags",
    element: <CraftPuzzleTag />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={router} />
    </DndProvider>
  </StrictMode>
);
