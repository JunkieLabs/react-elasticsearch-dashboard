'use client';

import React, { FC, useState } from 'react';
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

interface BouquetChannelPickerProps { }

interface BouquetChannelsMap {
  [bouquet: string]: string[]
}

const BouquetChannelPicker: FC<BouquetChannelPickerProps> = () => {

  const router = useRouter()
  const stateBouquets = useSelector((state: RootState) => state.Bouquets.items);


  const [checked, setChecked] = useState<string[]>([]);
  const [checkedChannels, setCheckedChannels] = useState<BouquetChannelsMap>({});

  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(["All"]);

  const [activeBouquet, setActiveBouquet] = useState<string | null>(null);


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

    var newBreadcrumbs = breadcrumbs.slice()
    newBreadcrumbs.push(value)
    setBreadcrumbs(newBreadcrumbs)//.push('value');
    setActiveBouquet(value)

    // }

    // console.log("datePickerRef?.curren", datePickerRef?.current)
    // datePickerRef?.current?.open();
  };

  const handleChannelsChecked = (bouquet: string, channels: string[]) => {

    var channelsMap = Object.assign(checkedChannels, {
      [bouquet]: channels
    })
    setCheckedChannels(channelsMap)
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
              <IconButton disabled={activeBouquet ? false : true} variant="plain">
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

            }}>

              <Box sx={{
                flex: "1 1 0%"
              }}>


                <h6>
                  sasd
                </h6>
              </Box>
              <Button disabled={activeBouquet ? false : true} variant="solid">
                Done
              </Button>

            </Box>

            {/* 
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {[0, 1, 2, 3].map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments">
                        <CommentIcon />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List> */}

          </Box>
        </Sheet>


      </Modal>
    </div>
  );
}

export default BouquetChannelPicker;
