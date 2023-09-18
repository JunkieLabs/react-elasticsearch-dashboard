import { ModelSlowChannelFilters } from '@/types/store/slowChannel';
import { DummyData } from '@/types/store/dummyData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';
import { StoreConstants } from '../store.constants';



interface SlowChannelState {
    dummyData: DummyData[];
    aggregation: ModelElasticAggsResultItem[],
    subFilter: ModelSlowChannelFilters;
    loadingStage: number;
    initialStage: number;
}


const initialState: SlowChannelState = {
    dummyData: [],
    aggregation: [],
    subFilter: {
        gender: StoreConstants.filterCommon.gender.all,
        pincodes: [],
    },
    loadingStage: StoreConstants.loadingStage.loading,

    initialStage: StoreConstants.initialStage.initial

};

const slowChannelSlice = createSlice({
    name: 'SlowChannel',
    initialState,
    reducers: {
        setDummyChartData: (state, action: PayloadAction<DummyData[]>) => {
            state.dummyData = action.payload;
        },
        setAggregation: (state, action: PayloadAction<ModelElasticAggsResultItem[]>) => {
            state.aggregation = action.payload;
        },
        setLoadingStage: (state, action: PayloadAction<number>) => {

            if (action.payload == StoreConstants.loadingStage.loaded && state.initialStage == StoreConstants.initialStage.initial) {
                state.initialStage = StoreConstants.initialStage.loaded
            }
            state.loadingStage = action.payload;

        },
        setSubFilter: (state, action: PayloadAction<ModelSlowChannelFilters>) => {
            state.subFilter = action.payload;
        },
        // setSubFilterRegion: (state, action: PayloadAction<ModelElasticCity| undefined>) => {
        //     state.subFilter.region = action.payload;
        //     dispatch()
        // },
    },
});

// export const { setDummyChartData, TlowChannelSetSubFilter } = tlowChannelSlice.actions;
export const StoreActionSlowChannel = slowChannelSlice.actions;
export const SlowChannelReducers = slowChannelSlice.reducer;