import { all } from 'redux-saga/effects';
import { watchChannelPerformance } from './channelPerformance/saga';

export function* rootSaga() {
  yield all([ watchChannelPerformance()]);
}