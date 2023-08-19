import { getElasticClient } from "@/data/elastic/elastic";
import { ElasticConstants } from "@/data/elastic/elastic.constants";
import { TransformHelper } from "@/tools/parserTools";
import { ModelElasticAggsResult, ModelElasticAggsTermsResult } from "@/types/elastic/aggs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    let { searchParams } = new URL(req.url);
    let locationsStr = searchParams.getAll('location');
    let ageRangeStr = searchParams.get('age-range');
    
    let n = TransformHelper.toNumber(searchParams.get('n') as string | undefined, {
        max: 100,
        min: 5
    });
    // let gender = searchParams.get('gender');
    let field = searchParams.get('field');

    let locations = locationsStr.map(loc => JSON.parse(loc))
    let ageRange = ageRangeStr ? JSON.parse(ageRangeStr) : [];

    console.log("GET aggs: ", ageRange, locations)

    const elastic = await getElasticClient();

    var query = {
        bool: {
            must: [

            ] as any[]
        }



    }

    if (locations) {

        query.bool.must.push(
            {
                bool: {
                    should: [
                        {
                            "geo_distance": {
                              "distance": "4km",
                              "location": {
                                "lat": 28.6139,
                                "lon": 77.209
                              }
                            }
                          },
                          {
                            "geo_bounding_box": {
                              "location": {
                                "top_left": { "lat": 13.0830, "lon": 80.2702 },
                                "bottom_right": { "lat": 13.0820, "lon": 80.2709 }
                              }
                            }
                          }   


                    ]
                }
            }
        )


    }

    const aggs = {
        result: {
            terms: {
                size:n??5,
                field: `${field as string}.keyword`
            }
        }
    }

    var response: ModelElasticAggsResult = {
        items: [],
        field: field??undefined
    }

    const result = await elastic.search({
        index: ElasticConstants.indexes.testTime._,
        body: {
            size: 0,
            query: query,
            aggs: aggs
        }
    });
    const terms = (result.aggregations as Result)?.result;//??[];//.map((item) => item._source);
    response.items = terms?.buckets??[]

    return NextResponse.json(response);


}

interface Result {

    result?: ModelElasticAggsTermsResult

}
