import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import CarIcon from "@mui/icons-material/Toys";
import RecarLogo from "./assets/recarLogo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { logout } from "./services/user";
import Cookies from "js-cookie";

const pages = [
  { title: "חיפוש רכבים", route: "search", icon: <SearchIcon /> },
  { title: "הרכבים שלי", route: "myCars", icon: <CarIcon /> },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<string | undefined>(
    JSON.parse(localStorage.getItem("user") ?? "{}")?.imgUrl
  );

  useEffect(() => {
    const handleLocalStorageChange = () => {
      setUserInfo(JSON.parse(localStorage.getItem("user") ?? "{}")?.imgUrl);
    };

    window.addEventListener("storage", handleLocalStorageChange);

    return () => {
      window.removeEventListener("storage", handleLocalStorageChange);
    };
  }, []);

  const { mutate: submitLogout } = useMutation(logout, {
    onSettled: () => {
      handleCloseUserMenu();
      localStorage.removeItem("user");
      localStorage.removeItem("tokens");
      Cookies.remove("user");
      Cookies.remove("refreshToken");
      navigate(`/login`);
    },
  });

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const showNavbar =
    location.pathname !== "/login" && location.pathname !== "/registration";

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const navigateToProfile = (): void => {
    handleCloseUserMenu();
    navigate(`/profile`);
  };

  const handleNavMenuClick = (route: string): void => {
    handleCloseNavMenu();
    navigate(`/${route}`);
  };

  const settings = [
    { label: "פרופיל", action: navigateToProfile },
    { label: "התנתקות", action: () => submitLogout() },
  ];

  return showNavbar ? (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              width: 70,
              height: 70,
            }}
            alt="logo"
            src={RecarLogo}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RECAR
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={(): void => handleNavMenuClick(page.route)}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component="img"
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              width: 70,
              height: 70,
            }}
            alt="logo"
            src={RecarLogo}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RECAR
          </Typography>

          <Box sx={{ flexGrow: 1, ml: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                startIcon={page.icon}
                onClick={(): void => handleNavMenuClick(page.route)}
                sx={{ my: 2, color: "inherit" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={userInfo ?? ""} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={setting.action}>
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  ) : (
    <></>
  );
}
export default Navbar;
