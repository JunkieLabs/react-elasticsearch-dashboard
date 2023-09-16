export interface ModelElasticEventHit {
    _id: string,// "Channel 75",
    _source: ModelElasticEvent,// "75",
   
}

export interface ModelElasticEventHitPart {
    _id: string,// "Channel 75",
    _source: ModelElasticEventPartial,// "75",
   
}




export interface ModelElasticEvent {
    channel_name: string,// "Channel 75",
    channel_number: string,// "75",
    bouquet_name: string,// "Boquet 13",
    device_id: string,// "Device 1",
    event: string,// "Timer",
    timestamp: string,// "2023-09-04T06:01:55",
    pincode: string,// "400003",
    location: ModelElasticLocationPoint,// {
   
    users_gender: string[]
    users_age: number[]
}


export interface ModelElasticEventPartial extends Partial<ModelElasticEvent>{
    
}


export interface ModelElasticLocationPoint {
    type: string,
    coordinates: number[]
}