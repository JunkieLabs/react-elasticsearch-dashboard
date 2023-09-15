import { takeLatest, put, select, call, all, fork } from 'redux-saga/effects';
import { StoreActionTopSlowChannelGeo } from './reducer';
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';
import { ElasticTopChannelAggRepo } from '@/data/elastic/topChannel';
import { RootState } from '../store';
import { ModelTopSlowChannelGeoFilters } from '@/types/store/topSlowChannelGeo';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';
import { StoreHelper } from '../helper';

function* handleCommonFilterChange() {

    // Fetch based on filter and sub-filter
     const filter: Date[] = yield select((state: RootState) => state.CommonFilters.value);
    const subFilter: ModelTopSlowChannelGeoFilters = yield select((state: RootState) => state.SlowChannel.subFilter);
    const channelCount: number = yield select((state: RootState) => state.Configuration.slowChannelsCount);
    // let pincodes: ModelElasticPincode[] =[]
    // if(subFilter.pincodes.length>0){
    //     const pincodesResult: ModelElasticPincode[] = yield ElasticPincodeRepo.getAll(subFilter.pincodes);
    //     pincodes = pincodesResult

    // }else {
    //     pincodes =[]
    // }


    // console.log("handleCommonFilterChange filter: ", filter)

    // console.log("handleCommonFilterChange Pincodes: ", pincodes)





    const items: ModelElasticAggsResultItem[] = yield ElasticTopChannelAggRepo.getTopN({
        pincodes: subFilter.pincodes,
        dateRange: filter,
        locations: subFilter.region ? [subFilter.region.location] : [],
        gender: StoreHelper.filterCommon.genderToElasticGender(subFilter.gender),
        // locations: pincodes.map(ele => ele.location),
        n: channelCount,
        ageRange: subFilter.ageRange,
        order: 'asc'
    });

    // console.log("ModelElasticAggsResultItem: ", items)

    yield put(StoreActionTopSlowChannelGeo.setAggregation(items));
}


export function* watchAllFilterChange() {
    yield takeLatest([StoreActionCommonFilters.commonFilterSet.type, StoreActionTopSlowChannelGeo.setSubFilter.type], handleCommonFilterChange);
}

// export function* watchSubFilterChange() {
//     yield takeLatest(channelPerformanceSetSubFilter.type, handleSubFilterChange);
// }

export function* watchTopSlowChannel() {
    yield all([fork(watchAllFilterChange)]);
}

