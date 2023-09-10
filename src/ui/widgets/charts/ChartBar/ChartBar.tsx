import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './ChartBar.module.scss';
import { Box, Theme } from '@mui/joy';
import { Chart } from 'chart.js';
import { ModelChartJs } from '@/types/charts/chartjs';
import { SxProps } from '@mui/material/styles';

interface ChartBarProps {

  data?: ModelChartJs,

  sx?: SxProps<Theme>;
}

const ChartBar: FC<ChartBarProps> = (props) => {
  const canvasRef = useRef(null);
  const chartRef = useRef<Chart<"bar", number[], string>>();

  // const chartInstance = useRef<Chart<"bar", number[], string>>(); // To store the Chart.js instance

  const [chartInstance, setChartInstance] = useState<Chart<"bar", number[], string>>();

  // console.log("ChartBar data: ", props.data)

  useEffect(() => {
    const ctx = (canvasRef.current as HTMLCanvasElement | null)?.getContext('2d');


    let newChartInstance: Chart<"bar", number[], string>;
    if (ctx) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      newChartInstance = new Chart(ctx, {
        type: 'bar',
        options: {
          plugins:{
            legend: {
              display: false,//!this.mIsLabelHidden,
              position: "bottom"
  
            }
          },
          maintainAspectRatio:false,
          responsive: true,
          scales: {
            x: {
              stacked: true,
              ticks: {
                font:{
                  size:9
                }
               }
            },
            y: {
              stacked: true
            }
          }

        },
        data: {
          labels: props.data?.labels ?? [],
          datasets: props.data?.data ?? [],
        },
      });
      // console.log("chartInstance data: ", props.data)
      chartRef.current = newChartInstance;
      // setChartInstance(newChartInstance);

    }


    return () => {
      if (chartRef) {
        newChartInstance.destroy();
        chartRef.current = undefined;

        // chartInstance.destroy();
      }
    };

  }, [canvasRef.current]);

  // const drawChart = () => {
  //   const ctx = canvasRef.current.getContext('2d');
  //   // Draw the chart
  // };

  useEffect(() => {
    // Update chart data when 'data' prop changes
    // const ctx = (canvasRef.current as HTMLCanvasElement | null)?.getContext('2d');

    // console.log("ctx", ctx)

    // var chartIns = ctx ? ((ctx as CanvasRenderingContext2D).canvas as any)?.[`chart`] ?? undefined : undefined;

    var chartIns = chartRef.current
    if (chartIns) {
      chartIns.data.labels = props.data?.labels ?? [];
      if (props.data?.data && props.data?.data.length > 0) {

        if (chartIns.data.datasets && chartIns.data.datasets.length == 1) {
          chartIns.data.datasets[0] = props.data!.data[0];
        } else {
          chartIns.data.datasets = props.data?.data ?? [];
        }

      } else {
        chartIns.data.datasets = [];
      }
      // console.log('Canvas ref:', chartIns);
      // console.log("chartInstance data: ", chartInstance.config, chartInstance.update)


      chartIns.update();
    }


  }, [props.data, canvasRef.current]);

  return (
    <Box className={styles.ChartBar} sx={[props.sx ?? [] as any, {
      // transform: `rotate(${degree}deg)`
      display: `flex`,
      height: '100%',
    }]}>
      <canvas ref={canvasRef} />
    </Box>
  );
}

export default ChartBar;
