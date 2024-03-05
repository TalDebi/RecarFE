import  { ChangeEvent, useRef, useState } from "react";
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
interface defaultValue {
  [key: string]: string | number
}

interface UserEditFormProps {
  defaultValues?: defaultValue
}


const UserEditForm = ({defaultValues}: UserEditFormProps) => {
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
const fields = [
  {
    name: "phone",
    label: "מספר טלפון",
    required: true,
    type: "tel"
  },
  {
    name: "email",
    label: "אימייל",
    required: true,
    type: "email"
  },
  {
    name: "password",
    label: "סיסמה",
    required: true,
    type: "password"
  },
  {
    name: "varifyPassword",
    label: "אימות סיסמה",
    required: true,
    type: "password"
  }
]
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
                defaultValue={defaultValues && defaultValues["name"]}
                />
            </Grid>
            <Grid item xs={3} />
            {
              fields.map(field =>
                <Grid item xs={6}>
                  <TextField
                    {...field}
                    fullWidth
                    defaultValue={defaultValues && defaultValues[field.name]}
                  />
                </Grid>)
            }
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default UserEditForm;
