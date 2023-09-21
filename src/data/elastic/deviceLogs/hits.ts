import { fetcher } from "@/tools/apiHelper";
import { ModelElasticGeoPoint } from "@/types/elastic/common";
import { ModelElasticEventHit, ModelElasticEventHitPart } from "@/types/elastic/events/events";
import { ElasticConstants } from "../elastic.constants";
import { ModelElasticHitsPartialResult } from "@/types/elastic/aggs";

const getPaginated = async ({state, offset, limit, deviceId}:{state: string , offset: number, limit: number, deviceId: string}): Promise<ModelElasticEventHit[]> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

   searchParam.append("state", state)
   searchParam.append("device-id", deviceId)
   searchParam.append("skip", `${offset}`)
   searchParam.append("limit", `${limit}`)
   
    // console.log("getPlots search Params: ",  searchParam, pincodes)

    var response: ModelElasticEventHitResult = await fetcher('/api/elastic/events/hits/logs?'+   searchParam )
  

    if (!response.items) {
        return []
    }

    // if(result.data ty ModelElasticAggsResult.){
    //   result.data
    // }


    return response.items  as ModelElasticEventHit[];


}


const getHitsGeo = async ({ limit = 5, locations, channelNames, pincodes, ageRange, gender, dateRange, order }:
    { limit: number, locations: ModelElasticGeoPoint[], channelNames: string[],  ageRange?: number[], pincodes?: string[], gender?: string, 
        dateRange: Date[], order?: string }): Promise<ModelElasticEventHitPart[]> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

    pincodes?.forEach(pincode => searchParam.append('pincode', pincode))

    locations.forEach(location => searchParam.append('location', JSON.stringify(location)))
    searchParam.append('field', ElasticConstants.indexes.eventLogs.channelName);

    channelNames.forEach(channelName => searchParam.append('channel-name', channelName))

    //  //channel-name'
    //  cha?.forEach(pincode => searchParam.append('pincode', pincode))


    if (ageRange) {
        searchParam.append('age-range', JSON.stringify(ageRange));
    }

    if (gender) {
        searchParam.append('gender', gender);
    }

    if (dateRange != null && dateRange.length > 0) {
        searchParam.append('date-range', JSON.stringify(dateRange.map(date => date.toISOString())));

    }
   
    searchParam.append('limit', `${limit}`);

    if (order) {
        searchParam.append('order', order);
    }

    // console.log("getHitsGeo search Params: ", ageRange, pincodes, limit)

    var response: ModelElasticHitsPartialResult = await fetcher('/api/elastic/events/hits/geo?' + searchParam)
   
    if (!response.items) {
        return []
    }

    // console.log("response: ", response)

    // if(result.data ty ModelElasticAggsResult.){
    //   result.data
    // }


    return response.items as ModelElasticEventHitPart[];


}

export const ElasticDeviceLogsHitRepo = {

    getPaginated: getPaginated,
    getHitsGeo:getHitsGeo
}

export interface ModelElasticEventHitResult {
    
    skip?: number
    limit? : number
    items: ModelElasticEventHit[]
}