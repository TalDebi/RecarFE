import { ChangeEvent, useRef, useState } from "react";
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
import { uploadPhoto } from "../services/file";
import { googleSignin, registerUser } from "../services/user";
import { Badge, CircularProgress, IconButton, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CarIllustration from "../assets/CarIllustration.svg";
import { AuthorizedUser, User } from "../services/types";
import { useMutation } from "react-query";
import RecarSnackbar, {
  AlertSeverity,
} from "../customComponents/RecarSnackbar";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";

export default function Registration() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [imgSrc, setImgSrc] = useState<File>();
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loadingPhotoUpload, setLoadingPhotoUpload] = useState<boolean>(false);
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

  const fields = [
    {
      name: "phoneNumber",
      label: "מספר טלפון",
      type: "tel",
      autoComplete: "tel",
      register: {
        required: true,
        pattern: /^0\d{9}$/,
      },
      helperText: (errors: FieldErrors<FieldValues>) =>
        errors.phoneNumber
          ? errors.phoneNumber.type === "pattern"
            ? "במספר טלפון 10 ספרות בלבד"
            : "שדה חובה"
          : "",
    },
    {
      name: "email",
      label: "אימייל",
      type: "email",
      autoComplete: "email",
      register: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      helperText: (errors: FieldErrors<FieldValues>) =>
        errors.email
          ? errors.email.type === "pattern"
            ? 'כתובת דוא"ל לא חוקית'
            : "שדה חובה"
          : "",
    },
    {
      name: "password",
      label: "סיסמה",
      type: "password",
      autoComplete: "new-password",
      register: { required: true },
      helperText: (errors: FieldErrors<FieldValues>) =>
        errors.password ? "שדה חובה" : "",
    },
    {
      name: "confirmPassword",
      label: "אימות סיסמה",
      type: "password",
      autoComplete: "new-password",
      register: {
        required: true,
        validate: validateConfirmPassword,
      },
      helperText: (errors: FieldErrors<FieldValues>) =>
        errors.confirmPassword ? "הסיסמאות חייבות להיות זהות" : "",
    },
  ];

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setImgSrc(e.target.files[0]);
    }
  };

  const handleImageSelect = (): void => {
    fileInputRef.current?.click();
  };

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ): Promise<void> => {
    const res: AuthorizedUser = await googleSignin(credentialResponse);
    setSnackbarMessage("נרשמת בהצלחה!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("tokens", JSON.stringify(res.tokens));
    window.dispatchEvent(new Event("storage"));
    navigate("/search");
  };

  const onGoogleLoginFailure = (): void => {
    setSnackbarMessage("ההירשמות דרך גוגל נכשלה");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const navigateToLogin = (): void => {
    navigate("/login");
  };

  const { mutate: submitRegister, isLoading: isLoadingUserEdit } = useMutation(
    registerUser,
    {
      onSuccess: (data: AuthorizedUser) => {
        setSnackbarMessage("נרשמת בהצלחה!");
        setSnackbarSeverity("success");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("tokens", JSON.stringify(data.tokens));
        window.dispatchEvent(new Event("storage"));
        navigate("/search");
      },
      onError: () => {
        setSnackbarMessage("הפרטים שהוזנו לא נכונים");
        setSnackbarSeverity("error");
      },
      onSettled: () => {
        setSnackbarOpen(true);
      },
    }
  );

  const onSubmit = async (data: FieldValues) => {
    let newImageSrc;
    if (imgSrc) {
      setLoadingPhotoUpload(true);
      newImageSrc = await uploadPhoto(imgSrc);
      setLoadingPhotoUpload(false);
    }
    const user: User = {
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      imgUrl: newImageSrc,
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
                onClick={handleImageSelect}
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
            onChange={handleImageInputChange}
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
                  label="שם פרטי"
                  autoFocus
                  {...register("name", { required: true })}
                  error={!!errors.name}
                  helperText={errors.name ? "שדה חובה" : ""}
                />
              </Grid>
              <Grid item xs={3} />
              {fields.map((field, index: number) => (
                <Grid item xs={6} key={index}>
                  <TextField
                    fullWidth
                    label={field.label}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    {...register(field.name, field.register)}
                    error={!!errors[field.name]}
                    helperText={field.helperText(errors)}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained">
                  {isLoadingUserEdit || loadingPhotoUpload ? (
                    <CircularProgress size={24} color="secondary" />
                  ) : (
                    "הירשם"
                  )}
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
