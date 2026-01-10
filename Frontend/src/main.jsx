import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Homepage from "./Components/Homepage";
import "./index.css";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Homepage />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
