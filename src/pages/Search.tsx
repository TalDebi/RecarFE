import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  useTheme,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  const theme = useTheme();

  return (
    <Container
      sx={{
        position: "fixed",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        minWidth: "100%",
        padding: 4,
        backgroundColor: theme.palette.secondary.light,
      }}
    >
      <Box width={1000}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="searchInput"
            variant="outlined"
            sx={{ backgroundColor: "white", width: "100%", marginRight: 2 }}
          />
          <Box display="flex">
            <Button
              variant="contained"
              sx={{ height: "100%", boxShadow: "none" }}
            >
              <IconButton>
                <SearchIcon sx={{ color: theme.palette.secondary.light }} />
              </IconButton>
            </Button>
            <Button variant="text" sx={{ color: theme.palette.primary.dark }}>
              נקה
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Search;
