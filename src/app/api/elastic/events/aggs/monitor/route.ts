import { getElasticClient } from "@/data/elastic/elastic";
import { ElasticConstants } from "@/data/elastic/elastic.constants";
import { ModelElasticEventMonitorResult } from "@/types/elastic/events/monitor";
import { NextResponse } from "next/server";
import { formatISO, subHours } from 'date-fns';
// TODO change the time 
export async function GET(req: Request) {

    // console.log("GET aggs: ", field, ageRange, locations, pincodes)

    const elastic = await getElasticClient();
    var connectedGte = subHours(new Date(Date.now()), ElasticConstants.checks.device.timeOffsetConnected)
    var activeGte = subHours(new Date(Date.now()), ElasticConstants.checks.device.timeOffsetActive)
 console.log("GET aggs monitor: ", new Date(Date.now()).toUTCString(), new Date(Date.now()).toISOString(), connectedGte, activeGte)

    var aggs = {
        all: {
            global: {},  // Use global aggregation to count all devices
            aggs: {
                total: {
                    cardinality: {
                        field: "device_id.keyword"
                    }
                }
            }
        },
        connected: {
            filters: {
                filters: {
                    result: {
                        range: {
                            timestamp: {

                                gte: `${connectedGte.toISOString()}`


                                // gte: `now-${ElasticConstants.checks.device.timeOffsetConnected}h`
                            }
                        }
                    }
                }
            },
            aggs: {
                total: {
                    cardinality: {
                        field: `${ElasticConstants.indexes.eventLogs.deviceId}.keyword`
                    }
                }
            }
        },
        // inactive: {
        //     filters: {
        //         filters: {
        //             result: {
        //                 range: {
        //                     timestamp: {
        //                         lt: "now-4h/h"
        //                     }
        //                 }
        //             }
        //         }
        //     },
        //     aggs: {
        //         total: {
        //             cardinality: {
        //                 field: "device_id.keyword"
        //             }
        //         }
        //     }
        // },
        active: {
            filters: {
                filters: {
                    result: {
                        range: {
                            timestamp: {
                                gte: `${activeGte.toISOString()}`

                                // gte: `now-${ElasticConstants.checks.device.timeOffsetActive}h`
                            }
                        }
                    }
                }
            },
            aggs: {
                total: {
                    cardinality: {
                        field: `${ElasticConstants.indexes.eventLogs.deviceId}.keyword`
                    }
                }
            }
        }
    }



    var response: ModelElasticEventMonitorResult = {
        all: 0,
        active: 0,
        connected: 0,
        inactive: 0
    }
    // console.log("quey pin: ", query.bool.must)

    // console.log("quey: ", query.bool.must)

    const result = await elastic.search({
        index: ElasticConstants.indexes.eventLogs._,
        body: {
            size: 0,
            aggs: aggs
        }
    });
    const aggsResult = (result.aggregations as Result);//??[];//.map((item) => item._source);

    console.log("aggsResult: ", aggsResult)
    response.active = aggsResult.active?.buckets.result.total.value ?? 0
    // response.inactive = aggsResult.inactive?.buckets.result.total.value ?? 0
    response.connected = aggsResult.connected?.buckets.result.total.value ?? 0
    response.all = aggsResult.all?.total.value ?? 0
    response.inactive = response.all - response.active;
  
    return NextResponse.json(response);


}

interface Result {

    all?: GlobalResult
    connected?: ResultBucket
    active?: ResultBucket
    inactive?: ResultBucket

}

interface ResultBucket {
    buckets: {
        result: {
            total: {
                value: number
            }
        }
    }

}

interface GlobalResult {
    total: {
        value: number
    }
}
