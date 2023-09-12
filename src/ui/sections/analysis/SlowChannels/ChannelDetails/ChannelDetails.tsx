import React, { FC, useEffect, useState } from 'react';
import styles from './ChannelDetails.module.scss';
import Box from '@mui/joy/Box';
import { Slider } from '@mui/joy';
import ChartBar from '@/ui/widgets/charts/ChartBar/ChartBar';
import { ModelChartJs } from '@/types/charts/chartjs';
import { ChartHelper } from '@/domain/charts/helper';
import { ModelChartCommonItem } from '@/types/charts/common';
import { useSelector } from 'react-redux';
import { RootState } from '@/domain/store/store';
import { Container, FormControl, Theme } from '@mui/joy';
import { SxProps } from '@mui/material/styles';

import { differenceInDays, format, addDays } from 'date-fns';

interface ChannelDetailsProps {

  sx?: SxProps<Theme>;
  dateRange: Date[]
}

const ChannelDetails: FC<ChannelDetailsProps> = (props) => {
  const [chartCommonItems, setChartCommonItems] = useState<ModelChartCommonItem[]>([])
  const [chartData, setChartData] = useState<ModelChartJs>()
  const [dayRangeDefault, setDayRangeDefault] = useState<number[]>([])


  const [filterDayRange, setFilterDayRange] = useState<number[]>([0, props.dateRange.length > 1 ? differenceInDays(props.dateRange[1], props.dateRange[0]) : 0]);// useState([30, 50]);

  const [dayRangeMarks, setDayRangeMarks] = useState<{
    value: number,
    label?: string
  }[]>([])

  props.dateRange.map(val => { return {} })

  const aggregatedItems = useSelector((state: RootState) => state.SlowChannel.aggregation);

  useEffect(() => {

    // var chartCommonItems = ChartHelper.elasticAggregationToChartJsCommon(aggregatedItems)
    // setChartCommonItems(chartCommonItems)

    if (aggregatedItems && aggregatedItems.length > 0) {
      var modelChartJs = ChartHelper.elasticSubAggregationTimeToChartJs(aggregatedItems, filterDayRange, props.dateRange)
      console.log("modelChartJs: ", modelChartJs)

      setChartData(modelChartJs)

    }




  }, [aggregatedItems, filterDayRange])

  // useEffect(() => {

  //   var modelChartJs = ChartHelper.chartCommonToChartJs(chartCommonItems ?? [])
  //   setChartData(modelChartJs)



  // }, [chartCommonItems])

  useEffect(() => {

    if (props.dateRange.length > 1 && differenceInDays(props.dateRange[1], props.dateRange[0]) > 0) {
      var days = [0, differenceInDays(props.dateRange[1], props.dateRange[0])]



      setDayRangeDefault(days)

      var marks = [{
        value: 0,
        label: format(props.dateRange[0], "dd-MM-yyyy")
      },
      {
        value: days[1],
        label: format(props.dateRange[1], "dd-MM-yyyy")
      }]
      // marks.push()
      setDayRangeMarks(marks)
      setFilterDayRange(days);

    }

  }, [props.dateRange])

  const handleDayChange = async (newDay: number[]) => {

    if (newDay && newDay.length > 0) {

      setFilterDayRange(newDay);

    }

    // handleStoreChange({ ...stateSubFilter, ageRange: newAge })
  }

  const valueText = (value: number) => {

    // console.log("valueText: ", `${value}°C`)
    return format(addDays(props.dateRange[0], value), "dd-MM-yyyy");//`${value}°C`;
  }

  console.log("differenceInDays(props.dateRange[0], props.dateRange[1])", dayRangeDefault.length, differenceInDays(props.dateRange[1], props.dateRange[0]))

  return (
    <Box className={styles.ChannelDetails} sx={[{
      // transform: `rotate(${degree}deg)`
      display: `flex`,
      height: '100%',
      flexDirection: "column"
      // width: '100%'
    }, props.sx ?? [] as any]}>
      {dayRangeDefault.length > 0 &&
        <Box className="td-px-8" sx={{}}>
          <Slider
            track="normal"
            // aria-labelledby="track-inverted-range-slider"
            // getAriaValueText={valueText}
            value={filterDayRange}
            defaultValue={dayRangeDefault.length > 0 ? dayRangeDefault : undefined}
            getAriaValueText={valueText}
            marks={dayRangeMarks}
            valueLabelFormat={valueText}
            step={1}
            min={dayRangeDefault[0]}
            max={dayRangeDefault[1]}
            onChange={(event, newValue) => {
              // console.log("ToggleButtonGroup age: ", newValue, filterAgeDefaultRange);
              handleDayChange(newValue as number[])
            }}
            valueLabelDisplay="auto"
          />
        </Box>}
      <Box sx={{ p: { xs: 2, sm: 2, md: 3 } }} ></Box>


      <Box sx={{
        height: 400,
        display: "flex",
        width: "100%",
        maxWidth: 'calc( 99% )'
      }
      } >
        <ChartBar data={chartData} sx={{
          width: '100%'

        }}></ChartBar>
      </Box>
    </Box>
  );
}

export default ChannelDetails;
