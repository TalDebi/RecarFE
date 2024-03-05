import { Container } from "@mui/material";
import PageNotFoundIllustration from "../assets/PageNotFound.svg";

const NoPage = () => (
  <Container
    sx={{
      height: "80vh",
      backgroundImage: `url(${PageNotFoundIllustration})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "",
      backgroundPosition: "center",
    }}
  />
);

export default NoPage;
