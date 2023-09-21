import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './DummyCharts.module.scss';
import { fetcher } from '@/tools/apiHelper';
import { DummyResultBucket } from '@/app/api/elastic/dummy/route';
import { isNumeric } from '@/tools/parserTools';
import { ModelChartJs } from '@/types/charts/chartjs';
import ChartBar from '@/ui/widgets/charts/ChartBar/ChartBar';
import ChartPie from '@/ui/widgets/charts/ChartPie/ChartPie';
import { Box } from '@mui/joy';
import useSWR from 'swr';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface DummyChartsProps { }

const DummyCharts: FC<DummyChartsProps> = () => {
  //   (
  //   <div className={styles.DummyCharts}>
  //     DummyCharts Component
  //   </div>
  // );
  const highChartComponentRef = useRef<HighchartsReact.RefObject>(null);


  // const { data, error } = useSWR<DummyResultBucket>(`/api/elastic/events/`, fetcher);

  const [chartData, setChartData] = useState<ModelChartJs>()


  // useEffect(() => {

  //   var labels: string[] = data?.buckets?.map(ele => isNumeric(ele.key) ?
  //     `${Number(ele.key)}`
  //     : ele.key.toString()) ?? [];

  //   var values = data?.buckets?.map(ele => ele.doc_count);

  //   var modelChartJs: ModelChartJs = {

  //     labels: labels,
  //     data: [{
  //       data: values ?? [],
  //       label: "check",
  //       backgroundColor: '#3456f2'
  //     }]
  //   }

  //   setChartData(modelChartJs);

  // }, [data])


  // console.log("data1:", data);
  return (
    <div className={styles.DummyCharts}>

      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: 20
      }}>


       <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={highChartComponentRef}
          
        
        />
        
        <Box sx={{
          height: 400
        }}>
          <ChartPie data={chartData} sx={{

          }}></ChartPie>
        </Box>

        <Box sx={{
          display: 'flex',
          width: '100%',

          height: 300
        }}>
          <ChartBar data={chartData} sx={{

          }}></ChartBar>


        </Box>

      </Box>
    </div>
  );

}

const options: Highcharts.Options = {
  title: {
    text: 'My chart'
  },
  series: [{
    type: 'line',
    data: [1, 2, 3]
  }]
};

export default DummyCharts;
