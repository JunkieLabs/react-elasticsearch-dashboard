import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './ChartPie.module.scss';
import { ModelChartJs } from '@/types/charts/chartjs';
import { Box, Container, FormControl, Theme } from '@mui/joy';
import { SxProps } from '@mui/material/styles';
// import {Chart} from 'chart.js';
import Chart from 'chart.js/auto';

interface ChartPieProps {
  data?: ModelChartJs,

  sx?: SxProps<Theme>;
}

const ChartPie: FC<ChartPieProps> = (props) => {

  const canvasRef = useRef(null);
  const chartRef = useRef<Chart<"pie", number[], string>>();

  // const chartInstance = useRef<Chart<"pie", number[], string>>(); // To store the Chart.js instance

  const [chartInstance, setChartInstance] = useState<Chart<"pie", number[], string>>();

  // console.log("ChartPie data: ", props.data)

  useEffect(() => {
    const ctx = (canvasRef.current as HTMLCanvasElement | null)?.getContext('2d');


    let newChartInstance: Chart<"pie", number[], string>;
    if (ctx) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      newChartInstance = new Chart(ctx, {
        type: 'pie',
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins:{
            legend: {
              // display: !this.mIsLabelHidden,
              position: "bottom"
  
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

        if (chartIns.data.datasets && chartIns.data.datasets.length > 0) {
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
    <Box className={styles.ChartPie} sx={[ {
      // transform: `rotate(${degree}deg)`
      display: `flex`,
      height: '100%',
      // width: '100%'
    }, props.sx ?? [] as any]}>
      <canvas ref={canvasRef} />
    </Box>
  );
}

export default ChartPie;
