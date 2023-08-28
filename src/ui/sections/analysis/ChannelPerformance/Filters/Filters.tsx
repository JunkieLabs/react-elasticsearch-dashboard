import React, { FC } from 'react';
import styles from './Filters.module.scss';
import ExpansonPanel from '@/ui/widgets/ExpansonPanel/ExpansonPanel';

interface FiltersProps {}

const Filters: FC<FiltersProps> = () => (
  <div className={styles.Filters}>
    <ExpansonPanel></ExpansonPanel>
  </div>
);

export default Filters;
