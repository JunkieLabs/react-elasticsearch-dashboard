import { ModelDummyChartsFilters } from '@/types/store/dummyCharts';
import { DummyData } from '@/types/store/dummyData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface DummyChartsState {
    dummyData: DummyData[];
    subFilter: ModelDummyChartsFilters;
}


const initialState: DummyChartsState = {
    dummyData: [],
    subFilter: {
       bucket:''
    },
    
};

const dummyChartSlice = createSlice({
    name: 'dummyCharts',
    initialState,
    reducers: {
        setDummyChartData: (state, action: PayloadAction<DummyData[]>) => {
            state.dummyData = action.payload;
        },
        setSubFilter: (state, action: PayloadAction<ModelDummyChartsFilters>) => {
            state.subFilter = action.payload;
        },
    },
});

// export const { setDummyChartData, channelPerformanceSetSubFilter } = channelPerformanceSlice.actions;
export const StoreActionDummyChart = dummyChartSlice.actions;

export const DummyChartsReducers = dummyChartSlice.reducer;