import { ModelChannelPerformanceFilters } from '@/types/store/channelPerformance';
import { DummyData } from '@/types/store/dummyData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreConstants } from '../store.constants';



interface ChannelPerformanceState {
    dummyData: DummyData[];
    subFilter: ModelChannelPerformanceFilters;
}


const initialState: ChannelPerformanceState = {
    dummyData: [],
    subFilter: {
        bucket: '',
        plots: [{
            color: "#234343",
            indentifier: StoreConstants.channelPerformance.filters.plotBouquetIdentifier,
            key: "Bouquet1",
            name: "Bouquet 1",
            texts: ["Bouquet 1"]

        },
        {
            color: "#934343",
            indentifier: StoreConstants.channelPerformance.filters.plotChannelIdentifier,
            key: "channel2",
            name: "Channel 2",
            texts: ["Bouquet 2", "Channel 22"]

        }]
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