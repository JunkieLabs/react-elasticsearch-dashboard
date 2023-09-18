import { fetcher } from "@/tools/apiHelper";
import { ModelElasticAggsResult, ModelElasticAggsResultItem } from "@/types/elastic/aggs";
import { ModelElasticGeoPoint } from "@/types/elastic/common";
import { ElasticConstants } from "../elastic.constants";

import { formatISO } from 'date-fns';

const getTopSlowN = async ({ n = 5, locations, pincodes, ageRange, gender, dateRange, order, subAggsByDay = false  }:
    { n: number, locations: ModelElasticGeoPoint[], ageRange?: number[], pincodes?: string[], gender?: string, 
        dateRange: Date[], order?: string, subAggsByDay?: boolean}): Promise<ModelElasticAggsResultItem[]> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

    pincodes?.forEach(pincode => searchParam.append('pincode', pincode))

    locations.forEach(location => searchParam.append('location', JSON.stringify(location)))
    searchParam.append('field', ElasticConstants.indexes.testTime.channelName);

    if (ageRange) {
        searchParam.append('age-range', JSON.stringify(ageRange));
    }

    if (gender) {
        searchParam.append('gender', gender);
    }

    if (dateRange != null && dateRange.length > 0) {
        searchParam.append('date-range', JSON.stringify(dateRange.map(date => date.toISOString())));

    }

    if(subAggsByDay){
        searchParam.append('sub-aggs', ElasticConstants.checks.aggs.subAggsType.byDay);
    }
    
    searchParam.append('n', `${n}`);

    if (order) {
        searchParam.append('order', order);
    }

   
    // console.log("getTopSlowN search Params: ", ageRange, pincodes, order)

    var response: ModelElasticAggsResult = await fetcher('/api/elastic/events/aggs?' + searchParam)
    // if (response.status >= 400 && response.status < 500) {
    //   // Handle the 4xx error
    // } else if (response.status >= 500) {
    //   // Handle the 5xx error
    // } else {
    //   // Handle the successful response
    // }

    // console.log("getTopN ModelElasticAggsResult: ", response)

    // 

    if (!response.items) {
        return []
    }

    // if(result.data ty ModelElasticAggsResult.){
    //   result.data
    // }


    return response.items as ModelElasticAggsResultItem[];


}




export const ElasticTopSlowChannelAggRepo = {

    getTopSlowN: getTopSlowN
}
