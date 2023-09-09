import { parsePaths } from '@/tools/parserTools';
import { ModelStoreConfigurationFilter } from '@/types/store/configuration';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreConstants } from '../store.constants';

interface ConfigurationState {
    filters:
    ReturnType<typeof configurationFilterAdapter.getInitialState> & {
        ids: string[];
        entities: { [k: string]: ModelStoreConfigurationFilter };
    },//ModelStoreConfigurationFilter[];
    topChannelsCount: number;
    slowChannelsCount: number;
}
export const configurationFilterAdapter = createEntityAdapter<ModelStoreConfigurationFilter>({
    selectId: (model) => model.name
});

const initialFilters = [
    {
        name: StoreConstants.configuration.filters.filterAge,
        isEnabled: true,
        label: "Based on age"
    },
    {
        name: StoreConstants.configuration.filters.filterGender,
        isEnabled: true,
        label: "Based on Gender"
    },
    {
        name: StoreConstants.configuration.filters.filterRegion,
        isEnabled: true,
        label: "Based on Region"
    },
    {
        name: StoreConstants.configuration.filters.filterPincode,
        isEnabled: true,
        label: "Based on Pincode"
    },
    {
        name: StoreConstants.configuration.filters.filterBouquet,
        isEnabled: true,
        label: "Based on Bouquet"
    }

];

const initialState: ConfigurationState = {

    filters: configurationFilterAdapter.getInitialState(
        {
            ids: initialFilters.map(val => val.name),
            entities: Object.fromEntries(initialFilters.map(val => [val.name, val]))
        },

    ),

    // filters: 
    //[
    //     {
    //         name: StoreConstants.configuration.filters.filterAge,
    //         isEnabled: true,
    //         label: "Based on age"
    //     },
    //     {
    //         name: StoreConstants.configuration.filters.filterGender,
    //         isEnabled: true,
    //         label: "Based on Gender"
    //     },
    //     {
    //         name: StoreConstants.configuration.filters.filterRegion,
    //         isEnabled: true,
    //         label: "Based on Region"
    //     },
    //     {
    //         name: StoreConstants.configuration.filters.filterPincode,
    //         isEnabled: true,
    //         label: "Based on Pincode"
    //     },
    //     {
    //         name: StoreConstants.configuration.filters.filterBouquet,
    //         isEnabled: true,
    //         label: "Based on Bouquet"
    //     }

    // ],
    topChannelsCount: 5,
    slowChannelsCount: 5
}

const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    reducers: {
        addFilter: (state, action: PayloadAction<ModelStoreConfigurationFilter>) => {
            configurationFilterAdapter.addOne(state.filters, action.payload);
        },
        updateFilter: (state, action: PayloadAction<ModelStoreConfigurationFilter>) => {
            configurationFilterAdapter.updateOne(state.filters, {
                id: action.payload.name,
                changes: action.payload,
            });
        },
        topChannelCounts: (state, action: PayloadAction<number>) => {
            state.topChannelsCount = action.payload;
        },
        slowChannelCounts: (state, action: PayloadAction<number>) => {
            state.slowChannelsCount = action.payload;
        },
        // addFilter: configurationFilterAdapter.addOne,
        // updateData: configurationFilterAdapter.updateOne,
        // setFilterState: (state, action: PayloadAction<ModelStoreConfigurationFilter[]>) => {

        //     // state.filters.replace
        //     var data = action.payload;
        //     //   state.filters = data;
        //     //   var paths = parsePaths(routePath).slice(0, 2);

        //     //   state.section = paths.length>0 ? paths[0] :"";
        //     //   state.subSection = paths.length>1 ? paths[1] :"";
        // },
    },
});

export const StoreActionConfiguration = configurationSlice.actions;

export const ConfigurationReducers = configurationSlice.reducer;