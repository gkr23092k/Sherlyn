import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CreditcardRoutingModule } from './creditcard-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CreditmainComponent } from './creditmain/creditmain.component';
import { CreditcarduiComponent } from 'src/app/core/creditcardui/creditcardui.component';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [CreditmainComponent,CreditcarduiComponent],
  imports: [
    CommonModule,
    CreditcardRoutingModule,
    MatButtonModule,MatFormFieldModule, MatInputModule,MatNativeDateModule,
    FormsModule,ReactiveFormsModule,MatIconModule,MatSelectModule,MatOptionModule,NgxSpinnerModule
  ]
})
export class CreditcardModule { }
