import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './ChartPie.module.scss';
import { ModelChartJs } from '@/types/charts/chartjs';

import { Chart } from 'chart.js';

interface ChartPieProps {
  data?: ModelChartJs
}

const ChartPie: FC<ChartPieProps> = ({ data }) => {

  const chartRef = useRef(null);
  // const chartInstance = useRef<Chart<"pie", number[], string>>(); // To store the Chart.js instance

  const [chartInstance, setChartInstance] = useState<Chart<"pie", number[], string>>();

  useEffect(() => {
    const ctx = (chartRef.current as HTMLCanvasElement | null)?.getContext('2d');
    let newChartInstance;
    if (ctx && chartInstance) {
       newChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data?.labels ?? [],
          datasets: data?.data ?? [],
        },
      });

      setChartInstance(newChartInstance);
    
    }

   
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };

  }, [chartRef.current]);

  // const drawChart = () => {
  //   const ctx = chartRef.current.getContext('2d');
  //   // Draw the chart
  // };

  useEffect(() => {
    // Update chart data when 'data' prop changes
    if (chartInstance) {
      chartInstance.data.labels = data?.labels ?? [];
      if (data?.data && data?.data.length > 0) {

        if (chartInstance.data.datasets && chartInstance.data.datasets.length > 0) {
          chartInstance.data.datasets[0] = data!.data[0];
        } else {
          chartInstance.data.datasets = data?.data ?? [];
        }

      } else {
        chartInstance.data.datasets = [];
      }

      chartInstance.update();
    }

   
  }, [data]);

  return (


    <div className={styles.ChartPie}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default ChartPie;
