import { DummyData } from '@/types/store/dummyData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface ChannelPerformanceState {
    dummyData: DummyData[];
    subFilter: string;
}


const initialState: ChannelPerformanceState = {
    dummyData: [],
    subFilter: ''
};

const channelPerformanceSlice = createSlice({
    name: 'channelPerforamce',
    initialState,
    reducers: {
        setDummyChartData: (state, action: PayloadAction<DummyData[]>) => {
            state.dummyData = action.payload;
        },
        setSubFilter: (state, action: PayloadAction<string>) => {
            state.subFilter = action.payload;
        },
    },
});

export const { setDummyChartData, setSubFilter } = channelPerformanceSlice.actions;
export const ChannelPerformanceReducers = channelPerformanceSlice.reducer;