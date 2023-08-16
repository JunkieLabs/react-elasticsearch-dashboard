import React, { FC } from 'react';
import styles from './TopChannels.module.scss';
import Box from '@mui/joy/Box';
import DateRangeInput from '@/ui/widgets/inputs/DateRangeInput/DateRangeInput';
import Container from '@mui/joy/Container';
import Filters from './Filters/Filters';

interface TopChannelsProps { }

const TopChannels: FC<TopChannelsProps> = () => (
  <div className={styles.TopChannels}>
    <Container className={"tb-position--relative"}>
      <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>

      <Box sx={{
        display: "flex",
        flexDirection: 'column'

      }}>
        <Box sx={{ alignSelf: 'flex-end' }}>
          <DateRangeInput></DateRangeInput>
        </Box>
        <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>
  
        <Filters></Filters>

      </Box>
    </Container>
  </div>
);

export default TopChannels;
