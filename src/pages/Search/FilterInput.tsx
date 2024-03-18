import Autocomplete, {
  AutocompleteRenderGetTagProps,
  createFilterOptions,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Chip, SxProps, Theme } from "@mui/material";

interface FilterInputProps {
  filterLabel: string;
  options: { value: string; displayValue: string }[];
  value: { value: string; displayValue: string }[];
  setValue: (newValue: { value: string; displayValue: string }[]) => void;
  style?: SxProps<Theme>;
  clearKey: string;
}

function FilterInput({
  value,
  options,
  filterLabel,
  setValue,
  style,
  clearKey,
}: FilterInputProps) {
  const renderTags = (
    value: {
      value: string;
      displayValue: string;
    }[],
    getTagProps: AutocompleteRenderGetTagProps
  ): JSX.Element[] => {
    const displayedValues = value.slice(0, 1);
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
  };

  return (
    <Autocomplete
      key={`autocomplete-${clearKey}`}
      multiple
      sx={style}
      size="small"
      limitTags={1}
      getLimitTagsText={(): number => value.length - 1}
      id={`filterInput${filterLabel}`}
      options={options}
      getOptionLabel={(option): string => option?.displayValue}
      onChange={(_, value): void => setValue(value)}
      filterOptions={createFilterOptions({
        limit: 10,
      })}
      renderInput={(params): JSX.Element => (
        <TextField
          {...params}
          label={filterLabel}
          sx={{ backgroundColor: "white" }}
        />
      )}
      renderTags={(
        value: {
          value: string;
          displayValue: string;
        }[],
        getTagProps: AutocompleteRenderGetTagProps
      ): JSX.Element[] => renderTags(value, getTagProps)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
    />
  );
}

export default FilterInput;
