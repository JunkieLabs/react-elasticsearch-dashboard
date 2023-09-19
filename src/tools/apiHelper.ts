
export const fetcher = (url: string, init?: RequestInit | undefined) => fetch(url, init).then((res) => {

    if (res.status >= 400) {
        return Promise.reject({
            status: res.status,
            error: res.json()
        });
    } else {

        return res.json();
    }



})

export const fetcherToken = (url: string, init?: RequestInit | undefined) => fetch(url, init).then((res) => {

    if (res.status >= 400) {
        var error = res.json();
        return Promise.reject({
            status: res.status,
            error: error
        });
    } else {

        var respose =  res.json();

        console.log("-s-s-s-s-ss-s-s", res.headers.getSetCookie())
        return res.json();
    }



})