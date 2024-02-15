import * as React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";

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
      getLimitTagsText={(value) => value}
      id={`filterInput${label}`}
      options={options}
      getOptionLabel={(option) => option?.title}
      filterOptions={createFilterOptions({
        limit: 10,
      })}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          sx={{ backgroundColor: "white" }}
        />
      )}
      renderTags={(value, getTagProps) => {
        const displayedValues = value.slice(0, 1); // Display up to 5 tags
        const moreValuesCount = value.length - displayedValues.length;

        return displayedValues
          .map((option, index) => (
            <Chip
              size="small"
              label={option.title}
              {...getTagProps({ index })}
            />
          ))
          .concat(
            moreValuesCount > 0 ? (
              <Chip
                size="small"
                key={displayedValues.length}
                label={`+${moreValuesCount}`}
                color="default"
              />
            ) : (
              []
            )
          );
      }}
      sx={{ width: 275 }}
    />
  );
}

export default FilterInput;
