import { createAction, props } from "@ngrx/store";

import { Patient } from "../../shared/models/patient.model";
import { Order } from "../../shared/models/order.model";

export const actionTablesSetPatientsData = createAction(
  '[Tables] Set patients data',
  props<{ data: Patient[] }>()
);

export const actionTablesSetOrdersData = createAction(
  '[Tables] Set orders data',
  props<{ data: Order[] }>()
);

export const actionTablesSetFavouriteOrder = createAction(
  '[Tables] Set orders fav status',
  props<{ data: { orderNum: number } }>()
);

export const actionTablesSetFavouritePatient = createAction(
  '[Tables] Set patient fav status',
  props<{ data: { defaultId: string } }>()
);

export const actionTablesAddFavourites = createAction(
  '[Tables] Add favourites',
  props<{ data: Patient | Order }>()
);

export const actionTablesRemoveFavourites = createAction(
  '[Tables] Remove favourites',
  props<{ data: { item: string, id: number } }>()
);

export const actionTablesRemoveFavouritesOrders = createAction(
  '[Tables] Remove favourites orders',
);

export const actionTablesRemoveFavouritesPatients = createAction(
  '[Tables] Remove favourites patients',
);
