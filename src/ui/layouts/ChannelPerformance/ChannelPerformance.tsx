import React, { FC } from 'react';
import styles from './ChannelPerformance.module.scss';
import Box from '@mui/joy/Box';
import ChartPie from '@/ui/widgets/charts/ChartPie/ChartPie';

interface ChannelPerformanceProps { }

const ChannelPerformance: FC<ChannelPerformanceProps> = () => (
  <div className={styles.ChannelPerformance}>
    ChannelPerformance Component

    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 20
    }}>
      <ChartPie></ChartPie>
    </Box>
  </div>
);

export default ChannelPerformance;
