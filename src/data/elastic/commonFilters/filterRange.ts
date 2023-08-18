import { fetcher } from "@/tools/apiHelper";

export async function fetchCommonFilterAge(): Promise<[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    var result = await fetcher('api/elastic/test-time/filters/aggs')


    return result;
  
    // // Filter and process channelPerformances based on filter and subFilter
    // const channelPerformance = channelPerformances.filter((product) => {
    //   // Apply your filter and subFilter logic here
    //   return product.key.toLowerCase().includes(subFilter.toLowerCase());
    // });


  
    // return channelPerformance;
  }