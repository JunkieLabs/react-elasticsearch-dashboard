import { fetcher } from "@/tools/apiHelper";
import { ModelElasticEventHit } from "@/types/elastic/events/events";

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

export const ElasticDeviceLogsHitRepo = {

    getPaginated: getPaginated
}

export interface ModelElasticEventHitResult {
    
    skip?: number
    limit? : number
    items: ModelElasticEventHit[]
}