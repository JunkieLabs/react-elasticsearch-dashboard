import { ModelElasticEvent } from "../elastic/events/events"

export interface ModelDeviceDetail {
    id: string
    deviceId: string
    log: ModelElasticEvent
    timestamp: string
    status: string
  
  }