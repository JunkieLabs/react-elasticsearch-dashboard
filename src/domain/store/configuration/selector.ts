import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { configurationFilterAdapter } from "./reducer";

// Select the data1 adapter state
const selectFilterState = (state: RootState) => state.Configuration.filters;

// Create a selector to get all data items as an array
 const selectFilterArray = createSelector(
    selectFilterState,
    configurationFilterAdapter.getSelectors().selectAll
  );

// Create a selector to get a specific data item by ID
 const selectFilterById = (id: string) =>
  createSelector(selectFilterArray, data => data.find(item => item.name === id));


export const StoreSelectorsConfiguration  = {

    filters: selectFilterArray,
    filterById: selectFilterById 

}