import { getElasticClient } from "@/data/elastic/elastic";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { ZodError, z } from "zod";
import { first } from "lodash";
import { sign } from 'jsonwebtoken';
// import { zfd } from "zod-form-data";

import { ServerApiConstants } from "../../api.contants";
import { ApiConstants } from "@/data/api/api.constants";
import { ModelAuthLogin } from "@/types/auth/auth";

export async function POST(
    req: Request,
) {
    
    
    try {

        // if ()
        // const cookieStore = cookies()
        // const token = cookieStore.get('token')


        // console.log("result: ", token)
        // setCookie(res, 'token', null, {
        //     expires: new Date(Date.now() - 1),
        //   });
        
        //   // Redirect the user to the login page
        //   res.redirect('/login');
        // return NextResponse.json(tasks);
        return NextResponse.json({
            isLoggedOut: true, 
        }, {
            // status: 200,
            headers: {
                'Set-Cookie': `token=${null}; expires=${new Date(Date.now()-1)}`,
                
            },

        })

        // return new Response({ss:'Hello, Next.js!'}, {

        // })

    } catch (err) {

        console.log("NextResponse.json : ", err)

        return NextResponse.json({ message: err ?? 'failed to load data' }, {
            status: ApiConstants.httpError.internalServer
        });
        // res.status(500).json({ error: 'failed to load data' })
    }
}