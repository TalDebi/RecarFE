import React, { ChangeEvent, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface UserEditFormProps {}

const UserEditForm = ({}: UserEditFormProps) => {
  const theme = useTheme();
  const [imgSrc, setImgSrc] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imgSelected = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    if (e.target.files && e.target.files.length > 0) {
      setImgSrc(e.target.files[0]);
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
          <Avatar
            sx={{
              mt: 2,
              width: 150,
              height: 150,
              border: "2px solid",
              borderColor: theme.palette.primary.main,
            }}
            src={imgSrc ? URL.createObjectURL(imgSrc) : ""}
          />
        </Badge>
        <input
          style={{ display: "none" }}
          ref={fileInputRef}
          type="file"
          onChange={imgSelected}
        />
        <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 2 }}>
          <Grid item container spacing={2}>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="שם פרטי"
                autoFocus
              />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="מספר טלפון"
                name="phoneNumber"
                autoComplete="tel"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="אימייל"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="password"
                label="סיסמא"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="אמת סיסמא"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default UserEditForm;
