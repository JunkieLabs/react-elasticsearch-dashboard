import React, { FC } from 'react';
import styles from './TopChannels.module.scss';
import Box from '@mui/joy/Box';
import DateRangeInput from '@/ui/widget/inputs/DateRangeInput/DateRangeInput';

interface TopChannelsProps {}

const TopChannels: FC<TopChannelsProps> = () => (
  <div className={styles.TopChannels}>
    <Box sx={{
      display:"flex",
      flexDirection:'column'
       
    }}>
      <Box sx={{alignSelf:'flex-end'}}>
      <DateRangeInput></DateRangeInput>
      </Box>


    </Box>
  </div>
);

export default TopChannels;
