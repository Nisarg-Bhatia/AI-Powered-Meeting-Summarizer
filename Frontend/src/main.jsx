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
import LoginPage from "./Components/LoginPage.jsx";
import SignupPage from "./Components/SignupPage.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import Meetings from "./Components/Meetings.jsx";
import Calendar from "./Components/Calendar.jsx";
import Settings from "./Components/Settings.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/meetings" element={<Meetings />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/settings" element={<Settings />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
