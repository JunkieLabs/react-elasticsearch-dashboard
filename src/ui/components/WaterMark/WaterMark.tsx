import React, { FC } from 'react';
import styles from './WaterMark.module.scss';

export interface WaterMarkProps {}

const WaterMark: FC<WaterMarkProps> = (props) => (
  <div className={styles.WaterMark}>
    <div className={`td-p-3 ${styles.blc}`}></div>
    WaterMark Component
  </div>
);

export default WaterMark;
