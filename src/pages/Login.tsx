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
import { CircularProgress, useTheme } from "@mui/material";
import { useMutation } from "react-query";
import { login } from "../services/user";
import RecarSnackbar, {
  AlertSeverity,
} from "../customComponents/RecarSnackbar";

export default function Login() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertSeverity>("info");

  const navigateToRegistration = (): void => {
    navigate("/registration");
  };

  const { mutate: submitLogin, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      setSnackbarMessage("התחברת בהצלחה!");
      setSnackbarSeverity("success");
      console.log("Login successful:", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("tokens", JSON.stringify(data.tokens));
      navigate("/search");
    },
    onError: (error) => {
      setSnackbarMessage("מייל או סיסמא שגויים");
      setSnackbarSeverity("error");
      console.error("Login failed:", error);
    },
    onSettled: () => {
      setSnackbarOpen(true);
    },
  });

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
      <RecarSnackbar
        isSnackbarOpen={isSnackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
}
