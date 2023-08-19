import { takeLatest, put, select, call, all, fork } from 'redux-saga/effects';
import { StoreActionChannelPerformance } from './reducer';
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';
import { fetchChannelPerformanceDummyData } from '@/data/api/channelPerformance';
import { RootState } from '../store';
import { DummyData } from '@/types/store/dummyData';
import { ModelChannelPerformanceFilters } from '@/types/store/channelPerformance';

function* handleCommonFilterChange() {

    // Fetch based on filter and sub-filter
    const filter: string = yield select((state: RootState) => state.CommonFilters.value);
    const subFilter: ModelChannelPerformanceFilters = yield select((state: RootState) => state.ChannelPerformance.subFilter);
    // let pincodes: ModelElasticPincode[] =[]
    // if(subFilter.pincodes.length>0){
    //     const pincodesResult: ModelElasticPincode[] = yield ElasticPincodeRepo.getAll(subFilter.pincodes);
    //     pincodes = pincodesResult

    // }else {
    //     pincodes =[]
    // }

   
    // console.log("handleCommonFilterChange filter: ", filter)

    // console.log("handleCommonFilterChange Pincodes: ", pincodes)





    const channelPerformanceDummyData: DummyData[] = yield fetchChannelPerformanceDummyData(filter, "subFilter");
    yield put(StoreActionChannelPerformance.setDummyChartData(channelPerformanceDummyData));
}

function* handleSubFilterChange(action: ReturnType<typeof StoreActionChannelPerformance.setSubFilter>) {
    /*
      // TODO can be used to update subfilter
    
      const subFilterValue = action.payload;
      yield put(channelPerformanceSetSubFilter(subFilterValue));
     */
    console.log("handleSubFilterChange Pincodes: ")


    yield call(handleCommonFilterChange); // Fetch again when sub-filter changes
}

export function* watchAllFilterChange() {
    yield takeLatest([StoreActionCommonFilters.commonFilterSet.type, StoreActionChannelPerformance.setSubFilter.type], handleCommonFilterChange);
}

// export function* watchSubFilterChange() {
//     yield takeLatest(channelPerformanceSetSubFilter.type, handleSubFilterChange);
// }

export function* watchChannelPerformance() {
    yield all([fork(watchAllFilterChange)]);
}

