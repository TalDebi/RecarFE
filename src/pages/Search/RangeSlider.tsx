import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Stack, SxProps, Theme } from "@mui/material";

interface RangeSliderProps {
  style?: SxProps<Theme>;
  min: number;
  max: number;
  step: number;
  value: number[];
  setValue: (value: number[]) => void;
  valuetext: (value: number) => string;
}

function RangeSlider({
  style,
  min,
  max,
  step,
  value,
  setValue,
  valuetext,
}: RangeSliderProps) {
  const handleChange = (_: Event, newValue: number[]): void => {
    setValue(newValue);
  };

  const range = (
    start: number,
    end: number
  ): { value: number; label: string }[] =>
    start === end
      ? [{ value: start, label: `₪ ${start}K` }]
      : [
          { value: start, label: `₪ ${start}K` },
          ...range(start + step * 2, end),
        ];

  return (
    <Slider
      sx={style}
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
