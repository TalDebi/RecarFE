import { useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  styled,
  useTheme,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import AvaterPic from "../assets/avatar.jpeg";
import UserEditForm from "./UserEditForm";
import { SecuredUser } from "../services/types";
import RecarSnackbar, {
  AlertSeverity,
} from "../customComponents/RecarSnackbar";

interface ButtonProps {
  buttonColor: string;
}

function Profile() {
  const theme = useTheme();
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertSeverity>("info");

  const userInfo: SecuredUser = JSON.parse(
    localStorage.getItem("user") ?? "{}"
  );

  const handleEdit = (): void => {
    setEditMode(!isEditMode);
  };

  const StyledButton = styled(Button)<ButtonProps>`
    background-color: ${({ buttonColor }) => buttonColor};
    border-color: ${({ buttonColor }) => buttonColor};

    &:hover {
      border-color: ${({ buttonColor }) => buttonColor};
    }
  `;

  return (
    <>
      <Card
        sx={{
          width: 1350,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            p: 3,
            height: 350,
          }}
        >
          <Avatar
            sx={{
              mt: 2,
              mr: 3,
              width: 275,
              height: 275,
              border: "2px solid",
              borderColor: theme.palette.primary.main,
            }}
            src={AvaterPic}
          />
          <Box
            sx={{
              flex: "1 0 auto",
              display: "flex",
              justifyContent: "space-between",
              pl: 3,
              p: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: 200,
                pt: 3,
              }}
            >
              <Typography variant="h3">{userInfo?.name}</Typography>
              <Typography variant="h6">{userInfo?.email}</Typography>
              <Typography variant="h6">{userInfo?.phoneNumber}</Typography>
            </Box>
            <StyledButton
              buttonColor={theme.palette.primary.main}
              sx={{ height: "fit-content" }}
              variant="contained"
              endIcon={<EditIcon />}
              onClick={handleEdit}
            >
              עריכה
            </StyledButton>
          </Box>
        </CardContent>
      </Card>
      <UserEditForm
        open={isEditMode}
        setOpen={setEditMode}
        setSnackbarOpen={setSnackbarOpen}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarSeverity={setSnackbarSeverity}
        defaultValues={{
          phoneNumber: userInfo?.phoneNumber ?? "",
          email: userInfo?.email ?? "",
          name: userInfo?.name ?? "",
        }}
      />
      <RecarSnackbar
        isSnackbarOpen={isSnackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarSeverity={snackbarSeverity}
        snackbarMessage={snackbarMessage}
      />
    </>
  );
}

export default Profile;
