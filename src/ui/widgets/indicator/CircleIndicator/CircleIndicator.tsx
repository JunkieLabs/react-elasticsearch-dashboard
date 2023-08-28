import React, { FC } from 'react';
import styles from './CircleIndicator.module.scss';

export interface CircleIndicatorProps {

  color: string

}

const CircleIndicator: FC<CircleIndicatorProps> = (props) => (
  <div className={styles.CircleIndicator}  style={{
    "--color-primary": props.color
  } as React.CSSProperties}
>
    {/* CircleIndicator Component */}
  </div>
);

export default CircleIndicator;
