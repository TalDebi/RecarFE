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
import { AlertSeverity } from "../customComponents/RecarSnackbar";
import { useMutation } from "react-query";
import { editUser } from "../services/user";
import RecarDialog from "../customComponents/RecarDialog";
import { SecuredUser, User } from "../services/types";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { uploadPhoto } from "../services/file";

interface defaultValue {
  [key: string]: string | number;
}

interface UserEditFormProps {
  defaultValues?: defaultValue;
  open: boolean;
  setOpen: (open: boolean) => void;
  setSnackbarOpen: (isSnackbarOpen: boolean) => void;
  setSnackbarMessage: (snackbarMessage: string) => void;
  setSnackbarSeverity: (snackbarSeverity: AlertSeverity) => void;
  userImage: string;
}

const UserEditForm = ({
  defaultValues,
  open,
  setOpen,
  setSnackbarOpen,
  setSnackbarMessage,
  setSnackbarSeverity,
  userImage,
}: UserEditFormProps) => {
  const theme = useTheme();
  const [imgSrc, setImgSrc] = useState<File>();
  const [loadingPhotoUpload, setLoadingPhotoUpload] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userInfo: SecuredUser = JSON.parse(
    localStorage.getItem("user") ?? "{}"
  );

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

  const { mutate: submitEditUser, isLoading: isLoadingUserEdit } = useMutation(
    editUser,
    {
      onSuccess: (data) => {
        setSnackbarMessage("הפרטים נערכו בהצלחה");
        setSnackbarSeverity("success");
        localStorage.setItem("user", JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
        setOpen(false);
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
    let newImageSrc = userImage;
    if (imgSrc) {
      setLoadingPhotoUpload(true);
      newImageSrc = await uploadPhoto(imgSrc);
      setLoadingPhotoUpload(false);
    }
    const user: User = {
      _id: userInfo?._id,
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      imgUrl: newImageSrc,
    };
    await submitEditUser(user);
  };

  return (
    <RecarDialog
      open={open}
      setOpen={setOpen}
      isLoading={isLoadingUserEdit || loadingPhotoUpload}
      dialogType="Edit"
      dialogTitle="עריכת פרטי משתמש"
      submitAction={handleSubmit(onSubmit)}
      isValid={Object.keys(errors).length === 0}
    >
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
            src={imgSrc ? URL.createObjectURL(imgSrc) : userImage}
          />
        </Badge>
        <input
          style={{ display: "none" }}
          ref={fileInputRef}
          type="file"
          onChange={handleImageInputChange}
        />
        <Box sx={{ mt: 2 }}>
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
                defaultValue={defaultValues && defaultValues["name"]}
              />
            </Grid>
            <Grid item xs={3} />
            {fields.map((field) => (
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={field.label}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  {...register(field.name, field.register)}
                  error={!!errors[field.name]}
                  helperText={field.helperText(errors)}
                  defaultValue={defaultValues && defaultValues[field.name]}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </RecarDialog>
  );
};

export default UserEditForm;
