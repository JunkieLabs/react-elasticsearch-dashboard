import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreConstants } from '../store.constants';
import subDays from 'date-fns/subDays';

interface FilterState {
  value: Date[];
  ageRange: number[]
}

const initialState: FilterState = {
  value: [new Date(), subDays(new Date(), 7),],
  ageRange: StoreConstants.filterCommon.ageRange
};

const commonFiltersSlice = createSlice({
  name: 'commonFilters',
  initialState,
  reducers: {
    commonFilterSet: (state, action: PayloadAction<Date[]>) => {
      state.value = action.payload;
    },
    commonFilterAgeInit: (state, action: PayloadAction<void>) => {
      
    },
    commonFilterSetAgeRange: (state, action: PayloadAction<number[]>) => {
      state.ageRange = action.payload;
    },
    
  },


});

// export const { commonFilterSet, commonFilterSetAgeRange, commonFilterAgeInit } = commonFiltersSlice.actions;
export const StoreActionCommonFilters = commonFiltersSlice.actions;

export const CommonFiltersReducers =  commonFiltersSlice.reducer;