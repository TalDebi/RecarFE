import Slider from "@mui/material/Slider";
import { SxProps, Theme, useTheme } from "@mui/material";

interface RangeSliderProps {
  style?: SxProps<Theme>;
  min: number;
  max: number;
  step: number;
  value: number[];
  setValue: (value: number[]) => void;
  valuetext: (value: number) => string;
  clearKey: string;
}

function RangeSlider({
  style,
  min,
  max,
  step,
  value,
  setValue,
  valuetext,
  clearKey,
}: RangeSliderProps) {
  const theme = useTheme();

  const handleChange = (
    _: Event,
    value: number | number[],
    __: number
  ): void => {
    setValue(value as number[]);
  };

  const range = (
    start: number,
    end: number
  ): { value: number; label: string }[] =>
    start === end
      ? [{ value: start, label: valuetext(start) }]
      : [
          { value: start, label: valuetext(start) },
          ...range(start + step * 2, end),
        ];

  return (
    <Slider
      key={`slider-${clearKey}`}
      sx={{ ...style, color: theme.palette.primary.dark }}
      getAriaLabel={(): string => "Temperature range"}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
      defaultValue={[min, max]}
      step={step}
      marks={range(min, max)}
      min={min}
      max={max}
    />
  );
}

export default RangeSlider;
