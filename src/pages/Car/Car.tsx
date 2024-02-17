import * as React from "react";
import Box from "@mui/material/Box";
import carImage from "../../assets/toyotaExample.avif";
import { Container, useTheme } from "@mui/material";
import { useParams } from "react-router";

function ResultsTable() {
  const theme = useTheme();
  const { carID } = useParams();

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
        overflow: "auto",
      }}
    >
      <Box>{carID}</Box>
    </Container>
  );
}

export default ResultsTable;
