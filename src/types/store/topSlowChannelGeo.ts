import { ModelElasticCity } from "../elastic/cities/cities";

export interface ModelTopSlowChannelGeoFilters {
    gender: string;
    ageRange?: number[];
    pincodes: string[];
    region? : ModelElasticCity; 
    bouquet? : string; 
    isTop: boolean;

}