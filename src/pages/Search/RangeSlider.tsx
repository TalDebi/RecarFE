import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Stack, Typography } from "@mui/material";

const MIN_PRICE = 0;
const MAX_PRICE = 100;
const STEP = 10;

function RangeSlider() {
  const [value, setValue] = useState<number[]>([MIN_PRICE, MAX_PRICE]);

  const valuetext = (value: number) => {
    return `₪ ${value}K`;
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const range = (start: number, end: number): [] => {
    if (start === 0)
      return [
        {
          value: 0,
          label: `0`,
        },
        ...range(start + STEP * 2, end),
      ];
    if (start === end)
      return [
        {
          value: start,
          label: `₪ ${start}K`,
        },
      ];
    return [
      {
        value: start,
        label: `₪ ${start}K`,
      },
      ...range(start + STEP * 2, end),
    ];
  };

  return (
    <Stack spacing={1} direction="row" sx={{ width: 225 }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        aria-label="Temperature"
        defaultValue={[MIN_PRICE, MAX_PRICE]}
        step={STEP}
        marks={range(MIN_PRICE, MAX_PRICE)}
        min={MIN_PRICE}
        max={MAX_PRICE}
        sx={{ pt: 3 }}
      />
    </Stack>
  );
}

export default RangeSlider;
