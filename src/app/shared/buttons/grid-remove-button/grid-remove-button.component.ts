import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
  selector: 'st-grid-remove-button',
  templateUrl: './grid-remove-button.component.html',
  styleUrls: ['./grid-remove-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridRemoveButtonComponent  implements ICellRendererAngularComp {

  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler($event: MouseEvent) {
    this.params.clicked(this.params);
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
