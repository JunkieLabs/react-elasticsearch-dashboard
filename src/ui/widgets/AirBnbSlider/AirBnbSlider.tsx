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
        
        />
    </div>
  );
};

export default AirBnbSlider;
