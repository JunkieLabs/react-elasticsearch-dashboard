import { fetcher } from "@/tools/apiHelper";
import { ModelElasticAggsResult, ModelElasticAggsResultItem } from "@/types/elastic/aggs";
import { ElasticConstants } from "../elastic.constants";
import { ModelElasticEventMonitorResult } from "@/types/elastic/events/monitor";

const getStats = async (): Promise<ModelElasticEventMonitorResult> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

   
    // console.log("getPlots search Params: ",  searchParam, pincodes)

    var response: ModelElasticEventMonitorResult = await fetcher('/api/elastic/events/aggs/monitor')
    // if (response.status >= 400 && response.status < 500) {
    //   // Handle the 4xx error
    // } else if (response.status >= 500) {
    //   // Handle the 5xx error
    // } else {
    //   // Handle the successful response
    // }

    // console.log("getPlots ModelElasticAggsResult: ", response)

    // 

    if (!response) {
        return {
            active:0,
            all:0,
            connected:0,
            inactive:0
        }
    }

    // if(result.data ty ModelElasticAggsResult.){
    //   result.data
    // }


    return response;


}

export const ElasticDeviceMonitorAggRepo = {

    getStats: getStats
}
