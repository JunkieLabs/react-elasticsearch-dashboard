import { fetcher } from "@/tools/apiHelper";
import { ModelElasticAggsResult, ModelElasticAggsResultItem } from "@/types/elastic/aggs";
import { ModelElasticPincode, ModelElasticPincodesResult } from "@/types/elastic/pincodes/pincodes";

const getBouquets = async (search?: string): Promise<ModelElasticAggsResultItem[]> => {
    // Simulate API delay

    var searchParam = new URLSearchParams();

    if(search){
        searchParam.append("search", search)
    }
    console.log("elasticPincodes search: ", search)

    // pincodes.forEach(pincode => searchParam.append('pincode', pincode))

    var response: ModelElasticAggsResult = await fetcher('/api/elastic/bouquets'+ (search ? ('?' + searchParam ): ''))
   

    console.log("elasticPincodes aggs: ", response)

    // 

    if (!response.items) {
        return []
    }

    // if(result.data ty ModelElasticAggsResult.){
    //   result.data
    // }


    return response.items  as ModelElasticAggsResultItem[];


}

export const ElasticBouquetRepo = {

    getAll: getBouquets
}
