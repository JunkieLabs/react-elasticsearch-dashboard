import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  value: string;
}

const initialState: FilterState = {
  value: '',
};

const commonFiltersSlice = createSlice({
  name: 'commonFilters',
  initialState,
  reducers: {
    commonFilterSet: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { commonFilterSet } = commonFiltersSlice.actions;

export const CommonFiltersReducers =  commonFiltersSlice.reducer;