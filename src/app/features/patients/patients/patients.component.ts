import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ApiService } from "app/core/api/api.service";

import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../core/core.module";
import {columnDefsConst, defaultColDefConst} from "../../../shared/grid/grid.config";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: "st-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsComponent implements OnInit {
  private dataHash = '51597ef3';

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  public rowData$: Observable<any> | undefined;

  public options = {
    applyColumnDefOrder: true,
  };

  public defaultColDef = defaultColDefConst;

  public rowSelection = 'multiple';

  columnDefs = columnDefsConst;

  constructor(
    private readonly apiService: ApiService
  ) {}

  ngOnInit() {}

  getPatients(): any {
    this.rowData$ = this.apiService.getData(this.dataHash).pipe(
      map(res => res.patient)
    );
  }
}
