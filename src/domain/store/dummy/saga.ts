import { takeLatest, put, select, call, all, fork } from 'redux-saga/effects';
import { StoreActionDummyChart } from './reducer';
import { StoreActionCommonFilters } from '@/domain/store/commonFilters/reducer';
import { RootState } from '../store';
import { DummyData } from '@/types/store/dummyData';
import { ModelDummyChartsFilters } from '@/types/store/dummyCharts';
import { fetchDummyChartsData } from '@/data/api/dummyCharts';

function* handleCommonFilterChange() {

    // Fetch based on filter and sub-filter
    const filter: string = yield select((state: RootState) => state.CommonFilters.value);
    const subFilter: ModelDummyChartsFilters = yield select((state: RootState) => state.DummyCharts.subFilter);
    // let pincodes: ModelElasticPincode[] =[]
    // if(subFilter.pincodes.length>0){
    //     const pincodesResult: ModelElasticPincode[] = yield ElasticPincodeRepo.getAll(subFilter.pincodes);
    //     pincodes = pincodesResult

    // }else {
    //     pincodes =[]
    // }

   
    // console.log("handleCommonFilterChange filter: ", filter)

    // console.log("handleCommonFilterChange Pincodes: ", pincodes)





    const channelPerformanceDummyData: DummyData[] = yield fetchDummyChartsData(filter, "subFilter");
    yield put(StoreActionDummyChart.setDummyChartData(channelPerformanceDummyData));
}

function* handleSubFilterChange(action: ReturnType<typeof StoreActionDummyChart.setSubFilter>) {
    /*
      // TODO can be used to update subfilter
    
      const subFilterValue = action.payload;
      yield put(channelPerformanceSetSubFilter(subFilterValue));
     */
    console.log("handleSubFilterChange Pincodes: ")


    yield call(handleCommonFilterChange); // Fetch again when sub-filter changes
}

export function* watchAllFilterChange() {
    yield takeLatest([StoreActionCommonFilters.commonFilterSet.type, StoreActionDummyChart.setSubFilter.type], handleCommonFilterChange);
}

// export function* watchSubFilterChange() {
//     yield takeLatest(channelPerformanceSetSubFilter.type, handleSubFilterChange);
// }

export function* watchDummyCharts() {
    yield all([fork(watchAllFilterChange)]);
}

