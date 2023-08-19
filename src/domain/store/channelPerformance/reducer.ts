import { ModelChannelPerformanceFilters } from '@/types/store/channelPerformance';
import { DummyData } from '@/types/store/dummyData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface ChannelPerformanceState {
    dummyData: DummyData[];
    subFilter: ModelChannelPerformanceFilters;
}


const initialState: ChannelPerformanceState = {
    dummyData: [],
    subFilter: {
       bucket:''
    },
    
};

const channelPerformanceSlice = createSlice({
    name: 'channelPerforamce',
    initialState,
    reducers: {
        setDummyChartData: (state, action: PayloadAction<DummyData[]>) => {
            state.dummyData = action.payload;
        },
        setSubFilter: (state, action: PayloadAction<ModelChannelPerformanceFilters>) => {
            state.subFilter = action.payload;
        },
    },
});

// export const { setDummyChartData, channelPerformanceSetSubFilter } = channelPerformanceSlice.actions;
export const StoreActionChannelPerformance = channelPerformanceSlice.actions;

export const ChannelPerformanceReducers = channelPerformanceSlice.reducer;