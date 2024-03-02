import React, { useState } from "react";
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
import { useParams } from "react-router";
import Carousel from "react-material-ui-carousel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import AvaterPic from "../assets/avatar.jpeg"
import RecarDialog from "../customComponents/RecarDialog";
import UserEditForm from "./UserEditForm";


const additionalInfo = [
    { label: "קילומטראג", value: "1231" },
    { label: "קילומטראג", value: "32142" },
    { label: "קילומטראג", value: "4234234" },
    { label: "קילומטראג", value: "234234" },
    { label: "קילומטראג", value: "32424" },
    { label: "קילומטראג", value: "23423432" },
    { label: "קילומטראג", value: "4234" },
    { label: "קילומטראג", value: "43242" },
    { label: "קילומטראג", value: "32432432" },
    { label: "קילומטראג", value: "32432432" },
];



interface ButtonProps {
    buttonColor: string;
}

function ResultsTable() {
    const theme = useTheme();
    const { carID } = useParams();
    const [isFavorite, setFavorite] = useState<boolean>(false);
    const [isEditMode, setEditMode] = useState<boolean>(false);

    const handleFavorite = (): void => {
        setFavorite(!isFavorite);
    };

    const handleEdit = (): void => {
        setEditMode(!isEditMode);
    };

    const StyledButton = styled(Button) <ButtonProps>`
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
                                p: 3
                            }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: 200 }}>
                                <Typography variant="h4">טל דבי</Typography>
                                <Typography variant="h6">taldebi@gmail.com</Typography>
                                <Typography variant="h6" >055-5555555</Typography>
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
            </Card >
            <RecarDialog
                open={isEditMode}
                setOpen={setEditMode}
                dialogType="Edit"
                dialogTitle="עריכת פרטי משתמש"
            >
                <UserEditForm defaultValues={{
                    phone: "055555555",
                    email: "taldebi@gmail.com",
                    name: "טל דבי"
                }} />
            </RecarDialog>
        </>
    );
}

export default ResultsTable;
