import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { select, Store} from "@ngrx/store";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { RowSelectedEvent } from "ag-grid-community";

import { State } from "../../../core/tables/tables.model";
import { selectOrders } from "../../../core/tables/tables.selectors";
import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../core/core.module";
import { ApiService } from "../../../core/api/api.service";
import { columnDefsOrdersConst, defaultColDefConst } from "../../../shared/grid/grid.config";
import { IServerRequest } from "../../../shared/models/server-request.model";
import { Order } from "../../../shared/models/order.model";
import {
  actionTablesAddFavourites,
  actionTablesRemoveFavourites,
  actionTablesRemoveFavouritesOrders,
  actionTablesSetFavouriteOrder,
  actionTablesSetOrdersData,
} from "../../../core/tables/tables.actions";

@Component({
  selector: "st-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {
  private dataHash = '79fb05cb';

  public routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  public rowData$: Observable<Order[]> | undefined;

  public options = {
    applyColumnDefOrder: true,
  };

  public columnDefs = columnDefsOrdersConst;

  public defaultColDef = defaultColDefConst;

  public rowSelection = 'multiple';

  private touched = false;

  constructor(
    private readonly apiService: ApiService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.store.pipe(select(selectOrders)).pipe(first());
  }

  getOrders(): any {
    this.rowData$ = this.apiService.getData<IServerRequest>(this.dataHash).pipe(
      map(res => {
        const orders = res.order.map(order => {
          return { ...order, favourites: false };
        });

        this.store.dispatch(actionTablesSetOrdersData({ data: orders }))
        this.store.dispatch(actionTablesRemoveFavouritesOrders())

        return orders;
      })
    )
  }

  onRowSelected($event: RowSelectedEvent) {
    if ($event.node.isSelected() && this.touched) {
      this.store.dispatch(actionTablesAddFavourites({ data: { ...$event.data, item: 'order', filter: $event.data.orderName } }));
      this.store.dispatch(actionTablesSetFavouriteOrder({ data: { orderNum: $event.data.orderNum } }));
    } else if (!$event.node.isSelected() && this.touched) {
      this.store.dispatch(actionTablesRemoveFavourites({ data: { item: 'order', id: $event.data.orderNum } }));
      this.store.dispatch(actionTablesSetFavouriteOrder({ data: { orderNum: $event.data.orderNum } }));
    }
  }

  checkTouched(): void {
    this.touched = true;
  }
}
