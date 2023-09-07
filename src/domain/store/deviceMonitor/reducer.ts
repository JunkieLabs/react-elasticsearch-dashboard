import { ModelChannelPerformanceFilters } from '@/types/store/channelPerformance';
import { DummyData } from '@/types/store/dummyData';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreConstants } from '../store.constants';
import { ModelElasticAggsResultItem } from '@/types/elastic/aggs';
import { ModelElasticEvent, ModelElasticEventHit } from '@/types/elastic/events/events';
import { ModelElasticEventMonitorResult } from '@/types/elastic/events/monitor';
import { ModelStorePagination } from '@/types/store/pagination';



export interface DeviceMonitorState {
    activeList: ReturnType<typeof deviceMonitorActiveListAdapter.getInitialState> & {
        ids: string[];
        entities: { [k: string]: ModelElasticEventHit };
    }
    allList: ReturnType<typeof deviceMonitorAllListAdapter.getInitialState> & {
        ids: string[];
        entities: { [k: string]: ModelElasticEventHit };
    }
    activeListPagination: {
        offset: number,
        limit: number,
        isEnd: boolean
    }

    inactiveListPagination: {
        offset: number,
        limit: number,
        isEnd: boolean
    }

    connectedListPagination: {
        offset: number,
        limit: number,
        isEnd: boolean
    }

    allListPagination: {
        offset: number,
        limit: number,
        isEnd: boolean
    }

    stats: {
        active: number,
        inactive: number,
        connected: number,
        all: number
    }

}

export const deviceMonitorActiveListAdapter = createEntityAdapter<ModelElasticEventHit>({
    selectId: (model) => model._id
});
export const deviceMonitorAllListAdapter = createEntityAdapter<ModelElasticEventHit>({
    selectId: (model) => model._id
});


const initialState: DeviceMonitorState = {
    activeList: deviceMonitorActiveListAdapter.getInitialState(
        {
            ids: [],
            entities: Object.fromEntries([])
        },
    ),
    allList: deviceMonitorAllListAdapter.getInitialState(
        {
            ids: [],
            entities: Object.fromEntries([])
        },
    ),

    activeListPagination: {
        offset: 0,
        limit: 2,
        isEnd: false
    },
    inactiveListPagination: {
        offset: 0,
        limit: 2,
        isEnd: false
    },
    allListPagination: {
        offset: 0,
        limit: 10,
        isEnd: false
    },
    connectedListPagination: {
        offset: 0,
        limit: 2,
        isEnd: false
    },
    stats: {
        active: 0,
        inactive: 0,
        all: 0,
        connected: 0
    }

};

const deviceMonitorSlice = createSlice({
    name: 'deviceMonitor',
    initialState,
    reducers: {
        initCounter: (state, action: PayloadAction<void>) => {

        },
        setStats: (state, action: PayloadAction<ModelElasticEventMonitorResult>) => {
            // state.stats = action.payload;
            state = { ...initialState, stats: action.payload }

            console.log("setStats: ", state)
            return state;
        },

        allAddItems: (state, action: PayloadAction<ModelElasticEventHit[]>) => {

            var totalPrev = deviceMonitorAllListAdapter.getSelectors().selectTotal(state.allList)
            if (action.payload.length + totalPrev == state.stats.all) {
                state.allListPagination.isEnd = true
            }
            deviceMonitorAllListAdapter.addMany(state.allList, action.payload);
        },

        allSetPagination: (state, action: PayloadAction<ModelStorePagination>) => {

            console.log("allSetPagination: ");

            if (action.payload.offset < state.stats.all) {
                console.log("allSetPagination 3: ");
                //if()//
                state.allListPagination.limit = action.payload.limit
                state.allListPagination.offset = action.payload.offset
            }
        }




    },
});

// export const { setDummyChartData, channelPerformanceSetSubFilter } = deviceMonitorSlice.actions;
export const StoreActionDeviceMonitor = {
    initCounter: deviceMonitorSlice.actions.initCounter,
    setStats: deviceMonitorSlice.actions.setStats,

    // TODO fix
    all: {
        addItems: deviceMonitorSlice.actions.allAddItems,
        pagination: deviceMonitorSlice.actions.allSetPagination
    },
    active: {
        addItems: deviceMonitorSlice.actions.allAddItems,
        pagination: deviceMonitorSlice.actions.allSetPagination
    },
    inactive: {
        addItems: deviceMonitorSlice.actions.allAddItems,
        pagination: deviceMonitorSlice.actions.allSetPagination
    },

    connected: {
        addItems: deviceMonitorSlice.actions.allAddItems,
        pagination: deviceMonitorSlice.actions.allSetPagination
    }
};



export const DeviceMonitorReducers = deviceMonitorSlice.reducer;