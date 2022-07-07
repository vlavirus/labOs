import {Order} from "./order.model";
import {Patient} from "./patient.model";

export interface IServerRequest {
  count: number;
  moreUncountedMatches: boolean;
  order?: Order[];
  patient?: Patient[];
  undisplayedMatches: boolean;
}
