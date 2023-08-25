import { fetcher } from "@/tools/apiHelper";
import { ModelElasticAggsResult, ModelElasticAggsResultItem } from "@/types/elastic/aggs";
import { ModelElasticGeoPoint } from "@/types/elastic/common";
import { ModelElasticPincode, ModelElasticPincodesResult } from "@/types/elastic/pincodes/pincodes";
import { ModelChannelPerformanceFilters } from "@/types/store/channelPerformance";
import { ElasticConstants } from "../elastic.constants";

const getTopN = async ({ n = 5, locations, pincodes, ageRange, dateRange }:
     { n: number , locations: ModelElasticGeoPoint[], ageRange?: number[], pincodes?: string[], dateRange: Date[] }): Promise<ModelElasticAggsResultItem[]> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

    pincodes?.forEach(pincode => searchParam.append('pincode', pincode))

    locations.forEach(location => searchParam.append('location', JSON.stringify(location)))
    searchParam.append('field', ElasticConstants.indexes.testTime.channelName);
    searchParam.append('n', `${n}`);

    var response: ModelElasticAggsResult = await fetcher('/api/elastic/test-time/aggs?' + searchParam)
    // if (response.status >= 400 && response.status < 500) {
    //   // Handle the 4xx error
    // } else if (response.status >= 500) {
    //   // Handle the 5xx error
    // } else {
    //   // Handle the successful response
    // }

    console.log("getTopN ModelElasticAggsResult: ", response)

    // 

    if (!response.items) {
        return []
    }

    // if(result.data ty ModelElasticAggsResult.){
    //   result.data
    // }


    return response.items as ModelElasticAggsResultItem[];


}

export const ElasticTopChannelAggRepo = {

    getTopN: getTopN
}
