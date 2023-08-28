import React, { FC } from 'react';
import styles from './BouquetChannelPicker.module.scss';

interface BouquetChannelPickerProps { }

const BouquetChannelPicker: FC<BouquetChannelPickerProps> = () => {

  return (
    <div className={styles.BouquetChannelPicker}>
      BouquetChannelPicker Component
    </div>
  );
}

export default BouquetChannelPicker;
