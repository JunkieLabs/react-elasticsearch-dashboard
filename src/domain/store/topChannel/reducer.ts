import { ModelTopChannelFilters } from '@/types/store/topChannel';
import { DummyData } from '@/types/store/dummyData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';
import { ModelElasticCity } from '@/types/elastic/cities/cities';



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
    name: 'topChannel',
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
        // setSubFilterRegion: (state, action: PayloadAction<ModelElasticCity| undefined>) => {
        //     state.subFilter.region = action.payload;
        //     dispatch()
        // },
    },
});

// export const { setDummyChartData, TopChannelSetSubFilter } = topChannelSlice.actions;
export const StoreActionTopChannel = topChannelSlice.actions;
export const TopChannelReducers = topChannelSlice.reducer;