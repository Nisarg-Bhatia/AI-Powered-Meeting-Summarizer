import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Homepage from "./Components/Homepage";
import "./index.css";
// import LoginPage from "./Components/LoginPage.jsx";
// import SignupPage from "./Components/SignupPage.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import MeetingsContent from "./Components/MeetingsContent.jsx";
import CalendarContent from "./Components/CalendarContent.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Homepage />} />
      {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/meetings" element={<MeetingsContent />} />
      <Route path="/calendar" element={<CalendarContent />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-right" />
    <RouterProvider router={router} />
  </React.StrictMode>
);