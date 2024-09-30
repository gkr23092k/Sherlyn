import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardmainComponent } from './dashboardmain/dashboardmain.component';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core'; 
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DashboardmainComponent,DonutChartComponent,LineChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    
    //material
    MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,FormsModule
  ]
})
export class DashboardModule { }
