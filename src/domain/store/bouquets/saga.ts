import { all, fork, put, select, takeLatest } from "redux-saga/effects";
// import { watchSubFilterChange, watchCommonFilterChangeForDummyData } from "../channelPerformance/saga";
import { StoreActionBouquets } from "./reducer";
import { ElasticBouquetRepo } from "@/data/elastic/bouquets/bouquets";
import { ModelElasticAggsResultItem } from "@/types/elastic/aggs";
import { RootState } from "../store";

export function* handleBouquetsList() {


    try {
        const result: ModelElasticAggsResultItem[] = yield ElasticBouquetRepo.getAll()
        // console.log("handleBouquetsList result: ", result)
        if (result.length > 0) {
            yield put(StoreActionBouquets.setAll(result.map(item => (item.key as string))));

        }


    } catch (error) {

        console.log("handleBouquetsList error: ", error)
    }


    // console.log("handleBouquetsList result: ", result)
    // yield put(commonFilterSetAgeRange([30, 70]));
}


export function* handleBouquetChannelsList() {
    try {
        console.log("handleBouquetChannelsList:")
        const bouquet: string = yield select((state: RootState) => state.Bouquets.activeBouquet);
        const result: ModelElasticAggsResultItem[] = yield ElasticBouquetRepo.getAllByBouquet(bouquet)
        // console.log("handleBouquetChannelsList result: ", result)
        if (result.length > 0) {
            yield put(StoreActionBouquets.setBouquetChannels({ bouquet: bouquet, channels: result.map(item => (item.key as string)) }));

        }


    } catch (error) {

        console.log("handleBouquetChannelsList error: ", error)
    }
}

// export function* onlyOnceCommonFilterAgeRange() {
//     yield fork(handleBouquetsList);
// }
export function* watchBouquetsInit() {
    yield takeLatest(StoreActionBouquets.init.type, handleBouquetsList);
}

export function* watchBouquetChannelsInit() {
    yield takeLatest(StoreActionBouquets.initChannelsForBouquet.type, handleBouquetChannelsList);
}
export function* watchBouquets() {
    yield all([fork(watchBouquetsInit), fork(watchBouquetChannelsInit)]);
}