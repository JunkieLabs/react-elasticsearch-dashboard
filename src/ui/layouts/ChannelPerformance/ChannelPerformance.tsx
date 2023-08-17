import React, { FC, useEffect, useState } from 'react';
import styles from './ChannelPerformance.module.scss';
import Box from '@mui/joy/Box';
import ChartPie from '@/ui/widgets/charts/ChartPie/ChartPie';
import useSWR from 'swr';
import { fetcher } from '@/tools/apiHelper';
import { ModelChartJs } from '@/types/charts/chartjs';
import { DummyResultBucket } from '@/app/api/elastic/dummy/route';
import { isNumeric } from '@/tools/parserTools';
import ChartBar from '@/ui/widgets/charts/ChartBar/ChartBar';

interface ChannelPerformanceProps { }

const ChannelPerformance: FC<ChannelPerformanceProps> = () => {

  const { data, error } = useSWR<DummyResultBucket>(`/api/elastic/dummy`, fetcher);

  const [chartData, setChartData] = useState<ModelChartJs>()


  useEffect(() => {

    var labels: string[] = data?.buckets?.map(ele => isNumeric(ele.key) ?
      `${Number(ele.key)}`
      : ele.key.toString()) ?? [];

    var values = data?.buckets?.map(ele => ele.doc_count);

    var modelChartJs: ModelChartJs = {

      labels: labels,
      data: [{
        data: values ?? [],
        label: "check",
        backgroundColor: '#3456f2'
      }]
    }

    setChartData(modelChartJs);

  }, [data])


  console.log("data1:", data);
  return (
    <div className={styles.ChannelPerformance}>
      ChannelPerformance Component

      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: 20
      }}>
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
  )
};

export default ChannelPerformance;
