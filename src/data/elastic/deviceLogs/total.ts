import { fetcher } from "@/tools/apiHelper";
import { ModelElasticEventTotalResult } from "@/types/elastic/events/total";

const getTotal = async (deviceId: string): Promise<ModelElasticEventTotalResult> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();
    searchParam.append("device-id", deviceId)
   
    // console.log("getPlots search Params: ",  searchParam, pincodes)

    var response: ModelElasticEventTotalResult = await fetcher('/api/elastic/events/aggs/total?'+   searchParam )
   

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
