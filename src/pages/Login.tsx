import { FormEvent, useEffect, useState } from "react";
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
import {
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import { useMutation } from "react-query";
import { googleSignin, login, refreshTokens } from "../services/user";
import RecarSnackbar, {
  AlertSeverity,
} from "../customComponents/RecarSnackbar";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { AuthorizedUser } from "../services/types";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [isRememberMeOn, setRememberMeOn] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertSeverity>("info");

  const navigateToRegistration = (): void => {
    navigate("/registration");
  };

  useEffect(() => {
    const checkIfRegistered = async () => {
      const encodedRefreshToken = Cookies.get("refreshToken") ?? "";
      const encodedUser = Cookies.get("user") ?? "";
      const refreshToken =
        encodedRefreshToken ?? decodeURIComponent(encodedRefreshToken);
      const user = encodedUser ?? JSON.parse(decodeURIComponent(encodedUser));
      if (refreshToken && user) {
        const response = await refreshTokens();
        if (response) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("tokens", JSON.stringify(response));
          localStorage.setItem("isFirstLogin", "false");
          window.dispatchEvent(new Event("storage"));
          navigate("/search");
        }
      }
    };

    const isFirstLogin = localStorage.getItem("isFirstLogin") ?? "";
    if (isFirstLogin !== "false") checkIfRegistered();
  }, []);

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ): Promise<void> => {
    const res: AuthorizedUser = await googleSignin(credentialResponse);
    setSnackbarMessage("התחברת בהצלחה!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("tokens", JSON.stringify(res.tokens));
    localStorage.setItem("isFirstLogin", "false");
    if (isRememberMeOn) {
      Cookies.set("refreshToken", encodeURIComponent(res.tokens.refreshToken), {
        expires: 7,
      });
      Cookies.set("user", encodeURIComponent(JSON.stringify(res.user)), {
        expires: 7,
      });
    }
    window.dispatchEvent(new Event("storage"));
    navigate("/search");
  };

  const onGoogleLoginFailure = (): void => {
    setSnackbarMessage("ההתחברות דרך גוגל נכשלה");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const { mutate: submitLogin, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      setSnackbarMessage("התחברת בהצלחה!");
      setSnackbarSeverity("success");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("tokens", JSON.stringify(data.tokens));
      localStorage.setItem("isFirstLogin", "false");
      if (isRememberMeOn) {
        Cookies.set(
          "refreshToken",
          encodeURIComponent(data.tokens.refreshToken),
          { expires: 7 }
        );
        Cookies.set(
          "user",
          encodeURIComponent(JSON.stringify(data.tokens.refreshToken)),
          { expires: 7 }
        );
      }
      window.dispatchEvent(new Event("storage"));
      navigate("/search");
    },
    onError: () => {
      setSnackbarMessage("מייל או סיסמא שגויים");
      setSnackbarSeverity("error");
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
    await submitLogin({
      email: data.get("email")?.toString() ?? "",
      password: data.get("password")?.toString() ?? "",
    });
  };

  const handleRememberMeChange = () => {
    setRememberMeOn(!isRememberMeOn);
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
                {isLoading ? (
                  <CircularProgress size={24} color="secondary" />
                ) : (
                  "התחבר"
                )}
              </Button>
              <Grid container xs={12} justifyContent="space-between">
                <Grid container item xs={12} alignItems="center">
                  <Grid item xs={8}>
                    <FormControlLabel
                      control={<Checkbox onChange={handleRememberMeChange} />}
                      label="זכור אותי"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Link
                      href=""
                      onClick={navigateToRegistration}
                      variant="body2"
                      color="primary.dark"
                    >
                      נרשמת בעבר? הירשם!{" "}
                    </Link>
                  </Grid>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <Divider>OR</Divider>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <GoogleLogin
                      onSuccess={onGoogleLoginSuccess}
                      onError={onGoogleLoginFailure}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 4 }} />
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
