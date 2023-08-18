import { fetcher } from "@/tools/apiHelper";
import { ElasticConstants } from "../elastic.constants";
import { ModelElasticAggsResult, ModelElasticAggsResultItem } from "@/types/elastic/aggs";

export const elasticCommonFilterAgeStats = async (): Promise< number[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  

  var response: ModelElasticAggsResult = await fetcher('/api/elastic/test-time/filters/aggs?' + new URLSearchParams({
    // secret: process.env[`RECAPTCHA_SERVER`] ?? "",
    field: ElasticConstants.indexes.testTime.age,
    datatype: ElasticConstants.datatype.number
  }))
  // if (response.status >= 400 && response.status < 500) {
  //   // Handle the 4xx error
  // } else if (response.status >= 500) {
  //   // Handle the 5xx error
  // } else {
  //   // Handle the successful response
  // }

  console.log("fetchCommonFilterAge: ", response)

  // 

  if(!response.data){
    return []
  }

  // if(result.data ty ModelElasticAggsResult.){
  //   result.data
  // }


  return response.data as number[];

  
}
