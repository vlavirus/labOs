import { AppState } from "../core.state";
import { Order } from "../../shared/models/order.model";
import { Patient } from "../../shared/models/patient.model";

export interface TablesState {
  patientsData: Patient[];
  ordersData: Order[];
  favouritesData: (Order | Patient)[];
}

export interface State extends AppState {
  tables: TablesState;
}
