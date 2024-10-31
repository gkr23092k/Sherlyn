import { Component, Input } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community'; // Import only GridApi
import { NgxSpinnerService } from 'ngx-spinner';
import { AgGridMenuComponent } from 'src/app/core/gridaction/gridaction.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  gridApi!: GridApi; // Declare gridApi
  dataarrayobj: any = [];
  rowData: any = [];
  columnDefs: any = [];
  usergroup: any = [];
  mailmsg: any = '';
  maildataarrayobj: any;
  startdate: any;
  enddate: any;
  admin: any = '';
  isadmin: boolean = false;
  xlsxdataarrayobj: any = [];
  description: any;
  gridOptions: GridOptions;

  coldefsoption: any = [[
    {
      headerName: 'Action',
      field: 'id',
      pinned: 'left',
      sortable: false,
      filter: false,
      minWidth: 60,
      maxWidth: 80,
      cellRenderer: AgGridMenuComponent
    },
    {
      headerName: 'Material', cellStyle: (params: { value: string; }) => {
        if (params.value == 'Credit') {
          return { color: 'white', backgroundColor: 'green', fontWeight: 'bold' };
        }
        return null;
      }, field: 'matname', filter: 'agTextColumnFilter', initialWidth: 100, minWidth: 200, maxWidth: 300
    },
    {
      headerName: 'Materialgroup', field: 'matgroup', cellStyle: (params: { value: string; }) => {
        if (params.value === 'Liability') {
          return { color: 'white', backgroundColor: 'red', fontWeight: 'bold' };
        } else if (params.value === 'Investment') {
          return { color: 'white', backgroundColor: 'green', fontWeight: 'bold' };
        } else if (params.value == 'Liability Give') {
          return { color: 'white', backgroundColor: 'lightgreen', fontWeight: 'bold' };
        } else if (params.value == 'Liability Get') {
          return { color: 'white', backgroundColor: 'orange', fontWeight: 'bold' };
        }
        return null;
      },
      filter: 'agTextColumnFilter', initialWidth: 100, minWidth: 150, maxWidth: 300
    },
    {
      headerName: 'Price', field: 'matprice',
      cellStyle: (params: { value: number; }) => {
        if (params.value > 999) {
          return { color: 'white', backgroundColor: 'red', fontWeight: 'bold' };
        }
        return null;
      }, filter: 'agNumberColumnFilter', initialWidth: 150, minWidth: 100, maxWidth: 300
    },
    {
      headerName: 'Balance', field: 'matbalance', cellStyle: (params: { value: number; }) => {
        if (params.value < 2499) {
          return { color: 'white', backgroundColor: 'orange', fontWeight: 'bold' };
        }
        return null;
      }, filter: 'agNumberColumnFilter', initialWidth: 150, minWidth: 100, maxWidth: 300
    },
    { headerName: 'Date', field: 'date', filter: 'agDateColumnFilter', initialWidth: 200, minWidth: 150, maxWidth: 300 },
    { headerName: 'Oncard', field: 'iscreditcard', filter: 'agTextColumnFilter', initialWidth: 150, minWidth: 100, maxWidth: 300 },
    { headerName: 'Comment', field: 'comments', filter: 'agTextColumnFilter' },
    { headerName: 'Source Collection', field: 'source', filter: 'agTextColumnFilter', initialWidth: 100, minWidth: 160, maxWidth: 300, hide: false }, // Hidden initially
    { headerName: 'Id', field: 'id', filter: 'agTextColumnFilter', initialWidth: 100, minWidth: 160, maxWidth: 300 },
   
  ],
  [
    {
      headerName: 'Action',
      field: 'id',
      pinned: 'left',
      sortable: false,
      filter: false,
      minWidth: 60,
      maxWidth: 80,
      cellRenderer: AgGridMenuComponent
    },
     {
      headerName: 'Material', cellStyle: (params: { value: string; }) => {
        if (params.value == 'Credit') {
          return { color: 'white', backgroundColor: 'green', fontWeight: 'bold' };
        }
        return null;
      }, field: 'matname', filter: 'agTextColumnFilter', initialWidth: 100, minWidth: 200, maxWidth: 300
    },
    {
      headerName: 'Price', field: 'matprice',
      cellStyle: (params: { value: number; }) => {
        if (params.value > 999) {
          return { color: 'white', backgroundColor: 'red', fontWeight: 'bold' };
        }
        return null;
      }, filter: 'agNumberColumnFilter', initialWidth: 150, minWidth: 100, maxWidth: 300
    },
    { headerName: 'Date Creation', field: 'datecr', filter: 'agDateColumnFilter', initialWidth: 200, minWidth: 150, maxWidth: 300 },
    { headerName: 'Comment', field: 'comment', filter: 'agTextColumnFilter' },
    { headerName: 'Source Collection', field: 'source', filter: 'agTextColumnFilter', initialWidth: 100, minWidth: 160, maxWidth: 300, hide: false }, // Hidden initially
    { headerName: 'Id', field: 'id', filter: 'agTextColumnFilter', initialWidth: 100, minWidth: 160, maxWidth: 300 },
  ]
   
  ];

  constructor(private spinner: NgxSpinnerService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowClass = 'custom-row-class';
  }

  @Input('Spendlist') spendlist: any;
  @Input('Iscredit') iscredit: boolean = false;

  ngOnChanges() {
    this.rowData = this.spendlist;
    this.columnDefs = this.iscredit ? this.coldefsoption[1] : this.coldefsoption[0];
  }

  ngOnInit() {
    this.columnDefs = this.iscredit ? this.coldefsoption[1] : this.coldefsoption[0];
    this.startdate = new Date(new Date().getTime() - 86400000);
    this.enddate = new Date();
  }

  // Capture Grid API on grid ready
  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  // Toggle Source Column
  toggleSourceColumn() {
    const colId = 'source'; // Column ID to toggle
    const columnState = this.gridApi.getColumnState();
    
    const column = columnState.find(col => col.colId === colId);
    if (column) {
      column.hide = !column.hide; // Toggle the hide property
      this.gridApi.applyColumnState({ state: columnState, applyOrder: true });
    }
  }
}
