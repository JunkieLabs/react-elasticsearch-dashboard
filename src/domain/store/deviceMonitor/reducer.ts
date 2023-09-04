import { ModelChannelPerformanceFilters } from '@/types/store/channelPerformance';
import { DummyData } from '@/types/store/dummyData';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreConstants } from '../store.constants';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';
import { ModelElasticEvent, ModelElasticEventHit } from '@/types/elastic/events/events';



interface DeviceMonitorState {
    activeList: ReturnType<typeof deviceMonitorActiveListAdapter.getInitialState> & {
        ids: string[];
        entities: { [k: string]: ModelElasticEventHit };
    }
    activeListPagination: {
        offset: number,
        limit: number,
        isEnd: boolean,
        total: number
    }

    inactiveListPagination: {
        offset: number,
        limit: number,
        isEnd: boolean,
        total: number
    }

    connectedListPagination: {
        offset: number,
        limit: number,
        isEnd: boolean,
        total: number
    }

    allListPagination: {
        offset: number,
        limit: number,
        isEnd: boolean,
        total: number
    }




}

export const deviceMonitorActiveListAdapter = createEntityAdapter<ModelElasticEventHit>({
    selectId: (model) => model._id
});


const initialState: DeviceMonitorState = {
    activeList: deviceMonitorActiveListAdapter.getInitialState(
        {
            ids: [],
            entities: Object.fromEntries([])
        },

    ),
    activeListPagination: {
        offset: 0,
        limit: 10,
        
        isEnd: false,
        total: 0
    },
    inactiveListPagination: {
        offset: 0,
        limit: 10,
        isEnd: false,
        total: 0
    },
    allListPagination: {
        offset: 0,
        limit: 10,
        isEnd: false,
        total: 0
    },
    connectedListPagination: {
        offset: 0,
        limit: 10,
        isEnd: false,
        total: 0
    },

};

const deviceMonitorSlice = createSlice({
    name: 'deviceMonitor',
    initialState,
    reducers: {
        initCounter: (state, action: PayloadAction<void>) => {
      
        },
        // setAggregation: (state, action: PayloadAction<ModelElasticAggsResultItem[]>) => {
        //     state.timeSeries = action.payload;
        // },


    },
});

// export const { setDummyChartData, channelPerformanceSetSubFilter } = deviceMonitorSlice.actions;
export const StoreActionDeviceMonitor = deviceMonitorSlice.actions;

export const DeviceMonitorReducers = deviceMonitorSlice.reducer;