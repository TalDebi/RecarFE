import React, { ChangeEvent, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import RecarAvatar from "../assets/recarLogo.svg";
import Copyright from "../customComponents/Copyright";
import { CredentialResponse } from "@react-oauth/google";
import { uploadPhoto } from "../services/file-service";
import { IUser, googleSignin, registrUser } from "../services/user-service";
import { Badge, IconButton, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function Registration() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [imgSrc, setImgSrc] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.files && e.target.files.length > 0) {
      setImgSrc(e.target.files[0]);
    }
  };
  const selectImg = () => {
    console.log("Selecting image...");
    fileInputRef.current?.click();
  };

  const register = async () => {
    const url = await uploadPhoto(imgSrc!);
    console.log("upload returned:" + url);
    if (emailInputRef.current?.value && passwordInputRef.current?.value) {
      const user: IUser = {
        email: emailInputRef.current?.value,
        password: passwordInputRef.current?.value,
        imgUrl: url,
      };
      const res = await registrUser(user);
      console.log(res);
    }
  };

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    console.log(credentialResponse);
    try {
      const res = await googleSignin(credentialResponse);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const onGoogleLoginFailure = () => {
    console.log("Google login failed");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          הירשמות
        </Typography>
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
              mt: 3,
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
          </Grid>
          <Grid container flexDirection="column" alignItems="center">
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "fit-content" }}
              >
                הירשם
              </Button>
            </Grid>
            <Grid item>
              <Link
                href=""
                onClick={navigateToLogin}
                variant="body2"
                color="primary.dark"
              >
                כבר יש לך חשבון? התחבר!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Grid container flexDirection="column" alignItems="center">
        <Grid item mt={7}>
          <Copyright />
        </Grid>
        <Grid item>
          <Avatar
            sx={{ width: 100, height: 100 }}
            alt="Recar Logo"
            src={RecarAvatar}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
