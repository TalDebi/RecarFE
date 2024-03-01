import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CarInfoCard from "./CarInfoCard";
import RecarDialog from "../../customComponents/RecarDialog";
import CarInfoForm from "../CarInfoForm";

function MyCars() {
  const theme = useTheme();
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleCreatePost = (): void => {
    setOpen(!isOpen);
  };

  return (
    <>
      {[1, 2, 3].map(
        (index: number): JSX.Element => (
          <CarInfoCard key={index} />
        )
      )}
      <Fab color="primary" aria-label="add" onClick={handleCreatePost}>
        <AddIcon />
      </Fab>
      <RecarDialog
        open={isOpen}
        setOpen={setOpen}
        dialogType="Creation"
        dialogTitle="יצירת פוסט חדש"
      >
        <CarInfoForm />
      </RecarDialog>
    </>
  );
}

export default MyCars;
