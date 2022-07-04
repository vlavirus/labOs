import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../core/core.module";
import {ApiService} from "../../../core/api/api.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {columnDefsConst, columnDefsOrdersConst, defaultColDefConst} from "../../../shared/grid/grid.config";

@Component({
  selector: "st-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {
  dataHash = '79fb05cb';

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  public rowData$: Observable<any> | undefined;

  public options = {
    applyColumnDefOrder: true,
  };

  columnDefs = columnDefsOrdersConst;

  public defaultColDef = defaultColDefConst;

  public rowSelection = 'multiple';


  constructor(
    private readonly apiService: ApiService
  ) {}

  ngOnInit() {}

  getOrders(): any {
    this.rowData$ = this.apiService.getData(this.dataHash).pipe(
      map(res => {
        return res.order;
      })
    )
  }
}
