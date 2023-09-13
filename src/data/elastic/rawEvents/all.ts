import { fetcher } from "@/tools/apiHelper";
import { ModelElasticEventHit } from "@/types/elastic/events/events";
import { ModelElasticEventTotalResult } from "@/types/elastic/events/total";

const getAll = async ({ dateRange, limit }: { dateRange: Date[], limit: number }): Promise<ModelElasticEventHit[]> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

    searchParam.append("limit", `${limit}`)
    if (dateRange != null && dateRange.length > 0) {
        searchParam.append('date-range', JSON.stringify(dateRange.map(date => date.toISOString())));

    }
    // console.log("getPlots search Params: ",  searchParam, pincodes)

    var response: ModelElasticEventHitResult = await fetcher('/api/elastic/events/hits/raw?' + searchParam)



    if (!response.items) {
        return []
    }

    // if(result.data ty ModelElasticAggsResult.){
    //   result.data
    // }
    console.log("getAll search response: ", searchParam, response)


    return response.items as ModelElasticEventHit[];



}


const getAllCount = async ({ dateRange }: { dateRange: Date[] }): Promise<number> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

    if (dateRange != null && dateRange.length > 0) {
        searchParam.append('date-range', JSON.stringify(dateRange.map(date => date.toISOString())));

    }
    // console.log("getPlots search Params: ",  searchParam, pincodes)

    var response: ModelElasticEventHitResult = await fetcher('/api/elastic/events/hits/raw?' + searchParam)



    // if (!response.items) {
    //     return []
    // }

    // if(result.data ty ModelElasticAggsResult.){
    //   result.data
    // }
    console.log("getAll search response: ", searchParam, response)


    return response.total ?? 0;



}

export const ElasticRawEventsLogsRepo = {

    getAll: getAll,
    getAllCount: getAllCount
}

export interface ModelElasticEventHitResult {

    // skip?: number
    total?: number
    items: ModelElasticEventHit[]
}