import { createSelector } from "@ngrx/store";

import { selectTablesState } from "../core.state";
import { TablesState } from "./tables.model";

export const selectFavourites = createSelector(
  selectTablesState,
  (state: TablesState) => state.favouritesData
);

export const selectOrders = createSelector(
  selectTablesState,
  (state: TablesState) => state.ordersData
);

export const selectPatients = createSelector(
  selectTablesState,
  (state: TablesState) => state.patientsData
);
