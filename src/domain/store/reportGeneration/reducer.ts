import { ModelSlowChannelFilters } from '@/types/store/slowChannel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';
import { ModelElasticEventHit } from '@/types/elastic/events/events';
import { StoreConstants } from '../store.constants';
import subDays from 'date-fns/subDays';



interface ReportGenerationState {
    logs: ModelElasticEventHit[],
    filterDateRange: Date[];
    dateRange: Date[]

    stage: number


}


const initialState: ReportGenerationState = {
    logs: [],
    filterDateRange: [subDays(new Date(), 7), new Date(), ],
    dateRange: [],
    stage: StoreConstants.reportGeneration.stage.initial

};

const reportGenerationSlice = createSlice({
    name: 'ReportGeneration',
    initialState,
    reducers: {
        filterDateRange: (state, action: PayloadAction<Date[]>) => {
            state.filterDateRange = action.payload;
            state.stage = StoreConstants.reportGeneration.stage.loading
        },

        addItems: (state, action: PayloadAction<ModelElasticEventHit[]>) => {

            console.log("reportGenerationSlice addItems: ", action.payload)
            state.logs = action.payload;
            state.stage = StoreConstants.reportGeneration.stage.loaded
            
            console.log("reportGenerationSlice addItems 2: ", state)
        },

        clear: (state, action: PayloadAction<void>) => {

            
            state.stage = StoreConstants.reportGeneration.stage.initial
            
            state.logs = []
        },

        // setSubFilterRegion: (state, action: PayloadAction<ModelElasticCity| undefined>) => {
        //     state.subFilter.region = action.payload;
        //     dispatch()
        // },
    },
});

// export const { setDummyChartData, TlowChannelSetSubFilter } = tlowChannelSlice.actions;
export const StoreActionReportGeneration = reportGenerationSlice.actions;
export const ReportGenerationReducers = reportGenerationSlice.reducer;