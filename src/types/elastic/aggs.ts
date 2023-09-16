import { ModelElasticEventHit, ModelElasticEventHitPart } from "./events/events"

export interface ModelElasticAggsStatsResult {
    count: number//,
    min: number//,
    max: number//,
    avg: number//.938271604938272,
    sum: number//
}

export interface ModelElasticAggsTermsResult {
    buckets: any[]
}
export interface ModelElasticMultiAggsResult {
    aggs: {
        [key:string]: ModelElasticMultiAggsResultItem
    }
    total?: number
}

export interface ModelElasticMultiAggsResultItem{

    doc_count: number 
}

// Client Side
export interface ModelElasticAggsResult {
    field?: string
    total?: number
    skip?: number
    limit? : number
    items: ModelElasticAggsResultItem[] | number[]
}

export interface ModelElasticHitsResult {
    field?: string
    total?: number
    skip?: number
    limit? : number
    items: ModelElasticEventHit[]
}

export interface ModelElasticHitsPartialResult {
    total?: number
    items: ModelElasticEventHitPart[]
}

export interface ModelElasticAggsResultItem {

    key: string | number
    doc_count: number 
    sub? : {
        buckets?: ModelElasticAggsResultItem[]
    }

  }