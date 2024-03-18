import { MouseEvent, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useQuery } from "react-query";
import { getPost } from "../../services/posts-service";
import DeleteIcon from "@mui/icons-material/Delete";

const mainInfo = [
  {
    label: "יצרן",
    key: "make",
  },
  {
    label: "דגם",
    key: "model",
  },
  {
    label: "שנה",
    key: "year",
  },
  {
    label: "איזור מכירה",
    key: "city",
  },
];

interface CarInfoCardProps {
  postId: string;
  deletPost?: (_: string) => void;
}

function CarInfoCard({ postId, deletPost }: CarInfoCardProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleNavigateToPost = (): void => {
    navigate(`../Car/${postId}`, { replace: true });
  };

  const handleOpenMoreOptions = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMoreOptions = () => {
    setAnchorEl(null);
  };

  const handleOpenInNewTab = () => {
    window.open(`${window.location.origin}/Car/${postId}`, "_blank");
    handleCloseMoreOptions();
  };

  const deletePostAction = () => deletPost && deletPost(postId);

  const { data: post } = useQuery(["post", postId], () => getPost(postId).req, {
    onSuccess: (data): void => {
      console.log("Posts loaded successfully:", data.data);
    },
    onError: (error): void => {
      console.error("Error fetching data:", error);
    },
    retry: false,
    refetchInterval: 5000,
  });

  const moreOptions = [
    {
      label: "פתח בחלון חדש",
      action: handleOpenInNewTab,
      icon: <OpenInNewIcon fontSize="small" />,
    },
  ];
  deletPost &&
    moreOptions.push({
      label: "מחק",
      action: deletePostAction,
      icon: <DeleteIcon fontSize="small" />,
    });

  return (
    <Card sx={{ display: "flex", width: "100%", height: 155, mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 350, height: 160 }}
        image={post?.data.car.imgsUrls}
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
          {mainInfo.map(
            (field, index): JSX.Element => (
              <Box component="span" key={index}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="text.secondary"
                >
                  {field.label}:{" "}
                </Typography>
                <Typography component="span" variant="h6">
                  {post?.data.car[field.key]}
                </Typography>
              </Box>
            )
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" color="text.secondary">
            מחיר
          </Typography>
          <Typography variant="h3">{post?.data.car.price}₪</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <IconButton
            sx={{ mr: 2 }}
            size="large"
            color="inherit"
            onClick={handleNavigateToPost}
          >
            <FileOpenIcon />
          </IconButton>
          <Box>
            <IconButton
              id="moreOptionsbutton"
              aria-controls={open ? "menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              size="large"
              onClick={handleOpenMoreOptions}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMoreOptions}
              MenuListProps={{
                "aria-labelledby": "moreOptionsbutton",
              }}
            >
              {moreOptions.map((option) => (
                <MenuItem onClick={option.action}>
                  <ListItemText>{option.label}</ListItemText>
                  <ListItemIcon sx={{ ml: 1 }}>{option.icon}</ListItemIcon>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CarInfoCard;
