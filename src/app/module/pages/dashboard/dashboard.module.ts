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
import { BreakdowndonutComponent } from './donut-chart/breakdowndonut/breakdowndonut.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BarLineComponent } from './bar-line/bar-line.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SplitterModule } from 'primeng/splitter';

@NgModule({
  declarations: [
    DashboardmainComponent,DonutChartComponent,LineChartComponent, BreakdowndonutComponent, BarLineComponent, 
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,NgxSpinnerModule,
    
    //material
    MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,FormsModule,
    MatSidenavModule,

    //primeng
    SplitterModule
  ]
})
export class DashboardModule { }
