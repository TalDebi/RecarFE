import { Alert, Snackbar } from "@mui/material";
import React from "react";

export type AlertSeverity = "error" | "success" | "warning" | "info";

interface RecarSnackbarProps {
  isSnackbarOpen: boolean;
  setSnackbarOpen: (isSnackbarOpen: boolean) => void;
  snackbarSeverity: AlertSeverity;
  snackbarMessage: string;
}

const RecarSnackbar = ({
  isSnackbarOpen,
  setSnackbarOpen,
  snackbarSeverity,
  snackbarMessage,
}: RecarSnackbarProps) => {
  const closeSnackbar = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={6000}
      onClose={closeSnackbar}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbarSeverity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default RecarSnackbar;
