import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import carImage from "../assets/toyotaExample.avif";
import { Badge, Container, Paper } from "@mui/material";
import { main } from "@popperjs/core";
import MoreVert from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";

const mainInfo = ["יצרן", "דגם", "שנה", "איזור מכירה"];

function MyCars() {
  const theme = useTheme();

  const handleOpenMoreOptions = () => {
    console.log(1);
  };

  return (
    <Container
      sx={{
        position: "fixed",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        minWidth: "100%",
      }}
    >
      {[1, 2, 3].map(() => (
        <Card sx={{ display: "flex", width: 1300, height: 160, margin: 3 }}>
          <CardMedia
            component="img"
            sx={{ width: 250, height: 160 }}
            image={carImage}
            alt="no image provided"
          />
          <CardContent
            sx={{
              flex: "1 0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {mainInfo.map((field, index) => (
                <Box component="span" key={index}>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="text.secondary"
                  >
                    {field}:{" "}
                  </Typography>
                  <Typography component="span" variant="h6">
                    toyota
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h5" color="text.secondary">
                מחיר
              </Typography>
              <Typography variant="h3">40,000₪</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <IconButton
                sx={{ mr: 2 }}
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                onClick={handleOpenMoreOptions}
                color="inherit"
              >
                <MoreVert />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default MyCars;
