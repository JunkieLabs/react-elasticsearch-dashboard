import { all } from 'redux-saga/effects';
import { watchChannelPerformance } from './channelPerformance/saga';
import { watchCommonFilters } from './commonFilters/saga';

export function* rootSaga() {
  yield all([ watchChannelPerformance(), watchCommonFilters()]);
}