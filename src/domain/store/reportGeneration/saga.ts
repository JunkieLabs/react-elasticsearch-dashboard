import { takeLatest, put, select, call, all, fork } from 'redux-saga/effects';
import { StoreActionReportGeneration } from './reducer';
import { RootState } from '../store';
import { ElasticRawEventsLogsRepo } from '@/data/elastic/rawEvents';
import { ModelElasticEventHitResult } from '@/data/elastic/deviceLogs';
import { ModelElasticEventHit } from '@/types/elastic/events/events';

function* handleFilterChange() {

    // Fetch based on filter and sub-filter
    const filter: Date[] = yield select((state: RootState) => state.ReportGeneration.filterDateRange);
    // let pincodes: ModelElasticPincode[] =[]
    // if(subFilter.pincodes.length>0){
    //     const pincodesResult: ModelElasticPincode[] = yield ElasticPincodeRepo.getAll(subFilter.pincodes);
    //     pincodes = pincodesResult

    // }else {
    //     pincodes =[]
    // }


    console.log("handleFilterChange filter: ", filter)

    // console.log("handleCommonFilterChange Pincodes: ", pincodes)



    const resultTotal: number = yield ElasticRawEventsLogsRepo.getAllCount({
        dateRange: filter,
    });

    if (resultTotal > 0) {
        const result: ModelElasticEventHit[] = yield ElasticRawEventsLogsRepo.getAll({
            dateRange: filter,
            limit: resultTotal
        });
        console.log("handleFilterChange result: ", result)

        yield put(StoreActionReportGeneration.addItems(result));
    } else {
        yield put(StoreActionReportGeneration.addItems([]));

    }



}


export function* watchAllFilterChange() {
    yield takeLatest([StoreActionReportGeneration.filterDateRange.type], handleFilterChange);
}

// export function* watchSubFilterChange() {
//     yield takeLatest(channelPerformanceSetSubFilter.type, handleSubFilterChange);
// }

export function* watchReportGeneration() {
    yield all([fork(watchAllFilterChange)]);
}

