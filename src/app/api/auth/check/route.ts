import { getElasticClient } from "@/data/elastic/elastic";
import {  NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET(
    req: Request, 
  ) {
    // const { q: query } = req.body;



    // console.log("q: ", query) 
   
    // // validate the "q" query parameter exists and is a string
    // if (!query || typeof query !== 'string') {
    //   return res.status(400).end();
    // }

    
   
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    console.log("result: " , token)
   
    // return NextResponse.json(tasks);

    // if(token )

    return new Response('Hello, Next.js!', {
        status: 200,
        headers: { 'Set-Cookie': `token=${token?.value}` },
      })
  }