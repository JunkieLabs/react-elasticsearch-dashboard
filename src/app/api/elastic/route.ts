import { getElasticClient } from "@/data/elastic/elastic";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(
    req: NextApiRequest, 
    res: NextApiResponse
  ) {
    // const { q: query } = req.query;

    // console.log("q: ", query) 
   
    // // validate the "q" query parameter exists and is a string
    // if (!query || typeof query !== 'string') {
    //   return res.status(400).end();
    // }
   
    const elastic = await getElasticClient();
   
    const result = await elastic.search({
      index: '_all',
      query: {
        match_all: {
        },
      },
    });
   
    // we send back the list of documents found
    const tasks = result.hits.hits.map((item) => item._source);

    console.log("result: " , result)
   
    return res.json(tasks);
  }