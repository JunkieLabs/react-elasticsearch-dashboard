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
    setCommonFilter: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setCommonFilter } = commonFiltersSlice.actions;

export const CommonFiltersReducers =  commonFiltersSlice.reducer;