import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Import from "./pages/Import.tsx";
import Copy from "./pages/Copy.tsx";
import Select from "./pages/Select.tsx";
import Export from "./pages/Export.tsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Copy />,
      },
      {
        path: "import",
        element: <Import />,
      },
      {
        path: "select",
        element: <Select />,
      },
      {
        path: "export",
        element: <Export />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
