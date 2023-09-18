import { ModelChannelPerformanceFilters } from '@/types/store/channelPerformance';
import { DummyData } from '@/types/store/dummyData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreConstants } from '../store.constants';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';



interface ChannelPerformanceState {
    dummyData: DummyData[];
    subFilter: ModelChannelPerformanceFilters;
    plots: ModelAnalyticPlot[];
    multiAggs: {
        items: ModelElasticAggsResultItem[],
        total: number
    },

    timeSeries: ModelElasticAggsResultItem[],

    
    loadingStage: number;
    initialStage: number;
}


const initialState: ChannelPerformanceState = {
    dummyData: [],
    subFilter: {
        bucket: '',
        bouquets: [],
        bouquetChannelsMap: {},

    },
    multiAggs: {
        items: [],
        total:0
    },
    plots: [],
    timeSeries: [],
    loadingStage: StoreConstants.loadingStage.loading,

    initialStage: StoreConstants.initialStage.initial

};

/**
 {
        color: "#234343",
        indentifiers: [{ [StoreConstants.channelPerformance.filters.plotBouquetIdentifier]: "Bouquet1" }],
        key: "Bouquet1",
        name: "Bouquet 1",
        texts: ["Bouquet 1"]

    },
    {
        color: "#934343",
        indentifiers: [{ [StoreConstants.channelPerformance.filters.plotBouquetIdentifier]: "Bouquet2" }, { [StoreConstants.channelPerformance.filters.plotChannelIdentifier]: "channel2" }],
        key: "Bouquet2_channel2",
        name: "Channel 2",
        texts: ["Bouquet 2", "Channel 22"]

    }
 */

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
        setAggregation: (state, action: PayloadAction<ModelElasticAggsResultItem[]>) => {
            state.timeSeries = action.payload;
        },
        setLoadingStage: (state, action: PayloadAction<number>) => {

            if (action.payload == StoreConstants.loadingStage.loaded && state.initialStage == StoreConstants.initialStage.initial) {
                state.initialStage = StoreConstants.initialStage.loaded
            }
            state.loadingStage = action.payload;

        },

        setMultiAggregation: (state, action: PayloadAction< {
            items: ModelElasticAggsResultItem[],
            total: number
        }>) => {
            state.multiAggs = action.payload;
        },

        setPlots: (state, action: PayloadAction<ModelAnalyticPlot[]>) => {
            state.plots = action.payload;
        },
    },
});

// export const { setDummyChartData, channelPerformanceSetSubFilter } = channelPerformanceSlice.actions;
export const StoreActionChannelPerformance = channelPerformanceSlice.actions;

export const ChannelPerformanceReducers = channelPerformanceSlice.reducer;