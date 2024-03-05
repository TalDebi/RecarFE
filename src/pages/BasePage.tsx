import { CssBaseline, Grid, useTheme } from "@mui/material";
import { ReactNode } from "react";
interface props {
  children: ReactNode
}

const BasePage = ({ children }:props) => {
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
