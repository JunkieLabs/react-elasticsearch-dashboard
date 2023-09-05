import React, { FC } from 'react';
import styles from './LabelCard.module.scss';
import { Box, Container, FormControl, Theme } from '@mui/joy';

import { SxProps } from '@mui/material/styles';

interface LabelCardProps {

  selected?: boolean;
  onClick?: () => void;
  label: string
  value: number

  sx?: SxProps<Theme>;
}

const LabelCard: FC<LabelCardProps> = (props) => (
  <Box className={styles.LabelCard + " td-px-6 td-py-2  td-bg-white td-rounded-md td-border-gray-600 "+ (props.selected == true ? " td-border-2  td-shadow-none" : " td-shadow-md td-cursor-pointer   hover:td-shadow-lg hover:td-border-2 hover:td-border-gray-300 ") } sx={[props.sx ?? [] as any, {

    // transform: `rotate(${degree}deg)`
  }]} onClick={() => {
    props.onClick?.()
    console.log(":clicked")
  }}>
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      alignItems:"center",
      justifyContent:"space-between"
    }}>

      <h4 className='td-text-md'>{props.label}</h4>
      <h3 className='td-text-4xl'>{props.value}</h3>




    </Box>
  </Box>
);

export default LabelCard;
