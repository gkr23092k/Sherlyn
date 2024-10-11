import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { MatCardModule } from '@angular/material/card';
import { SummarycardComponent } from './summary/summarycard/summarycard.component';
import { dataservice } from 'src/app/shared/data.service';
import { GridComponent } from './summary/grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component

import { EntryModule } from '../entry/entry.module';
import {MatDialogModule} from '@angular/material/dialog';
import { ChartModule } from 'angular-highcharts';
import { AllocateChartComponent } from './summary/allocatechart/allocatechart.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    SummaryComponent,
    SummarycardComponent,
    GridComponent,
    AllocateChartComponent
  ],
  imports: [
    CommonModule,
    SummaryRoutingModule,AgGridAngular,

    //material
    MatCardModule, AgGridModule, EntryModule,MatDialogModule,ChartModule
     ,MatNativeDateModule,MatDatepickerModule,MatTabsModule,
    MatFormFieldModule
    
  ], providers: [dataservice]
})
export class SummaryModule { }
