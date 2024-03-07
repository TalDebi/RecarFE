import React, { useEffect } from "react";
import { CssBaseline, Grid, useTheme } from "@mui/material";
import { useNavigate } from "react-router";

const BasePage = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const tokens: string = localStorage.getItem("tokens") ?? "";

  useEffect(() => {
    if (!tokens) navigate(`/login`, { replace: true });
  }, [tokens]);

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
