import React, { FC, useEffect, useState } from 'react';
import styles from './TopChannels.module.scss';
import Box from '@mui/joy/Box';
import DateRangeInput from '@/ui/widgets/inputs/DateRangeInput/DateRangeInput';
import Container from '@mui/joy/Container';
// import Filters from './Filters/Filters';
import { subDays } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';
import { RootState } from '@/domain/store/store';
import { ModelChartJs } from '@/types/charts/chartjs';
import { ModelChartCommonItem } from '@/types/charts/common';
import { ChartHelper } from '@/domain/charts/helper';
import ChartPie from '@/ui/widgets/charts/ChartPie/ChartPie';
import ChartBar from '@/ui/widgets/charts/ChartBar/ChartBar';
import ChartTable from './ChartTable/ChartTable';
import ChannelDetails from './ChannelDetails/ChannelDetails';
import CircularProgress from '@mui/joy/CircularProgress';
import { StoreConstants } from '@/domain/store/store.constants';
import dynamic from 'next/dynamic';

interface TopChannelsProps { }


const Filters = dynamic(() => import("./Filters/Filters"), { ssr: false })

const TopChannels: FC<TopChannelsProps> = () => {

  

  const [dateRange, setDateRange] = useState<Date[]>([new Date(), subDays(new Date(), 7),]);
  const [chartCommonItems, setChartCommonItems] = useState<ModelChartCommonItem[]>([])
  const [chartData, setChartData] = useState<ModelChartJs>()

  const aggregatedItems = useSelector((state: RootState) => state.TopChannel.aggregation);
  const loadingStage = useSelector((state: RootState) => state.TopChannel.loadingStage);
  const initialStage = useSelector((state: RootState) => state.TopChannel.initialStage);

  const dispatch = useDispatch();

  useEffect(() => {

    var chartCommonItems = ChartHelper.elasticAggregationToChartJsCommon(aggregatedItems)
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

  return (
    <Box className={styles.TopChannels} sx={{ minHeight: "100vh", width: "100%" }}>
      <Container className={"tb-position--relative"} sx={{
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

        <Filters></Filters>

        <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>

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


              <Box sx={{
                display: "flex",
                flexFlow: "row wrap",

                gap: { xs: "0.4rem 2rem", sm: "0.4rem 3rem", md: "0.4rem 2.25rem" }


              }}>

                {chartCommonItems.map((item, index) => {
                  return (<Box
                    className='td-shadow-xs td-rounded-lg td-align-middle td-py-2  td-bg-white '
                    key={`Lengend-${index}`}
                    style={{
                      "--color-primary": item.color
                    } as React.CSSProperties}

                    sx={{
                      display: 'flex',
                      direction: "row",
                      justifyContent: "center",

                      alignItems: 'center',
                      flex: { xs: '1 1 calc( 50% - 1rem )', sm: '1 1 calc( 33.3% - 2rem )', md: '1 1 calc( 20% - 2rem )' },
                      maxWidth: { xs: 'calc( 50% - 1rem )', sm: 'calc( 33.3% - 2rem )', md: 'calc( 20% - 2rem )' }

                    }}
                  >

                    <h4 className={styles.legend + ' td-text-sm'}>{item.label}</h4>
                  </Box>)
                })}


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

              <Box className="td-bg-white td-shadow-sm td-px-4 td-py-3 td-border td-border-b-slate-300 td-rounded-lg">
                <h4 className='td-text-md td-font-medium'>Details</h4>
              </Box>


              <Box sx={{ p: { xs: 2, sm: 2, md: 3 } }} ></Box>


              {/* <ChartTable data={chartCommonItems}></ChartTable> */}
              <ChannelDetails dateRange={dateRange} sx={{}}></ChannelDetails>


              <Box sx={{ p: { xs: 2, sm: 4, md: 6 } }} ></Box>

            </Box>
          }


        </Box>

      </Container>
    </Box >
  )
};

export default TopChannels;
