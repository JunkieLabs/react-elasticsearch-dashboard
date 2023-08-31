
import { ApiConstants } from '@/data/api/api.constants';
import { getElasticClient } from '@/data/elastic/elastic';
import { ElasticConstants } from '@/data/elastic/elastic.constants';
import { fetcher } from '@/tools/apiHelper';
import { NextRequest, NextResponse } from 'next/server'

import { TransformHelper } from '@/tools/parserTools';
import { ModelElasticAggsResult, ModelElasticAggsStatsResult, ModelElasticAggsTermsResult } from '@/types/elastic/aggs';
import { ModelElasticPincode, ModelElasticPincodesResult } from '@/types/elastic/pincodes/pincodes';
import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';

export async function GET(req: Request) {

    // console.log("GET req.query: ", req.url)
    let { searchParams } = new URL(req.url);
    // console.log("GET req.query: ", searchParams)

    // let { field, datatype, skip, limit } = ((searchParams as any) ?? {});

    let skip = TransformHelper.toNumber(searchParams.get('skip') as string | undefined);
    let limit = TransformHelper.toNumber(searchParams.get('limit') as string | undefined, {
        max: 50,
        min: 10
    });
    // let pincodes = searchParams.getAll('pincode');

    let search = searchParams.get('search');


    const elastic = await getElasticClient();
    var response: ModelElasticAggsResult = {
        items: [],
        total: 0,
        field: ElasticConstants.indexes.eventLogs.pincode,
        // total: 
    }

    // if (!search || sea.length < 0) {


    //     return NextResponse.json({ message: 'no pincodes' }, {
    //         status: ApiConstants.httpError.badRequest
    //     });
    // }

    var query: QueryDslQueryContainer | undefined ;

    query = {


    };

    if (search) {
        query.wildcard = {
            [`${ElasticConstants.indexes.eventLogs.pincode}.keyword`]: `*${search}*`
        }
    }else {
       query = undefined
    }

    // console.log("query: ", query, skip, limit)
    


    const result = await elastic.search({
        index: ElasticConstants.indexes.eventLogs._,
        body: {
            size: 0,
            query: query,
            aggs: {
                result: {
                    terms: {
                        field: `${ElasticConstants.indexes.eventLogs.pincode}.keyword`,
                        size: limit+skip,
                        order: [
                            { "_key": "asc" }
                        ]
                    },
                    aggs: {
                        paginated: {
                            bucket_sort: {
                                from: skip,  // Starting point for pagination (11th result)
                                size: limit, // Number of buckets (pincodes) per page
                                sort: [
                                    { "_key": "asc" }
                                ]
                            }
                        }
                    }

                },
                
                total: {
                    cardinality: {
                      field: `${ElasticConstants.indexes.eventLogs.pincode}.keyword`
                    }
                  }
            }
        }
    });
    const totalItems = (result.aggregations as Result)?.total?.value??0;
    
    const items = (result.aggregations as Result)?.result;
    response.items = items?.buckets??[]

    // response.items = (result.hits.hits).map(ele => ele._source) as Result[];//?.result 
    response.total = totalItems;//?.result 
    //as ModelElasticAggsTermsResult
    // console.log("string result: ", terms)

    // response.data = terms.buckets

    // console.log("string result: ", limit, items)




    return NextResponse.json(response);


};

interface Result {
    result?: ModelElasticAggsTermsResult
    total?: {
        value: number
    }

    // result?: ModelElasticAggsStatsResult | ModelElasticAggsTermsResult

}

