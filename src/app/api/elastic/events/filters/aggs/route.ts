
import { ApiConstants } from '@/data/api/api.constants';
import { getElasticClient } from '@/data/elastic/elastic';
import { ElasticConstants } from '@/data/elastic/elastic.constants';
import { fetcher } from '@/tools/apiHelper';
import { NextRequest, NextResponse } from 'next/server'

import { NextApiRequest, NextApiResponse } from 'next';
import { TransformHelper } from '@/tools/parserTools';
import { ModelElasticAggsResult, ModelElasticAggsStatsResult, ModelElasticAggsTermsResult } from '@/types/elastic/aggs';

export async function GET(req: Request) {

    // console.log("GET req.query: ", req.url)
    let { searchParams } = new URL(req.url);
    // console.log("GET req.query: ", searchParams)

    // let { field, datatype, skip, limit } = ((searchParams as any) ?? {});

    let skip = TransformHelper.toNumber(searchParams.get('skip') as string | undefined);
    let limit = TransformHelper.toNumber(searchParams.get('limit') as string | undefined, {
        max: 100,
        min: 0
    });
    let datatype = searchParams.get('datatype');
    let field = searchParams.get('field');



    const elastic = await getElasticClient();

    if (datatype != ElasticConstants.datatype.string && datatype != ElasticConstants.datatype.number) {


        return NextResponse.json({ message: 'invalid datatype' }, {
            status: ApiConstants.httpError.badRequest
        });
    }


    if (!field) {
        return NextResponse.json({ message: 'invalid field' }, {
            status: ApiConstants.httpError.badRequest
        });
    }

    //{
    //     items: number[],
    //     field: string
    // }
    var response: ModelElasticAggsResult = {
        items: [],
        field: field
    }
    if (datatype == ElasticConstants.datatype.number) {

        const result = await elastic.search({
            index: ElasticConstants.indexes.eventLogs._,
            body: {
                size: 0,
                aggs: {
                    result: {
                        stats: {
                            field: field as string
                        }
                    }
                }
            }
        });
        var stats = (result.aggregations as Result)?.result as ModelElasticAggsStatsResult
        // console.log("number result: ", result)

        response.items = [stats?.min ?? 0, stats?.max ?? 0]



    } else if (datatype == ElasticConstants.datatype.string) {
        const result = await elastic.search({
            index: ElasticConstants.indexes.eventLogs._,
            body: {
                size: limit,
                aggs: {
                    result: {
                        terms: {
                            field: `${field as string}.keyword`
                        }
                    }
                }
            }
        });
        var terms = (result.aggregations as Result)?.result as ModelElasticAggsTermsResult
        // console.log("string result: ", terms)

        response.items = terms.buckets

        // console.log("string result: ", result)

      
    }

    return NextResponse.json(response);


};

interface Result {

    result?: ModelElasticAggsStatsResult | ModelElasticAggsTermsResult

}

