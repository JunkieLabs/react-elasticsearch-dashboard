import React, { FC, useEffect, useState } from 'react';
import styles from './TopChannels.module.scss';
import Box from '@mui/joy/Box';
import DateRangeInput from '@/ui/widgets/inputs/DateRangeInput/DateRangeInput';
import Container from '@mui/joy/Container';
import Filters from './Filters/Filters';
import { subDays } from 'date-fns';
import { useDispatch } from 'react-redux';
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';

interface TopChannelsProps { }

const TopChannels: FC<TopChannelsProps> = () => {

  const [dateRange, setDateRange] = useState<Date[]>([new Date(), subDays(new Date(), 7),]);
  
  const dispatch = useDispatch();

  
  useEffect(() => {
    // console.log("filterAgeRange: ", filterAgeRange, filterAgeDefaultRange, filterAgeDefaultRange === filterAgeRange)

    dispatch(StoreActionCommonFilters.commonFilterSet(dateRange))



    return () => { }

  }, [dateRange]);

  return (
  <div className={styles.TopChannels}>
    <Container className={"tb-position--relative"}>
      <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>

      <Box sx={{
        display: "flex",
        flexDirection: 'column'

      }}>
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

      </Box>
    </Container>
  </div>
)
      };

export default TopChannels;
