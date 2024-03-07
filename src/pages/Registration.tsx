import React, { ChangeEvent, useRef, useState, FormEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import RecarAvatar from "../assets/recarLogo.svg";
import Copyright from "../customComponents/Copyright";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { uploadPhoto } from "../services/file-service";
import { googleSignin, register } from "../services/user";
import { Badge, IconButton, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CarIllustration from "../assets/CarIllustration.svg";
import { User } from "../services/types";

export default function Registration() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [imgSrc, setImgSrc] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
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

  const handleRegister = async (): Promise<void> => {
    const url = await uploadPhoto(imgSrc!);
    console.log("upload returned:" + url);
    if (emailInputRef.current?.value && passwordInputRef.current?.value) {
      const user: User = {
        name: "בוב",
        email: emailInputRef.current?.value,
        password: passwordInputRef.current?.value,
        imgUrl: url,
      };
      const res = await register(user);
      console.log(res);
    }
  };

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ): Promise<void> => {
    console.log(credentialResponse);
    try {
      const res = await googleSignin(credentialResponse);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const onGoogleLoginFailure = (): void => {
    console.log("Google login failed");
  };

  const navigateToLogin = (): void => {
    navigate("/login");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 2,
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
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
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained">
                  הירשם
                </Button>
              </Grid>
              <Grid item xs={8}>
                <GoogleLogin
                  onSuccess={onGoogleLoginSuccess}
                  onError={onGoogleLoginFailure}
                />
              </Grid>
              <Grid item xs={4}>
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
          <Grid item mt={8}>
            <Copyright />
          </Grid>
          <Grid item>
            <Avatar
              sx={{ width: 50, height: 50 }}
              alt="Recar Logo"
              src={RecarAvatar}
            />
          </Grid>
        </Grid>
      </Container>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: `url(${CarIllustration})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: theme.palette.background.default,
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
