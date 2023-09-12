import React, { FC, useEffect, useState } from 'react';
import styles from './DeviceLogs.module.scss';
import Box from '@mui/joy/Box';
import { ModelDeviceLog } from '@/types/devices/models';
import { ObjectView } from 'react-object-view'
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { IconButton, Sheet, Table } from '@mui/joy';
import { StoreSelectorsDeviceLogs } from '@/domain/store/deviceLogs/selector';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/domain/store/store';
import { StoreActionDeviceLogs } from '@/domain/store/deviceLogs/reducer';
import { DeviceHelper } from '@/domain/devices/helper';
import { useRouter } from 'next/navigation';

interface DeviceLogsProps {

  deviceId: string
}

const DeviceLogs: FC<DeviceLogsProps> = (props) => {

  // const selectorPagination = [props.state]

  const router = useRouter()

  const stateList = useSelector(StoreSelectorsDeviceLogs.list)
  const pagination = useSelector(StoreSelectorsDeviceLogs.pagination)

  const stateTotal = useSelector((state: RootState) => state.DeviceLogs.total);
  const dispatch = useDispatch();

  const [data, setData] = useState<ModelDeviceLog[]>([]);


  const handlePrevPage = async () => {

    if (pagination.offset == 0) {
      return
    }

    dispatch(StoreActionDeviceLogs.pagination({
      offset: pagination.offset - pagination.limit, limit: pagination.limit
    }))

  }

  const handleNextPage = async () => {

    if (pagination.offset + pagination.limit > stateTotal) {
      return
    }



    dispatch(StoreActionDeviceLogs.pagination({
      offset: pagination.offset + pagination.limit, limit: pagination.limit
    }))

  }

  useEffect(() => {

    dispatch(StoreActionDeviceLogs.pagination({
      offset: pagination.offset, limit: pagination.limit
    }))


  }, [stateTotal])

  useEffect(() => {



    setData(DeviceHelper.elasticEventHitToDeviceLog(stateList))


  }, [stateList])
  const handleClick = () => {
    // throw new Error('Function not implemented.');

    router.replace(`?`)
  }

  return (
    <Box className={styles.DeviceLogs} sx={{ display: "flex", flexDirection: "column" }}>
      <Box className="td-bg-white td-rounded-md td-border td-px-4 td-py-2" sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "1rem"
      }}>
        <IconButton onClick={handleClick}><KeyboardArrowLeftRounded /></IconButton>

        <span className='td-text-sm'>Device Logs:</span>
        <span className='td-text-sm td-font-medium'>{props.deviceId}</span>
      </Box>


      <Box sx={{ p: { xs: 1, sm: 1, md: 1 } }} ></Box>

      <Table aria-label="striped table" borderAxis='xBetween'
      >
        <thead>
          <tr>
            <th style={{ width: 40 }} aria-label="empty" />
            <th style={{ width: '40%' }}>Timestamp</th>
            <th className={styles["align-center"]}>Bouquet</th>
            <th className={styles["align-center"]}>Location</th>

          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <DeviceTableRow key={row.id} row={row}></DeviceTableRow>
            // <tr key={row?.id}>
            //   <td align='left'>{row.deviceId}</td>
            //   <td className={styles["align-center"]}>{row.timestamp}</td>
            //   <td className={styles["align-center"]}><Box sx={{
            //     margin: 'auto'
            //   }} className="td-aspect-square td-h-4">{row.status}</Box></td>
            // </tr>
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


      <Box sx={{ p: { xs: 2, sm: 2, md: 2 } }} ></Box>
    </Box>
  );
}


interface DeviceTableRowProps {

  row: ModelDeviceLog
}

const DeviceTableRow: FC<DeviceTableRowProps> = (props) => {

  const [open, setOpen] = React.useState(false);

  let { row } = props


  return (
    <React.Fragment>
      <tr key={row?.id} >
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={(event) => {
              event.stopPropagation()
              setOpen(!open)
            }}
          >
            {open ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
          </IconButton>
        </td>

        <td align='left'>{row.timestamp}</td>
        <td className={styles["align-center"]}>{row.bouquet}</td>
        <td className={styles["align-center"]}><Box sx={{
          margin: 'auto'
        }} className="td-text-sm td-h-4">{row.location}</Box></td>

      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={4}>
          {open && (
            <Sheet
              variant="soft"

              sx={{
                p: 1, pl: 6,
                background: "#eeeeee",
                boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)'
              }}
            >

              <ObjectView data={row.log}
                options={{
                  hidePreviews: true,
                  hideObjectSize: false,
                  hideDataTypes: true
                }}
                styles={{}}
                palette={{
                  base05: '#8B878F',
                  base00: '#eeeeee',
                  base07: '#000000',
                  base06: '#000000',
                  base0F: '#ff5e0a',
                  base0B: '#ab8313',
                  base0E: '#f1245a',
                  base01: '#cfdae3',
                  base0D: '#519e0c',
                  base02: '#4c4a4d',
                  base0A: '#02adbe'
                }}
              />

            </Sheet>)}
        </td>
      </tr>
    </React.Fragment>

  );
}



export default DeviceLogs;
