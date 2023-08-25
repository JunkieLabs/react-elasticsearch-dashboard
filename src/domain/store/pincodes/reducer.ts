import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { ModelElasticPincode } from '@/types/elastic/pincodes/';

interface PincodeState {
  items: string[];
  search: string
}

const initialState: PincodeState  = {
  items: [],
  search:""
};

const pincodesSlice = createSlice({
  name: 'pincodes',
  initialState,
  reducers: {
    pincodeSet: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    citiesInit: (state, action: PayloadAction<void>) => {
      
    },

    search:(state, action: PayloadAction<string>) =>{
      state.search = action.payload
    }
    
  },


});

// export const { cawCitieSet, cawCitieSetAgeRange, commonFilterAgeInit } = cawCitiesSlice.actions;
export const StoreActionPincodes = pincodesSlice.actions;

export const PincodesReducers =  pincodesSlice.reducer;