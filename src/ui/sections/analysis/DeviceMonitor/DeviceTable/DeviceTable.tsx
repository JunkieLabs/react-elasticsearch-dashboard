import React, { FC } from 'react';
import styles from './DeviceTable.module.scss';

interface DeviceTableProps {}

const DeviceTable: FC<DeviceTableProps> = () => (
  <div className={styles.DeviceTable}>
    DeviceTable Component
  </div>
);

export default DeviceTable;
