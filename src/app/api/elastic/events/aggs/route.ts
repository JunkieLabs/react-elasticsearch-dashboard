import { getElasticClient } from "@/data/elastic/elastic";
import { ElasticConstants } from "@/data/elastic/elastic.constants";
import { TransformHelper } from "@/tools/parserTools";
import { ModelElasticAggsResult, ModelElasticAggsTermsResult } from "@/types/elastic/aggs";
import { ModelElasticGeoPoint } from "@/types/elastic/common";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    let { searchParams } = new URL(req.url);
    let locationsStr = searchParams.getAll('location');
    let pincodes = searchParams.getAll('pincode');
    let ageRangeStr = searchParams.get('age-range');
    let dateRangeStr = searchParams.get('date-range');
    let gender = searchParams.get('gender');
    let orderStr = searchParams.get('order') ?? "desc";

    let n = TransformHelper.toNumber(searchParams.get('n') as string | undefined, {
        max: 100,
        min: 5
    });
    // let gender = searchParams.get('gender');
    let field = searchParams.get('field');
    let subAggs = searchParams.get('sub-aggs');

    let locations: ModelElasticGeoPoint[] = locationsStr.map(loc => JSON.parse(loc))
    let ageRange = ageRangeStr ? JSON.parse(ageRangeStr) : [];
    let dateRange = dateRangeStr ? JSON.parse(dateRangeStr) : [];

    console.log("GET aggs: ", field, ageRange, dateRange, locations, pincodes)

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
                        // {
                        //     "geo_distance": {
                        //         "distance": "20km",
                        //         "location": {
                        //             "lat": 28.6139,
                        //             "lon": 77.209
                        //         }
                        //     }
                        // },

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

    const aggs = {
        result: {
            terms: {
                size: n ?? 5,
                field: `${field as string}.keyword`,
                order: {
                    "_count": orderStr // Sort in ascending order based on document count
                } as any
            }
        } as any
    }


    if (subAggs && subAggs == ElasticConstants.checks.aggs.subAggsType.byDay) {
        aggs.result[`aggs`] = {
            sub: {
                date_histogram: {
                    field: `${ElasticConstants.indexes.eventLogs.timestamp}`,
                    "calendar_interval": "1d" // You can adjust the interval as needed
                }
            }
        }
    }

    var response: ModelElasticAggsResult = {
        items: [],
        field: field ?? undefined
    }
    // console.log("quey pin: ", query.bool.must)

    console.log("quey: ", query.bool.must)

    const result = await elastic.search({
        index: ElasticConstants.indexes.eventLogs._,
        body: {
            size: 0,
            query: query,
            aggs: aggs
        }
    });
    const terms = (result.aggregations as Result)?.result;//??[];//.map((item) => item._source);
    response.items = terms?.buckets ?? []

    return NextResponse.json(response);


}

interface Result {

    result?: ModelElasticAggsTermsResult

}
