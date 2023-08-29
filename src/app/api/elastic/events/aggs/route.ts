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

    let n = TransformHelper.toNumber(searchParams.get('n') as string | undefined, {
        max: 100,
        min: 5
    });
    // let gender = searchParams.get('gender');
    let field = searchParams.get('field');

    let locations: ModelElasticGeoPoint[] = locationsStr.map(loc => JSON.parse(loc))
    let ageRange = ageRangeStr ? JSON.parse(ageRangeStr) : [];

    console.log("GET aggs: ", field, ageRange, locations, pincodes)

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
                field: `${field as string}.keyword`
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
