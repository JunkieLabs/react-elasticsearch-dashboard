import { ModelTopChannelFilters } from '@/types/store/topChannel';
import { DummyData } from '@/types/store/dummyData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';



interface TopChannelState {
    dummyData: DummyData[];
    aggregation: ModelElasticAggsResultItem[],
    subFilter: ModelTopChannelFilters;
}


const initialState: TopChannelState = {
    dummyData: [],
    aggregation: [],
    subFilter: {
        gender: 'all',
        pincodes: [],
    },
    
};

const topChannelSlice = createSlice({
    name: 'channelPerforamce',
    initialState,
    reducers: {
        setDummyChartData: (state, action: PayloadAction<DummyData[]>) => {
            state.dummyData = action.payload;
        },
        setAggregation: (state, action: PayloadAction<ModelElasticAggsResultItem[]>) => {
            state.aggregation = action.payload;
        },
        setSubFilter: (state, action: PayloadAction<ModelTopChannelFilters>) => {
            state.subFilter = action.payload;
        },
    },
});

// export const { setDummyChartData, TopChannelSetSubFilter } = topChannelSlice.actions;
export const StoreActionTopChannel = topChannelSlice.actions;
export const TopChannelReducers = topChannelSlice.reducer;