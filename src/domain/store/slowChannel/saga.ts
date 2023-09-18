import { takeLatest, put, select, call, all, fork } from 'redux-saga/effects';
import { StoreActionSlowChannel } from './reducer';
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';
import { ElasticTopSlowChannelAggRepo } from '@/data/elastic/topSlowChannel';
import { RootState } from '../store';
import { ModelSlowChannelFilters } from '@/types/store/slowChannel';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';
import { StoreActionConfiguration } from '../configuration/reducer';
import { StoreHelper } from '../helper';
import { StoreConstants } from '../store.constants';

function* handleCommonFilterChange() {

    // Fetch based on filter and sub-filter
    const topChannelCount: number = yield select((state: RootState) => state.Configuration.slowChannelsCount);
    const filter: Date[] = yield select((state: RootState) => state.CommonFilters.value);
    const subFilter: ModelSlowChannelFilters = yield select((state: RootState) => state.SlowChannel.subFilter);
   

    // console.log("handleCommonFilterChange filter: ", filter)

    // console.log("handleCommonFilterChange Pincodes: ", pincodes)




    yield put(StoreActionSlowChannel.setLoadingStage(StoreConstants.loadingStage.loading));

    const items: ModelElasticAggsResultItem[] = yield ElasticTopSlowChannelAggRepo.getTopSlowN({
        pincodes: subFilter.pincodes,
        dateRange: filter,
        locations: subFilter.region ? [subFilter.region.location] : [],
        gender: StoreHelper.filterCommon.genderToElasticGender(subFilter.gender),
        // locations: pincodes.map(ele => ele.location),
        n: topChannelCount,
        ageRange: subFilter.ageRange,
        order: 'asc',
        subAggsByDay: true
    });

    // console.log("ModelElasticAggsResultItem: ", items)

    yield put(StoreActionSlowChannel.setAggregation(items));
    yield put(StoreActionSlowChannel.setLoadingStage(StoreConstants.loadingStage.loaded));
}


export function* watchAllFilterChange() {
    yield takeLatest([StoreActionConfiguration.slowChannelCounts.type, StoreActionCommonFilters.commonFilterSet.type, StoreActionSlowChannel.setSubFilter.type], handleCommonFilterChange);
}

// export function* watchSubFilterChange() {
//     yield takeLatest(channelPerformanceSetSubFilter.type, handleSubFilterChange);
// }

export function* watchSlowChannel() {
    yield all([fork(watchAllFilterChange)]);
}

