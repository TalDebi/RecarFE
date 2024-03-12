import React from "react";
import { Container } from "@mui/material";
import PageNotFoundIllustration from "../assets/PageNotFound.svg";

const NoPage = () => (
  <Container
    sx={{
      width: "100vw",
      height: "80vh",
      backgroundImage: `url(${PageNotFoundIllustration})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  />
);

export default NoPage;
