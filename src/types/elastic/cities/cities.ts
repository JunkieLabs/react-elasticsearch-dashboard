import { ModelElasticGeoPoint } from "@/types/elastic/common"


export interface ModelElasticCity {

    city: string 
    location: ModelElasticGeoPoint 

  }

export interface ModelElasticCitiesResult {
    size: number
    items: ModelElasticCity[]
}
