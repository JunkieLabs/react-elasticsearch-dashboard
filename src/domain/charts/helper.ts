// this._mPlotObjects = [];
//     for (let i = 0; i < values.length; i++) {
//       let color = UtilColor.COLOR_ARRAY[i%20];
//       this._mPlotObjects.push({
//         name: names[i],
//         color: color,
//         value: values[i],
//         colorClass: UtilColor.COLOR_CLASS[color]
//       });
//     }
import Highcharts from 'highcharts/highstock';

import { differenceInDays, format, addDays } from 'date-fns';
import { isNumeric } from "@/tools/parserTools";
import { ModelChartJs, ModelChartJsDataset } from "@/types/charts/chartjs";
import { ModelChartCommonItem } from "@/types/charts/common";
import { ModelChartHighStock } from "@/types/charts/highstock";
import { ModelElasticAggsResultItem } from "@/types/elastic/aggs";
import { UiResourceColor } from "@/ui/resource/color";


const elasticAggregationToChartJsCommon = (items: ModelElasticAggsResultItem[]): ModelChartCommonItem[] => {

    var data: ModelChartCommonItem[] = [];

    for (let i = 0; i < items.length; i++) {
        const element = items[i];

        let chatCommonData: ModelChartCommonItem = {
            id: isNumeric(element.key) ? `${Number(element.key)}` : element.key.toString(),//`${label}`,
            color: UiResourceColor.COLOR_ARRAY[i % 15],
            label: isNumeric(element.key) ? `${Number(element.key)}` : element.key.toString(),
            value: element.doc_count
        }
        data.push(chatCommonData);

    }
    return data;

}

const chartCommonToChartJs = (items: ModelChartCommonItem[]): ModelChartJs => {

    var data: ModelChartJsDataset[] = [];


    var labels: string[] = items.map(ele => ele.label) ?? [];

    var colors: string[] = items.map(ele => ele.color) ?? [];


    var values: number[] = items.map(ele => ele.value,
    );

    var modelChartJs: ModelChartJs = {

        labels: labels,
        data: [{
            data: values ?? [],
            label: "",
            backgroundColor: colors
        }]
    }

    return modelChartJs;

}


const elasticSubAggregationTimeToChartJs = (items: ModelElasticAggsResultItem[], dayRange: number[], dateRange: Date[]): ModelChartJs => {

    // var data: ModelChartCommonItem[] = [];


    // console.log("dateRange[0].valueOf()", dateRange[0].valueOf(), dateRange[1].valueOf())
    // console.log("first", differenceInDays((items[0].sub?.buckets?.[0].key as number | undefined) ?? 0, dateRange[0]))
    // console.log("2nd", differenceInDays((items[0].sub?.buckets?.[1].key as number | undefined) ?? 0, dateRange[0]))
    var labels = [];

    for (let j = dayRange[0]; j < dayRange[1]; j++) {
         labels.push (format(addDays(dateRange[0], j), "dd/MM/yyyy"))
    }

    // console.log("")

    var modelChartJs: ModelChartJs = {

        labels: labels,
        data: []
    }


    for (let l = 0; l < items.length; l++) {
        const element = items[l];

        var chartEntries = new Map<number, { label: string, value: number }>()

        for (let j = dayRange[0]; j < dayRange[1]; j++) {
            chartEntries.set(j, { label: format(addDays(dateRange[0], j), "dd/MM/yyyy"), value: 0 })
        }
        if (element.sub?.buckets) {


            console.log("element.sub!.buckets", element.sub!.buckets)
            for (var entry of element.sub!.buckets) {
                // console.log("entry: ", entry)
                var diff = differenceInDays((entry.key as number | undefined) ?? 0, dateRange[0])
                var chartEntry = chartEntries.get(diff)

                if (chartEntry) {
                    chartEntry.value += entry.doc_count
                    chartEntries.set(diff, chartEntry)
                }

                // if()


            }

        }

        var entriesData  = []

        for (let j = dayRange[0]; j < dayRange[1]; j++) {
            entriesData.push(chartEntries.get(j)!.value)
        }
        var dataset: ModelChartJsDataset = {
            data: entriesData,
            label: isNumeric(element.key) ? `${Number(element.key)}` : element.key.toString(),
            backgroundColor: UiResourceColor.COLOR_ARRAY[l % 15]
        }

        modelChartJs.data.push(dataset);


        // let chatCommonData: ModelChartCommonItem = {
        //     id: isNumeric(element.key) ? `${Number(element.key)}` : element.key.toString(),//`${label}`,
        //     color: UiResourceColor.COLOR_ARRAY[i % 15],
        //     label: isNumeric(element.key) ? `${Number(element.key)}` : element.key.toString(),
        //     value: element.doc_count
        // }
        // data.push(chatCommonData);

    }
    return modelChartJs;

}



const timeseriesToHighstock = (items: ModelElasticAggsResultItem[], color: string): ModelChartHighStock => {



    var series: Highcharts.SeriesOptionsType = {



        type: 'line',
        id: "string",
        name: 'Events',
        color: color,
        data: items.map(item => [item.key as number, item.doc_count]),
        dataGrouping: {
            enabled: false
        },
        boostThreshold: 1,
        turboThreshold: 1,
        showInNavigator: true
        // tooltip: {
        //     valueDecimals: 2
        // }
    }
    var data: ModelChartHighStock = {
        color: color,
        series: [series]
    }



    return data;

}

export const ChartHelper = {
    elasticAggregationToChartJsCommon: elasticAggregationToChartJsCommon,
    chartCommonToChartJs: chartCommonToChartJs,
    elasticSubAggregationTimeToChartJs: elasticSubAggregationTimeToChartJs,
    timeseriesToHighstock: timeseriesToHighstock
}