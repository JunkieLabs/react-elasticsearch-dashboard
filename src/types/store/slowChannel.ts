import { ModelElasticCity } from "../elastic/cities/cities";

export interface ModelSlowChannelFilters {
    gender: string;
    ageRange?: number[];
    pincodes: string[];
    region? : ModelElasticCity; 
    bouquet? : string; 
}