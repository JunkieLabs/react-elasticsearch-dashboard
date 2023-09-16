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

import { differenceInDays, format, addDays } from 'date-fns';
import { isNumeric } from "@/tools/parserTools";
import { ModelChartJs, ModelChartJsDataset } from "@/types/charts/chartjs";
import { ModelChartCommonItem } from "@/types/charts/common";
import { ModelChartHighStock } from "@/types/charts/highstock";
import { ModelElasticAggsResultItem } from "@/types/elastic/aggs";
import { UiResourceColor } from "@/ui/resource/color";
import { ModelElasticEventHitPart, ModelElasticEventPartial } from '@/types/elastic/events/events';



const groupHitsByChannelName = (items: ModelElasticEventHitPart[]): Map<string, ModelElasticEventPartial[]> => {


    var maps = new Map<string, ModelElasticEventPartial[]>();

    for(let item of items){
        var mapValues = maps.get(item._source.channel_name??"_")??[];

        mapValues.push(item._source);
        maps.set(item._source.channel_name??"_", mapValues);
    }



    


    return maps;

}

export const GeoHelper = {
    groupHitsByChannelName: groupHitsByChannelName
}