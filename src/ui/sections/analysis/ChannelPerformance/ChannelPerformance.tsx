import React, { FC, useEffect, useState } from 'react';
import styles from './ChannelPerformance.module.scss';
import { TransformHelper } from '@/tools/parserTools';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import Link from 'next/link';
import Button from '@mui/joy/Button';
import DateRangeInput from '@/ui/widgets/inputs/DateRangeInput/DateRangeInput';
import { subDays } from 'date-fns';
import { useDispatch } from 'react-redux';
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';
import Filters from './Filters/Filters';

interface ChannelPerformanceProps {


  searchParams: Record<string, string> | null | undefined;
}

const ChannelPerformance: FC<ChannelPerformanceProps> = (props) => {
  const modal = props.searchParams && props.searchParams['modal'] ? TransformHelper.toBoolean(props.searchParams['modal'] as string) : false;

  const [dateRange, setDateRange] = useState<Date[]>([new Date(), subDays(new Date(), 7),]);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("filterAgeRange: ", filterAgeRange, filterAgeDefaultRange, filterAgeDefaultRange === filterAgeRange)

    dispatch(StoreActionCommonFilters.commonFilterSet(dateRange))
    return () => { }

  }, [dateRange]);

  // const showModal = searchParams?.modal;
  console.log("modal: ", modal)

  return (
    <div className={styles.ChannelPerformance}>
      <Container className={"tb-position--relative"}>

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

      </Container>
    </div>
  );
}

export default ChannelPerformance;
