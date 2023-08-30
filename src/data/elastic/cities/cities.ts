import { fetcher } from "@/tools/apiHelper";
import { ModelElasticCity, ModelElasticCitiesResult } from "@/types/elastic/cities/cities";

const getCities = async (): Promise<ModelElasticCity[]> => {
    // Simulate API delay

    // var searchParam = new URLSearchParams();


    var response: ModelElasticCitiesResult = await fetcher('/api/elastic/cities')
    // if (response.status >= 400 && response.status < 500) {
    //   // Handle the 4xx error
    // } else if (response.status >= 500) {
    //   // Handle the 5xx error
    // } else {
    //   // Handle the successful response
    // }

    // console.log("elasticCities: ", response)

    // 

    if (!response.items) {
        return []
    }

    // if(result.data ty ModelElasticAggsResult.){
    //   result.data
    // }


    return response.items;


}

export const ElasticCityRepo = {

    getAll: getCities
}
