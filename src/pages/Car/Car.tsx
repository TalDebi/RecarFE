import { useState } from "react";
import { ChevronLeft, ChevronRight, Favorite } from "@mui/icons-material";

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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import CarInfoForm from "../CarInfoForm";
import { useMutation, useQuery } from "react-query";
import { CarExtraInfo } from "../../services/types";
import { fetchExtraCarInfo } from "../../services/ninja";
import { CarExtraInfoHebrewDict } from "../../utils/dictionary";
import { getPost } from "../../services/posts-service";
import { red } from "@mui/material/colors";
import { editCar as editCarRequest } from "../../services/car-service";
import {
  dislikePost,
  fetchLikedPostsInfo,
  likePost as likePostRequest,
} from "../../services/user";

export interface CarInterface {
  _id?: string;
  make: string;
  model: string;
  year: number;
  price: number;
  hand: number;
  color: string;
  mileage: number;
  city: string;
  owner: string;
  imgsUrls?: string[];
}

const userId: string =
  JSON.parse(localStorage.getItem("user") ?? "{}")?._id ?? "";

interface ButtonProps {
  buttonColor: string;
}
const getCarId = () => {
  const urlParts = window.location.href.split("/");
  return urlParts[urlParts.length - 1];
};
export const StyledButton = styled(Button)<ButtonProps>`
  background-color: ${({ buttonColor }) => buttonColor};
  border-color: ${({ buttonColor }) => buttonColor};

  &:hover {
    border-color: ${({ buttonColor }) => buttonColor};
  }
`;
function Car() {
  const theme = useTheme();
  const { data: _likedPosts } = useQuery<[], Error>(
    ["likedPosts", userId],
    () => fetchLikedPostsInfo(userId ?? ""),
    {
      onSuccess: (data: string[]): void => {
        setFavorite(data.includes(carID as string));
      },
      retry: false,
    }
  );

  const { carID } = useParams();
  const [isFavorite, setFavorite] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const {
    data: post,
    isLoading: _isLoadingPost,
    error: _errorFetchingPost,
    refetch,
  } = useQuery(["post"], () => getPost(getCarId()).req, {
    onSuccess: (data): void => {
      console.log("Posts loaded successfully:", data.data);
    },
    onError: (error): void => {
      console.error("Error fetching data:", error);
    },
    retry: false,
    refetchInterval: 5000,
  });

  const {
    data: extraInfo,
    isLoading: _isLoadingExtraInfo,
    error: _errorFetchingExtraInfo,
  } = useQuery<CarExtraInfo[], Error>(
    ["extraInfo"],
    () => fetchExtraCarInfo(carID ?? ""),
    {
      onSuccess: (data: CarExtraInfo[]): void => {
        console.log("Data loaded successfully:", data);
      },
      onError: (error): void => {
        console.error("Error fetching data:", error);
      },
      retry: false,
      staleTime: Infinity,
    }
  );
  const editCar = useMutation({
    mutationFn: (car: any) => editCarRequest(car._id, car).req,
  });

  const likePost = useMutation({
    mutationFn: () => likePostRequest(userId, carID as string).req,
  });

  const unlikePost = useMutation({
    mutationFn: () => dislikePost(userId, carID as string).req,
  });

  const additionalInfo = [
    { label: "קילומטראג", value: post?.data.car.mileage },
    { label: "יד", value: post?.data.car.hand },
    { label: "צבע", value: post?.data.car.color },
  ];

  const handleFavorite = (): void => {
    !isFavorite ? likePost.mutate() : unlikePost.mutate();
    setFavorite(!isFavorite);
  };

  const handleEdit = (): void => {
    setEditMode(!isEditMode);
  };

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
              {userId !== post?.data.publisher._id ? (
                <StyledButton
                  buttonColor={theme.palette.secondary.light}
                  sx={{ height: "fit-content", width: 160 }}
                  variant="outlined"
                  endIcon={isFavorite ? <Favorite /> : <Favorite />}
                  onClick={handleFavorite}
                >
                  {isFavorite ? "הסר מהמועדפים" : "הוסף למועדפים"}
                </StyledButton>
              ) : (
                <StyledButton
                  buttonColor={theme.palette.primary.main}
                  sx={{ height: "fit-content" }}
                  variant="contained"
                  endIcon={<EditIcon />}
                  onClick={handleEdit}
                >
                  עריכה
                </StyledButton>
              )}
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
        {`תגובות(${post?.data.comments.length}):`}
          </Typography>
          {post?.data.comments && (
            <CommentsTree
              style={{ mt: 1 }}
              comments={post?.data.comments}
              postId={post?.data._id}
              refetch={refetch}
            />
          )}
        </CardContent>
      </Card>
      <CarInfoForm
        open={isEditMode}
        setOpen={setEditMode}
        defaultValues={post?.data.car}
        dialogType="Edit"
        dialogTitle="עריכת פרטי מכונית"
        submitRequest={editCar.mutateAsync}
      />
    </>
  );
}

export default Car;
