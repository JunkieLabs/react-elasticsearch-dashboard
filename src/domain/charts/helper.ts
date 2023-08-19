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

import { isNumeric } from "@/tools/parserTools";
import { ModelChartJs, ModelChartJsDataset } from "@/types/charts/chartjs";
import { ModelChartCommonItem } from "@/types/charts/common";
import { ModelElasticAggsResultItem } from "@/types/elastic/aggs";
import { UiResourceColor } from "@/ui/resource/color";


const elasticAggregationToChartJs = (items: ModelElasticAggsResultItem[]): ModelChartCommonItem[] => {

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

export const ChartHelper = {
    elasticAggregationToChartJs: elasticAggregationToChartJs,
    chartCommonToChartJs: chartCommonToChartJs
}