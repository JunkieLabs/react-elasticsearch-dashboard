import { fetcher } from "@/tools/apiHelper";
import { ModelElasticAggsResult, ModelElasticAggsResultItem } from "@/types/elastic/aggs";
import { ElasticConstants } from "../elastic.constants";

const getTimeSeries = async ({   bouquets, bouquetChannelsMap, dateRange }:
     {  bouquets?: string[], bouquetChannelsMap?:{ [bouquet: string]: string[] }, dateRange: Date[] }): Promise<ModelElasticAggsResultItem[]> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

    bouquets?.forEach(bouquet => searchParam.append('bouquet', bouquet))

    searchParam.append('field', ElasticConstants.indexes.testTime.channelName);
    // searchParam.append('n', `${n}`);

    if(bouquetChannelsMap){
        searchParam.append('bouquet-channels-map', JSON.stringify(bouquetChannelsMap))
    }


    // console.log("getPlots search Params: ",  searchParam, pincodes)

    var response: ModelElasticAggsResult = await fetcher('/api/elastic/events/aggs/times?' + searchParam)
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

export const ElasticChannelPerformanceAggRepo = {

    getTimeSeries: getTimeSeries
}
