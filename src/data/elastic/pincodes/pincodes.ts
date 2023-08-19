import { fetcher } from "@/tools/apiHelper";
import { ModelElasticPincode, ModelElasticPincodesResult } from "@/types/elastic/pincodes/pincodes";

const getPincodes = async (pincodes: string[]): Promise<ModelElasticPincode[]> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

    pincodes.forEach(pincode => searchParam.append('pincode', pincode))

    var response: ModelElasticPincodesResult = await fetcher('/api/elastic/pincodes?' + searchParam)
    // if (response.status >= 400 && response.status < 500) {
    //   // Handle the 4xx error
    // } else if (response.status >= 500) {
    //   // Handle the 5xx error
    // } else {
    //   // Handle the successful response
    // }

    console.log("elasticPincodes: ", response)

    // 

    if (!response.items) {
        return []
    }

    // if(result.data ty ModelElasticAggsResult.){
    //   result.data
    // }


    return response.items;


}

export const ElasticPincodeRepo = {

    getAll: getPincodes
}
