import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="764938356434-9sg7heli6dv8nj6rlobhhjlq18ui5dpr.apps.googleusercontent.com">
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
