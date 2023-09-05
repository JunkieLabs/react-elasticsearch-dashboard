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
    let bouquets = searchParams.getAll('bouquet');
    let bouquetChannelsMapStr = searchParams.get('bouquet-channels-map');

    // let n = TransformHelper.toNumber(searchParams.get('n') as string | undefined, {
    //     max: 100,
    //     min: 5
    // });

    // let gender = searchParams.get('gender');
    let field = searchParams.get('field');

    // let locations: ModelElasticGeoPoint[] = locationsStr.map(loc => JSON.parse(loc))
    let bouquetChannelsMap: { [bouquet: string]: string[] } = bouquetChannelsMapStr ? JSON.parse(bouquetChannelsMapStr) : [];

    console.log("GET aggs: ", field, bouquets, bouquetChannelsMap)

    const elastic = await getElasticClient();

    var query = {
        bool: {
            must: [

            ] as any[]
        }



    }

    if ((bouquets && bouquets.length > 0) || (bouquetChannelsMap && Object.keys(bouquetChannelsMap).length > 0)) {

        var subQuery = {
            bool: {
                should: [

                ] as any[]
            }
        };


        if (bouquets && bouquets.length > 0) {
            subQuery.bool.should.push(...bouquets.map(bouquet => { return { term: { [`${ElasticConstants.indexes.eventLogs.bouquet}.keyword`]: bouquet } } }))
        }

        if (bouquetChannelsMap && Object.keys(bouquetChannelsMap).length > 0) {
            var keys = Object.keys(bouquetChannelsMap)

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                // var subQueryMust = {
                //     bool: {
                //         must: [

                //         ] as any[]
                //     }
                // };


                subQuery.bool.should.push(...(bouquetChannelsMap[key].map(channel => {
                    return {
                        bool: {
                            must: [
                                { term: { [`${ElasticConstants.indexes.eventLogs.bouquet}.keyword`]: key } },
                                { term: { [`${ElasticConstants.indexes.eventLogs.channelName}.keyword`]: channel } }
                            ]
                        }
                    };
                }))
                )

            }
        }

        query.bool.must.push(subQuery);
    }

    // console.log("query.bool.must: ", query)
    // inspect(query.bool)



    const aggs = {
        result: {
            date_histogram: {
                field: "timestamp",
                fixed_interval: `${ElasticConstants.configs.timeSeriesInterval}h`,  // Daily aggregation
                min_doc_count: 1,
                format: "yyyy-MM-dd HH:mm:ss"
            }
        }
    }

    var response: ModelElasticAggsResult = {
        items: [],
        field: field ?? undefined
    }
    // console.log("quey pin: ", query.bool.must)

    console.log("quey: ", query.bool.must, query.bool.must[0])

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
