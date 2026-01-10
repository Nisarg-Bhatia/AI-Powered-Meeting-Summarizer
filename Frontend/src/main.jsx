import React from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Homepage from "./Components/Homepage";
import LoginPage from "./Components/LoginPage.jsx";
import SignupPage from "./Components/SignupPage.jsx";
import ForgotPasswordPage from "./Components/ForgotPasswordPage.jsx";
import GoogleSuccess from "./Components/GoogleSuccess.jsx";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/google-success" element={<GoogleSuccess />} />
    </>
  )
);

const GOOGLE_CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
