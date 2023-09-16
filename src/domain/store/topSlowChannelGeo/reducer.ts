import { ModelSlowChannelFilters } from '@/types/store/slowChannel';
import { DummyData } from '@/types/store/dummyData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';
import { StoreConstants } from '../store.constants';
import { ModelTopSlowChannelGeoFilters } from '@/types/store/topSlowChannelGeo';
import { ModelElasticEventHitPart } from '@/types/elastic/events/events';



interface TopSlowChannelGeoState {
    dummyData: DummyData[];
    // aggregation: ModelElasticAggsResultItem[],
    subFilter: ModelTopSlowChannelGeoFilters;
    
    hits: ModelElasticEventHitPart[],
}


const initialState: TopSlowChannelGeoState = {
    dummyData: [],
    hits: [],
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
        setHits: (state, action: PayloadAction<ModelElasticEventHitPart[]>) => {
            state.hits = action.payload;
        },
        setSubFilter: (state, action: PayloadAction<ModelTopSlowChannelGeoFilters>) => {
            state.subFilter = action.payload;
        }, 
        
    },
});

// export const { setDummyChartData, TlowChannelSetSubFilter } = tlowChannelSlice.actions;
export const StoreActionTopSlowChannelGeo = topSlowChannelGeoSlice.actions;
export const TopSlowChannelGeoReducers = topSlowChannelGeoSlice.reducer;