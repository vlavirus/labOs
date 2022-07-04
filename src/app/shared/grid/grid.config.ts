import {ICellRendererParams} from "ag-grid-community";

export const checkBoxConst = {
  field: 'favorites',
  checkboxSelection: true,
};

export const columnDefsConst = [
  {
    field: 'defaultId',
    headerName: 'id',
  },
  { field: 'fullName', headerName: 'name' },
  {
    field: 'birthDate',
    headerName: 'age',
    cellRenderer: (params: ICellRendererParams) => {
      debugger
      const { formattedDate } = params.data.birthDate;
      const birthYear = params.data.birthYear;
      const birthDate = new Date(formattedDate)
      const millis = Date.now() - birthDate.getTime();
      const age = new Date().getFullYear() - birthYear;
      const newTag = `<span>${ 
        !!formattedDate ? new Date(millis).getUTCFullYear() - 1970 : age}</span>`;

      return newTag ;
    },
  },
  checkBoxConst,
];

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
];


export const defaultColDefConst = {
  flex: 1,
  minWidth: 100,
  resizable: true,
  wrapText: true,
  autoHeight: true,
};
