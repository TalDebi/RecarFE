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
import FilterInput from "./FilterInput";
import RangeSlider from "./RangeSlider";
import AddIcon from "@mui/icons-material/Add";
import ResultsTable from "./ResultsTable";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

const filterInputs = ["יצרן", "דגם", "שנה", "איזור מכירה"];

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
        overflow: "auto",
      }}
    >
      <Box width={1400}>
        <Box
          sx={{ display: "flex", justifyContent: "center", height: 40, mb: 1 }}
        >
          <TextField
            id="searchInput"
            variant="outlined"
            size="small"
            placeholder="חיפוש..."
            sx={{ backgroundColor: "white", width: "100%", mr: 2 }}
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          {filterInputs.map((filter, index) => (
            <FilterInput key={index} options={top100Films} label={filter} />
          ))}
          <RangeSlider />
        </Box>
        <Box>
          <Button
            startIcon={<AddIcon />}
            variant="text"
            sx={{ color: theme.palette.primary.dark }}
          >
            חיפוש מתקדם
          </Button>
        </Box>
      </Box>
      <Box width={1400} sx={{ mt: 2 }}>
        <ResultsTable />
      </Box>
    </Container>
  );
}

export default Search;
