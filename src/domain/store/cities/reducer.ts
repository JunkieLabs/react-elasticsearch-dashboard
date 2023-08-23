import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModelElasticCity } from '@/types/elastic/cities/cities';

interface CityState {
  values: ModelElasticCity[];
//   ageRange: number[]
}

const initialState: CityState  = {
    values: []
};

const citiesSlice = createSlice({
  name: 'rawCities',
  initialState,
  reducers: {
    citiesSet: (state, action: PayloadAction<ModelElasticCity[]>) => {
      state.values = action.payload;
    },
    citiesInit: (state, action: PayloadAction<void>) => {
      
    },
    
  },


});

// export const { cawCitieSet, cawCitieSetAgeRange, commonFilterAgeInit } = cawCitiesSlice.actions;
export const StoreActionCities = citiesSlice.actions;

export const CitiesReducers =  citiesSlice.reducer;