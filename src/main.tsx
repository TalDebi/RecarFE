import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="31419708780-e47tk22a08u23kafo5hquochcef253b1.apps.googleusercontent.com">
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
