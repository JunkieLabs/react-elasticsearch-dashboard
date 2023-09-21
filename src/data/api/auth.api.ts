import { fetcher, fetcherToken } from "@/tools/apiHelper";
import { ModelAuthLogin, ModelAuthLoginResponse } from "@/types/auth/auth";
import { ModelElasticAggsResult, ModelElasticAggsResultItem, ModelElasticMultiAggsResult, ModelElasticMultiAggsResultItem } from "@/types/elastic/aggs";

const login = async (req:
    ModelAuthLogin): Promise<ModelAuthLoginResponse> => {
    // Simulate API delay



    // console.log("getPlots search Params: ",  searchParam, pincodes)

    // try {
        let response: ModelAuthLoginResponse = await fetcherToken('/api/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        if(response.isLoggedIn){
            // const cookie = document.cookie;
            // cookie.

        }
        return response;
    // } catch (error: any) {
    //     if (error && error['error'] && error!.error!.message) {
    //         throw new Error((error!.error as any).message)
    //     }else {
    //         throw new Error("something wen wrong")
    //     }
    // }




}



export const ApiAuthRepo = {

    login: login
}
