import { ModelSlowChannelFilters } from '@/types/store/slowChannel';
import { DummyData } from '@/types/store/dummyData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';
import { StoreConstants } from '../store.constants';
import { ModelTopSlowChannelGeoFilters } from '@/types/store/topSlowChannelGeo';



interface TopSlowChannelGeoState {
    dummyData: DummyData[];
    aggregation: ModelElasticAggsResultItem[],
    subFilter: ModelTopSlowChannelGeoFilters;
}


const initialState: TopSlowChannelGeoState = {
    dummyData: [],
    aggregation: [],
    subFilter: {
        gender: StoreConstants.filterCommon.gender.all,
        pincodes: [],
        isTop: true
    },
    
};

const topSlowChannelGeoSlice = createSlice({
    name: 'TopSlowChannelGeo',
    initialState,
    reducers: {
        setAggregation: (state, action: PayloadAction<ModelElasticAggsResultItem[]>) => {
            state.aggregation = action.payload;
        },
        setSubFilter: (state, action: PayloadAction<ModelTopSlowChannelGeoFilters>) => {
            state.subFilter = action.payload;
        }, 
        
    },
});

// export const { setDummyChartData, TlowChannelSetSubFilter } = tlowChannelSlice.actions;
export const StoreActionTopSlowChannelGeo = topSlowChannelGeoSlice.actions;
export const TopSlowChannelGeoReducers = topSlowChannelGeoSlice.reducer;