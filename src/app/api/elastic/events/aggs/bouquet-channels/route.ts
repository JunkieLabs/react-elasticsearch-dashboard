// import { getElasticClient } from "@/data/elastic/elastic";
// import { ElasticConstants } from "@/data/elastic/elastic.constants";
// import { TransformHelper } from "@/tools/parserTools";
// import { ModelElasticAggsResult, ModelElasticAggsTermsResult } from "@/types/elastic/aggs";
// import { ModelElasticGeoPoint } from "@/types/elastic/common";
import { getElasticClient } from "@/data/elastic/elastic";
import { ElasticConstants } from "@/data/elastic/elastic.constants";
import { TransformHelper } from "@/tools/parserTools";
import { ModelElasticAggsResult, ModelElasticAggsTermsResult, ModelElasticMultiAggsResult, ModelElasticMultiAggsResultItem } from "@/types/elastic/aggs";
import { ModelElasticGeoPoint } from "@/types/elastic/common";
import { NextResponse } from "next/server";
import { inspect } from "util";

export async function GET(req: Request) {
    let { searchParams } = new URL(req.url);
    let bouquets = searchParams.getAll('bouquet');
    let dateRangeStr = searchParams.get('date-range');
    let bouquetChannelsMapStr = searchParams.get('bouquet-channels-map');

    // let n = TransformHelper.toNumber(searchParams.get('n') as string | undefined, {
    //     max: 100,
    //     min: 5
    // });

    // let gender = searchParams.get('gender');
    let field = searchParams.get('field');

    // let locations: ModelElasticGeoPoint[] = locationsStr.map(loc => JSON.parse(loc))
    let bouquetChannelsMap: { [bouquet: string]: string[] } = bouquetChannelsMapStr ? JSON.parse(bouquetChannelsMapStr) : [];

    let dateRange = dateRangeStr ? JSON.parse(dateRangeStr) : [];
    // console.log("GET bouquet-channels aggs: ", field, bouquets, bouquetChannelsMap)
    // console.log("GET bouquet-channels aggs: ", field, bouquets, dateRangeStr, dateRange)

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

    // console.log("query.bool.must: ", query)
    // inspect(query.bool)



    const aggs: { [key: string]: any } = {
        total: {
            value_count: {
              field: "_index"
            }
        }
    }



    if (bouquets && bouquets.length > 0) {

        for (var bouquetName of bouquets) {
            aggs[`${bouquetName}`] = {
                filter: {
                    term: { [`${ElasticConstants.indexes.eventLogs.bouquet}.keyword`]: bouquetName }
                }
            }
        }
        // subQuery.bool.should.push(...bouquets.map(bouquet => { return {  } }))
    }

    if (bouquetChannelsMap && Object.keys(bouquetChannelsMap).length > 0) {
        var keys = Object.keys(bouquetChannelsMap)
        for (let bouquetKey of keys) {
            //const key = keys[i];

            for (let bouquetChannelKey of bouquetChannelsMap[bouquetKey]) {
                aggs[`${bouquetKey} : ${bouquetChannelKey}`] = {
                    filter: {
                        bool: {
                            must: [
                                { term: { [`${ElasticConstants.indexes.eventLogs.bouquet}.keyword`]: bouquetKey } },
                                { term: { [`${ElasticConstants.indexes.eventLogs.channelName}.keyword`]: bouquetChannelKey } }
                            ]
                        }
                    }
                }
            }



        }
    }

    






    var response: ModelElasticMultiAggsResult = {
        aggs: {},
        total: 0
        // field: field ?? undefined
    }
    // console.log("quey pin: ", query.bool.must)

    // console.log("b-c quey: ", query.bool.must, query.bool.must[0])

    const result = await elastic.search({
        index: ElasticConstants.indexes.eventLogs._,
        body: {
            size: 0,
            query: query,
            aggs: aggs
        }
    });
    const {total,  ...aggsResults} = (result.aggregations as any);//??[];//.map((item) => item._source);
   
    
    response.aggs = aggsResults
    response.total = total?.[`value`]??0

    return NextResponse.json(response);


}

interface Result {

    [key: string]: ModelElasticMultiAggsResultItem

}
