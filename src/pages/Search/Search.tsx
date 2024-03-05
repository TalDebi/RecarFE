import  { useState, FormEvent } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterInput from "./FilterInput";
import RangeSlider from "./RangeSlider";
import AddIcon from "@mui/icons-material/Add";
import ResultsTable from "./ResultsTable";
import {
  MAX_PRICE,
  MAX_YEAR,
  MIN_PRICE,
  MIN_YEAR,
  PRICE_STEP,
  YEAR_STEP,
} from "./consts";

const top100Films = [
  { displayValue: "The Shawshank Redemption", value: "1" },
  { displayValue: "The Godfather", value: "2" },
  { displayValue: "The Godfather: Part II", value: "3" },
  { displayValue: "The Dark Knight", value: "4" },
  { displayValue: "12 Angry Men", value: "5" },
  { displayValue: "Schindler's List", value: "6" },
  { displayValue: "Pulp Fiction", value: "7" },
];

function Search() {
  const theme = useTheme();
  const [searchInput, setSearchInput] = useState<string>("");
  const [priceFilters, setPriceFilters] = useState<number[]>([
    MIN_PRICE,
    MAX_PRICE,
  ]);
  const [yearFilters, setYearFilters] = useState<number[]>([
    MIN_YEAR,
    MAX_YEAR,
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
  const [clearKey, setClearKey] = useState(0);

  const yearSliderText = (value: number): string => value.toString();

  const priceSliderText = (value: number): string => {
    return `₪ ${value}K`;
  };

  const filterInputs = [
    { label: "יצרן", value: makeFilters, setValue: setMakeFilters },
    { label: "דגם", value: modelFilters, setValue: setModelFilters },
    { label: "איזור מכירה", value: cityFilters, setValue: setCityFilters },
  ];
  const filterSliders = [
    {
      label: "שנה",
      value: yearFilters,
      setValue: setYearFilters,
      min: MIN_YEAR,
      max: MAX_YEAR,
      step: YEAR_STEP,
      sliderText: yearSliderText,
    },
    {
      label: "מחיר",
      value: priceFilters,
      setValue: setPriceFilters,
      min: MIN_PRICE,
      max: MAX_PRICE,
      step: PRICE_STEP,
      sliderText: priceSliderText,
    },
  ];

  const handleOnSearchInput = (event: FormEvent<HTMLDivElement>): void => {
    setSearchInput((event.target as HTMLInputElement).value);
  };

  const handleClearFilters = (): void => {
    setSearchInput("");
    setMakeFilters([]);
    setModelFilters([]);
    setCityFilters([]);
    setYearFilters([MIN_YEAR, MAX_YEAR]);
    setPriceFilters([MIN_PRICE, MAX_PRICE]);
    setClearKey((prevKey): number => prevKey + 1);
  };

  const handleSearch = (): void => {
    console.log(searchInput);
    console.log(makeFilters);
    console.log(modelFilters);
    console.log(cityFilters);
    console.log(yearFilters);
    console.log(priceFilters);
  };

  return (
    <>
      <Box width={1400}>
        <Box
          sx={{ display: "flex", justifyContent: "center", height: 40, mb: 2 }}
        >
          <TextField
            id="searchInput"
            variant="outlined"
            size="small"
            placeholder="חיפוש..."
            sx={{ backgroundColor: "white", width: "100%", mr: 2 }}
            value={searchInput}
            onInput={(event: FormEvent<HTMLDivElement>): void =>
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {filterInputs.map(
            (filter, index): JSX.Element => (
              <FilterInput
                key={index}
                clearKey={`${index}-${clearKey}`}
                options={top100Films}
                filterLabel={filter.label}
                value={filter.value}
                setValue={filter.setValue}
                style={{ width: 285 }}
              />
            )
          )}
          {filterSliders.map(
            (filter, index): JSX.Element => (
              <RangeSlider
                key={index}
                clearKey={`${index}-${clearKey}`}
                style={{ width: 200, pt: 3, ml: 2 }}
                min={filter.min}
                max={filter.max}
                step={filter.step}
                valuetext={filter.sliderText}
                value={filter.value}
                setValue={filter.setValue}
              />
            )
          )}
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
      <Box width={1400} sx={{ mt: 3 }}>
        <ResultsTable />
      </Box>
    </>
  );
}

export default Search;
