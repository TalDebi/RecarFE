import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";

interface RecarDialogProps {
  open: boolean;
  setOpen(open: boolean): void;
  dialogType: "Creation" | "Edit";
  dialogTitle: string;
  isLoading: boolean;
  children: JSX.Element;
}

const RecarDialog = ({
  open,
  setOpen,
  dialogType,
  dialogTitle,
  isLoading,
  children,
}: RecarDialogProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log("submit");
    setOpen(false);
  };

  const submitButtonMessage = dialogType === "Creation" ? "צור" : "ערוך";

  return (
    <Dialog open={open} onClose={handleClose} scroll="paper">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent dividers sx={{ width: 600, height: 510 }}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "text.secondary" }}>
          סגור
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {isLoading ? <CircularProgress size={24} /> : submitButtonMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecarDialog;
