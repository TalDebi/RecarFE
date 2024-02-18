import * as React from "react";
import Box from "@mui/material/Box";
import carImage from "../../assets/toyotaExample.avif";
import { Container, useTheme } from "@mui/material";
import { useParams } from "react-router";
import Carousel from "react-material-ui-carousel";

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
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: 400, height: 400 }}>
          <Carousel>
            {[carImage, carImage, carImage, carImage, carImage, carImage].map(
              (image, index: number): JSX.Element => (
                <img
                  key={index}
                  src={image}
                  alt="no image"
                  style={{ width: "100%" }}
                />
              )
            )}
          </Carousel>
        </Box>
      </Box>
    </Container>
  );
}

export default ResultsTable;
