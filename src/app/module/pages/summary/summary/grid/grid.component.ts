import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import { ColDef, GridOptions } from 'ag-grid-community';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  dataarrayobj: any = [];
  rowData: any = [];
  columnDefs: any = []
  usergroup: any = []
  mailmsg: any = ''
  maildataarrayobj: any;
  startdate: any;
  enddate: any;
  admin: any = '';
  isadmin: boolean = false;
  xlsxdataarrayobj: any = [];
  description: any;
  gridOptions: GridOptions;
  constructor(private spinner: NgxSpinnerService) {

    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowClass = 'custom-row-class';


  }
  @Input('Spendlist') spendlist: any
  ngOnChanges() {
    this.rowData = this.spendlist
    console.log(this.rowData);

    // let coldef = this.columnDefs
    // this.columnDefs = []
    // setTimeout(() => {
    //   this.columnDefs = coldef
    // }, 100);

  }

  ngOnInit() {

    this.columnDefs = [
      // { headerName: 'Id', field: 'id', filter:'agTextColumnFilter', initialWidth: 100,minWidth: 160, maxWidth: 300 },
      { headerName: 'Id', field: 'id', filter:'agTextColumnFilter', initialWidth: 100, minWidth: 160, maxWidth: 300 },
      {
        headerName: 'Material', cellStyle: (params: { value: string; }) => {
          if (params.value == 'Credit') {
            return { color: 'white', backgroundColor: 'green', fontWeight: 'bold' };
          }
          return null;
        }, field: 'matname', filter:'agTextColumnFilter', initialWidth: 100, minWidth: 200, maxWidth: 300
      },
      {
        headerName: 'Materialgroup', field: 'matgroup', cellStyle: (params: { value: string; }) => {
          if (params.value === 'Liability') {
            return { color: 'white', backgroundColor: 'red', fontWeight: 'bold' };
          } else if (params.value === 'Investment') {
            return { color: 'white', backgroundColor: 'green', fontWeight: 'bold' };
          }
          else if (params.value == 'Liability Give') {
            return { color: 'white', backgroundColor: 'lightgreen', fontWeight: 'bold' };
          } else if (params.value == 'Liability Get') {
            return { color: 'white', backgroundColor: 'orange', fontWeight: 'bold' };
          }
          return null
        },
        filter:'agTextColumnFilter', initialWidth: 100, minWidth: 150, maxWidth: 300
      },
      {
        headerName: 'Price', field: 'matprice',
        cellStyle: (params: { value: number; }) => {
          if (params.value > 999) {
            return { color: 'white', backgroundColor: 'red', fontWeight: 'bold' };
          }
          return null;
        },  filter:'agNumberColumnFilter', initialWidth: 150, minWidth: 50, maxWidth: 300
      },
      {
        headerName: 'Balance', field: 'matbalance', cellStyle: (params: { value: number; }) => {
          if (params.value < 2499) {
            return { color: 'white', backgroundColor: 'orange', fontWeight: 'bold' };
          }
          return null;
        },  filter:'agNumberColumnFilter', initialWidth: 150, minWidth: 100, maxWidth: 300
      },
      // {
      //   headerName: 'Liablestatus'
      //   , cellStyle: (params: { value: string; }) => {
      //     if (params.value == 'Give') {
      //       return { color: 'white', backgroundColor: 'lightgreen', fontWeight: 'bold' };
      //     } else if (params.value == 'Get') {
      //       return { color: 'white', backgroundColor: 'orange', fontWeight: 'bold' };
      //     } else if (params.value == 'Credit') {
      //       return { color: 'white', backgroundColor: 'green', fontWeight: 'bold' };
      //     }
      //     return null;
      //   }, field: 'Liabilitystatus', filter: true, initialWidth: 150, minWidth: 150, maxWidth: 300
      // },
      { headerName: 'Date', field: 'date',  filter:'agDateColumnFilter', initialWidth: 200, minWidth: 50, maxWidth: 300 },
      // { headerName: 'Favourities', field: 'Favourities', filter: true, initialWidth: 150, minWidth: 100, maxWidth: 300 },
      // { headerName: 'Offer', field: 'Offer', filter: true, initialWidth: 100, minWidth: 100, maxWidth: 300 },
      { headerName: 'Comment', field: 'comments', filter:'agTextColumnFilter'}
    ];

    this.startdate = new Date()
    this.startdate = new Date(this.startdate.getTime() - 86400000);
    this.enddate = new Date()





  }

  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always'

  public autoGroupColumnDef: ColDef = {
    minWidth: 200
  }

public defaultColDef:ColDef={
  flex:1,
  minWidth:300,
  sortable:true,
  resizable:true,
  maxWidth:500,
  editable:false,
  enableRowGroup:true,
  floatingFilter:true,
 
}


  xlsxwriter() {
    this.xlsxdataarrayobj = []
    let accbalancemail = 0
    let inhbalancemail = 0
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    let formattedDate = `${day}|${month}|${year} ${hours}:${minutes}:${seconds}`;
    formattedDate = formattedDate.toString()
    if (this.mailmsg != '' && this.mailmsg != undefined) {
      console.log(this.mailmsg)
      this.dataarrayobj.filter((el: any) => {
        if (el.Name == this.mailmsg.Name && new Date(el.Date) >= this.startdate && new Date(el.Date) <= this.enddate) {
          accbalancemail = el.AccountBalance
          inhbalancemail = el.InhandBalance
          if (el.Liabilitystatus == 'Give') {
            el.Materialgroup = 'Liability Give'
          }
          else if (el.Liabilitystatus == 'Get') {
            el.Materialgroup = 'Liability Get'
          }
          this.xlsxdataarrayobj.push(el)
        }
      })
      console.log(this.xlsxdataarrayobj)
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.xlsxdataarrayobj);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, 'data' + formattedDate + '.xlsx');

    }
    else {
    }
  }
}
