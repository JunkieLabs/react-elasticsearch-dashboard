import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// const allowedOrigins = ['https://acme.com', 'https://my-app.org']

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    // Check the origin from the request
    const origin = request.headers.get('origin') ?? ''
    const host = request.headers.get('host') ?? ''

    const token = request.headers.get('g-token') ?? '';

    console.log("middleware: ", origin, " host: ", token)

    // if (token) {
    //     var responseData = await fetch('https://www.google.com/recaptcha/api/siteverify?' + new URLSearchParams({
    //         secret: process.env.NEXT_GOOGLE_V3_SECRET ?? "",
    //         response: token,
    //     }), {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },

    //     })
    //     var captchaResponse = await responseData.json()

    //     if (!captchaResponse['success']) {
    //         return NextResponse.json({ message: 'Auth invalid' }, { status: 401 });

    //     }
    // }else {
    //     return NextResponse.json({ message: 'Auth required' }, { status: 401 });

    // }



    const response = NextResponse.next()

    // if (isAllowedOrigin) {
    //   response.headers.set('Access-Control-Allow-Origin', origin)
    // }

    // Object.entries(corsOptions).forEach(([key, value]) => {
    //   response.headers.set(key, value)
    // })

    return response
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/:path*',
}