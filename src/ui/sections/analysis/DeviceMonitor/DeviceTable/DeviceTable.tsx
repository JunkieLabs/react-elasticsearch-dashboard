import React, { FC, useEffect, useState } from 'react';
import styles from './DeviceTable.module.scss';
import { StoreSelectorsDeviceMonitor } from '@/domain/store/deviceMonitor/selector';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/joy/Box';
import { StoreActionDeviceMonitor } from '@/domain/store/deviceMonitor/reducer';
import { RootState } from '@/domain/store/store';
import Table from '@mui/joy/Table';
import { IconButton } from '@mui/joy';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import { ModelElasticEvent } from '@/types/elastic/events/events';
import { ModelDeviceDetail } from '@/types/devices/models';
import { DeviceHelper } from '@/domain/devices/helper';


interface DeviceTableProps {

  state: 'all' | 'active' | 'inactive' | 'connected'
}

const DeviceTable: FC<DeviceTableProps> = (props) => {
  const selectorList = StoreSelectorsDeviceMonitor.list[props.state]
  const selectorPagination = StoreSelectorsDeviceMonitor.pagination[props.state]

  const stateList = useSelector(selectorList)
  const pagination = useSelector(selectorPagination)

  const stateTotal = useSelector((state: RootState) => state.DeviceMonitor.stats[props.state]);
  const dispatch = useDispatch();

  const [data, setData] = useState<ModelDeviceDetail[]>([]);




  const handlePrevPage = async () => {

    if (pagination.offset == 0) {
      return
    }

    dispatch(StoreActionDeviceMonitor[props.state].pagination({
      offset: pagination.offset - pagination.limit, limit: pagination.limit
    }))

  }

  const handleNextPage = async () => {

    if (pagination.offset + pagination.limit > stateTotal) {
      return
    }



    dispatch(StoreActionDeviceMonitor[props.state].pagination({
      offset: pagination.offset + pagination.limit, limit: pagination.limit
    }))

  }

  useEffect(() => {

    dispatch(StoreActionDeviceMonitor[props.state].pagination({
      offset: pagination.offset, limit: pagination.limit
    }))


  }, [stateTotal])

  useEffect(() => {



    setData(DeviceHelper.elasticEventHitToDevice(stateList))


  }, [stateList])

  return (
    <div className={styles.DeviceTable}>


      <Box sx={{
        display: "flex",
        flexDirection: "column"
      }}>

        <Table aria-label="striped table" borderAxis='xBetween'
        >
          <thead>
            <tr>
              <th style={{ width: '40%' }}>DeviceId</th>
              <th className={styles["align-center"]}>Last Timestamp</th>
              <th className={styles["align-center"]}>Status</th>

            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row?.id}>
                <td align='left'>{row.deviceId}</td>
                <td className={styles["align-center"]}>{row.timestamp}</td>
                <td className={styles["align-center"]}><Box sx={{
                  margin: 'auto'
                }} className="td-aspect-square td-h-4">{row.status}</Box></td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Box sx={{ flexDirection: "row", display: "flex", alignItems: "center", gap: "1rem", justifyContent: "end" }}>
          <span className='td-text-xs'>Items per page </span>
          <span className='td-text-sm'>{pagination.limit} </span>


          <Box className="td-px-8"></Box>

          <h4 className='td-text-sm'>{pagination.offset} - {pagination.offset + pagination.limit} of {stateTotal}</h4>
          <IconButton onClick={handlePrevPage} disabled={pagination.offset == 0}><KeyboardArrowLeftRounded /></IconButton>

          <IconButton onClick={handleNextPage}><KeyboardArrowRightRounded /></IconButton>
        </Box>



      </Box>
    </div>
  );
}





export default DeviceTable;
