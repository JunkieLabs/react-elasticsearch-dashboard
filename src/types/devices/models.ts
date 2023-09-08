import { ModelElasticEvent } from "../elastic/events/events"

export interface ModelDeviceDetail {
    id: string
    deviceId: string
    log: ModelElasticEvent
    timestamp: string
    status: string
  
  }

  export interface ModelDeviceLog {
    id: string
    deviceId: string
    log: ModelElasticEvent
    timestamp: string
    bouquet: string
    status: string
    location: string
  
  }