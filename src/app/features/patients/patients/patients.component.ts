import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ApiService } from "app/core/api/api.service";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { RowSelectedEvent } from "ag-grid-community";
import { select, Store } from "@ngrx/store";

import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../core/core.module";
import { columnDefsPatientsConst, defaultColDefConst } from "../../../shared/grid/grid.config";
import { State } from "../../../core/tables/tables.model";
import {
  actionTablesAddFavourites,
  actionTablesRemoveFavourites, actionTablesRemoveFavouritesPatients, actionTablesSetFavouritePatient,
  actionTablesSetPatientsData
} from "../../../core/tables/tables.actions";
import { Patient } from "../../../shared/models/patient.model";
import { IServerRequest } from "../../../shared/models/server-request.model";
import { selectPatients } from "../../../core/tables/tables.selectors";

@Component({
  selector: "st-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsComponent implements OnInit {
  private dataHash = '51597ef3';

  public routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  public rowData$: Observable<Patient[]> | undefined;

  public options = {
    applyColumnDefOrder: true,
  };

  public defaultColDef = defaultColDefConst;

  public rowSelection = 'multiple';

  public columnDefs = columnDefsPatientsConst;

  private touched = false;

  constructor(
    private readonly apiService: ApiService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.store.pipe(select(selectPatients)).pipe(first());
  }

  getPatients(): void {
    this.rowData$ = this.apiService.getData<IServerRequest>(this.dataHash).pipe(
      map((res) => {
        const patients = res.patient.map(patient => {
          return { ...patient, favourites: false };
        });

        this.store.dispatch(actionTablesSetPatientsData({ data: patients }))
        this.store.dispatch(actionTablesRemoveFavouritesPatients());

        return patients;
      }),
    );
  }

  onRowSelected($event: RowSelectedEvent): void {
    if ($event.node.isSelected() && this.touched) {
      this.store.dispatch(actionTablesAddFavourites({ data: { ...$event.data, item: 'patient', filter: $event.data.firstName } }));
      this.store.dispatch(actionTablesSetFavouritePatient({ data: { defaultId: $event.data.defaultId } }));
    } else if (!$event.node.isSelected() && this.touched) {
      this.store.dispatch(actionTablesRemoveFavourites({ data: { item: 'patient', id: $event.data.defaultId } } ));
      this.store.dispatch(actionTablesSetFavouritePatient({ data: { defaultId: $event.data.defaultId } }));
    }
  }

  checkTouched(): void {
    this.touched = true;
  }
}
