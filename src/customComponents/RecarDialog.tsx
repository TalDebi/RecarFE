import React, { FormEvent } from "react";
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
  submitAction: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  isValid: boolean;
  children: JSX.Element;
}

const RecarDialog = ({
  open,
  setOpen,
  dialogType,
  dialogTitle,
  isLoading,
  submitAction,
  isValid,
  children,
}: RecarDialogProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    await submitAction(event);
  };

  const submitButtonMessage = dialogType === "Creation" ? "צור" : "ערוך";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent dividers sx={{ width: 600, height: 510 }}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "text.secondary" }}>
          סגור
        </Button>
        <Button type="submit" variant="contained">
          {isLoading ? (
            <CircularProgress size={24} color="secondary" />
          ) : (
            submitButtonMessage
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecarDialog;
