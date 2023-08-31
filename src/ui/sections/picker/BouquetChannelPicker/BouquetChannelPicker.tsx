'use client';

import React, { FC, useEffect, useState } from 'react';
import styles from './BouquetChannelPicker.module.scss';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import { useRouter } from 'next/navigation';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import PickChannelsByBouquet from '../PickChannelsByBouquet/PickChannelsByBouquet';
import { useSelector } from 'react-redux';
import { RootState } from '@/domain/store/store';
import CircularProgress from '@mui/joy/CircularProgress';
import IconButton from '@mui/joy/IconButton';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import Button from '@mui/joy/Button';
import { Typography } from '@mui/joy';

interface BouquetChannelPickerProps {

  onChecked: (bouquets: string[], bouquetChannelsMaps: BouquetChannelsMap) => void
  checkedBouquets?: string[],
  checkedBouquetChannelsMap?: BouquetChannelsMap



}

export interface BouquetChannelsMap {
  [bouquet: string]: string[]
}

const BouquetChannelPicker: FC<BouquetChannelPickerProps> = (props) => {

  const router = useRouter()
  const stateBouquets = useSelector((state: RootState) => state.Bouquets.items);


  const [checked, setChecked] = useState<string[]>(props.checkedBouquets ?? []);
  const [checkedChannels, setCheckedChannels] = useState<BouquetChannelsMap>(props.checkedBouquetChannelsMap ?? {});
  const [checkedChannelsCount, setCheckedChannelsCount] = useState<number>(0);

  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(["All"]);

  const [activeBouquet, setActiveBouquet] = useState<string | null>(null);

  useEffect(() => {
    // console.log("filterAgeRange: ", filterAgeRange, filterAgeDefaultRange, filterAgeDefaultRange === filterAgeRange)

    // console.log("PickChannelsByBouquet dispatch initChannelsForBouquet: ", props.bouquet)
    // dispatch(StoreActionBouquets.initChannelsForBouquet(props.bouquet))
    var newBreadcrumbs = breadcrumbs.slice()
    if (activeBouquet && newBreadcrumbs.indexOf(activeBouquet) == -1) {
      newBreadcrumbs.push(activeBouquet)

    } else if (newBreadcrumbs.length >= 2) {
      newBreadcrumbs.splice(1, newBreadcrumbs.length - 1)

    }
    setBreadcrumbs(newBreadcrumbs)//.push('value');
    return () => { }

  }, [activeBouquet]);

  useEffect(() => {
    var keys = Object.keys(checkedChannels)
    // console.log("setCheckedChannelsCount effect: ", keys)
    var counter = 0
    for (let i = 0; i < keys.length; i++) {
      counter += checkedChannels[keys[i]].length;
    }
    setCheckedChannelsCount(counter)
  }, [checkedChannels])

  // console.log("activeBouquet stateBouquets: ", activeBouquet, stateBouquets)
  const handleChecked = (bouquet: string) => (event: { target: { checked: boolean; }; }) => {
    // console.log("handleChecked: ", bouquet, event.target.checked, checked)
    var index = checked.indexOf(bouquet)
    if (index >= 0) {
      var newChecked = checked.slice()
      newChecked.splice(index, 1);
      setChecked(newChecked)

    } else {

      var newChecked = checked.slice()
      newChecked.push(bouquet);
      setChecked(newChecked)
    }
  };

  const handleClick = (value: string) => {

    // console.log("handleClick: ", isOpen)
    // if(!isOpen){
    // setIsOpen(isOpen => !isOpen)
    setActiveBouquet(value)

    // }

    // console.log("datePickerRef?.curren", datePickerRef?.current)
    // datePickerRef?.current?.open();
  };

  const handleChannelsChecked = (bouquet: string, channels: string[]) => {

    var channelsMap = {
      ...checkedChannels,
      [bouquet]: channels
    }
    console.log("handleChannelsChecked: ", channelsMap)
    setCheckedChannels(channelsMap)
  }

  const onSubmit = () => {
    props.onChecked(checked, checkedChannels)
    router.replace('?bouquet-channel-picker=false')
  }

  // const [open, setOpen] = React.useState<boolean>(true);
  return (
    <div className={styles.BouquetChannelPicker}>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={true}
        onClose={() =>

          router.replace('?bouquet-channel-picker=false')}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <Sheet
          variant="outlined"
          sx={{
            display: "flex",
            maxWidth: 500,
            minHeight: `60vh`,
            maxHeight: `80vh`,
            minWidth: 340,
            borderRadius: 'md',
            // p: 1,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.surface',
            }}
          />


          <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%"
            // height:'100%'
          }}>

            <Box sx={{
              display: "flex",
              flexDirection: "row",

            }}>
              <IconButton disabled={activeBouquet ? false : true} variant="plain" onClick={() => { setActiveBouquet(null) }}>
                <ArrowBackRounded />
              </IconButton>
              <Breadcrumbs
                separator={<KeyboardArrowRightRounded />}
                aria-label="breadcrumbs"
              >
                {(breadcrumbs ?? []).map((item: string) => (
                  <ol key={item} color="neutral" >
                    {item}
                  </ol>
                ))}
                {/* <Typography>Dr. Zoidberg</Typography> */}
              </Breadcrumbs>
            </Box>

            <Divider></Divider>



            {activeBouquet &&
              <PickChannelsByBouquet bouquet={activeBouquet ?? ""} setChecked={handleChannelsChecked} checked={checkedChannels[activeBouquet] ?? []}></PickChannelsByBouquet>
            }

            {!activeBouquet && (stateBouquets.length == 0) && <Box sx={{
              width: `100%`,
              flex: `1 1 0%`,
              alignItems: "center",
              display: 'flex',
              justifyContent: 'center'
            }}>
              <CircularProgress />
            </Box>}

            {!activeBouquet && (stateBouquets.length > 0) &&
              <Box sx={{
                width: `100%`,
                flex: `1 1 0%`,
                overflowY: 'scroll',
              }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {stateBouquets.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                      <ListItem
                        key={value}

                        sx={{
                          gap: 2
                        }}

                      >
                        {/* <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}> */}
                        <Checkbox
                          checked={checked.indexOf(value) !== -1}
                          onChange={
                            handleChecked(value)
                          }
                        // handleChecked(value)

                        // setStatus({ ...status, declinedPayment: event.target.checked })

                        />
                        <Typography id={labelId} sx={{
                          flex: '1 1 0%'
                        }} >{value}</Typography>
                        <IconButton variant="plain" onClick={() => handleClick(value)}>
                          <KeyboardArrowRightRounded />
                        </IconButton>
                        {/* </Box> */}
                        {/* <ListItemButton role={undefined} onClick={() => {
      }} >
      </ListItemButton> */}
                      </ListItem>
                    );
                  })}
                </List>
              </Box>

            }


            <Divider></Divider>

            <Box sx={{
              display: "flex",
              flexDirection: "row",
              padding: "0.5rem 0.5rem",
              alignItems: "center"
            }}>

              <Box sx={{
                flex: "1 1 0%"
              }}>


                <h6 className='td-text-xs'>
                  {`${checked.length} bouquets, ${checkedChannelsCount} channels`}
                </h6>
              </Box>
              <Button variant="solid" onClick={onSubmit}>
                Done
              </Button>

            </Box>



          </Box>
        </Sheet>


      </Modal>
    </div>
  );
}

export default BouquetChannelPicker;
