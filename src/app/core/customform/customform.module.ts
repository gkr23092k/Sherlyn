import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomrangeComponent } from './customrange/customrange.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { AddAllocationformComponent } from './add-allocationform/add-allocationform.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [CustomrangeComponent, AddAllocationformComponent],
  imports: [
    CommonModule,FormsModule,ToastModule,MatSelectModule,ReactiveFormsModule
    
  ],
  exports:[CustomrangeComponent,AddAllocationformComponent,ToastModule]
})
export class CustomformModule { }
