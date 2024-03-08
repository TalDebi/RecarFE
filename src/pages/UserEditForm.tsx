import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
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
import RecarSnackbar, {
  AlertSeverity,
} from "../customComponents/RecarSnackbar";
import { useMutation } from "react-query";
import { editUser } from "../services/user";
import RecarDialog from "../customComponents/RecarDialog";
import { User } from "../services/types";

const fields = [
  {
    id: "phoneNumber",
    name: "phoneNumber",
    label: "מספר טלפון",
    required: true,
    type: "tel",
  },
  {
    id: "email",
    name: "email",
    label: "אימייל",
    required: true,
    type: "email",
  },
  {
    id: "password",
    name: "password",
    label: "סיסמה",
    required: true,
    type: "password",
  },
  {
    id: "varifyPassword",
    name: "varifyPassword",
    label: "אימות סיסמה",
    required: true,
    type: "password",
  },
];

interface defaultValue {
  [key: string]: string | number;
}

interface UserEditFormProps {
  defaultValues?: defaultValue;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UserEditForm = ({ defaultValues, open, setOpen }: UserEditFormProps) => {
  const theme = useTheme();
  const [imgSrc, setImgSrc] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertSeverity>("info");

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

  const { mutate: submitEditUser, isLoading } = useMutation(editUser, {
    onSuccess: (data) => {
      setSnackbarMessage("הפרטים נערכו בהצלחה");
      setSnackbarSeverity("success");
      console.log("edit successful:", data);
      localStorage.setItem("user", JSON.stringify(data));
    },
    onError: (error) => {
      setSnackbarMessage("הפרטים שהוזנו לא נכונים");
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
    // const url = await uploadPhoto(imgSrc!);
    const user: User = {
      name: data.get("name")?.toString() ?? "",
      email: data.get("email")?.toString() ?? "",
      password: data.get("password")?.toString() ?? "",
      phoneNumber: data.get("phoneNumber")?.toString() ?? "",
      // imgUrl: url,
    };
    try {
      await submitEditUser(user);
    } catch (error) {
      console.log("error edit user: ", error);
      throw error;
    }
  };

  return (
    <RecarDialog
      open={open}
      setOpen={setOpen}
      isLoading={isLoading}
      dialogType="Edit"
      dialogTitle="עריכת פרטי משתמש"
      submitAction={handleSubmit}
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
        <Box sx={{ mt: 2 }}>
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
                defaultValue={defaultValues && defaultValues["name"]}
              />
            </Grid>
            <Grid item xs={3} />
            {fields.map((field) => (
              <Grid item xs={6}>
                <TextField
                  {...field}
                  fullWidth
                  defaultValue={defaultValues && defaultValues[field.name]}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <RecarSnackbar
          isSnackbarOpen={isSnackbarOpen}
          setSnackbarOpen={setSnackbarOpen}
          snackbarSeverity={snackbarSeverity}
          snackbarMessage={snackbarMessage}
        />
      </Box>
    </RecarDialog>
  );
};

export default UserEditForm;
