import { parsePaths } from '@/tools/parserTools';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  section: string;
  subSection: string;
  routePath: string;
  sidenavXsOpen: boolean;
}

const initialState: AppState = {
    section: '',
    subSection:'',
    routePath: '',
    sidenavXsOpen: false
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appSetSectionFromPath: (state, action: PayloadAction<string>) => {
      var routePath = action.payload;
      state.routePath = routePath;
      var paths = parsePaths(routePath).slice(0, 2);
      
      state.section = paths.length>0 ? paths[0] :"";
      state.subSection = paths.length>1 ? paths[1] :"";
    },

    sidenavXsToggle: (state, action: PayloadAction<boolean>) => {
      var sidenavXsToggle = action.payload;
      state.sidenavXsOpen = sidenavXsToggle;
    },
  },
});

// export const { appSetSectionFromPath } = appSlice.actions;
export const StoreActionApp = appSlice.actions;
export const AppReducers =  appSlice.reducer;