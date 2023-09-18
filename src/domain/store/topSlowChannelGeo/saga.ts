import { takeLatest, put, select, call, all, fork } from 'redux-saga/effects';
import { StoreActionTopSlowChannelGeo } from './reducer';
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';
import { ElasticTopSlowChannelAggRepo } from '@/data/elastic/topSlowChannel';
import { RootState } from '../store';
import { ModelTopSlowChannelGeoFilters } from '@/types/store/topSlowChannelGeo';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';
import { StoreHelper } from '../helper';
import { ElasticDeviceLogsHitRepo } from '@/data/elastic/deviceLogs';
import { ModelElasticEventHitPart } from '@/types/elastic/events/events';

function* handleCommonFilterChange() {

    // Fetch based on filter and sub-filter
     const filter: Date[] = yield select((state: RootState) => state.CommonFilters.value);
    const subFilter: ModelTopSlowChannelGeoFilters = yield select((state: RootState) => state.TopSlowChannelGeo.subFilter);
    
    
    let  channelCount: number = 0
   
if(subFilter.isTop){
    channelCount =  yield select((state: RootState) => state.Configuration.topChannelsCount);

}else{
    channelCount =  yield select((state: RootState) => state.Configuration.slowChannelsCount);

}


console.log("saga channelCount: ", channelCount)



    const items: ModelElasticAggsResultItem[] = yield ElasticTopSlowChannelAggRepo.getTopSlowN({
        pincodes: subFilter.pincodes,
        dateRange: filter,
        locations: subFilter.region ? [subFilter.region.location] : [],
        gender: StoreHelper.filterCommon.genderToElasticGender(subFilter.gender),
        // locations: pincodes.map(ele => ele.location),
        n: channelCount,
        ageRange: subFilter.ageRange,
        order: subFilter.isTop ? 'desc' :  'asc'
    });

    var channelNames: string[] = []

    var limit = 0;

    for(let item of items){
        limit+=item.doc_count
        channelNames.push(item.key as string)
        

    }

    console.log("handleCommonFilterChange: limit ", limit, items, subFilter.isTop)

    const geoHits: ModelElasticEventHitPart[] = yield ElasticDeviceLogsHitRepo.getHitsGeo({

        pincodes: subFilter.pincodes,
        dateRange: filter,
        locations: subFilter.region ? [subFilter.region.location] : [],
        gender: StoreHelper.filterCommon.genderToElasticGender(subFilter.gender),
        // locations: pincodes.map(ele => ele.location),
        channelNames: channelNames,
        limit: limit,
        ageRange: subFilter.ageRange
    });

    // geoHits[0]._source.location

    // console.log("ModelElasticAggsResultItem: ", items)

    yield put(StoreActionTopSlowChannelGeo.setHits(geoHits));
}


export function* watchAllFilterChange() {
    yield takeLatest([StoreActionCommonFilters.commonFilterSet.type, StoreActionTopSlowChannelGeo.setSubFilter.type], handleCommonFilterChange);
}

// export function* watchSubFilterChange() {
//     yield takeLatest(channelPerformanceSetSubFilter.type, handleSubFilterChange);
// }

export function* watchTopSlowChannelGeo() {
    yield all([fork(watchAllFilterChange)]);
}

