import { ICellRendererParams } from "ag-grid-community";

export const checkBoxConst = {
  field: 'favourites',
  checkboxSelection: true,
  cellRenderer: (params) => {
    params.node.setSelected(params.data['favourites']);
  }
};

export const columnDefsPatientsConst = [
  {
    field: 'defaultId',
    headerName: 'id',
  },
  { field: 'firstName', headerName: 'first name' },
  {
    field: 'birthDate',
    headerName: 'age',
    cellRenderer: (params: ICellRendererParams) => {
      return gridGetAge(params);
    },
  },
  {
    field: 'code',
    headerName: 'code'
  },
  checkBoxConst,
];

export const gridGetAge = (params: ICellRendererParams) => {
  const {formattedDate} = params.data.birthDate;
  const birthYear = params.data.birthYear;
  const birthDate = new Date(formattedDate)
  const millis = Date.now() - birthDate.getTime();
  const age = new Date().getFullYear() - birthYear;
  const newTag = `<span>${
    !!formattedDate ? new Date(millis).getUTCFullYear() - 1970 : age}</span>`;

  return newTag;
}

export const columnDefsOrdersConst = [
  {
    field: 'orderNum',
    headerName: 'order number',
  },
  {
    field: 'orderName',
    headerName: 'order name',
  },
  {
    field: 'physician.name',
    headerName: 'physician',
  },
  {
    field: 'patient.fullName',
    headerName: 'patient',
  },
  {
    field: 'status',
    headerName: 'status',
    cellRenderer: (params: ICellRendererParams) => {
      return params.data.status.identifier;
    }
  },
  checkBoxConst,
];

export const defaultColDefConst = {
  flex: 1,
  minWidth: 100,
  resizable: true,
  wrapText: true,
  autoHeight: true,
};
