import { fetcher } from "@/tools/apiHelper";
import { ElasticConstants } from "../elastic.constants";
import { ModelElasticAggsResult, ModelElasticAggsResultItem } from "@/types/elastic/aggs";

 const getAgeStats = async (): Promise< number[]> => {
  // Simulate API delay
  

  var response: ModelElasticAggsResult = await fetcher('/api/elastic/events/filters/aggs?' + new URLSearchParams({
    // secret: process.env[`RECAPTCHA_SERVER`] ?? "",
    field: ElasticConstants.indexes.eventLogs.age,
    datatype: ElasticConstants.datatype.number
  }))
  // if (response.status >= 400 && response.status < 500) {
  //   // Handle the 4xx error
  // } else if (response.status >= 500) {
  //   // Handle the 5xx error
  // } else {
  //   // Handle the successful response
  // }

  // console.log("fetchCommonFilterAge: ", response)

  // 

  if(!response.items){
    return []
  }

  // if(result.data ty ModelElasticAggsResult.){
  //   result.data
  // }


  return response.items as number[];

  
}


export const ElasticCommonFilterRepo = {

  getAgeStats: getAgeStats
}