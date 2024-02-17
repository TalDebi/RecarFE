import React, { useState } from "react";
import { Box, Button, Container, TextField, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterInput from "./FilterInput";
import RangeSlider from "./RangeSlider";
import AddIcon from "@mui/icons-material/Add";
import ResultsTable from "./ResultsTable";

const top100Films = [
  { displayValue: "The Shawshank Redemption", value: "1" },
  { displayValue: "The Godfather", value: "2" },
  { displayValue: "The Godfather: Part II", value: "3" },
  { displayValue: "The Dark Knight", value: "4" },
  { displayValue: "12 Angry Men", value: "5" },
  { displayValue: "Schindler's List", value: "6" },
  { displayValue: "Pulp Fiction", value: "7" },
];

const MIN_PRICE = 0;
const MAX_PRICE = 100;
const STEP = 10;

function Search() {
  const theme = useTheme();
  const [searchInput, setSearchInput] = useState<string>("");
  const [priceFilters, setPriceFilters] = useState<number[]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);
  const [makeFilters, setMakeFilters] = useState<
    { value: string; displayValue: string }[]
  >([]);
  const [modelFilters, setModelFilters] = useState<
    { value: string; displayValue: string }[]
  >([]);
  const [cityFilters, setCityFilters] = useState<
    { value: string; displayValue: string }[]
  >([]);
  const [yearFilters, setYearFilters] = useState<
    { value: string; displayValue: string }[]
  >([]);
  const [clearKey, setClearKey] = useState(0);

  const filterInputs = [
    { label: "יצרן", value: makeFilters, setValue: setMakeFilters },
    { label: "דגם", value: modelFilters, setValue: setModelFilters },
    { label: "שנה", value: cityFilters, setValue: setCityFilters },
    { label: "איזור מכירה", value: yearFilters, setValue: setYearFilters },
  ];

  const priceSliderText = (value: number): string => {
    return `₪ ${value}K`;
  };

  const handleOnSearchInput = (
    event: React.FormEvent<HTMLDivElement>
  ): void => {
    setSearchInput(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setMakeFilters([]);
    setModelFilters([]);
    setCityFilters([]);
    setYearFilters([]);
    setPriceFilters([MIN_PRICE, MAX_PRICE]);
    setClearKey((prevKey) => prevKey + 1);
  };

  const handleSearch = () => {
    console.log(searchInput);
    console.log(makeFilters);
    console.log(modelFilters);
    console.log(cityFilters);
    console.log(yearFilters);
    console.log(priceFilters);
  };

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
            value={searchInput}
            onInput={(event: React.FormEvent<HTMLDivElement>): void =>
              handleOnSearchInput(event)
            }
          />
          <Box display="flex">
            <Button
              variant="contained"
              sx={{ height: "100%" }}
              onClick={handleSearch}
            >
              <SearchIcon sx={{ color: theme.palette.secondary.light }} />
            </Button>
            <Button
              variant="text"
              sx={{ color: theme.palette.primary.dark }}
              onClick={handleClearFilters}
            >
              נקה
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          {filterInputs.map((filter, index) => (
            <FilterInput
              key={index}
              clearKey={`${index}-${clearKey}`}
              options={top100Films}
              filterLabel={filter.label}
              value={filter.value}
              setValue={filter.setValue}
              style={{ width: 275 }}
            />
          ))}
          <RangeSlider
            style={{ width: 200, pt: 3 }}
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={STEP}
            valuetext={priceSliderText}
            value={priceFilters}
            setValue={setPriceFilters}
          />
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
