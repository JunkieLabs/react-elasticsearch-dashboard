import { takeLatest, put, select, call, all, fork } from 'redux-saga/effects';
import { RootState } from '../store';
import { ModelChannelPerformanceFilters } from '@/types/store/channelPerformance';
import { ElasticChannelPerformanceAggRepo } from '@/data/elastic/channelPerformance';
import { ModelElasticAggsResultItem, ModelElasticMultiAggsResult, ModelElasticMultiAggsResultItem } from '@/types/elastic/aggs';
import { StoreActionChannelPerformance } from './reducer';
import { StoreActionCommonFilters } from '../commonFilters/reducer';
import { StoreConstants } from '../store.constants';
import { UiResourceColor } from '@/ui/resource/color';
import { AnyAction } from 'redux';


// export function* watchSubFilterChange() {
//     yield takeLatest(channelPerformanceSetSubFilter.type, handleSubFilterChange);
// }



function* handleTimeSeries(): Generator<any, void, any> {

    console.log("handleFilterChange: ")

    // Fetch based on filter and sub-filter
    // const filter: Date[] = yield select((state: RootState) => state.ChannelPerformance.subFilter);
    const filterDateRanage: Date[] = yield select((state: RootState) => state.CommonFilters.value);
    const subFilter: ModelChannelPerformanceFilters = yield select((state: RootState) => state.ChannelPerformance.subFilter);





    const items: ModelElasticAggsResultItem[] = yield ElasticChannelPerformanceAggRepo.getTimeSeries({
        bouquets: subFilter.bouquets,
        dateRange: filterDateRanage,
        // locations: pincodes.map(ele => ele.location),
        // n: 5,
        bouquetChannelsMap: subFilter.bouquetChannelsMap
    });

    // console.log("ModelElasticAggsResultItem: ", items)

    var pointer = 0;

    var plots: ModelAnalyticPlot[] = subFilter.bouquets.map((bouquet, index) => {
        return {

            color: UiResourceColor.COLOR_ARRAY[index % 15],// "#234343",
            indentifiers: [{ [StoreConstants.channelPerformance.filters.plotBouquetIdentifier]: bouquet }],
            key: bouquet,//"Bouquet1",
            name: bouquet,//"Bouquet 1",
            texts: [bouquet]//["Bouquet 1"]
        }
    });

    pointer += subFilter.bouquets.length

    var keys = Object.keys(subFilter.bouquetChannelsMap)

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        pointer++;

        plots.push(...(subFilter.bouquetChannelsMap[key].map((channel, index) => {
            return {
                color: UiResourceColor.COLOR_ARRAY[(index + pointer) % 15],// "#234343",
                indentifiers: [{ [StoreConstants.channelPerformance.filters.plotBouquetIdentifier]: key }, { [StoreConstants.channelPerformance.filters.plotChannelIdentifier]: channel }],
                key: `${key}_${channel}`,//"Bouquet1",
                name: channel,//"Bouquet 1",
                texts: [key, channel]//["Bouquet 1"]
            }
        }))
        )
        pointer += subFilter.bouquetChannelsMap[key].length

    }

    yield put(StoreActionChannelPerformance.setPlots(plots));

    yield put(StoreActionChannelPerformance.setAggregation(items));
}



function* handleAggs(): Generator<any, void, any> {

    console.log("handleFilterChange: ")

    // Fetch based on filter and sub-filter
    // const filter: Date[] = yield select((state: RootState) => state.ChannelPerformance.subFilter);
    const filterDateRanage: Date[] = yield select((state: RootState) => state.CommonFilters.value);
    const subFilter: ModelChannelPerformanceFilters = yield select((state: RootState) => state.ChannelPerformance.subFilter);





    const aggsResult: ModelElasticMultiAggsResult = yield ElasticChannelPerformanceAggRepo.getAggs({
        bouquets: subFilter.bouquets,
        dateRange: filterDateRanage,
        // locations: pincodes.map(ele => ele.location),
        // n: 5,
        bouquetChannelsMap: subFilter.bouquetChannelsMap
    });

    console.log("ModelElasticAggsMultiResultItem: ", aggsResult)
    const items: ModelElasticAggsResultItem[] = [];


    var keys = Object.keys(aggsResult.aggs)

    for (var key of keys) {
        items.push({
            doc_count: aggsResult.aggs[key].doc_count,
            key: key
        })
    }




    yield put(StoreActionChannelPerformance.setMultiAggregation({items: items, total:  aggsResult.total??0}));
}
// function* sasa(action:  AnyAction) : Generator<any, void, any> {
//     // Call both functions concurrently using fork
//     yield fork(handleTimeSeries, action);
//     yield fork(handleAggs, action);
//   }

export function* watchAllFilterChange() {
    yield takeLatest([StoreActionCommonFilters.commonFilterSet.type, StoreActionChannelPerformance.setSubFilter.type],
        function* (action: AnyAction) {
            // Call both functions concurrently using fork
            yield fork(handleTimeSeries);
            yield fork(handleAggs);
        });
}

// export function* watchAllFilterChange() {
//     yield takeLatest([StoreActionCommonFilters.commonFilterSet.type, StoreActionChannelPerformance.setSubFilter.type], handleTimeSeries);
// }

export function* watchChannelPerformance() {
    yield all([fork(watchAllFilterChange)]);
}

