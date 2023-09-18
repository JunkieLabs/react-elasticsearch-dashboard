import React, { FC, useEffect, useState } from 'react';
import styles from './ChannelPerformance.module.scss';
import { TransformHelper } from '@/tools/parserTools';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import Link from 'next/link';
import Button from '@mui/joy/Button';
import DateRangeInput from '@/ui/widgets/inputs/DateRangeInput/DateRangeInput';
import { subDays } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';
// import Filters from './Filters/Filters';
import { StoreActionBouquets } from '@/domain/store/bouquets/reducer';
import { RootState } from '@/domain/store/store';
import ChartHighstock from '@/ui/widgets/charts/ChartHighstock/ChartHighstock';
import { ModelChartHighStock } from '@/types/charts/highstock';
import { ChartHelper } from '@/domain/charts/helper';
import { ModelChartCommonItem } from '@/types/charts/common';
import { ModelChartJs } from '@/types/charts/chartjs';
import ChartBar from '@/ui/widgets/charts/ChartBar/ChartBar';
import ChartPie from '@/ui/widgets/charts/ChartPie/ChartPie';
import ChartTable from './ChartTable/ChartTable';
import { StoreConstants } from '@/domain/store/store.constants';
import { CircularProgress } from '@mui/joy';
import dynamic from 'next/dynamic';

interface ChannelPerformanceProps {


  searchParams: Record<string, string> | null | undefined;
}

const Filters = dynamic(() => import("./Filters/Filters"), { ssr: false })

const ChannelPerformance: FC<ChannelPerformanceProps> = (props) => {
  const modal = props.searchParams && props.searchParams['modal'] ? TransformHelper.toBoolean(props.searchParams['modal'] as string) : false;

  const [dateRange, setDateRange] = useState<Date[]>([new Date(), subDays(new Date(), 7),]);
  const [chartCommonItems, setChartCommonItems] = useState<ModelChartCommonItem[]>([])
  const [chartData, setChartData] = useState<ModelChartJs>()
  const aggregatedItems = useSelector((state: RootState) => state.ChannelPerformance.multiAggs);

  const stateTimeSeries = useSelector((state: RootState) => state.ChannelPerformance.timeSeries);
  const [chartTimeSeriesData, setChartTimeSeriesData] = useState<ModelChartHighStock>()

  const loadingStage = useSelector((state: RootState) => state.TopChannel.loadingStage);
  const initialStage = useSelector((state: RootState) => state.TopChannel.initialStage);

  const dispatch = useDispatch();

  useEffect(() => {

    var modelChartJs = ChartHelper.timeseriesToHighstock(stateTimeSeries ?? [], "#232324")
    setChartTimeSeriesData(modelChartJs)



  }, [stateTimeSeries])

  useEffect(() => {

    var chartCommonItems;
    if (aggregatedItems.items && aggregatedItems.items.length > 0) {
      chartCommonItems = ChartHelper.elasticAggregationToChartJsCommon(aggregatedItems.items)
    } else {
      chartCommonItems = [{
        id: `total`,//`${label}`,
        color: `#c9b969`,
        label: `Total`,
        value: aggregatedItems.total
      }]
    }
    setChartCommonItems(chartCommonItems)

  }, [aggregatedItems])

  useEffect(() => {
    var modelChartJs = ChartHelper.chartCommonToChartJs(chartCommonItems ?? [])
    setChartData(modelChartJs)

  }, [chartCommonItems])



  useEffect(() => {
    // console.log("filterAgeRange: ", filterAgeRange, filterAgeDefaultRange, filterAgeDefaultRange === filterAgeRange)

    dispatch(StoreActionCommonFilters.commonFilterSet(dateRange))
    return () => { }

  }, [dateRange]);


  useEffect(() => {
    // console.log("filterAgeRange: ", filterAgeRange, filterAgeDefaultRange, filterAgeDefaultRange === filterAgeRange)

    dispatch(StoreActionBouquets.init())
    return () => { }

  }, []);

  // const showModal = searchParams?.modal;
  // console.log("modal: ", modal)

  return (
    <Box className={styles.ChannelPerformance}>
      <Container className={"tb-position--relative"} sx={{
        display: "flex",
        flexDirection: 'column'

      }}>

        <Box sx={{
          display: "flex",
          flexDirection: 'column'

        }}>

          <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>

          <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row"
          }}>

            <Box sx={{ flex: "1 1 0%" }}>
              <h4 className="td-text-lg td-font-medium">Filters</h4>

            </Box>
            <DateRangeInput setDateRange={setDateRange}></DateRangeInput>
          </Box>
          <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>

          <Filters searchParams={props.searchParams}></Filters>


          <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>

        </Box>


        {/* <Link href="?modal=true" legacyBehavior passHref >
          <Button>Modal</Button>
        </Link>
        {modal && <Box> What</Box>}
        {modal && <Link href="?modal=false" legacyBehavior passHref >
          <Button>Modal cancel</Button>
        </Link>} */}
        {/* <Box> What</Box>} */}

        {/* // //////////////////// */}

        <Box className="td-relative" sx={{


        }}>

          {(loadingStage == StoreConstants.loadingStage.loading) && <Box className="td-absolute td-my-8" sx={{
            width: `100%`,
            flex: `1 1 0%`,
            alignItems: "center",
            display: 'flex',
            zIndex: 2,
            justifyContent: 'center'
          }}>
            <CircularProgress />
          </Box>}

          {(initialStage == StoreConstants.initialStage.loaded) &&
            <Box className="td-relative" sx={{
              display: "flex",
              flexDirection: 'column'

            }}>
              {/* //////////////////////////////// */}

              <Box sx={{
                height: 400,
                display: "flex",
                width: "100%",
                maxWidth: 'calc( 99% )'
              }
              } >
                <ChartHighstock data={chartTimeSeriesData} sx={{
                  width: '100%'

                }}></ChartHighstock>



              </Box>


              <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }} ></Box>

              <Box sx={{
                display: "flex",
                flexFlow: "row wrap",
                gap: 2
              }}>
                <Box sx={{
                  flex: { xs: '1 1 calc( 100%  )', sm: '1 1 calc( 60% - 2rem )' },
                  maxWidth: { xs: 'calc( 99% )', sm: 'calc( 60% - 2rem )' }

                }}>
                  <ChartBar data={chartData} sx={{

                  }}></ChartBar>
                </Box>
                <Box sx={{
                  maxHeight: 400,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  flex: { xs: '1 1 calc( 100%  )', sm: '1 1 calc( 40% - 2rem )' },
                  maxWidth: { xs: 'calc( 99% )', sm: 'calc( 40% - 2rem )' }

                }}>
                  <ChartPie data={chartData} sx={{
                    maxHeight: "100%",
                    height: `unset`,
                    width: '100%'

                  }}></ChartPie>
                </Box>
              </Box>

              <Box sx={{ p: { xs: 2, sm: 2, md: 3 } }} ></Box>

              <ChartTable data={chartCommonItems}></ChartTable>


              <Box sx={{ p: { xs: 2, sm: 2, md: 3 } }} ></Box>
            </Box>
          }
        </Box>

      </Container>
    </Box>
  );
}

export default ChannelPerformance;
