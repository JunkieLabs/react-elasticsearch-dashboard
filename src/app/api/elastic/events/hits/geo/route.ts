// import { getElasticClient } from "@/data/elastic/elastic";
// import { ElasticConstants } from "@/data/elastic/elastic.constants";
// import { TransformHelper } from "@/tools/parserTools";
// import { ModelElasticAggsResult, ModelElasticAggsTermsResult } from "@/types/elastic/aggs";
// import { ModelElasticGeoPoint } from "@/types/elastic/common";
import { getElasticClient } from "@/data/elastic/elastic";
import { ElasticConstants } from "@/data/elastic/elastic.constants";
import { TransformHelper } from "@/tools/parserTools";
import { ModelElasticAggsResult, ModelElasticAggsTermsResult, ModelElasticHitsPartialResult, ModelElasticHitsResult } from "@/types/elastic/aggs";
import { ModelElasticGeoPoint } from "@/types/elastic/common";
import { ModelElasticEventHit, ModelElasticEventHitPart } from "@/types/elastic/events/events";
import { NextResponse } from "next/server";
import { skip } from "node:test";
import { inspect } from "util";

export async function GET(req: Request) {
    let { searchParams } = new URL(req.url);
    // let deviceIds = searchParams.getAll('device-id');


    let locationsStr = searchParams.getAll('location');
    let pincodes = searchParams.getAll('pincode');
    let channelNames = searchParams.getAll('channel-name');
    let ageRangeStr = searchParams.get('age-range');
    let dateRangeStr = searchParams.get('date-range');
    let gender = searchParams.get('gender');
    // let orderStr = searchParams.get('order') ?? "desc";

    // let limit = TransformHelper.toNumber(searchParams.get('limit') as string | undefined, {

    //     min: 5
    // });
    // let gender = searchParams.get('gender');
    let field = searchParams.get('field');
    // let subAggs = searchParams.get('sub-aggs');

    let locations: ModelElasticGeoPoint[] = locationsStr.map(loc => JSON.parse(loc))
    let ageRange = ageRangeStr ? JSON.parse(ageRangeStr) : [];
    let dateRange = dateRangeStr ? JSON.parse(dateRangeStr) : [];


    let limit = TransformHelper.toNumber(searchParams.get('limit') as string | undefined, {
        // max: 100,
        min: 0
    });
    // console.log("GET geo hits: ", limit,  field, ageRange, dateRange, channelNames, locations, pincodes)

    // let gender = searchParams.get('gender');

    // let locations: ModelElasticGeoPoint[] = locationsStr.map(loc => JSON.parse(loc))

    const elastic = await getElasticClient();

    var query = {
        bool: {
            must: [

            ] as any[]
        }



    }


    if (pincodes && pincodes.length > 0) {
        query.bool.must.push({
            "terms": {
                [`${ElasticConstants.indexes.eventLogs.pincode}.keyword`]: pincodes
            }
        });
    }

    if (ageRange && ageRange.length > 0) {
        query.bool.must.push({
            "range": {
                [`${ElasticConstants.indexes.eventLogs.age}`]: {
                    gte: ageRange[0],
                    lte: ageRange[1]
                }
            }
        });
    }

    if (dateRange && dateRange.length > 0) {
        query.bool.must.push({
            "range": {
                [`${ElasticConstants.indexes.eventLogs.timestamp}`]: {
                    gte: dateRange[0],
                    lte: dateRange[1]
                }
            }
        });
    }

    if (gender) {
        query.bool.must.push({
            "term": {
                [`${ElasticConstants.indexes.eventLogs.gender}.keyword`]: gender
            }
        });
    }



    if (locations && locations.length > 0) {

        query.bool.must.push(
            {
                bool: {
                    should: [

                        ...locations.map(location => {
                            return {
                                "geo_distance": {
                                    "distance": "20km",
                                    "location": {
                                        "lat": location.lat,
                                        "lon": location.lon
                                    }
                                }
                            }
                        })


                    ]
                }
            }
        )


    }


    if (channelNames && channelNames.length > 0) {
        query.bool.must.push({
            "terms": {
                [`${ElasticConstants.indexes.eventLogs.channelName}.keyword`]: channelNames
            }
        });
    }


    console.log("query.bool.must: ", query)
    // inspect(query.bool)



    // const aggs = {
    //     total: {
    //         value_count: {
    //             field:  `${ElasticConstants.indexes.eventLogs.deviceId}.keyword`
    //         }
    //     }
    // }

    var response: ModelElasticHitsPartialResult = {
        total: 0,
        items: [] as ModelElasticEventHitPart[],
        // skip: skip,
        // limit: limit,
    }
    // console.log("quey pin: ", query.bool.must)

    // console.log("quey: ", query.bool.must, query.bool.must[0])

    const result = await elastic.search({
        index: ElasticConstants.indexes.eventLogs._,
        body: {
            size: limit,
            _source: [ElasticConstants.indexes.eventLogs.location, ElasticConstants.indexes.eventLogs.channelName, ElasticConstants.indexes.eventLogs.timestamp],
            // size: limit,
            // from: skip,

            query: query,
            // aggs: aggs
        }
    });

    // console.log("results: ", result.hits)
    const terms = (result.hits.hits ?? []) as unknown as ModelElasticEventHitPart[];//??[];//.map((item) => item._source);
    response.items = terms ?? []
    response.total = ((result.hits.total as any)?.[`value`] as number | undefined) ?? 0;


    return NextResponse.json(response);


}



// interface Result {

//     result?: ModelElasticAggsTermsResult

// }
