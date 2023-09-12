import { fetcher } from "@/tools/apiHelper";
import { ModelElasticEventHit } from "@/types/elastic/events/events";

const getPaginated = async ({state, offset, limit}:{state: string , offset: number, limit: number}): Promise<ModelElasticEventHit[]> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

   searchParam.append("state", state)
   searchParam.append("skip", `${offset}`)
   searchParam.append("limit", `${limit}`)
   
    console.log("device getPaginated search Params: ",  searchParam, state)

    var response: ModelElasticEventHitResult = await fetcher('/api/elastic/events/hits/devices?'+   searchParam )
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


    return response.items  as ModelElasticEventHit[];


}

export const ElasticDeviceMonitorHitRepo = {

    getPaginated: getPaginated
}

export interface ModelElasticEventHitResult {
    
    skip?: number
    limit? : number
    items: ModelElasticEventHit[]
}