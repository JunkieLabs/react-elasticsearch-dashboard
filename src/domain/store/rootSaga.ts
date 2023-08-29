import { all } from 'redux-saga/effects';
import { watchChannelPerformance } from './channelPerformance/saga';
import { watchCommonFilters } from './commonFilters/saga';
import { watchTopChannel } from './topChannel/saga';
import { watchCities } from './cities/saga';
import { watchPincodes } from './pincodes/saga';
import { watchDummyCharts } from './dummy/saga';
import { watchBouquets} from './bouquets/saga';
export function* rootSaga() {
  yield all([ watchChannelPerformance(), watchCommonFilters(),  watchTopChannel(), watchCities(), watchPincodes(), watchBouquets(), watchDummyCharts()]);
}