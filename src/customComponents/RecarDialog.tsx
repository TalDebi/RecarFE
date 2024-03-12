import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface RecarDialogProps {
  open: boolean;
  setOpen(open: boolean): void;
  dialogType: "Creation" | "Edit";
  dialogTitle: string;
  children: JSX.Element;
  width?: number;
  height?: number;
}

const RecarDialog = ({
  open,
  setOpen,
  dialogType,
  dialogTitle,
  children,
  height,
  width,
}: RecarDialogProps) => {
  const handleClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    console.log("submit");
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} scroll="paper">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent
        dividers
        sx={{ width: width ? width : 600, height: height ? height : 510 }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "text.secondary" }}>
          סגור
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {dialogType === "Creation" ? "צור" : "ערוך"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecarDialog;
