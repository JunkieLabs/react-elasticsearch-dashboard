import { takeLatest, put, select, call, all, fork } from 'redux-saga/effects';
import { setDummyChartData, channelPerformanceSetSubFilter } from './reducer';
import { commonFilterSet } from '@/domain/store/commonFilters/reducer';
import { fetchChannelPerformanceDummyData } from '@/data/api/channelPerformance';
import { RootState } from '../store';
import { DummyData } from '@/types/store/dummyData';

function* handleCommonFilterChange() {

    // Fetch based on filter and sub-filter
    const filter: string = yield select((state: RootState) => state.CommonFilters.value);
    const subFilter: string = yield select((state: RootState) => state.ChannelPerformance.subFilter);
    const channelPerformanceDummyData: DummyData[] = yield fetchChannelPerformanceDummyData(filter, subFilter);
    yield put(setDummyChartData(channelPerformanceDummyData));
}

function* handleSubFilterChange(action: ReturnType<typeof channelPerformanceSetSubFilter>) {
    /*
      // TODO can be used to update subfilter
    
      const subFilterValue = action.payload;
      yield put(channelPerformanceSetSubFilter(subFilterValue));
     */

    yield call(handleCommonFilterChange); // Fetch again when sub-filter changes
}

export function* watchCommonFilterChangeForDummyData() {
    yield takeLatest([commonFilterSet.type, channelPerformanceSetSubFilter.type], handleCommonFilterChange);
}

export function* watchSubFilterChange() {
    yield takeLatest(channelPerformanceSetSubFilter.type, handleSubFilterChange);
}

export function* watchChannelPerformance() {
    yield all([fork(watchSubFilterChange), fork(watchCommonFilterChangeForDummyData)]);
}

