import React, { FC, useRef } from 'react';
import styles from './ChartHighstock.module.scss';

import Highcharts from 'highcharts/highstock';

import HighchartsReact from 'highcharts-react-official';


interface ChartHighstockProps {


}

const ChartHighstock: FC<ChartHighstockProps> = () => {

  const highChartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const options = config('#1BBF6D')

  return (
    <div className={styles.ChartHighstock}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={highChartComponentRef}



      // {...props}

      />
    </div>
  );
}

export default ChartHighstock;


const config = (mColor: string): Highcharts.Options => {
  return {
    chart: {
      backgroundColor: undefined,
      zooming: {
        type: 'x'
      }
    },
    tooltip: {
      valueDecimals: 2
    },
    colors: [mColor as any],
    navigator: {
      maskFill: 'rgba(0,0,0,0.12)' as any
    },
    scrollbar: {
      barBackgroundColor: mColor,
      barBorderColor: mColor,
      trackBackgroundColor: mColor,
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 1000
        }

      }]

    },
    rangeSelector: {

      // buttonPosition: {
      //   align: 'right',
      // },

      inputEnabled: false,
      buttonTheme: {
        fill: 'none' as any,
        stroke: 'none' as any,
        'stroke-width': 0,
        r: 2,
        style: {
          color: '#9c9c9c' as any,

        },
        states: {
          hover: {
          },
          select: {
            fill: mColor,
            style: {
              color: 'white' as any
            }
          }
          // disabled: { ... }
        },
        width: 48,
        padding: 4
      },
      buttons: [{
        type: 'month' as any,
        count: 1,
        text: 'Month' as any,
        // events: {
        //   click: function (e) {
        //     console.log('button clickd');
        //   }
        // }

      },
      {
        type: 'year' as any,
        count: 1,
        text: 'Year' as any
      },
      {
        type: 'all' as any,
        text: 'All' as any
      }]
    },
    series: [],
    xAxis: {
      events: {
        afterSetExtremes: (e) => {
          // console.log(e);
          // this.button = e.rangeSelectorButton.count;

        }
      }
    },
  }
}