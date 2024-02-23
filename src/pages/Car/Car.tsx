import * as React from "react";
import Box from "@mui/material/Box";
import carImage from "../../assets/toyotaExample.avif";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router";
import Carousel from "react-material-ui-carousel";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import CommentsTree from "./CommentsTree";

const additionalInfo = [
  { label: "קילומטראג", value: "1231" },
  { label: "קילומטראג", value: "32142" },
  { label: "קילומטראג", value: "4234234" },
  { label: "קילומטראג", value: "234234" },
  { label: "קילומטראג", value: "32424" },
  { label: "קילומטראג", value: "23423432" },
  { label: "קילומטראג", value: "4234" },
  { label: "קילומטראג", value: "43242" },
  { label: "קילומטראג", value: "32432432" },
  { label: "קילומטראג", value: "32432432" },
];
function ResultsTable() {
  const theme = useTheme();
  const { carID } = useParams();

  return (
    <Container
      sx={{
        position: "absolute",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        minWidth: "100%",
        padding: 4,
        backgroundColor: theme.palette.secondary.light,
        pt: 13,
      }}
    >
      <Box sx={{ display: "flex", width: 1400, height: 225 }}>
        <Box sx={{ width: 400 }}>
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
        <Card
          sx={{
            width: 1000,
          }}
        >
          <CardHeader
            sx={{ height: 0, pb: 0 }}
            action={
              <IconButton aria-label="favoriteIcon">
                <FavoriteIcon />
              </IconButton>
            }
          />
          <CardContent
            sx={{
              flex: "1 0 auto",
              display: "flex",
              justifyContent: "space-between",
              ml: 5,
              mr: 10,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h4">Toyota</Typography>
              <Typography variant="h4">Camry</Typography>
              <Typography variant="h6" mt={1}>
                שנת 2010
              </Typography>
              <Typography variant="h6">חולון</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5" color="text.secondary">
                מחיר
              </Typography>
              <Typography variant="h3">30,000₪</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Card
        sx={{
          width: 1400,
          mt: 6,
        }}
      >
        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
            ml: 5,
          }}
        >
          <Typography variant="h6">פרטים נוספים:</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 1,
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {additionalInfo.map((field, index) => (
              <Box component="span" key={index} mr={10}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.secondary"
                >
                  {field.label}:{" "}
                </Typography>
                <Typography component="span" variant="h6">
                  {field.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: 1400,
          mt: 3,
        }}
      >
        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
            ml: 5,
          }}
        >
          <Typography variant="h6" mt={1}>
            תגובות:
          </Typography>
          <CommentsTree style={{ mt: 1 }} />
        </CardContent>
      </Card>
    </Container>
  );
}

export default ResultsTable;
