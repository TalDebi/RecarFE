import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardContent,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router";
import Carousel from "react-material-ui-carousel";
import CommentsTree from "./CommentsTree";
import Divider from "@mui/material/Divider";
import { Comment } from "./CommentsTree";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import RecarDialog from "../../customComponents/RecarDialog";
import CarInfoForm from "../CarInfoForm";
import { useQuery } from "react-query";
import { CarExtraInfo } from "../../services/types";
import { fetchExtraCarInfo } from "../../services/ninja";
import { CarExtraInfoHebrewDict } from "../../utils/dictionary";
import { getPost } from "../../services/posts-service";

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

interface ButtonProps {
  buttonColor: string;
}
const getCarId = () => {
  const urlParts = window.location.href.split("/");
  return urlParts[urlParts.length - 1];
};

function Car() {
  const theme = useTheme();
  const { carID } = useParams();
  const [isFavorite, setFavorite] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const {
    data: post,
    isLoading: isLoadingPost,
    error: errorFetchingPost,
  } = useQuery(["post"], () => getPost(getCarId()).req, {
    onSuccess: (data): void => {
      console.log("Posts loaded successfully:", data.data);
    },
    onError: (error): void => {
      console.error("Error fetching data:", error);
    },
  });

  const {
    data: extraInfo,
    isLoading: isLoadingExtraInfo,
    error: errorFetchingExtraInfo,
  } = useQuery<CarExtraInfo[], Error>(
    ["extraCarInfo", carID],
    () => fetchExtraCarInfo(carID ?? ""),
    {
      onSuccess: (data: CarExtraInfo[]): void => {
        console.log("Data loaded successfully:", data);
      },
      onError: (error): void => {
        console.error("Error fetching data:", error);
      },
    }
  );
  const additionalInfo = [
    { label: "קילומטראג", value: post?.data.car.mileage },
    { label: "יד", value: post?.data.car.hand },
    { label: "צבע", value: post?.data.car.color },
  ];

  const handleFavorite = (): void => {
    setFavorite(!isFavorite);
  };

  const handleEdit = (): void => {
    setEditMode(!isEditMode);
  };

  const StyledButton = styled(Button)<ButtonProps>`
    background-color: ${({ buttonColor }) => buttonColor};
    border-color: ${({ buttonColor }) => buttonColor};

    &:hover {
      border-color: ${({ buttonColor }) => buttonColor};
    }
  `;

  const extraInfoFields = extraInfo
    ? Object.entries(extraInfo[0])
        .map(([key, value]) => ({ key, value }))
        .filter(({ key }) => !["model", "make", "year"].includes(key))
        .map(({ key, value }) => ({
          label: CarExtraInfoHebrewDict[key],
          value,
        }))
    : [];

  return (
    <>
      <Card
        sx={{
          width: 1350,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          <Box sx={{ display: "flex", width: 1300, height: 225 }}>
            <Box sx={{ width: 400 }} mr={3}>
              <Carousel
                NextIcon={<ChevronLeft />}
                PrevIcon={<ChevronRight />}
                animation="slide"
                autoPlay
                stopAutoPlayOnHover
                sx={{ direction: "ltr" }}
              >
                {post?.data.car.imgsUrls.map(
                  (image: string, index: number): JSX.Element => (
                    <img
                      key={index}
                      src={image}
                      alt="no image"
                      style={{
                        width: "100%",
                        height: 225,
                        objectFit: "contain",
                      }}
                    />
                  )
                )}
              </Carousel>
            </Box>
            <Box
              sx={{
                flex: "1 0 auto",
                display: "flex",
                justifyContent: "space-between",
                p: 3,
                border: "1px solid",
                borderColor: theme.palette.primary.light,
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h4">{post?.data.car.make}</Typography>
                <Typography variant="h4">{post?.data.car.model}</Typography>
                <Typography variant="h6" mt={1}>
                  {post?.data.car.year}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon color="primary" />
                  <Typography variant="h6">{post?.data.car.city}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h5" color="text.secondary">
                  מחיר
                </Typography>
                <Typography variant="h3">{post?.data.car.price}₪</Typography>
              </Box>
              {/* <StyledButton
              buttonColor={red[600]}
              sx={{ height: "fit-content", width: 160 }}
              variant="outlined"
              endIcon={
                isFavorite ? <FavoriteFilledIcon /> : <FavoriteBorderIcon />
              }
              onClick={handleFavorite}
            >
              {isFavorite ? "הסר מהמועדפים" : "הוסף למועדפים"}
            </StyledButton> */}
              <StyledButton
                buttonColor={theme.palette.primary.main}
                sx={{ height: "fit-content" }}
                variant="contained"
                endIcon={<EditIcon />}
                onClick={handleEdit}
              >
                עריכה
              </StyledButton>
            </Box>
          </Box>
          <Typography variant="h5" mt={7}>
            פרטים נוספים:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 1,
              mb: 3,
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {[...additionalInfo, ...extraInfoFields].map(
              ({ label, value }, index) => (
                <Box component="span" key={index} mr={6}>
                  <Typography
                    component="span"
                    variant="subtitle2"
                    color="text.secondary"
                  >
                    {label} :{" "}
                  </Typography>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    fontWeight="500"
                  >
                    {value}
                  </Typography>
                </Box>
              )
            )}
          </Box>
          <Divider
            flexItem
            sx={{
              opacity: 0.7,
              borderWidth: 1,
              borderColor: theme.palette.primary.light,
            }}
          />
          <Typography variant="h5" mt={3}>
            תגובות:
          </Typography>
          <CommentsTree style={{ mt: 1 }} comments={comments} />
        </CardContent>
      </Card>
      <RecarDialog
        open={isEditMode}
        setOpen={setEditMode}
        dialogType="Edit"
        dialogTitle="עריכת פרטי מכונית"
      >
        <CarInfoForm defaultValues={post?.data.car} />
      </RecarDialog>
    </>
  );
}

export default Car;
