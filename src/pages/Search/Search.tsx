import React, { useState, FormEvent, useEffect, useRef } from "react";
import { Box, Button, TextField, useTheme, Menu, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
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
  const [milageFilters, setMilageFilters] = useState<number[]>([
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

  const [handFilters, setHandFilters] = useState<
    { value: string; displayValue: string }[]
  >([]);
  const [colorFilters, setColorFilters] = useState<
    { value: string; displayValue: string }[]
  >([]);
  const [clearKey, setClearKey] = useState(0);

  const [handOption, setHandOption] = useState<boolean>(false)
  const [colorOption, setColorOption] = useState<boolean>(false)
  const [milageOption, setMilageOption] = useState<boolean>(false)



  const yearSliderText = (value: number): string => value.toString();

  const priceSliderText = (value: number): string => {
    return `₪ ${value}K`;

  };

  const milageSliderText = (value: number): string => value.toString();


  const filterObjects = [
    { filterLabel: "יצרן", value: makeFilters, setValue: setMakeFilters, options: top100Films, style: { width: 285, height: 50, mx: 2 }, key: "make", component: FilterInput },
    { filterLabel: "דגם", value: modelFilters, setValue: setModelFilters, options: top100Films, style: { width: 285, height: 50, mx: 2 }, key: "model", component: FilterInput },
    { filterLabel: "איזור מכירה", value: cityFilters, setValue: setCityFilters, options: top100Films, style: { width: 285, height: 50, mx: 2 }, key: "city", component: FilterInput },
    { filterLabel: "צבע", value: colorFilters, setValue: setColorFilters, options: top100Films, style: { width: 285, height: 50, mx: 2 }, key: "color", component: FilterInput },
    { filterLabel: "יד", value: handFilters, setValue: setHandFilters, options: top100Films, style: { width: 285, height: 50, mx: 2 }, key: "hand", component: FilterInput },
    {
      key: "year",
      label: "שנה",
      value: yearFilters,
      setValue: setYearFilters,
      min: MIN_YEAR,
      max: MAX_YEAR,
      step: YEAR_STEP,
      valuetext: yearSliderText,
      component: RangeSlider,
      style: { width: 200, pt: 3, mx: 5 }
    },
    {
      key: "price",
      label: "מחיר",
      value: priceFilters,
      setValue: setPriceFilters,
      min: MIN_PRICE,
      max: MAX_PRICE,
      step: PRICE_STEP,
      valuetext: priceSliderText,
      component: RangeSlider,
      style: { width: 200, pt: 3, mx: 5 }
    },
    {
      key: "milage",
      label: "קילומטראז'",
      value: milageFilters,
      setValue: setMilageFilters,
      min: MIN_PRICE,
      max: MAX_PRICE,
      step: PRICE_STEP,
      valuetext: milageSliderText,
      component: RangeSlider,
      style: { width: 200, pt: 3, mx: 5 }
    },



  ]
  const [filterList, setFilterList] = useState(["make", "model", "city", "year", "price"])

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);




  const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event)
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };



  const handleAdvancedOptionChange = (event: React.ChangeEvent<HTMLInputElement>, option) => {
    if (event.target.checked) {
      setFilterList([...filterList, option.key])
    } else {
      option.setValue(undefined)
      setFilterList(filterList.filter(item => item != option.key))
    }
    option.setChecked(event.target.checked)

  }

  const advancedOptions = [
    { key: "hand", label: "יד", value: handFilters, setValue: setHandFilters, isChecked: handOption, setChecked: setHandOption },
    { key: "milage", label: "קילומטראז'", value: milageFilters, setValue: setMilageFilters, isChecked: milageOption, setChecked: setMilageOption },
    { key: "color", label: "צבע", value: colorFilters, setValue: setColorFilters, isChecked: colorOption, setChecked: setColorOption },
  ]

  const handleOnSearchInput = (event: FormEvent<HTMLDivElement>): void => {
    setSearchInput(event.target.value);
  };

  const handleClearFilters = (): void => {
    setSearchInput("");
    setMakeFilters([]);
    setModelFilters([]);
    setCityFilters([]);
    setYearFilters([MIN_YEAR, MAX_YEAR]);
    setPriceFilters([MIN_PRICE, MAX_PRICE]);
    setHandFilters([]);
    setColorFilters([]);
    setMilageFilters([MIN_YEAR, MAX_YEAR])
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
        <Box sx={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap" }}>

          {
            filterObjects.map((filter, index) => {
              if (filterList.includes(filter.key)) {
                return <filter.component clearKey={`${index}-${clearKey}`} {...filter} />

              }
            })
          }
        </Box>
        <Box>
          <Button
            startIcon={<AddIcon />}
            variant="text"
            sx={{ color: theme.palette.primary.dark }}
            onClick={handleOpenUserMenu}
          >
            חיפוש מתקדם
          </Button>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {advancedOptions.map((option) => (
              <MenuItem >
                <FormControlLabel control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} checked={option.isChecked} onChange={event => handleAdvancedOptionChange(event, option)} />} label={option.label} />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      <Box width={1400} sx={{ mt: 3 }}>
        <ResultsTable />
      </Box>
    </>
  );
}

export default Search;
