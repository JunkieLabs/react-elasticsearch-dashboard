import { all, fork, put, takeLatest } from "redux-saga/effects";
// import { watchSubFilterChange, watchCommonFilterChangeForDummyData } from "../channelPerformance/saga";
import { ElasticCityRepo } from "@/data/elastic/cities/cities";
import { ElasticDeviceMonitorAggRepo } from "@/data/elastic/deviceMonitor";
import { ModelElasticEventMonitorResult } from "@/types/elastic/events/monitor";
import { DeviceMonitorReducers, StoreActionDeviceMonitor } from "./reducer";

export function* handleStatsInit() {

    // console.log("handleCitiesList ")
    // var d: number = yield 2;
    // console.log("handleCitiesList d: ", d)
    // var e: number = yield 3;
    // console.log("handleCitiesList e: ", e)

    try {
        const result: ModelElasticEventMonitorResult = yield ElasticDeviceMonitorAggRepo.getStats()
        // console.log("handleCitiesList result: ", result)
        // if (result.length > 0) {
            yield put(StoreActionDeviceMonitor.setStats(result));

        // }


    } catch (error) {

        console.log("handleCitiesList error: ", error)
    }


    // console.log("handleCitiesList result: ", result)
    // yield put(commonFilterSetAgeRange([30, 70]));
}

// export function* onlyOnceCommonFilterAgeRange() {
//     yield fork(handleCitiesList);
// }
export function* watchDeviceMonitorInit() {
    yield takeLatest(StoreActionDeviceMonitor.initCounter.type, handleStatsInit);
}

export function* watchDeviceMonitor() {
    yield all([fork(watchDeviceMonitorInit)]);
}