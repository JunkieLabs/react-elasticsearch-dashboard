import React, { FC, useEffect, useState } from 'react';
import styles from './DeviceMonitor.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/domain/store/store';
import Box from '@mui/joy/Box';
import { StoreActionDeviceMonitor } from '@/domain/store/deviceMonitor/reducer';
import LabelCard from './LabelCard/LabelCard';
import Container from '@mui/joy/Container';
import DeviceTable from './DeviceTable/DeviceTable';
import DeviceLogs from './DeviceLogs/DeviceLogs';
import { StoreActionDeviceLogs } from '@/domain/store/deviceLogs/reducer';
import { ElasticConstants } from '@/data/elastic/elastic.constants';

interface DeviceMonitorProps {
  searchParams: Record<string, string> | null | undefined;
}

const DeviceMonitor: FC<DeviceMonitorProps> = (props) => {
  const dispatch = useDispatch();

  const stateStats = useSelector((state: RootState) => state.DeviceMonitor.stats);
  const activeDeviceId = props.searchParams && props.searchParams['device-id'] ? props.searchParams['device-id'] as string : undefined;

  console.log("activeDeviceId: ", activeDeviceId);
  const [deviceState, setDeviceState] = useState<string>(ElasticConstants.checks.device.stateAll);


  useEffect(() => {



    console.log("DeviceMonitor activeDeviceId: ", activeDeviceId);
    dispatch(StoreActionDeviceLogs.setDeviceName(activeDeviceId))

    // console.log("app startup: 2", );


  }, [activeDeviceId]);


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
            <LabelCard onClick={() => {
              setDeviceState(ElasticConstants.checks.device.stateConnected)
            }} sx={{
              flex: { xs: '1 1 calc( 50% - 1rem )', sm: '1 1 calc( 33.3% - 2rem )', md: '1 1 calc( 25% - 2rem )' },
              maxWidth: { xs: 'calc( 50% - 1rem )', sm: 'calc( 33.3% - 2rem )', md: 'calc( 25% - 2rem )' }
            }} label='Connected' value={stateStats.connected} selected={deviceState == ElasticConstants.checks.device.stateConnected}></LabelCard>

            <LabelCard onClick={() => {
              setDeviceState(ElasticConstants.checks.device.stateActive)
            }} sx={{
              flex: { xs: '1 1 calc( 50% - 1rem )', sm: '1 1 calc( 33.3% - 2rem )', md: '1 1 calc( 25% - 2rem )' },
              maxWidth: { xs: 'calc( 50% - 1rem )', sm: 'calc( 33.3% - 2rem )', md: 'calc( 25% - 2rem )' }
            }} label='Active' value={stateStats.active} selected={deviceState == ElasticConstants.checks.device.stateActive}></LabelCard>
            <LabelCard onClick={() => {
              setDeviceState(ElasticConstants.checks.device.stateInActive)
            }} sx={{
              flex: { xs: '1 1 calc( 50% - 1rem )', sm: '1 1 calc( 33.3% - 2rem )', md: '1 1 calc( 25% - 2rem )' },
              maxWidth: { xs: 'calc( 50% - 1rem )', sm: 'calc( 33.3% - 2rem )', md: 'calc( 25% - 2rem )' }
            }} label='Inactive' value={stateStats.inactive} selected={deviceState == ElasticConstants.checks.device.stateInActive}></LabelCard>
            <LabelCard onClick={() => {
              setDeviceState(ElasticConstants.checks.device.stateAll)
            }} sx={{
              flex: { xs: '1 1 calc( 50% - 1rem )', sm: '1 1 calc( 33.3% - 2rem )', md: '1 1 calc( 25% - 2rem )' },
              maxWidth: { xs: 'calc( 50% - 1rem )', sm: 'calc( 33.3% - 2rem )', md: 'calc( 25% - 2rem )' }
            }} label='All' value={stateStats.all} selected={deviceState == ElasticConstants.checks.device.stateAll}></LabelCard>



          </Box>
          <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>
          {/* <Box> */}

          {/* Table */}
          {!activeDeviceId && <DeviceTable state={deviceState as any}></DeviceTable>}
          {activeDeviceId && <DeviceLogs deviceId={activeDeviceId}></DeviceLogs>}

          {/* </Box> */}


        </Box>
      </Container>
    </div>
  );
}

export default DeviceMonitor;
