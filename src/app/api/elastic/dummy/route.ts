import { getElasticClient } from "@/data/elastic/elastic";
import { ElasticConstants } from "@/data/elastic/elastic.constants";
import {  NextResponse } from "next/server";

export async function GET(
    req: Request, 
  ) {
    // const { q: query } = req.query;

    // console.log("q: ", query) 
   
    // // validate the "q" query parameter exists and is a string
    // if (!query || typeof query !== 'string') {
    //   return res.status(400).end();
    // }
   
    const elastic = await getElasticClient();
   
    const result = await elastic.search({
        index: ElasticConstants.indexes.testTime._,
        body: {
          size: 0,
          aggs: {
            result: {
              histogram: {
                field: 'user_age',
                interval: 10
              },
              aggs: {
                top_ages: {
                  bucket_sort: {
                    sort: [
                      {
                        _count: 'desc'
                      }
                    ],
                    size: 5
                  }
                }
              }
            }
          }
        }
      });
   
    // we send back the list of documents found
    const tasks = (result.aggregations as DummyResult)?.result;//??[];//.map((item) => item._source);

    // console.log("result 2: " , result)
    console.log("result 3: " , tasks)
   
    return NextResponse.json(tasks);
  }

  interface DummyResult {

    result?: DummyResultBucket

  }

  
  export interface DummyResultBucket {

    buckets?: DummyResultBucketItem[] 

  }

  export interface DummyResultBucketItem {

    key: string | number
    doc_count: number 

  }