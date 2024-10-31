import { Component, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  template: `
  <mat-icon class="text-info" (click)="view()">file_copy</mat-icon>
  `,
  styles: ['.mat-menu-item { line-height: 30px;height: 30px;}']
})

export class AgGridMenuComponent implements ICellRendererAngularComp {
  iconColor = '#3B9FF3';
  iconColor1 = '#F60002';
  iconColor2 = '#55eb34';
  params: any;
  public id: any;
  public compId: any;
  toShow: boolean = false;
  editShow: boolean = false;


  value: any;
  agInit(params: ICellRendererParams<any, any>): void {
    this.value = params.value
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }
  view() {
    alert(this.value)
  }
  ngOnInit(): void {

  }
}

