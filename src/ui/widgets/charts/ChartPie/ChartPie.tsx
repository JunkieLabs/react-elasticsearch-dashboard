import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './ChartPie.module.scss';
import { ModelChartJs } from '@/types/charts/chartjs';

import { Chart } from 'chart.js';

interface ChartPieProps {
  data?: ModelChartJs
}

const ChartPie: FC<ChartPieProps> = ({ data }) => {

  const chartRef = useRef(null);
  const chartInstance = useRef<Chart<"pie", number[], string>>(); // To store the Chart.js instance


  useEffect(() => {
    const ctx = (chartRef.current as HTMLCanvasElement | null)?.getContext('2d');
    if (ctx && chartInstance) {
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data?.labels ?? [],
          datasets: data?.data ?? [],
        },
      });
    }


  }, [chartRef.current]);

  // const drawChart = () => {
  //   const ctx = chartRef.current.getContext('2d');
  //   // Draw the chart
  // };

  useEffect(() => {
    // Update chart data when 'data' prop changes
    if (chartInstance.current) {
      chartInstance.current.data.labels = data?.labels ?? [];
      if (data?.data && data?.data.length > 0) {

        if (chartInstance.current.data.datasets && chartInstance.current.data.datasets.length > 0) {
          chartInstance.current.data.datasets[0] = data!.data[0];
        } else {
          chartInstance.current.data.datasets = data?.data ?? [];
        }

      } else {
        chartInstance.current.data.datasets = [];
      }

      chartInstance.current.update();
    }
  }, [data]);

  return (


    <div className={styles.ChartPie}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default ChartPie;
