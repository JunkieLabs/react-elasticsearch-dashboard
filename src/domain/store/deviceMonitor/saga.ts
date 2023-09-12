import { all, fork, put, select, takeLatest } from "redux-saga/effects";
// import { watchSubFilterChange, watchCommonFilterChangeForDummyData } from "../channelPerformance/saga";
import { ElasticCityRepo } from "@/data/elastic/cities/cities";
import { ElasticDeviceMonitorAggRepo, ElasticDeviceMonitorHitRepo } from "@/data/elastic/deviceMonitor";
import { ModelElasticEventMonitorResult } from "@/types/elastic/events/monitor";
import { DeviceMonitorReducers, DeviceMonitorState, StoreActionDeviceMonitor, deviceMonitorActiveListAdapter, deviceMonitorAllListAdapter, deviceMonitorConnectedListAdapter, deviceMonitorInactiveListAdapter } from "./reducer";
import { RootState } from "../store";
import { ModelElasticEventHit } from "@/types/elastic/events/events";
import { EntityAdapter } from "@reduxjs/toolkit";
import { ModelStorePagination } from "@/types/store/pagination";
import { ElasticConstants } from "@/data/elastic/elastic.constants";

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
        const state: DeviceMonitorState = yield select((state: RootState) => state.DeviceMonitor);

        yield put(StoreActionDeviceMonitor.all.pagination(state.allListPagination));
        yield put(StoreActionDeviceMonitor.active.pagination(state.activeListPagination));
        yield put(StoreActionDeviceMonitor.inactive.pagination(state.inactiveListPagination));
        yield put(StoreActionDeviceMonitor.connected.pagination(state.connectedListPagination));

        // }


    } catch (error) {

        console.log("handleCitiesList error: ", error)
    }


    // console.log("handleCitiesList result: ", result)
    // yield put(commonFilterSetAgeRange([30, 70]));
}


export function* handleAllPagination() {

    try {

        const state: DeviceMonitorState = yield select((state: RootState) => state.DeviceMonitor);

        const pagination: ModelStorePagination = yield select((state: RootState) => state.DeviceMonitor.allListPagination);
        const totalPrev = deviceMonitorAllListAdapter.getSelectors().selectTotal(state.allList);


        // var totalPrev = adapter.ids.selectTotal(state.allList)

        const nextOffset = pagination.offset + pagination.limit

        console.log("handleAllPagination:",state.stats.all, nextOffset, pagination.offset)

        if (pagination.offset < state.stats.all && nextOffset > totalPrev) {
            console.log("handleAllPagination 2:",state.stats.all, nextOffset, pagination.offset)

            const response: ModelElasticEventHit[] = yield ElasticDeviceMonitorHitRepo.getPaginated({
                state:ElasticConstants.checks.device.stateAll,
                offset: pagination.offset, 
                limit: pagination.limit
            }); // Replace with your API call
            yield put(StoreActionDeviceMonitor.all.addItems(response));

        }

    } catch (error) {

    }
}

export function* handleActivePagination() {

    try {

        const state: DeviceMonitorState = yield select((state: RootState) => state.DeviceMonitor);

        const pagination: ModelStorePagination = yield select((state: RootState) => state.DeviceMonitor.activeListPagination);
        const totalPrev = deviceMonitorActiveListAdapter.getSelectors().selectTotal(state.activeList);


        // var totalPrev = adapter.ids.selectTotal(state.allList)

        const nextOffset = pagination.offset + pagination.limit

        // console.log("handleAllPagination:",state.stats.all, nextOffset, pagination.offset)

        if (pagination.offset < state.stats.active && nextOffset > totalPrev) {
            // console.log("handleAllPagination 2:",state.stats.all, nextOffset, pagination.offset)

            const response: ModelElasticEventHit[] = yield ElasticDeviceMonitorHitRepo.getPaginated({
                state:ElasticConstants.checks.device.stateActive,
                offset: pagination.offset, 
                limit: pagination.limit
            }); // Replace with your API call
            yield put(StoreActionDeviceMonitor.active.addItems(response));

        }

    } catch (error) {

    }
}

export function* handleInactivePagination() {

    try {

        const state: DeviceMonitorState = yield select((state: RootState) => state.DeviceMonitor);

        const pagination: ModelStorePagination = yield select((state: RootState) => state.DeviceMonitor.inactiveListPagination);
        const totalPrev = deviceMonitorInactiveListAdapter.getSelectors().selectTotal(state.inactiveList);


        // var totalPrev = adapter.ids.selectTotal(state.allList)

        const nextOffset = pagination.offset + pagination.limit

        // console.log("handleAllPagination:",state.stats.all, nextOffset, pagination.offset)

        if (pagination.offset < state.stats.inactive && nextOffset > totalPrev) {
            // console.log("handleAllPagination 2:",state.stats.all, nextOffset, pagination.offset)

            const response: ModelElasticEventHit[] = yield ElasticDeviceMonitorHitRepo.getPaginated({
                state:ElasticConstants.checks.device.stateInActive,
                offset: pagination.offset, 
                limit: pagination.limit
            }); // Replace with your API call
            yield put(StoreActionDeviceMonitor.inactive.addItems(response));

        }

    } catch (error) {

    }
}


export function* handleConnectedPagination() {

    try {

        const state: DeviceMonitorState = yield select((state: RootState) => state.DeviceMonitor);

        const pagination: ModelStorePagination = yield select((state: RootState) => state.DeviceMonitor.connectedListPagination);
        const totalPrev = deviceMonitorConnectedListAdapter.getSelectors().selectTotal(state.connectedList);


        // var totalPrev = adapter.ids.selectTotal(state.allList)

        const nextOffset = pagination.offset + pagination.limit

        // console.log("handleAllPagination:",state.stats.all, nextOffset, pagination.offset)

        if (pagination.offset < state.stats.connected && nextOffset > totalPrev) {
            // console.log("handleAllPagination 2:",state.stats.all, nextOffset, pagination.offset)

            const response: ModelElasticEventHit[] = yield ElasticDeviceMonitorHitRepo.getPaginated({
                state:ElasticConstants.checks.device.stateConnected,
                offset: pagination.offset, 
                limit: pagination.limit
            }); // Replace with your API call
            yield put(StoreActionDeviceMonitor.connected.addItems(response));

        }

    } catch (error) {

    }
}


// export function* onlyOnceCommonFilterAgeRange() {
//     yield fork(handleCitiesList);
// }
export function* watchDeviceMonitorInit() {
    yield takeLatest(StoreActionDeviceMonitor.initCounter.type, handleStatsInit);
}

export function* watchDeviceMonitorAllPagination() {
    yield takeLatest(StoreActionDeviceMonitor.all.pagination.type, handleAllPagination);
}

export function* watchDeviceMonitorActivePagination() {
    yield takeLatest(StoreActionDeviceMonitor.active.pagination.type, handleActivePagination);
}

export function* watchDeviceMonitorInactivePagination() {
    yield takeLatest(StoreActionDeviceMonitor.inactive.pagination.type, handleInactivePagination);
}

export function* watchDeviceMonitorConnectedPagination() {
    yield takeLatest(StoreActionDeviceMonitor.connected.pagination.type, handleConnectedPagination);
}

export function* watchDeviceMonitor() {
    yield all([fork(watchDeviceMonitorInit), fork(watchDeviceMonitorAllPagination), fork(watchDeviceMonitorActivePagination), fork(watchDeviceMonitorInactivePagination), fork(watchDeviceMonitorConnectedPagination)]);
}