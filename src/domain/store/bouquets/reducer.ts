import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { ModelElasticPincode } from '@/types/elastic/pincodes/';

interface BouquetState {
  items: string[];
  search: string
  activeBouquet?: string
  bouquetChannelsMap: {
    [key:string]: string[]
  }
}

const initialState: BouquetState  = {
  items: [],
  search:"", 
  bouquetChannelsMap: {}
};

const bouquetsSlice = createSlice({
  name: 'bouquets',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<void>) => {
      
    },

    setAll: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    setBouquetChannels:(state, action: PayloadAction<{ bouquet: string; channels: string[] }>) =>{
      state.bouquetChannelsMap[action.payload.bouquet] = action.payload.channels

    },
    initChannelsForBouquet: (state, action: PayloadAction<string>) => {
      state.activeBouquet = action.payload
    },
    // search:(state, action: PayloadAction<string>) =>{
    //   state.search = action.payload
    // }
    
  },


});

export const StoreActionBouquets = bouquetsSlice.actions;

export const BouquetsReducers =  bouquetsSlice.reducer;