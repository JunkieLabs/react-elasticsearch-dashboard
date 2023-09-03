// export interface ModelChartHighStockSeries {
//     id: string;
//     name: 'AAPL';
//     color: string;
//     data: any[];
//     tooltip: {
//         valueDecimals: 2
//     };
// }
import Highcharts from 'highcharts/highstock';

export interface ModelChartHighStock {
    series?: Highcharts.SeriesOptionsType[],
    color?: string
}