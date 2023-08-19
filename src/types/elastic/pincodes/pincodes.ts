import { ModelElasticGeoPoint } from "@/types/elastic/common"


export interface ModelElasticPincode {

    pincode: string 
    location: ModelElasticGeoPoint 

  }

export interface ModelElasticPincodesResult {
    size: number
    items: ModelElasticPincode[]
}
