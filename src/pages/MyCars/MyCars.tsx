import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CarInfoCard from "./CarInfoCard";

function MyCars() {
  const theme = useTheme();

  return (
    <Container
      sx={{
        position: "fixed",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        minWidth: "100%",
        padding: 4,
        backgroundColor: theme.palette.secondary.light,
      }}
    >
      {[1, 2, 3].map(() => (
        <CarInfoCard />
      ))}
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Container>
  );
}

export default MyCars;
