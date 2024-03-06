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
import RecarDialog from "../customComponents/RecarDialog";
import UserEditForm from "./UserEditForm";

interface ButtonProps {
  buttonColor: string;
}

function Profile() {
  const theme = useTheme();
  const [isEditMode, setEditMode] = useState<boolean>(false);

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
            flexDirection: "column",
            p: 3,
          }}
        >
          <Box sx={{ display: "flex", width: 1300, height: 400 }}>
            <Box sx={{ width: 250, textAlign: "center" }} mr={3}>
              <Avatar
                sx={{
                  mt: 2,
                  width: 250,
                  height: 250,
                  border: "2px solid",
                  borderColor: theme.palette.primary.main,
                }}
                src={AvaterPic}
              />
              <Typography variant="h3">Tal Debi</Typography>
            </Box>
            <Box
              sx={{
                flex: "1 0 auto",
                display: "flex",
                justifyContent: "space-between",
                p: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  height: 200,
                }}
              >
                <Typography variant="h4">טל דבי</Typography>
                <Typography variant="h6">taldebi@gmail.com</Typography>
                <Typography variant="h6">055-5555555</Typography>
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
          </Box>
        </CardContent>
      </Card>
      <RecarDialog
        open={isEditMode}
        setOpen={setEditMode}
        dialogType="Edit"
        dialogTitle="עריכת פרטי משתמש"
      >
        <UserEditForm
          defaultValues={{
            phone: "055555555",
            email: "taldebi@gmail.com",
            name: "טל דבי",
          }}
        />
      </RecarDialog>
    </>
  );
}

export default Profile;
