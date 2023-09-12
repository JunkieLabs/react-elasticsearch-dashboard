import { ModelElasticCity } from "../elastic/cities/cities";

export interface ModelTopChannelFilters {
    gender: string;
    ageRange?: number[];
    pincodes: string[];
    region? : ModelElasticCity; 
    bouquet? : string; 
}