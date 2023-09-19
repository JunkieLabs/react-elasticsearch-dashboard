import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreConstants } from '../store.constants';
import { ModelAuthLogin } from '@/types/auth/auth';

// import { ModelElasticPincode } from '@/types/elastic/pincodes/';

interface AuthState {
    email?: string;
    token?: string;
    //   search: string
    error?: string
    runningStage: number
    //   bouquetChannelsMap: {
    //     [key:string]: string[]
    //   }
}

const initialState: AuthState = {
    //   items: [],

    runningStage: StoreConstants.runningStage.notRunning,
    //   search:"", 
    //   bouquetChannelsMap: {}
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<void>) => {

        },

        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        login: (state, action: PayloadAction<ModelAuthLogin>) => {
            // state.error = action.payload;
        },

        setRunningStage: (state, action: PayloadAction<number>) => {

            if (action.payload == StoreConstants.runningStage.notRunning) {
                state.error = undefined


            }

            state.runningStage = action.payload


        },


        // initChannelsForBouquet: (state, action: PayloadAction<string>) => {
        //     state.activeBouquet = action.payload
        // },
        // search:(state, action: PayloadAction<string>) =>{
        //   state.search = action.payload
        // }

    },


});

export const StoreActionAuth = authSlice.actions;

export const AuthReducers = authSlice.reducer;