import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface FilterInputProps {
  options: { title: string; year: number }[];
  label: string;
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

function FilterInput({ options, label }: FilterInputProps) {
  return (
    <Autocomplete
      multiple
      size="small"
      limitTags={1}
      id={`filterInput${label}`}
      options={options}
      getOptionLabel={(option) => option?.title}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          sx={{ backgroundColor: "white" }}
        />
      )}
      sx={{ width: 275 }}
    />
  );
}

export default FilterInput;
