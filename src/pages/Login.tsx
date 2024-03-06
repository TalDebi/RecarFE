import React, { FormEvent, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import RecarAvatar from "../assets/recarLogo.svg";
import CarIllustration from "../assets/CarIllustration.svg";
import { useNavigate } from "react-router-dom";
import Copyright from "../customComponents/Copyright";
import { Alert, CircularProgress, Snackbar, useTheme } from "@mui/material";
import { useMutation } from "react-query";
import { login } from "../services/user";

type AlertSeverity = "error" | "success" | "warning" | "info";

export default function Login() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertSeverity>("info");

  const closeSnackbar = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const navigateToRegistration = (): void => {
    navigate("/registration");
  };

  const {
    mutate: submitLogin,
    isLoading,
    isError,
    error,
  } = useMutation(login, {
    onSuccess: (data) => {
      setSnackbarMessage("התחברת בהצלחה!");
      setSnackbarSeverity("success");
      console.log("Login successful:", data);
      navigate("/search");
    },
    onError: (error) => {
      setSnackbarMessage("הייתה שגיאה בהתחברות");
      setSnackbarSeverity("error");
      console.error("Login failed:", error);
    },
    onSettled: () => {
      setOpenSnackbar(true);
    },
  });

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    try {
      await submitLogin({
        email: data.get("email")?.toString() ?? "",
        password: data.get("password")?.toString() ?? "",
      });
    } catch (error) {
      console.log("error login: ", error);
      throw error;
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, width: 100, height: 100 }}
              alt="Recar Logo"
              src={RecarAvatar}
            />
            <Typography component="h1" variant="h5">
              התחברות{" "}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="אימייל"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="סיסמא"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoading ? <CircularProgress size={24} /> : "התחבר"}
              </Button>
              <Grid item>
                <Link
                  href=""
                  onClick={navigateToRegistration}
                  variant="body2"
                  color="primary.dark"
                >
                  נרשמת בעבר? הירשם!{" "}
                </Link>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${CarIllustration})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: theme.palette.background.default,
            backgroundPosition: "center",
          }}
        />
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
