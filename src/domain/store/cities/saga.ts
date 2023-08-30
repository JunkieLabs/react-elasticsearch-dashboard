import { all, fork, put, takeLatest } from "redux-saga/effects";
// import { watchSubFilterChange, watchCommonFilterChangeForDummyData } from "../channelPerformance/saga";
import { StoreActionCities } from "./reducer";
import { ElasticCityRepo } from "@/data/elastic/cities/cities";

export function* handleCitiesList() {

    // console.log("handleCitiesList ")
    // var d: number = yield 2;
    // console.log("handleCitiesList d: ", d)
    // var e: number = yield 3;
    // console.log("handleCitiesList e: ", e)

    try {
        const result: any[] = yield ElasticCityRepo.getAll()
        // console.log("handleCitiesList result: ", result)
        if (result.length > 0) {
            yield put(StoreActionCities.citiesSet(result));

        }


    } catch (error) {

        console.log("handleCitiesList error: ", error)
    }


    // console.log("handleCitiesList result: ", result)
    // yield put(commonFilterSetAgeRange([30, 70]));
}

// export function* onlyOnceCommonFilterAgeRange() {
//     yield fork(handleCitiesList);
// }
export function* watchCitiesInit() {
    yield takeLatest(StoreActionCities.citiesInit.type, handleCitiesList);
}

export function* watchCities() {
    yield all([fork(watchCitiesInit)]);
}