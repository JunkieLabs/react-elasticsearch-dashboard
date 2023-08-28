'use client';

import React, { FC } from 'react';
import styles from './BouquetChannelPicker.module.scss';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import { useRouter } from 'next/navigation';

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
        </Sheet>


      </Modal>
    </div>
  );
}

export default BouquetChannelPicker;
