// import { getElasticClient } from "@/data/elastic/elastic";
// import { ElasticConstants } from "@/data/elastic/elastic.constants";
// import { TransformHelper } from "@/tools/parserTools";
// import { ModelElasticAggsResult, ModelElasticAggsTermsResult } from "@/types/elastic/aggs";
// import { ModelElasticGeoPoint } from "@/types/elastic/common";
import { getElasticClient } from "@/data/elastic/elastic";
import { ElasticConstants } from "@/data/elastic/elastic.constants";
import { TransformHelper } from "@/tools/parserTools";
import { ModelElasticAggsResult, ModelElasticAggsTermsResult } from "@/types/elastic/aggs";
import { ModelElasticGeoPoint } from "@/types/elastic/common";
import { NextResponse } from "next/server";
import { inspect } from "util";

import { formatISO, subHours } from 'date-fns';

export async function GET(req: Request) {
    let { searchParams } = new URL(req.url);
    let skip = TransformHelper.toNumber(searchParams.get('skip') as string | undefined);
    let limit = TransformHelper.toNumber(searchParams.get('limit') as string | undefined, {
        max: 30,
        min: 2
    });
    // let n = TransformHelper.toNumber(searchParams.get('n') as string | undefined, {
    //     max: 100,
    //     min: 5
    // });

    // let gender = searchParams.get('gender');
    let field = searchParams.get('field');

    let state = searchParams.get('state');


    console.log("GET device hits: ", field, state, limit, skip)

    const elastic = await getElasticClient();

    var query = {




    } as any


    // console.log("query.bool.must: ", query)
    // inspect(query.bool)



    var aggs = {
        result: {
            terms: {
                field: `${ElasticConstants.indexes.eventLogs.deviceId}.keyword`//,
            },
            aggs: {
                record: {
                    top_hits: {
                        size: 1,
                        sort: [
                            {
                                timestamp: {
                                    order: "desc"
                                }
                            }
                        ]
                    }
                },
                paginate: {
                    bucket_sort: {
                        sort: [{
                            _key: "asc"
                        }],
                        size: limit,    // Number of buckets (pages) per page
                        from: skip      // Starting bucket (page)
                    }
                }
            } as { [key: string]: any }

        }
    };

    if (state == ElasticConstants.checks.device.stateInActive) {
        aggs.result.aggs["max_timestamp"] = {
            max: {
                field: ElasticConstants.indexes.eventLogs.timestamp
            }
        };
        var gte = subHours(new Date(Date.now()), ElasticConstants.checks.device.timeOffsetActive)

        aggs.result.aggs["bucket_selector"] = {
            bucket_selector: {
                buckets_path: {
                    maxTimestamp: "max_timestamp"
                },

                // script: {
                //     source: "Instant.parse(doc['timestamp'].value).isBefore(Instant.parse(params.maxTimestamp))",
                //     params: {
                //         maxTimestamp: `${gte.toISOString()}`
                //     }
                // }


                script: `params.maxTimestamp <= ${gte.valueOf()}L`

                // script: `params.maxTimestamp <= ${Date.now().valueOf()}L - ${ElasticConstants.checks.device.timeOffsetActive} * 3600 * 1000L`
            }

        }
        query = undefined;

        console.log(" aggs.result.aggs[bucket_selector", aggs.result.aggs["bucket_selector"])
    } else if (state == ElasticConstants.checks.device.stateActive) {
        aggs.result.aggs["max_timestamp"] = {
            max: {
                field: ElasticConstants.indexes.eventLogs.timestamp
            }
        };

        // aggs.result.aggs["bucket_selector"] = {
        //     bucket_selector: {
        //         buckets_path: {
        //             maxTimestamp: "max_timestamp"
        //         },
        //         script: `params.maxTimestamp <= ${Date.now().valueOf()}L - ${ElasticConstants.checks.device.timeOffsetActive} * 3600 * 1000L`
        //     }

        // }
        var gte = subHours(new Date(Date.now()), ElasticConstants.checks.device.timeOffsetActive)

        query["range"] = {
            timestamp: {
                gte: `${gte.toISOString()}`,
                // lte: `${new Date(Date.now()).toISOString()}`
                // gte: `now-${ElasticConstants.checks.device.timeOffsetActive}h/h`,
                // lte: `now/h`
            }
        }

        console.log(" aggs.result.aggs[bucket_selector", aggs.result.aggs["bucket_selector"])
    } else if (state == ElasticConstants.checks.device.stateConnected) {
        aggs.result.aggs["max_timestamp"] = {
            max: {
                field: ElasticConstants.indexes.eventLogs.timestamp
            }
        };

        var gte = subHours(new Date(Date.now()), ElasticConstants.checks.device.timeOffsetConnected)

        query["range"] = {
            timestamp: {
                gte: `${gte.toISOString()}`,
                // gte: `now-${ElasticConstants.checks.device.timeOffsetConnected}h/h`,
                // lte: `${new Date(Date.now()).toISOString()}`
                // lte: `now/h`
            }
        }
        // aggs.result.aggs["bucket_selector"] = {
        //     bucket_selector: {
        //         buckets_path: {
        //             maxTimestamp: "max_timestamp"
        //         },
        //         script: `params.maxTimestamp <= ${Date.now().valueOf()}L - ${ElasticConstants.checks.device.timeOffsetActive} * 3600 * 1000L`
        //     }

        // }

        console.log(" aggs.result.aggs[bucket_selector", aggs.result.aggs["bucket_selector"])
    } else {

        query = undefined;
    }



    var response: ModelElasticAggsResult = {
        items: [],
        // total: 0,
        skip: skip,
        limit: limit,
        field: field ?? undefined
    }
    // console.log("quey pin: ", query.bool.must)

    console.log("device hit quey: ", state, query)
    console.log("aggs: ", aggs)

    const result = await elastic.search({
        index: ElasticConstants.indexes.eventLogs._,
        body: {
            size: 0,
            query: query,
            aggs: aggs as any
        }
    });
    const terms = (result.aggregations as Result)?.result;//??[];//.map((item) => item._source);
    response.items = terms?.buckets?.map(item => item.record.hits.hits[0]) ?? []


    return NextResponse.json(response);


}

interface Result {

    result?: ModelElasticAggsTermsResult

}
