import React, { FC } from 'react';
import styles from './DeviceMonitor.module.scss';

interface DeviceMonitorProps {}

const DeviceMonitor: FC<DeviceMonitorProps> = () => (
  <div className={styles.DeviceMonitor}>
    DeviceMonitor Component
  </div>
);

export default DeviceMonitor;
