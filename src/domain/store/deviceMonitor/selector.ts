import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { deviceMonitorActiveListAdapter, deviceMonitorAllListAdapter } from "./reducer";

// Select the data1 adapter state
const selectActiveListState = (state: RootState) => state.DeviceMonitor.activeList;

const selectActiveListPagination = (state: RootState) => state.DeviceMonitor.activeListPagination;

// Create a selector to get all data items as an array
// const selectActiveList = createSelector(
//   selectActiveListState,
//   deviceMonitorActiveListAdapter.getSelectors().selectAll
// );

const selectActiveListPage = createSelector(
  selectActiveListState,
  selectActiveListPagination,
  (paginatedData, { offset, limit }) => {

    const dataIds = paginatedData.ids.slice(offset, offset + limit);
    return dataIds.map(id => paginatedData.entities[id]);
  }
);

// Create a selector to get a specific data item by ID
// const selectActiveListById = (id: string) =>
//   createSelector(selectActiveList, data => data.find(item => item._id === id));


/**
 * ALL
 */

const selectAllListState = (state: RootState) => state.DeviceMonitor.allList;

const selectAllListPagination = (state: RootState) => state.DeviceMonitor.allListPagination;

// Create a selector to get all data items as an array
// const selectAllList = createSelector(
//   selectAllListState,
//   deviceMonitorAllListAdapter.getSelectors().selectAll
// );

const selectAllListPage = createSelector(
  selectAllListState,
  selectAllListPagination,
  (paginatedData, { offset, limit }) => {

    const dataIds = paginatedData.ids.slice(offset, offset + limit);
    return dataIds.map(id => paginatedData.entities[id]);
  }
);

export const StoreSelectorsDeviceMonitor = {

  // activeList: selectActiveList,
  list: {
    active: selectActiveListPage,
    all: selectAllListPage,
    inactive: selectActiveListPage,
    connected: selectAllListPage,
  },
  pagination: {
    active: selectActiveListPagination,
    all: selectAllListPagination,
    inactive: selectAllListPagination,
    connected: selectAllListPagination,
  }
  // activeListById: selectActiveListById

}