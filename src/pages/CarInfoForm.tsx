import React, { ChangeEvent, useRef, useState } from "react";
import {
  Badge,
  Box,
  Grid,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import EditIcon from "@mui/icons-material/Edit";

interface CarInfoFormProps {}

const CarInfoForm = ({}: CarInfoFormProps) => {
  const theme = useTheme();
  const [imagesSrc, setImagesSrc] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imgSelected = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    if (e.target.files && e.target.files.length > 0) {
      setImagesSrc([...imagesSrc, e.target.files[0]]);
    }
  };
  const selectImg = (): void => {
    console.log("Selecting image...");
    fileInputRef.current?.click();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <IconButton
              onClick={selectImg}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              <EditIcon />
            </IconButton>
          }
        >
          <Box
            width={265}
            height={200}
            border="1px solid"
            sx={{
              border: "1px solid",
              borderColor: theme.palette.primary.light,
              borderRadius: 1,
            }}
          >
            <Carousel>
              {imagesSrc.map(
                (image, index: number): JSX.Element => (
                  <img
                    key={index}
                    src={image ? URL.createObjectURL(image) : ""}
                    alt="no image"
                    style={{ width: 265, height: 200 }}
                  />
                )
              )}
            </Carousel>
          </Box>
        </Badge>
        <input
          style={{ display: "none" }}
          ref={fileInputRef}
          type="file"
          onChange={imgSelected}
        />
        <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 6 }}>
          <Grid item container spacing={2}>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <TextField
                name="make"
                required
                fullWidth
                id="make"
                label="יצרן"
                autoFocus
              />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="model"
                label="דגם"
                name="model"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="year"
                label="שנה"
                name="year"
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="city"
                label="איזור מכירה"
                id="city"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="price"
                label="מחיר"
                type="number"
                id="price"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default CarInfoForm;
