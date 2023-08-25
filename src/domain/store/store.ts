'use client'

import createSagaMiddleware from 'redux-saga';

import { CommonFiltersReducers } from '@/domain/store/commonFilters/reducer';
import { ChannelPerformanceReducers } from '@/domain/store/channelPerformance/reducer';
import { TopChannelReducers } from '@/domain/store/topChannel/reducer';
import { AppReducers } from '@/domain/store/app/reducer';
import { configureStore } from '@reduxjs/toolkit'
import { rootSaga } from './rootSaga';
import { CitiesReducers } from './cities/reducer';
import { ConfigurationReducers } from './configuration/reducer';
import { PincodesReducers } from './pincodes/reducer';



const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        App: AppReducers,
        Configuration: ConfigurationReducers,
        Cities: CitiesReducers,
        Pincodes: PincodesReducers,
        CommonFilters : CommonFiltersReducers,
        ChannelPerformance: ChannelPerformanceReducers,
        TopChannel: TopChannelReducers
    },
    middleware:[sagaMiddleware]
})


sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;