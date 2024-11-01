import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiabilityRoutingModule } from './liability-routing.module';
import { LiabilityMainComponent } from './liability-main/liability-main.component';
import {MatTableModule} from '@angular/material/table';
import { LiabilityGridComponent } from './liability-grid/liability-grid.component';


@NgModule({
  declarations: [
    LiabilityMainComponent,
    LiabilityGridComponent
  ],
  imports: [
    CommonModule,
    LiabilityRoutingModule,MatTableModule
  ]
})
export class LiabilityModule { }
