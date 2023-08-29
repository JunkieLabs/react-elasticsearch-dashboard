'use client';

import React, { FC } from 'react';
import styles from './BouquetChannelPicker.module.scss';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import { useRouter } from 'next/navigation';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import PickChannelsByBouquet from '../PickChannelsByBouquet/PickChannelsByBouquet';

interface BouquetChannelPickerProps { }

const BouquetChannelPicker: FC<BouquetChannelPickerProps> = () => {

  const router = useRouter()
  


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
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
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


          <Box
            sx={{

            }}
          >
            <PickChannelsByBouquet bouquet='s'></PickChannelsByBouquet>
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
