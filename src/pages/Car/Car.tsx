import React, { useState } from "react";
import Box from "@mui/material/Box";
import carImage from "../../assets/toyotaExample.avif";
import {
  Button,
  ButtonProps,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router";
import Carousel from "react-material-ui-carousel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteFilledIcon from "@mui/icons-material/Favorite";
import CommentsTree from "./CommentsTree";
import Divider from "@mui/material/Divider";
import { Comment } from "./CommentsTree";
import { red } from "@mui/material/colors";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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

const comments: Comment[] = [
  {
    id: "1",
    user: { imgUrl: "/static/images/avatar/2.jpg", username: "טל" },
    text: "האם הרכב עבר תאונה?",
    replies: [
      {
        id: "1.1",
        user: { imgUrl: "/static/images/avatar/2.jpg", username: "ניר" },
        text: "כן מלא תאונות...אני בכלל מופתע שאתה רוצה לקנות את האוטו.",
        replies: [],
      },
    ],
  },
  {
    id: "2",
    user: { imgUrl: "user3.jpg", username: "ניר" },
    text: "בלה בלה בלה",
    replies: [],
  },
];

function ResultsTable() {
  const theme = useTheme();
  const { carID } = useParams();
  const [isFavorite, setFavorite] = useState<boolean>(false);

  const handleFavorite = (): void => {
    setFavorite(!isFavorite);
  };

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: red[600],
    borderColor: red[600],
    "&:hover": {
      borderColor: red[600],
    },
  }));

  return (
    <Container
      sx={{
        position: "absolute",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        minWidth: "100%",
        backgroundColor: theme.palette.secondary.light,
        p: 3,
        pt: 12,
      }}
    >
      <Card
        sx={{
          width: 1450,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: 2,
          }}
        >
          <Box sx={{ display: "flex", width: 1400, height: 225 }}>
            <Box sx={{ width: 400 }} mr={2}>
              <Carousel>
                {[
                  carImage,
                  carImage,
                  carImage,
                  carImage,
                  carImage,
                  carImage,
                ].map(
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
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ opacity: 0.7, borderWidth: 1 }}
            />
            <Box
              sx={{
                flex: "1 0 auto",
                display: "flex",
                justifyContent: "space-between",
                ml: 2,
                mt: 1,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h4">Toyota</Typography>
                <Typography variant="h4">Camry</Typography>
                <Typography variant="h6" mt={1}>
                  שנת 2010
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon />
                  <Typography variant="h6">חולון</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h5" color="text.secondary">
                  מחיר
                </Typography>
                <Typography variant="h3">30,000₪</Typography>
              </Box>
              <ColorButton
                sx={{ height: "fit-content" }}
                variant="outlined"
                endIcon={
                  isFavorite ? <FavoriteFilledIcon /> : <FavoriteBorderIcon />
                }
                onClick={handleFavorite}
              >
                {isFavorite ? "הסר מהמועדפים" : "הוסף למועדפים"}
              </ColorButton>
            </Box>
          </Box>
          <Typography variant="h5" mt={6}>
            פרטים נוספים:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 1,
              mb: 2,
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
          <Divider flexItem sx={{ opacity: 0.7, borderWidth: 1 }} />
          <Typography variant="h5" mt={2}>
            תגובות:
          </Typography>
          <CommentsTree style={{ mt: 1 }} comments={comments} />
        </CardContent>
      </Card>
    </Container>
  );
}

export default ResultsTable;
