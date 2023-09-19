import { all } from 'redux-saga/effects';
import { watchChannelPerformance } from './channelPerformance/saga';
import { watchCommonFilters } from './commonFilters/saga';
import { watchTopChannel } from './topChannel/saga';
import { watchCities } from './cities/saga';
import { watchPincodes } from './pincodes/saga';
import { watchDummyCharts } from './dummy/saga';
import { watchBouquets} from './bouquets/saga';
import { watchDeviceMonitor } from './deviceMonitor/saga';
import { watchDeviceLogs } from './deviceLogs/saga';
import { watchSlowChannel } from './slowChannel/saga';
import { watchReportGeneration } from './reportGeneration/saga';
import { watchTopSlowChannelGeo } from './topSlowChannelGeo/saga';
import { watchAuth } from './auth/saga';
export function* rootSaga() {
  yield all([ 
    watchChannelPerformance(), 
    watchCommonFilters(),  
    watchTopChannel(), 
    watchSlowChannel(), 
    watchCities(), 
    watchPincodes(), 
    watchBouquets(), 
    watchDeviceMonitor(),
    watchDeviceLogs(),
    watchReportGeneration(),
    watchTopSlowChannelGeo(),
    watchDummyCharts(),
    watchAuth()
  ]);
}