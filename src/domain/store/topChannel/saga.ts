import { takeLatest, put, select, call, all, fork } from 'redux-saga/effects';
import { StoreActionTopChannel } from './reducer';
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';
import { ElasticTopChannelAggRepo } from '@/data/elastic/topChannel';
import { ElasticPincodeRepo } from "@/data/elastic/pincodes/pincodes";
import { RootState } from '../store';
import { DummyData } from '@/types/store/dummyData';
import { ModelTopChannelFilters } from '@/types/store/topChannel';
import { ModelElasticPincode } from '@/types/elastic/pincodes/pincodes';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';

function* handleCommonFilterChange() {

    // Fetch based on filter and sub-filter
    const filter: Date[] = yield select((state: RootState) => state.CommonFilters.value);
    const subFilter: ModelTopChannelFilters = yield select((state: RootState) => state.ChannelPerformance.subFilter);
    // let pincodes: ModelElasticPincode[] =[]
    // if(subFilter.pincodes.length>0){
    //     const pincodesResult: ModelElasticPincode[] = yield ElasticPincodeRepo.getAll(subFilter.pincodes);
    //     pincodes = pincodesResult

    // }else {
    //     pincodes =[]
    // }

   
    console.log("handleCommonFilterChange filter: ", filter)

    // console.log("handleCommonFilterChange Pincodes: ", pincodes)





    const items: ModelElasticAggsResultItem[] = yield ElasticTopChannelAggRepo.getTopN({
        pincodes: subFilter.pincodes,
        dateRange: filter,
        locations:[],
        // locations: pincodes.map(ele => ele.location),
        n: 5,
        ageRange: subFilter.ageRange
    });

    console.log("ModelElasticAggsResultItem: ", items)

    yield put(StoreActionTopChannel.setAggregation(items));
}




function* handleSubFilterChange(action: ReturnType<typeof StoreActionTopChannel.setSubFilter>) {
    /*
      // TODO can be used to update subfilter
    
      const subFilterValue = action.payload;
      yield put(channelPerformanceSetSubFilter(subFilterValue));
     */
    console.log("handleSubFilterChange Pincodes: ")


    yield call(handleCommonFilterChange); // Fetch again when sub-filter changes
}

export function* watchAllFilterChange() {
    yield takeLatest([StoreActionCommonFilters.commonFilterSet.type, StoreActionTopChannel.setSubFilter.type], handleCommonFilterChange);
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
    let pincodes: ModelElasticPincode[] =[]
    if(subFilter.pincodes.length>0){
        const pincodesResult: ModelElasticPincode[] = yield ElasticPincodeRepo.getAllDeprecated(subFilter.pincodes);
        pincodes = pincodesResult

    }else {
        pincodes =[]
    }

   
    console.log("handleCommonFilterChange filter: ", filter)

    console.log("handleCommonFilterChange Pincodes: ", pincodes)





    const items: ModelElasticAggsResultItem[] = yield ElasticTopChannelAggRepo.getTopN({
        dateRange: filter,
        locations: pincodes.map(ele => ele.location),
        n: 5,
        ageRange: subFilter.ageRange
    });

    console.log("ModelElasticAggsResultItem: ", items)

    yield put(StoreActionTopChannel.setAggregation(items));
}

