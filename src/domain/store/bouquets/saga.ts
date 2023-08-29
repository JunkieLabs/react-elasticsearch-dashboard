import { all, fork, put, takeLatest } from "redux-saga/effects";
// import { watchSubFilterChange, watchCommonFilterChangeForDummyData } from "../channelPerformance/saga";
import { StoreActionBouquets } from "./reducer";
import { ElasticBouquetRepo } from "@/data/elastic/bouquets/bouquets";

export function* handleBouquetsList() {

    console.log("handleBouquetsList ")
    var d: number = yield 2;
    console.log("handleBouquetsList d: ", d)
    var e: number = yield 3;
    console.log("handleBouquetsList e: ", e)

    try {
        const result: any[] = yield ElasticBouquetRepo.getAll()
        console.log("handleBouquetsList result: ", result)
        if (result.length > 0) {
            yield put(StoreActionBouquets.setAll(result));

        }


    } catch (error) {

        console.log("handleBouquetsList error: ", error)
    }


    // console.log("handleBouquetsList result: ", result)
    // yield put(commonFilterSetAgeRange([30, 70]));
}

// export function* onlyOnceCommonFilterAgeRange() {
//     yield fork(handleBouquetsList);
// }
export function* watchBouquetsInit() {
    yield takeLatest(StoreActionBouquets.init.type, handleBouquetsList);
}

export function* watchBouquets() {
    yield all([fork(watchBouquetsInit)]);
}