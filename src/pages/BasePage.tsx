import React from "react";
import { CssBaseline, Grid, useTheme } from "@mui/material";

const BasePage = ({ children }) => {
  const theme = useTheme();

  return (
    <Grid
      container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        p: 3,
        pt: 12,
      }}
    >
      <CssBaseline />
      <Grid item>{children}</Grid>
    </Grid>
  );
};

export default BasePage;
