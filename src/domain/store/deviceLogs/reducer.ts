import { ModelChannelPerformanceFilters } from '@/types/store/channelPerformance';
import { DummyData } from '@/types/store/dummyData';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreConstants } from '../store.constants';
import { ModelElasticEvent, ModelElasticEventHit } from '@/types/elastic/events/events';
import { ModelElasticEventMonitorResult } from '@/types/elastic/events/monitor';
import { ModelStorePagination } from '@/types/store/pagination';



export interface DeviceLogsState {
    logsList: ReturnType<typeof deviceLogsListAdapter.getInitialState> & {
        ids: string[];
        entities: { [k: string]: ModelElasticEventHit };
    }
   
    pagination: {
        offset: number,
        limit: number,
        isEnd: boolean
    }

    total: number
    deviceName? : string


}

export const deviceLogsListAdapter = createEntityAdapter<ModelElasticEventHit>({
    selectId: (model) => model._id
});


const initialState: DeviceLogsState = {
    logsList: deviceLogsListAdapter.getInitialState(
        {
            ids: [],
            entities: Object.fromEntries([])
        },
    ),
  

    pagination: {
        offset: 0,
        limit: 10,
        isEnd: false
    },
    total: 0,
    
    deviceName: undefined

};

const deviceLogsSlice = createSlice({
    name: 'deviceMonitor',
    initialState,
    reducers: {
        setTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload

        },
        setDeviceName: (state, action: PayloadAction<string| undefined>) => {
            // state.stats = action.payload;

            if(state.deviceName == action.payload)return state;

            state = { ...initialState, deviceName: action.payload }

            console.log("setStats: ", state)
            return state;
        },

        addItems: (state, action: PayloadAction<ModelElasticEventHit[]>) => {

            var totalPrev = deviceLogsListAdapter.getSelectors().selectTotal(state.logsList)
            if (action.payload.length + totalPrev == state.total) {
                state.pagination.isEnd = true
            }
            deviceLogsListAdapter.addMany(state.logsList, action.payload);
        },

        setPagination: (state, action: PayloadAction<ModelStorePagination>) => {

            console.log("allSetPagination: ");

            if (action.payload.offset < state.total) {
                console.log("allSetPagination 3: ");
                //if()//
                state.pagination.limit = action.payload.limit
                state.pagination.offset = action.payload.offset
            }
        }




    },
});

// export const { setDummyChartData, channelPerformanceSetSubFilter } = deviceLogsSlice.actions;
export const StoreActionDeviceLogs = {
    setTotal: deviceLogsSlice.actions.setTotal,
    setDeviceName: deviceLogsSlice.actions.setDeviceName,
    addItems: deviceLogsSlice.actions.addItems,
    pagination: deviceLogsSlice.actions.setPagination
  
};



export const DeviceLogsReducers = deviceLogsSlice.reducer;