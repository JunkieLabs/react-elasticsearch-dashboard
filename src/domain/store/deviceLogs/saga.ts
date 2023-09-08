import { all, fork, put, select, takeLatest } from "redux-saga/effects";
// import { watchSubFilterChange, watchCommonFilterChangeForDummyData } from "../channelPerformance/saga";
import { ElasticCityRepo } from "@/data/elastic/cities/cities";
import { ModelElasticEventMonitorResult } from "@/types/elastic/events/monitor";
import { DeviceLogsReducers, DeviceLogsState, StoreActionDeviceLogs, deviceLogsListAdapter } from "./reducer";
import { RootState } from "../store";
import { ModelElasticEventHit } from "@/types/elastic/events/events";
import { EntityAdapter } from "@reduxjs/toolkit";
import { ModelStorePagination } from "@/types/store/pagination";
import { ElasticConstants } from "@/data/elastic/elastic.constants";
import { ElasticDeviceLogsHitRepo, ElasticDeviceLogsTotalRepo } from "@/data/elastic/deviceLogs";
import { ModelElasticEventTotalResult } from "@/types/elastic/events/total";

export function* handleDeviceTotalChange() {

    // console.log("handleCitiesList ")
    // var d: number = yield 2;
    // console.log("handleCitiesList d: ", d)
    // var e: number = yield 3;
    // console.log("handleCitiesList e: ", e)

    try {
        const deviceId: string|undefined = yield select((state: RootState) => state.DeviceLogs.deviceName);

        if(deviceId){

            const result: ModelElasticEventTotalResult = yield ElasticDeviceLogsTotalRepo.getTotal(deviceId)
            // console.log("handleCitiesList result: ", result)
            // if (result.length > 0) {
            yield put(StoreActionDeviceLogs.setTotal(result.total));
    
        }


        // }


    } catch (error) {

        console.log("handleCitiesList error: ", error)
    }


    // console.log("handleCitiesList result: ", result)
    // yield put(commonFilterSetAgeRange([30, 70]));
}


export function* handleAllPagination() {

    try {

        const state: DeviceLogsState = yield select((state: RootState) => state.DeviceLogs);

        const pagination: ModelStorePagination = yield select((state: RootState) => state.DeviceLogs.pagination);
        const totalPrev = deviceLogsListAdapter.getSelectors().selectTotal(state.logsList);


        // var totalPrev = adapter.ids.selectTotal(state.allList)

        const nextOffset = pagination.offset + pagination.limit

        console.log("handleAllPagination:",state.total, nextOffset, pagination.offset)

        if (pagination.offset < state.total && nextOffset > totalPrev) {
            console.log("handleAllPagination 2:",state.total, nextOffset, pagination.offset)

            const response: ModelElasticEventHit[] = yield ElasticDeviceLogsHitRepo.getPaginated({
                state:ElasticConstants.checks.device.stateAll,
                offset: pagination.offset, 
                limit: pagination.limit,
                deviceId: state.deviceName??""
            }); // Replace with your API call
            yield put(StoreActionDeviceLogs.addItems(response));

        }

    } catch (error) {

    }
}

// export function* onlyOnceCommonFilterAgeRange() {
//     yield fork(handleCitiesList);
// }
export function* watchDeviceLogsInit() {
    yield takeLatest(StoreActionDeviceLogs.setDeviceName.type, handleDeviceTotalChange);
}

export function* watchDeviceLogsAllPagination() {
    yield takeLatest(StoreActionDeviceLogs.pagination.type, handleAllPagination);
}

export function* watchDeviceLogs() {
    yield all([fork(watchDeviceLogsInit), fork(watchDeviceLogsAllPagination)]);
}