import { takeLatest, put, select, call, all, fork } from 'redux-saga/effects';
import { StoreActionTopChannel } from './reducer';
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';
import { ElasticTopSlowChannelAggRepo } from '@/data/elastic/topSlowChannel';
import { ElasticPincodeRepo } from "@/data/elastic/pincodes/pincodes";
import { RootState } from '../store';
import { ModelTopChannelFilters } from '@/types/store/topChannel';
import { ModelElasticPincode } from '@/types/elastic/pincodes/pincodes';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';
import { StoreActionConfiguration } from '../configuration/reducer';
import { ElasticConstants } from '@/data/elastic/elastic.constants';
import { StoreHelper } from '../helper';
import { StoreConstants } from '../store.constants';

function* handleCommonFilterChange() {

    // Fetch based on filter and sub-filter
    const topChannelCount: number = yield select((state: RootState) => state.Configuration.topChannelsCount);
    const filter: Date[] = yield select((state: RootState) => state.CommonFilters.value);
    const subFilter: ModelTopChannelFilters = yield select((state: RootState) => state.TopChannel.subFilter);
    // let pincodes: ModelElasticPincode[] =[]
    // if(subFilter.pincodes.length>0){
    //     const pincodesResult: ModelElasticPincode[] = yield ElasticPincodeRepo.getAll(subFilter.pincodes);
    //     pincodes = pincodesResult

    // }else {
    //     pincodes =[]
    // }


    // console.log("handleCommonFilterChange filter: ", filter)

    // console.log("handleCommonFilterChange Pincodes: ", pincodes)



    yield put(StoreActionTopChannel.setLoadingStage(StoreConstants.loadingStage.loading));


    const items: ModelElasticAggsResultItem[] = yield ElasticTopSlowChannelAggRepo.getTopSlowN({
        pincodes: subFilter.pincodes,
        dateRange: filter,
        locations: subFilter.region ? [subFilter.region.location] : [],
        gender: StoreHelper.filterCommon.genderToElasticGender(subFilter.gender),
        // locations: pincodes.map(ele => ele.location),
        n: topChannelCount,
        ageRange: subFilter.ageRange,
        subAggsByDay: true
    });

    // console.log("ModelElasticAggsResultItem: ", items)

    yield put(StoreActionTopChannel.setAggregation(items));
    
    yield put(StoreActionTopChannel.setLoadingStage(StoreConstants.loadingStage.loaded));
}




// function* handleSubFilterChange(action: ReturnType<typeof StoreActionTopChannel.setSubFilter>) {
//     /*
//       // TODO can be used to update subfilter
    
//       const subFilterValue = action.payload;
//       yield put(channelPerformanceSetSubFilter(subFilterValue));
//      */
//     console.log("handleSubFilterChange Pincodes: ")


//     yield call(handleCommonFilterChange); // Fetch again when sub-filter changes
// }

export function* watchAllFilterChange() {
    yield takeLatest([StoreActionConfiguration.topChannelCounts.type, StoreActionCommonFilters.commonFilterSet.type, StoreActionTopChannel.setSubFilter.type], handleCommonFilterChange);
}

// export function* watchSubFilterChange() {
//     yield takeLatest(channelPerformanceSetSubFilter.type, handleSubFilterChange);
// }

export function* watchTopChannel() {
    yield all([fork(watchAllFilterChange)]);
}


/* ********************************************************************************
 *                                    deprecated
 */


function* handleCommonFilterChangeDeprecated() {

    // Fetch based on filter and sub-filter
    const filter: Date[] = yield select((state: RootState) => state.CommonFilters.value);
    const subFilter: ModelTopChannelFilters = yield select((state: RootState) => state.ChannelPerformance.subFilter);
    let pincodes: ModelElasticPincode[] = []
    if (subFilter.pincodes.length > 0) {
        const pincodesResult: ModelElasticPincode[] = yield ElasticPincodeRepo.getAllDeprecated(subFilter.pincodes);
        pincodes = pincodesResult

    } else {
        pincodes = []
    }


    // console.log("handleCommonFilterChange filter: ", filter)

    // console.log("handleCommonFilterChange Pincodes: ", pincodes)





    const items: ModelElasticAggsResultItem[] = yield ElasticTopSlowChannelAggRepo.getTopSlowN({
        dateRange: filter,
        locations: pincodes.map(ele => ele.location),
        n: 5,
        ageRange: subFilter.ageRange
    });

    // console.log("ModelElasticAggsResultItem: ", items)

    yield put(StoreActionTopChannel.setAggregation(items));
}

