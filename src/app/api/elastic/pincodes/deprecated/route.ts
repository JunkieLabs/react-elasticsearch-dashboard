
import { ApiConstants } from '@/data/api/api.constants';
import { getElasticClient } from '@/data/elastic/elastic';
import { ElasticConstants } from '@/data/elastic/elastic.constants';
import { fetcher } from '@/tools/apiHelper';
import { NextRequest, NextResponse } from 'next/server'

import { NextApiRequest, NextApiResponse } from 'next';
import { TransformHelper } from '@/tools/parserTools';
import { ModelElasticAggsStatsResult, ModelElasticAggsTermsResult } from '@/types/elastic/aggs';
import { ModelElasticPincode, ModelElasticPincodesResult } from '@/types/elastic/pincodes/pincodes';

export async function GET(req: Request) {

    // console.log("GET req.query: ", req.url)
    let { searchParams } = new URL(req.url);
    // console.log("GET req.query: ", searchParams)

    // let { field, datatype, skip, limit } = ((searchParams as any) ?? {});

    let skip = TransformHelper.toNumber(searchParams.get('skip') as string | undefined);
    let limit = TransformHelper.toNumber(searchParams.get('limit') as string | undefined, {
        max: 100,
        min: 10
    });
    let pincodes = searchParams.getAll('pincode');



    const elastic = await getElasticClient();
    var response: ModelElasticPincodesResult = {
        items: [],
        size: 0
    }

    if (!pincodes || pincodes.length < 0) {


        return NextResponse.json({ message: 'no pincodes' }, {
            status: ApiConstants.httpError.badRequest
        });
    }

    /*

    TODO not in use
    const result = await elastic.search({
        index: ElasticConstants.indexes.pincodes._,
        body: {
            size: limit,
            query: {
                terms: {
                    [`${ElasticConstants.indexes.pincodes.pincode}.keyword`]: pincodes
                }

            }
        }
    });
    response.items = (result.hits.hits).map(ele=> ele._source) as ModelElasticPincode[];//?.result 
    response.size = ((result.hits.total  as any)?.[`value`] as number | undefined) ?? 0;//?.result 
    */
    //as ModelElasticAggsTermsResult
    // console.log("string result: ", terms)

    // response.data = terms.buckets

    // console.log("string result: ", limit, result)




    return NextResponse.json(response);


};

interface Result {

    result?: ModelElasticAggsStatsResult | ModelElasticAggsTermsResult

}

