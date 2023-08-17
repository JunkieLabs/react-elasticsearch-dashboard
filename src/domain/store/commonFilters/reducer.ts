import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreConstants } from '../store.constants';

interface FilterState {
  value: string;
  ageRange: number[]
}

const initialState: FilterState = {
  value: '',
  ageRange: StoreConstants.filterCommon.ageRange
};

const commonFiltersSlice = createSlice({
  name: 'commonFilters',
  initialState,
  reducers: {
    commonFilterSet: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    commonFilterSetAgeRange: (state, action: PayloadAction<number[]>) => {
      state.ageRange = action.payload;
    },
    
  },


});

export const { commonFilterSet, commonFilterSetAgeRange } = commonFiltersSlice.actions;

export const CommonFiltersReducers =  commonFiltersSlice.reducer;