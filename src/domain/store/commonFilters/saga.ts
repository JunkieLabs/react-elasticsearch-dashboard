import { all, fork, put, takeLatest } from "redux-saga/effects";
// import { watchSubFilterChange, watchCommonFilterChangeForDummyData } from "../channelPerformance/saga";
import { commonFilterAgeInit, commonFilterSetAgeRange } from "./reducer";
import { elasticCommonFilterAgeStats } from "@/data/elastic/commonFilters/filterRange";

export function* handleCommonFilterAgeRange() {

    console.log("handleCommonFilterAgeRange ")
    var d: number = yield 2;
    console.log("handleCommonFilterAgeRange d: ", d)
    var e: number = yield 3;
    console.log("handleCommonFilterAgeRange e: ", e)

    try {
        const result: any[] = yield elasticCommonFilterAgeStats()
        console.log("handleCommonFilterAgeRange result: ", result)
        if (result.length > 0) {
            yield put(commonFilterSetAgeRange(result));

        }


    } catch (error) {

        console.log("handleCommonFilterAgeRange error: ", error)
    }


    // console.log("handleCommonFilterAgeRange result: ", result)
    // yield put(commonFilterSetAgeRange([30, 70]));
}

// export function* onlyOnceCommonFilterAgeRange() {
//     yield fork(handleCommonFilterAgeRange);
// }
export function* watchSubFilterChange() {
    yield takeLatest(commonFilterAgeInit.type, handleCommonFilterAgeRange);
}

export function* watchCommonFilters() {
    yield all([fork(watchSubFilterChange)]);
}