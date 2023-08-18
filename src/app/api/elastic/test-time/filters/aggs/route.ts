
import { ApiConstants } from '@/data/api/api.constants';
import { getElasticClient } from '@/data/elastic/elastic';
import { ElasticConstants } from '@/data/elastic/elastic.constants';
import { fetcher } from '@/tools/apiHelper';
import { NextRequest, NextResponse } from 'next/server'

import { NextApiRequest, NextApiResponse } from 'next';
import { TransformHelper } from '@/tools/parserTools';

export async function GET(req: Request) {

    console.log("GET req.query: ", req.url)
    let {searchParams } = new URL(req.url);
    console.log("GET req.query: ", searchParams)

    // let { field, datatype, skip, limit } = ((searchParams as any) ?? {});

    let skip = TransformHelper.toNumber(searchParams.get('skip') as string | undefined);
    let limit = TransformHelper.toNumber(searchParams.get('limit') as string | undefined, {
        max: 100,
        min: 0
    });
    let datatype = searchParams.get('datatype') ;
    let field = searchParams.get('field') ;
   
   

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

    var response = {
        data: [],
        field: field
    }
    if (datatype == ElasticConstants.datatype.number) {

        const result = await elastic.search({
            index: ElasticConstants.indexes.testTime._,
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
        // (result.aggregations as DummyResult)?.result
        console.log("datatype result: ", result)

        response.data = []



    } else if (datatype == ElasticConstants.datatype.string) {
        const result = await elastic.search({
            index: ElasticConstants.indexes.testTime._,
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


    }

    return NextResponse.json(response);







    // Get the data from the database
    //   const data = await fetcher(page, limit, sortBy);

    // Return the data as a JSON response
    // res.json("data");
};