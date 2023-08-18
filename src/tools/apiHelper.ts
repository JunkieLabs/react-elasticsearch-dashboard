
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