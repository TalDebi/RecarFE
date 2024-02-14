import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Stack, Typography } from "@mui/material";

function valuetext(value: number) {
  return `${value}°C`;
}

function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Stack spacing={2} direction="row" sx={{ width: 225 }}>
      <Typography variant="h5">₪</Typography>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        aria-label="Temperature"
        defaultValue={[10, 110]}
        step={10}
        marks
        min={10}
        max={110}
        sx={{ pt: 3 }}
      />
    </Stack>
  );
}

export default RangeSlider;
