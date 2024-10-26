import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomrangeComponent } from './customrange/customrange.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { AddAllocationformComponent } from './add-allocationform/add-allocationform.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({ 
  declarations: [CustomrangeComponent, AddAllocationformComponent],
  imports: [
    CommonModule, FormsModule, ToastModule, MatSelectModule, ReactiveFormsModule, MatIconModule, RouterModule

  ],
  exports: [CustomrangeComponent, AddAllocationformComponent, ToastModule]
})
export class CustomformModule { }
