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
import { googleSignin, registerUser } from "../services/user";
import { Badge, CircularProgress, IconButton, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CarIllustration from "../assets/CarIllustration.svg";
import { AuthorizedUser, User } from "../services/types";
import { useMutation } from "react-query";
import RecarSnackbar, {
  AlertSeverity,
} from "../customComponents/RecarSnackbar";
import { useForm } from "react-hook-form";

export default function Registration() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [imgSrc, setImgSrc] = useState<File>();
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertSeverity>("info");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const validateConfirmPassword = (value: string) => {
    const { password } = watch();
    return value === password;
  };

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

  const { mutate: submitRegister, isLoading } = useMutation(registerUser, {
    onSuccess: (data: AuthorizedUser) => {
      setSnackbarMessage("נרשמת בהצלחה!");
      setSnackbarSeverity("success");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("tokens", JSON.stringify(data.tokens));
      navigate("/search");
    },
    onError: () => {
      setSnackbarMessage("הפרטים שהוזנו לא נכונים");
      setSnackbarSeverity("error");
    },
    onSettled: () => {
      setSnackbarOpen(true);
    },
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const url = await uploadPhoto(imgSrc!);
    const user: User = {
      name: data.get("name")?.toString() ?? "",
      email: data.get("email")?.toString() ?? "",
      password: data.get("password")?.toString() ?? "",
      phoneNumber: data.get("phoneNumber")?.toString() ?? "",
      // imgUrl: url,
    };
    await submitRegister(user);
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2 }}
          >
            <Grid item container spacing={2}>
              <Grid item xs={3} />
              <Grid item xs={6}>
                <TextField
                  autoComplete="given-name"
                  fullWidth
                  id="name"
                  label="שם פרטי"
                  autoFocus
                  {...register("name", { required: true })}
                  error={errors.name ? true : false}
                  helperText={errors.name ? "שדה חובה" : ""}
                />
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  label="מספר טלפון"
                  autoComplete="tel"
                  {...register("phoneNumber", { required: true })}
                  error={errors.phoneNumber ? true : false}
                  helperText={errors.phoneNumber ? "שדה חובה" : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="email"
                  label="אימייל"
                  autoComplete="email"
                  {...register("email", { required: true })}
                  error={errors.email ? true : false}
                  helperText={errors.email ? "שדה חובה" : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="סיסמא"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", { required: true })}
                  error={errors.password ? true : false}
                  helperText={errors.password ? "שדה חובה" : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="אימות סיסמה"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: validateConfirmPassword,
                  })}
                  error={errors.confirmPassword ? true : false}
                  helperText={
                    errors.confirmPassword ? "הסיסמאות חייבות להיות זהות" : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained">
                  {isLoading ? <CircularProgress size={24} /> : "הירשם"}
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
      <RecarSnackbar
        isSnackbarOpen={isSnackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
    </Grid>
  );
}
