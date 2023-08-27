
import { getElasticClient } from '@/data/elastic/elastic';
import { ElasticConstants } from '@/data/elastic/elastic.constants';
import { NextRequest, NextResponse } from 'next/server'
import { TransformHelper } from '@/tools/parserTools';
import { ModelElasticAggsStatsResult, ModelElasticAggsTermsResult } from '@/types/elastic/aggs';
import { ModelElasticCity, ModelElasticCitiesResult } from '@/types/elastic/cities/cities';

export async function GET(req: Request) {

    // console.log("GET req.query: ", req.url)
    let { searchParams } = new URL(req.url);
    // console.log("GET req.query: ", searchParams)

    // let { field, datatype, skip, limit } = ((searchParams as any) ?? {});

    let skip = TransformHelper.toNumber(searchParams.get('skip') as string | undefined);
    // let limit = TransformHelper.toNumber(searchParams.get('limit') as string | undefined, {
    //     max: 100,
    //     min: 10
    // });
    // let pincodes = searchParams.getAll('cities');



    const elastic = await getElasticClient();
    var response: ModelElasticCitiesResult = {
        items: [],
        size: 0,
    }

    // if (!pincodes || pincodes.length < 0) {


    //     return NextResponse.json({ message: 'no pincodes' }, {
    //         status: ApiConstants.httpError.badRequest
    //     });
    // }


    const result = await elastic.search({
        index: ElasticConstants.indexes.cities._,
        body: {
            size: 1000,
            query: {
                match_all:{

                }
                // terms: {
                //     [`${ElasticConstants.indexes.pincodes.pincode}.keyword`]: pincodes
                // }

            }
        }
    });
    response.items = (result.hits.hits).map(ele=> ele._source) as ModelElasticCity[];//?.result 
    response.size = ((result.hits.total  as any)?.[`value`] as number | undefined) ?? 0;//?.result 
   

    // console.log("city route result: ", limit, result)




    return NextResponse.json(response);


};


