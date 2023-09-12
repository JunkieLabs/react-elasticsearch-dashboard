import { fetcher } from "@/tools/apiHelper";
import { ModelElasticAggsResult, ModelElasticAggsResultItem, ModelElasticMultiAggsResult, ModelElasticMultiAggsResultItem } from "@/types/elastic/aggs";
import { ElasticConstants } from "../elastic.constants";

const getTimeSeries = async ({ bouquets, bouquetChannelsMap, dateRange }:
    { bouquets?: string[], bouquetChannelsMap?: { [bouquet: string]: string[], }, dateRange: Date[] }): Promise<ModelElasticAggsResultItem[]> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

    bouquets?.forEach(bouquet => searchParam.append('bouquet', bouquet))

    // searchParam.append('field', ElasticConstants.indexes.testTime.channelName);
    // searchParam.append('n', `${n}`);

    if (bouquetChannelsMap) {
        searchParam.append('bouquet-channels-map', JSON.stringify(bouquetChannelsMap))
    }
    if (dateRange != null && dateRange.length > 0) {
        searchParam.append('date-range', JSON.stringify(dateRange.map(date => date.toISOString())));

    }

    // console.log("getPlots search Params: ",  searchParam, pincodes)

    var response: ModelElasticAggsResult = await fetcher('/api/elastic/events/aggs/time?' + searchParam)
    // if (response.status >= 400 && response.status < 500) {
    //   // Handle the 4xx error
    // } else if (response.status >= 500) {
    //   // Handle the 5xx error
    // } else {
    //   // Handle the successful response
    // }

    // console.log("getPlots ModelElasticAggsResult: ", response)

    // 

    if (!response.items) {
        return []
    }

    // if(result.data ty ModelElasticAggsResult.){
    //   result.data
    // }


    return response.items as ModelElasticAggsResultItem[];


}


const getAggs = async ({ bouquets, bouquetChannelsMap, dateRange }:
    { bouquets?: string[], bouquetChannelsMap?: { [bouquet: string]: string[], }, dateRange: Date[] }): Promise<ModelElasticMultiAggsResult> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

    bouquets?.forEach(bouquet => searchParam.append('bouquet', bouquet))

    // searchParam.append('field', ElasticConstants.indexes.testTime.channelName);
    // searchParam.append('n', `${n}`);

    if (bouquetChannelsMap) {
        searchParam.append('bouquet-channels-map', JSON.stringify(bouquetChannelsMap))
    }
    if (dateRange != null && dateRange.length > 0) {
        searchParam.append('date-range', JSON.stringify(dateRange.map(date => date.toISOString())));
    }

    // console.log("getPlots search Params: ",  searchParam, pincodes)

    var response: ModelElasticMultiAggsResult = await fetcher('/api/elastic/events/aggs/bouquet-channels?' + searchParam)

    console.log("getAggs bouquet-channels: ", response)

    // 

    if (!response.aggs) {
        return {
            aggs:{},
            total:0
        }
    }

    // if(result.data ty ModelElasticAggsResult.){
    //   result.data
    // }


    return response


}

export const ElasticChannelPerformanceAggRepo = {

    getTimeSeries: getTimeSeries,
    getAggs: getAggs
}
