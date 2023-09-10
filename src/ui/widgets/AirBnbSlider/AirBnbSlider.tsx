import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import styles from './AirBnbSlider.module.scss';
import { Box, Slider, } from '@mui/joy';




interface AirBnbSliderProps {}

const AirBnbSlider: FC<AirBnbSliderProps> = () => {
  return (
    <div className={styles.AirBnbSlider}>
      <Slider
        track="normal"
        aria-labelledby="track-inverted-range-slider"
        // getAriaValueText={valueText}
        defaultValue={[20, 37]}
        getAriaValueText={valueText}
        marks
        min={30}
        max={50}
        valueLabelDisplay="auto"
        />
    </div>
  );
};

function valueText(value: number) {
  return `${value}°C`;
}

export default AirBnbSlider;
