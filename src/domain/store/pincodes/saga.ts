import { all, fork, put, select, takeLatest } from "redux-saga/effects";
// import { watchSubFilterChange, watchCommonFilterChangeForDummyData } from "../channelPerformance/saga";
import { StoreActionPincodes } from "./reducer";
import { ElasticCityRepo } from "@/data/elastic/cities/cities";
import { ElasticPincodeRepo } from "@/data/elastic/pincodes/pincodes";
import { ModelElasticAggsResultItem } from "@/types/elastic/aggs";
import { RootState } from "../store";

export function* handlePincodesBySearch() {

    // console.log("handlePincodesBySearch ")

    try {
        const searchKey: string = yield select((state: RootState) => state.Pincodes.search);
        const result: ModelElasticAggsResultItem[] = yield ElasticPincodeRepo.getAll(searchKey)
        // console.log("handlePincodesBySearch result: ", result)
        if (result.length > 0) {
            yield put(StoreActionPincodes.pincodeSet(result.map(val => val.key as string)));

        }


    } catch (error) {

        console.log("handlePincodesBySearch error: ", error)
    }


    // console.log("handlePincodesBySearch result: ", result)
    // yield put(commonFilterSetAgeRange([30, 70]));
}

// export function* onlyOnceCommonFilterAgeRange() {
//     yield fork(handlePincodesBySearch);
// }
export function* watchPincodesBySearch() {
    yield takeLatest(StoreActionPincodes.search.type, handlePincodesBySearch);
}

export function* watchPincodes() {
    yield all([fork(watchPincodesBySearch)]);
}