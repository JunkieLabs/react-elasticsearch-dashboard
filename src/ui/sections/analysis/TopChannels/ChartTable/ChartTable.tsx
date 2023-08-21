import React, { FC } from 'react';
import styles from './ChartTable.module.scss';
import { ModelChartCommonItem } from '@/types/charts/common';
import Table from '@mui/joy/Table';
import Box from '@mui/joy/Box';

interface ChartTableProps {
  data: ModelChartCommonItem[]

}

const ChartTable: FC<ChartTableProps> = (props) => {



  return (
    <div className={styles.ChartTable}>

      <Table aria-label="striped table" stripe={'odd'} borderAxis='xBetween'
      >
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Channel Name</th>
            <th className={styles["align-center"]}>Count</th>
            <th className={styles["align-center"]}>Color&nbsp;(g)</th>

          </tr>
        </thead>
        <tbody>
          {props.data.map((row) => (
            <tr key={row.id}>
              <td align='left'>{row.label}</td>
              <td className={styles["align-center"]}>{row.value}</td>
              <td className={styles["align-center"]}><Box sx={{
                backgroundColor:row.color,
                margin:'auto'
              }}  className="td-aspect-square td-h-4"></Box></td>
            </tr>
          ))}
        </tbody>
      </Table>


    </div>
  )
};

export default ChartTable;
