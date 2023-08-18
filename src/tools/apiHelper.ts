
export const fetcher = (url: string, init?: RequestInit| undefined) => fetch(url, init).then((res) => res.json());