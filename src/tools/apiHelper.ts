import { ErrorHelper } from "./errorHelper";

export const fetcher = (url: string, init?: RequestInit | undefined) => fetch(url, init).then(async (res) => {

    if (res.status >= 400) {
        var error = await res.json();

        return Promise.reject({
            status: res.status,
            error:error,
            message: ErrorHelper.getErrorMessage(error)
        });
    } else {

        return res.json();
    }

})

export const fetcherToken = (url: string, init?: RequestInit | undefined) => fetch(url, init).then(async (res) => {

    if (res.status >= 400) {
        var error = await res.json();

        console.log("fetcherToken :: error: ", error)
        return Promise.reject({
            status: res.status,
            error: error,
            message: ErrorHelper.getErrorMessage(error)
        });
    } else {

        // var respose =  res.json();

        console.log("-s-s-s-s-ss-s-s", res)
        // document.cookie.
        // var respose = await res.json();

        return res.json();
    }



})