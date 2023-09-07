import { fetcher } from "@/tools/apiHelper";
import { ModelElasticEventTotalResult } from "@/types/elastic/events/total";

const getTotal = async (): Promise<ModelElasticEventTotalResult> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

   
    // console.log("getPlots search Params: ",  searchParam, pincodes)

    var response: ModelElasticEventTotalResult = await fetcher('/api/elastic/events/aggs/total')
   

    if (!response) {
        return {
            total:0,
            
        }
    }
    return response;


}

export const ElasticDeviceLogsTotalRepo = {

    getTotal: getTotal
}
