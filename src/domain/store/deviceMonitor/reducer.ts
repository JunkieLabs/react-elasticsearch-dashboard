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
    inactiveList: ReturnType<typeof deviceMonitorInactiveListAdapter.getInitialState> & {
        ids: string[];
        entities: { [k: string]: ModelElasticEventHit };
    }
    connectedList: ReturnType<typeof deviceMonitorConnectedListAdapter.getInitialState> & {
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

export const deviceMonitorInactiveListAdapter = createEntityAdapter<ModelElasticEventHit>({
    selectId: (model) => model._id
});

export const deviceMonitorConnectedListAdapter = createEntityAdapter<ModelElasticEventHit>({
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
    inactiveList: deviceMonitorInactiveListAdapter.getInitialState(
        {
            ids: [],
            entities: Object.fromEntries([])
        },
    ), 
    connectedList: deviceMonitorConnectedListAdapter.getInitialState(
        {
            ids: [],
            entities: Object.fromEntries([])
        },
    ),
    activeListPagination: {
        offset: 0,
        limit: 10,
        isEnd: false
    },
    inactiveListPagination: {
        offset: 0,
        limit: 10,
        isEnd: false
    },
    allListPagination: {
        offset: 0,
        limit: 10,
        isEnd: false
    },
    connectedListPagination: {
        offset: 0,
        limit: 10,
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
            console.log("#### setStats: stats:", state, action.payload)
           
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
        },

        activeAddItems: (state, action: PayloadAction<ModelElasticEventHit[]>) => {

            var totalPrev = deviceMonitorActiveListAdapter.getSelectors().selectTotal(state.activeList)
            if (action.payload.length + totalPrev == state.stats.active) {
                state.activeListPagination.isEnd = true
            }
            deviceMonitorActiveListAdapter.addMany(state.activeList, action.payload);
        },

        activeSetPagination: (state, action: PayloadAction<ModelStorePagination>) => {

            // console.log("activeSetPagination: ");

            if (action.payload.offset < state.stats.active) {
                // console.log("activeSetPagination 3: ");
                //if()//
                state.activeListPagination.limit = action.payload.limit
                state.activeListPagination.offset = action.payload.offset
            }
        },

        inactiveAddItems: (state, action: PayloadAction<ModelElasticEventHit[]>) => {

            var totalPrev = deviceMonitorInactiveListAdapter.getSelectors().selectTotal(state.inactiveList)
            if (action.payload.length + totalPrev == state.stats.inactive) {
                state.inactiveListPagination.isEnd = true
            }
            deviceMonitorInactiveListAdapter.addMany(state.inactiveList, action.payload);
        },

        inactiveSetPagination: (state, action: PayloadAction<ModelStorePagination>) => {

            // console.log("activeSetPagination: ");

            if (action.payload.offset < state.stats.inactive) {
                // console.log("activeSetPagination 3: ");
                //if()//
                state.inactiveListPagination.limit = action.payload.limit
                state.inactiveListPagination.offset = action.payload.offset
            }
        },

        connectedAddItems: (state, action: PayloadAction<ModelElasticEventHit[]>) => {

            var totalPrev = deviceMonitorInactiveListAdapter.getSelectors().selectTotal(state.connectedList)
            if (action.payload.length + totalPrev == state.stats.connected) {
                state.connectedListPagination.isEnd = true
            }
            deviceMonitorConnectedListAdapter.addMany(state.connectedList, action.payload);
        },

        connectedSetPagination: (state, action: PayloadAction<ModelStorePagination>) => {

            // console.log("activeSetPagination: ");

            if (action.payload.offset < state.stats.connected) {
                // console.log("activeSetPagination 3: ");
                //if()//
                state.connectedListPagination.limit = action.payload.limit
                state.connectedListPagination.offset = action.payload.offset
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
        addItems: deviceMonitorSlice.actions.activeAddItems,
        pagination: deviceMonitorSlice.actions.activeSetPagination
    },
    inactive: {
        addItems: deviceMonitorSlice.actions.inactiveAddItems,
        pagination: deviceMonitorSlice.actions.inactiveSetPagination
    },

    connected: {
        addItems: deviceMonitorSlice.actions.connectedAddItems,
        pagination: deviceMonitorSlice.actions.connectedSetPagination
    }
};



export const DeviceMonitorReducers = deviceMonitorSlice.reducer;