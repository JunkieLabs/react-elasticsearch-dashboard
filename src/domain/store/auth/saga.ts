import { all, fork, put, select, takeLatest } from "redux-saga/effects";
// import { watchSubFilterChange, watchCommonFilterChangeForDummyData } from "../channelPerformance/saga";
import { StoreActionAuth } from "./reducer";
import { PayloadAction } from "@reduxjs/toolkit";
import { ModelAuthLogin, ModelAuthLoginResponse, ModelAuthTokenParsed } from "@/types/auth/auth";
import { StoreConstants } from "../store.constants";
import { ApiAuthRepo } from "@/data/api/auth.api";
import { ErrorHelper } from "@/tools/errorHelper";



export function* handleLogin(action: PayloadAction<ModelAuthLogin>) {
    try {
        console.log("handleLogin:")

        // useCookies

        yield put(StoreActionAuth.setRunningStage(StoreConstants.runningStage.running));


        const { email, password } = action.payload;



        // const bouquet: string = yield select((state: RootState) => state.Bouquets.activeBouquet);
        const result: ModelAuthLoginResponse = yield ApiAuthRepo.login(action.payload)

        console.log("handleLogin result: ", result)

        if (result.isLoggedIn) {

            yield put(StoreActionAuth.setEmail(email));
            // yield put(StoreActionAuth.setToken(result.token));

            if (result.token) {
                yield put(StoreActionAuth.setToken(result.token));
                localStorage.setItem("email", email)
                localStorage.setItem("token", result.token)

            }

            yield put(StoreActionAuth.setRunningStage(StoreConstants.runningStage.completed));

        } else {
            yield put(StoreActionAuth.setRunningStage(StoreConstants.runningStage.notRunning));

        }
        // if (result.length > 0) {
        //     yield put(StoreActionBouquets.setBouquetChannels({ bouquet: bouquet, channels: result.map(item => (item.key as string)) }));
        // }


    } catch (error) {

        console.log("handleLogin error: ", error)

        var message = ErrorHelper.getErrorMessage(error)
        console.log("handleLogin error message: ", message)



        yield put(StoreActionAuth.setError(message ?? "something went worng!!"));

        yield put(StoreActionAuth.setRunningStage(StoreConstants.runningStage.completed));


        // err
    }
}

export function* handleAuthInit() {
   var email =  localStorage.getItem("email")
   var token =  localStorage.getItem("token")

   if(email){
   yield put(StoreActionAuth.setEmail(email));
 
   }
   if (token){
    yield put(StoreActionAuth.setToken(token));
 
   }

   yield put(StoreActionAuth.setAuthStage(StoreConstants.auth.stage.loaded));
           
    // localStorage.setItem("token", result.token)
}

// export function* onlyOnceCommonFilterAgeRange() {
//     yield fork(handleBouquetsList);
// }
// export function* watchBouquetsInit() {
//     yield takeLatest(StoreActionBouquets.init.type, handleBouquetsList);
// }

export function* watchLogin() {
    yield takeLatest(StoreActionAuth.login.type, handleLogin);
}

export function* watchAuthInit() {
    yield takeLatest(StoreActionAuth.init.type, handleAuthInit);
}
export function* watchAuth() {
    yield all([fork(watchAuthInit), fork(watchLogin)]);
}