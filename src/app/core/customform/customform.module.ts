import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomrangeComponent } from './customrange/customrange.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [CustomrangeComponent],
  imports: [
    CommonModule,FormsModule,ToastModule
    
  ],
  exports:[CustomrangeComponent,ToastModule]
})
export class CustomformModule { }
