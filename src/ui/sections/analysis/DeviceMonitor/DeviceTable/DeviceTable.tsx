import React, { FC, useEffect, useState } from 'react';
import styles from './DeviceTable.module.scss';
import { StoreSelectorsDeviceMonitor } from '@/domain/store/deviceMonitor/selector';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/joy/Box';
import { StoreActionDeviceMonitor } from '@/domain/store/deviceMonitor/reducer';
import { RootState } from '@/domain/store/store';
import Table from '@mui/joy/Table';
import { IconButton, Sheet } from '@mui/joy';
import { ObjectView } from 'react-object-view'
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { ModelElasticEvent } from '@/types/elastic/events/events';
import { ModelDeviceDetail } from '@/types/devices/models';
import { DeviceHelper } from '@/domain/devices/helper';
import { useRouter } from 'next/navigation';


interface DeviceTableProps {

  state: 'all' | 'active' | 'inactive' | 'connected'
}

const DeviceTable: FC<DeviceTableProps> = (props) => {

  // console.log("props state: ", props.state)

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

  // useEffect(() => {

  //   console.log("useEffect stateTotal: ", props.state)

  //   dispatch(StoreActionDeviceMonitor[props.state].pagination({
  //     offset: pagination.offset, limit: pagination.limit
  //   }))


  // }, [stateTotal])

  useEffect(() => {


    console.log("useEffect stateList: ", stateList.length)

    setData(DeviceHelper.elasticEventHitToDevice(stateList))


  }, [stateList])

  return (
    <div className={styles.DeviceTable}>


      <Box sx={{
        display: "flex",
        flexDirection: "column"
      }}>

        <Table hoverRow aria-label="striped table" borderAxis='xBetween'
        >
          <thead>
            <tr>
              <th style={{ width: 40 }} aria-label="empty" />
              <th style={{ width: '40%' }}>DeviceId</th>
              <th className={styles["align-center"]}>Last Timestamp</th>
              <th className={styles["align-center"]}>Status</th>

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



      </Box>
    </div>
  );
}

interface DeviceTableRowProps {

  row: ModelDeviceDetail
}

const DeviceTableRow: FC<DeviceTableRowProps> = (props) => {
  
  const router = useRouter()
  const [open, setOpen] = React.useState(false);

  let { row } = props

  const  handleClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, deviceId: string) => {
    // throw new Error('Function not implemented.');

    router.replace(`?device-id=${deviceId}`)
  }

  return (
    <React.Fragment>
      <tr key={row?.id}  onClick={(event) => handleClick(event, row.deviceId)}>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={(event) => {
              event.stopPropagation()
              setOpen(!open)}}
          >
            {open ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
          </IconButton>
        </td>

        <td align='left'>{row.deviceId}</td>
        <td className={styles["align-center"]}>{row.timestamp}</td>
        <td className={styles["align-center"]}><Box sx={{
          margin: 'auto'
        }} className="td-aspect-square td-h-4">{row.status}</Box></td>

      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={4}>
          {open && (
            <Sheet
              variant="soft"

              sx={{ p: 1, pl: 6,
                background:"#eeeeee",
                boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
            >

              <ObjectView data={row.log}
                options={{ hidePreviews: true,
                  hideObjectSize: false,
                  hideDataTypes: true}}
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
                  base0A: '#02adbe'}}
              />

            </Sheet>)}
        </td>
      </tr>
    </React.Fragment>

  );
}




export default DeviceTable;
