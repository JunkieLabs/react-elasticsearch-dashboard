import React, { FC, useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import ExpansonPanel from '@/ui/widgets/ExpansonPanel/ExpansonPanel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/domain/store/store';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import CircleIndicator from '@/ui/widgets/indicator/CircleIndicator/CircleIndicator';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from 'next/link';
import { TransformHelper } from '@/tools/parserTools';
import BouquetChannelPicker, { BouquetChannelsMap } from '@/ui/sections/picker/BouquetChannelPicker/BouquetChannelPicker';
import { ModelChannelPerformanceFilters } from '@/types/store/channelPerformance';
import { StoreActionChannelPerformance } from '@/domain/store/channelPerformance/reducer';

interface FiltersProps {

  searchParams: Record<string, string> | null | undefined;
}

const Filters: FC<FiltersProps> = (props) => {

  const modalBouquetChannel = props.searchParams && props.searchParams['bouquet-channel-picker'] ? TransformHelper.toBoolean(props.searchParams['bouquet-channel-picker'] as string) : false;

  
  const stateSubFilter = useSelector((state: RootState) => state.ChannelPerformance.subFilter);
  
  const statePlots = useSelector((state: RootState) => state.ChannelPerformance.plots);

  const [filterPlot, setFilterPlot] = useState<ModelAnalyticPlot[] | null>(null);

  const dispatch = useDispatch();
  useEffect(() => {
    // filterGender.
    setFilterPlot(statePlots ?? [])
    // setFilterPincode(stateSubFilter.pincodes)
    // setFilterGender(stateSubFilter.gender)
    // = stateSubFilter.region

  }, [statePlots])

  const handleStoreChange = async (channelPerformanceFilters: ModelChannelPerformanceFilters) => {
    // return (){}

    console.log("StoreActionChannelPerformance handleStoreChange: ", channelPerformanceFilters)
    dispatch(StoreActionChannelPerformance.setSubFilter(channelPerformanceFilters))
   
  }
  const handleBucketChannelChecked = (bouquets: string[], bouquetChannelsMaps: BouquetChannelsMap) => {
    // dispatch(StoreAction.set(dateRange))
    // if (region) {
    //   let i = stateDefaultRegions.findIndex(val => val.city == region.city);
    //   if (i >= 0) {
    //     setFilterRegion(stateDefaultRegions[i]);

    //   }
    // } else {
    //   console.log("handleRegionChange 2: ");

    //   setFilterRegion(null)
    // }
    handleStoreChange({ ...stateSubFilter, bouquets: bouquets, bouquetChannelsMap: bouquetChannelsMaps })
  }

  return (
    <div className={styles.Filters}>

      <Box sx={{
        display: "flex",
        flexDirection: "column"
      }}>
        <ExpansonPanel header={
          <Box className="wase" sx={{
            display: 'flex',
            flexFlow: "row wrap",
            alignItems: "center",
            gap: "1rem"

          }}>

            <BarChartRounded />


            {filterPlot && filterPlot.map(plot =>

              <Chip key={plot.key} variant="outlined" startDecorator={
                <CircleIndicator color={plot.color} />}>
                {plot.texts?.join(" : ")}
              </Chip>
              //   <Box className="" sx={{ display: 'flex', flexDirection: 'row' }}>
              //   <h4 className='td-text-sm'>{plot.name}</h4>


              // </Box>

            )}
          </Box>

        }>

          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
          }}>
            <Link href="?bouquet-channel-picker=true" legacyBehavior passHref >
              <Button size='md' fullWidth={false} onClick={() => { }} >Add More</Button>
            </Link>
            {filterPlot && filterPlot.map(plot =>

              <Box
                key={plot.key}
                className="td-border td-rounded-md td-px-4" sx={{
                  display: "flex",
                  alignSelf: "stretch",
                  flexDirection: "row", alignItems: "center"
                }}>
                <CircleIndicator color={plot.color} />
                <Breadcrumbs
                  separator={<KeyboardArrowRightRounded />}
                  aria-label="breadcrumbs"
                >
                  {(plot.texts ?? []).map((item: string) => (
                    <ol key={item} color="neutral" >
                      {item}
                    </ol>
                  ))}
                  {/* <Typography>Dr. Zoidberg</Typography> */}
                </Breadcrumbs></Box>)}

          </Box>

        </ExpansonPanel>

        {modalBouquetChannel && <BouquetChannelPicker onChecked={
          handleBucketChannelChecked
        }
        checkedBouquets={stateSubFilter.bouquets}
        checkedBouquetChannelsMap={stateSubFilter.bouquetChannelsMap}
        ></BouquetChannelPicker>}
      </Box>
    </div>
  );
}

export default Filters;
