import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CarInfoCard from "./CarInfoCard";

function MyCars() {
  const theme = useTheme();

  return (
    <>
      {[1, 2, 3].map(
        (index: number): JSX.Element => (
          <CarInfoCard key={index} />
        )
      )}
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </>
  );
}

export default MyCars;
