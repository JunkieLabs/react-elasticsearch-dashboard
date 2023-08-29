import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectChannelsByBouquet = (key: string) =>
  createSelector(
    (state: RootState) => state.Bouquets.bouquetChannelsMap[key] || [],
    channels => channels
  );


export const StoreSelectorsBouquets  = {

    channelsByBouquet: selectChannelsByBouquet,

}