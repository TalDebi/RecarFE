import React, { FormEvent } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, CircularProgress } from "@mui/material";

interface RecarDialogProps {
  open: boolean;
  setOpen(open: boolean): void;
  dialogType: "Creation" | "Edit";
  dialogTitle: string;
  isLoading: boolean;
  submitAction: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  children: JSX.Element;
}

const RecarDialog = ({
  open,
  setOpen,
  dialogType,
  dialogTitle,
  isLoading,
  submitAction,
  children,
}: RecarDialogProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    await submitAction(event);
    setOpen(false);
  };

  const submitButtonMessage = dialogType === "Creation" ? "צור" : "ערוך";

  return (
    <Dialog open={open} onClose={handleClose} scroll="paper">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent dividers sx={{ width: 600, height: 510 }}>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          {children}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "text.secondary" }}>
          סגור
        </Button>
        <Button type="submit" variant="contained">
          {isLoading ? <CircularProgress size={24} /> : submitButtonMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecarDialog;
