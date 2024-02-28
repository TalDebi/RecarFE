import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Fab, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CarInfoCard from "./CarInfoCard";

function MyCars() {
  const theme = useTheme();

  return (
    <>
      {[1, 2, 3].map(
        (): JSX.Element => (
          <CarInfoCard />
        )
      )}
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </>
  );
}

export default MyCars;
