import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import carImage from "../assets/toyotaExample.avif";
import { Badge } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

const mainInfo = ["יצרן", "דגם", "שנה", "איזור מכירה"];

function CarInfoCard() {
  const handleOpenMoreOptions = () => {
    console.log(1);
  };

  return (
    <Card sx={{ display: "flex", width: 1300, height: 160, mb: 2 }}>
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
              <CircleNotificationsIcon />
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
  );
}

export default CarInfoCard;
