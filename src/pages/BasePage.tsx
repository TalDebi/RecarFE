import React from "react";
import { Container, useTheme } from "@mui/material";

const BasePage = ({ children }) => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        position: "absolute",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        minWidth: "100%",
        overflow: "visible",
        backgroundColor: theme.palette.secondary.light,
        p: 3,
        pt: 12,
        boxSizing: "border-box",
      }}
    >
      {children}
    </Container>
  );
};

export default BasePage;
