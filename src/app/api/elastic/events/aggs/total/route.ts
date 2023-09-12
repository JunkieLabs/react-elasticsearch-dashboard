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

export async function GET(req: Request) {
    let { searchParams } = new URL(req.url);
    let deviceIds = searchParams.getAll('device-id');
    
    // let n = TransformHelper.toNumber(searchParams.get('n') as string | undefined, {
    //     max: 100,
    //     min: 5
    // });

    // let gender = searchParams.get('gender');
    let field = searchParams.get('field');

    // let locations: ModelElasticGeoPoint[] = locationsStr.map(loc => JSON.parse(loc))
   
    const elastic = await getElasticClient();

    var query = {
        bool: {
            must: [

            ] as any[]
        }



    }

    if (deviceIds && deviceIds.length > 0) {

        var subQuery = {
            bool: {
                should: [

                ] as any[]
            }
        };


            subQuery.bool.should.push(...deviceIds.map(deviceId => { return { term: { [`${ElasticConstants.indexes.eventLogs.deviceId}.keyword`]: deviceId } } }))


        query.bool.must.push(subQuery);
    }

    // console.log("query.bool.must: ", query)
    // inspect(query.bool)



    const aggs = {
        total: {
            value_count: {
                field:  `${ElasticConstants.indexes.eventLogs.deviceId}.keyword`
            }
        }
    }

    var response: ModelElasticAggsResult = {
        total:0,
        items:[]
    }
    // console.log("quey pin: ", query.bool.must)

    // console.log("quey: ", query.bool.must, query.bool.must[0])

    const result = await elastic.search({
        index: ElasticConstants.indexes.eventLogs._,
        body: {
            size: 0,
            query: query,
            aggs: aggs
        }
    });
    const aggsResult = (result.aggregations as Result);//??[];//.map((item) => item._source);
    response.total = aggsResult?.total?.value??0

    // console.log("terms", terms)

    return NextResponse.json(response);


}

interface Result {

    result?: ModelElasticAggsTermsResult
    total? : {
        value: number
    } 

}
