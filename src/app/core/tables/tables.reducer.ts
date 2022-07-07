import { Action, createReducer, on } from "@ngrx/store";
import cloneDeep from 'lodash/cloneDeep';

import {
  actionTablesAddFavourites,
  actionTablesRemoveFavourites,
  actionTablesRemoveFavouritesOrders, actionTablesRemoveFavouritesPatients,
  actionTablesSetFavouriteOrder,
  actionTablesSetFavouritePatient,
  actionTablesSetOrdersData,
  actionTablesSetPatientsData
} from "./tables.actions";
import { TablesState } from "./tables.model";

export const initialState: TablesState = {
  patientsData: [],
  ordersData: [],
  favouritesData: []
}


const reducer = createReducer(
  initialState,
  on(
    actionTablesSetPatientsData,
    (state, action) => ({ ...state, patientsData: action.data }),
  ),
  on(
    actionTablesSetOrdersData,
    (state, action) => ({ ...state, ordersData: action.data }),
  ),
  on(actionTablesAddFavourites,
    (state, action) => ({
      ...state,
      favouritesData: [...state.favouritesData, action.data]
    }),
  ),
  on(
    actionTablesSetFavouriteOrder,
    (state, action) => {
      const orderIndex = state.ordersData.findIndex(order => order.orderNum === action.data.orderNum)
      const orders = cloneDeep(state.ordersData);

      orders[orderIndex]['favourites'] = !orders[orderIndex]['favourites'];

      return {
        ...state,
        ordersData: orders
      }
    }
  ),
  on(
    actionTablesSetFavouritePatient,
    (state, action) => {
      const patientIndex = state.patientsData.findIndex(patient => patient.defaultId === action.data.defaultId)
      const patients = cloneDeep(state.patientsData);

      patients[patientIndex]['favourites'] = !patients[patientIndex]['favourites'];

      return {
        ...state,
        patientsData: patients
      }
    }
  ),
  on(actionTablesRemoveFavourites,
    (state, action) => {
    const itemIndex = state.favouritesData.findIndex(item => item['defaultId'] === action.data.id || item['orderNum'] === action.data.id)
    const favourites = [...state.favouritesData]
    favourites.splice(itemIndex, 1);
    return {
        ...state,
        favouritesData: favourites
      }
    },
  ),
  on(actionTablesRemoveFavouritesOrders,
    (state) => {
      const favourites = state.favouritesData.filter(order => order['item'] !== 'order');

      return {
        ...state,
        favouritesData: favourites
      }
    }
  ),
  on(actionTablesRemoveFavouritesPatients,
    (state) => {
      const favourites = state.favouritesData.filter(order => order['item'] !== 'patient');

      return {
        ...state,
        favouritesData: favourites
      }
    }
  )
)

export function tablesReducer(
  state: TablesState | undefined,
  action: Action
): TablesState{
  return reducer(state, action);
}
