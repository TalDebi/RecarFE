import * as React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Chip } from "@mui/material";

interface FilterInputProps {
  filterLabel: string;
  options: { value: string; displayValue: string }[];
  value: { value: string; displayValue: string }[];
  setValue: (newValue: { value: string; displayValue: string }[]) => void;
}

function FilterInput({
  value,
  options,
  filterLabel,
  setValue,
}: FilterInputProps) {
  return (
    <Autocomplete
      multiple
      sx={{ width: 275 }}
      size="small"
      limitTags={1}
      getLimitTagsText={() => value.length - 1}
      id={`filterInput${filterLabel}`}
      options={options}
      getOptionLabel={(option) => option?.displayValue}
      onChange={(event, value) => setValue(value)}
      filterOptions={createFilterOptions({
        limit: 10,
      })}
      renderInput={(params) => (
        <TextField
          {...params}
          label={filterLabel}
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
              label={option.displayValue}
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
    />
  );
}

export default FilterInput;
