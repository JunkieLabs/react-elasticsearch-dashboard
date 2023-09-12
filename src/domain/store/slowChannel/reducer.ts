import { ModelSlowChannelFilters } from '@/types/store/slowChannel';
import { DummyData } from '@/types/store/dummyData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';
import { ModelElasticCity } from '@/types/elastic/cities/cities';
import { ElasticConstants } from '@/data/elastic/elastic.constants';
import { StoreConstants } from '../store.constants';



interface SlowChannelState {
    dummyData: DummyData[];
    aggregation: ModelElasticAggsResultItem[],
    subFilter: ModelSlowChannelFilters;
}


const initialState: SlowChannelState = {
    dummyData: [],
    aggregation: [],
    subFilter: {
        gender: StoreConstants.filterCommon.gender.all,
        pincodes: [],
    },
    
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