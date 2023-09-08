import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Select the data1 adapter state
const selectLogsListState = (state: RootState) => state.DeviceLogs.logsList;

const selectLogsListPagination = (state: RootState) => state.DeviceLogs.pagination;

// Create a selector to get all data items as an array
// const selectLogsList = createSelector(
//   selectLogsListState,
//   deviceLogsActiveListAdapter.getSelectors().selectAll
// );

const selectLogsListPage = createSelector(
  selectLogsListState,
  selectLogsListPagination,
  (paginatedData, { offset, limit }) => {

    const dataIds = paginatedData.ids.slice(offset, offset + limit);
    return dataIds.map(id => paginatedData.entities[id]);
  }
);

// Create a selector to get a specific data item by ID
// const selectLogsListById = (id: string) =>
//   createSelector(selectLogsList, data => data.find(item => item._id === id));




export const StoreSelectorsDeviceLogs = {

  // activeList: selectLogsList,
  list:  selectLogsListPage,
    
  pagination:  selectLogsListPagination,
   
  // activeListById: selectLogsListById

}