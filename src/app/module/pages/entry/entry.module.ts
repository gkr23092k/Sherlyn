// entry.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryRoutingModule } from './entry.routing';
import { EntryComponent } from './entry/entry.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BulkEntryComponent } from './bulk-entry/bulk-entry.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [EntryComponent, BulkEntryComponent],
  imports: [
    CommonModule,
    EntryRoutingModule,
    // material
    MatButtonModule,MatFormFieldModule, MatInputModule,MatDatepickerModule,MatNativeDateModule,
    FormsModule,ReactiveFormsModule,MatChipsModule,MatMenuModule,MatIconModule,MatSelectModule,
    MatAutocompleteModule,DragDropModule

    ,NgMultiSelectDropDownModule,NgxSpinnerModule
  ],
  exports:[MatButtonModule,MatFormFieldModule, MatInputModule,MatDatepickerModule,MatNativeDateModule,
    FormsModule,ReactiveFormsModule,MatChipsModule,MatMenuModule,MatIconModule,MatSelectModule]
})
export class EntryModule { }
