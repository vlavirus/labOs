import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { first } from "rxjs/operators";
import { Observable } from "rxjs";
import { GridApi, ICellRendererParams, RowNode } from "ag-grid-community";

import { GridRemoveButtonComponent } from "../../../shared/buttons/grid-remove-button/grid-remove-button.component";
import { State } from "../../../core/tables/tables.model";
import { defaultColDefConst, gridGetAge} from "../../../shared/grid/grid.config";
import { selectFavourites } from "../../../core/tables/tables.selectors";
import {
  actionTablesRemoveFavourites,
  actionTablesSetFavouriteOrder,
  actionTablesSetFavouritePatient
} from "../../../core/tables/tables.actions";

@Component({
  selector: 'st-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritesComponent implements OnInit {

  public rowData$: Observable<any> | undefined;

  public options = {
    applyColumnDefOrder: true,
  };

  public defaultColDef = defaultColDefConst;

  public rowSelection = 'multiple';

  columnDefs = [
    {
      field: 'item',
      headerName: 'item',
    },
    {
      field: 'defaultId',
      headerName: 'Id / order number',
      cellRenderer: (params) => {
        return params.data.defaultId || params.data.orderNum;
      }
    },
    {
      field: 'filter',
      headerName: 'first name / order name',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'age',
      headerName: 'age / identifier',
      cellRenderer: (params) => {
        return params.data.item === 'patient' ? gridGetAge(params) : params.data.identifier;
      }
    },
    {
      field: 'status',
      headerName: 'code / status',
      cellRenderer: (params) => {
        return params.data.item === 'patient' ? params.data.code : params.data.status.identifier;
      }
    },
    {
      field: 'inactive',
      headerName: 'inactive / hasComments',
      cellRenderer: (params) => {
        return params.data.item === 'patient' ? params.data.inactive : params.data.hasComments;
      }
    },
    {
      field: "",
      cellRendererFramework: GridRemoveButtonComponent,
      resizable: true,
      minWidth: 75,
      maxWidth: 75,
      cellRendererParams: {
        clicked: (params: ICellRendererParams) => {
          this.removeFavourite(params.data, params.node, params.api)
        }
      },
    }
  ];

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.rowData$ = this.store.pipe(select(selectFavourites)).pipe(first());

    this.store.pipe(select(selectFavourites)).subscribe(res => {
    })
  }

  removeFavourite(field: any, node: RowNode, gridApi: GridApi): void {
    this.store.dispatch(actionTablesRemoveFavourites(
      {data: { item: field.item, id: field.defaultId || field.orderNum}})
    );
    if (field.orderNum) {
      this.store.dispatch(actionTablesSetFavouriteOrder({data: { orderNum: field.orderNum }}));
    }

    if (field.defaultId) {
      this.store.dispatch(actionTablesSetFavouritePatient({data: { defaultId: field.defaultId }}));
    }
    gridApi.removeItems([node]);
  }
}
