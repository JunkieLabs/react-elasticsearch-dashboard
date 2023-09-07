import React, { FC, useEffect } from 'react';
import styles from './DeviceMonitor.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/domain/store/store';
import Box from '@mui/joy/Box';
import { StoreActionDeviceMonitor } from '@/domain/store/deviceMonitor/reducer';
import LabelCard from './LabelCard/LabelCard';
import Container from '@mui/joy/Container';
import DeviceTable from './DeviceTable/DeviceTable';

interface DeviceMonitorProps {
  searchParams: Record<string, string> | null | undefined;
}

const DeviceMonitor: FC<DeviceMonitorProps> = (props) => {
  const dispatch = useDispatch();

  const stateStats = useSelector((state: RootState) => state.DeviceMonitor.stats);
  const activeDeviceName = props.searchParams && props.searchParams['device-id'] ? props.searchParams['device-id'] as string : undefined;

  console.log("activeDeviceName: ", activeDeviceName);





  useEffect(() => {



    // console.log("app startup: ", );
    dispatch(StoreActionDeviceMonitor.initCounter())

    // console.log("app startup: 2", );


  }, []);
  return (
    <div className={styles.DeviceMonitor}>
      <Container className={"tb-position--relative"}>

        <Box sx={{
          display: "flex",
          flexDirection: "column"
        }}>

          <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem 1rem"
          }}>
            <LabelCard sx={{
              flex: { xs: '1 1 calc( 50% - 1rem )', sm: '1 1 calc( 33.3% - 2rem )', md: '1 1 calc( 25% - 2rem )' },
              maxWidth: { xs: 'calc( 50% - 1rem )', sm: 'calc( 33.3% - 2rem )', md: 'calc( 25% - 2rem )' }
            }} label='Connected' value={stateStats.connected} ></LabelCard>

            <LabelCard sx={{
              flex: { xs: '1 1 calc( 50% - 1rem )', sm: '1 1 calc( 33.3% - 2rem )', md: '1 1 calc( 25% - 2rem )' },
              maxWidth: { xs: 'calc( 50% - 1rem )', sm: 'calc( 33.3% - 2rem )', md: 'calc( 25% - 2rem )' }
            }} label='Active' value={stateStats.active} ></LabelCard>
            <LabelCard sx={{
              flex: { xs: '1 1 calc( 50% - 1rem )', sm: '1 1 calc( 33.3% - 2rem )', md: '1 1 calc( 25% - 2rem )' },
              maxWidth: { xs: 'calc( 50% - 1rem )', sm: 'calc( 33.3% - 2rem )', md: 'calc( 25% - 2rem )' }
            }} label='Inactive' value={stateStats.inactive}></LabelCard>
            <LabelCard sx={{
              flex: { xs: '1 1 calc( 50% - 1rem )', sm: '1 1 calc( 33.3% - 2rem )', md: '1 1 calc( 25% - 2rem )' },
              maxWidth: { xs: 'calc( 50% - 1rem )', sm: 'calc( 33.3% - 2rem )', md: 'calc( 25% - 2rem )' }
            }} label='All' value={stateStats.all} selected={true}></LabelCard>



          </Box>
          <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>
          <Box>

            {/* Table */}
            {!activeDeviceName && <DeviceTable state='all'></DeviceTable>}

          </Box>


        </Box>
      </Container>
    </div>
  );
}

export default DeviceMonitor;
