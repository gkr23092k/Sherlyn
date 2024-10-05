import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  balance: any;

  constructor(private fb: FirebaseService, private spinner: NgxSpinnerService) { }
  @ViewChild('entry') entry!: NgForm
  material: any
  materialgroup: any
  materialdropdown: any
  originalBalance: number = 0;
  isoncard: boolean = false;
  isbilloncard: boolean = false;
  ismaterialdropdown: boolean = false
  selectedChip: string | null = 'New Material';
  dateentry = new Date()
  dropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };


  chipSelectionChange(event: any) {
    if (event.source.selected) {
      // console.log('Selected:', event.source.value);
      this.selectedChip = event.source.value;
      this.ismaterialdropdown = this.selectedChip === 'Existing Material';
    } else {
      // console.log('Deselected:', event.source.value);
      // If 'Existing Material' is deselected, automatically select 'New Material'
      if (event.source.value === 'Existing Material') {
        this.selectedChip = 'New Material';
      } else if (event.source.value === 'New Material') {
        // If 'New Material' is deselected, automatically select 'Existing Material'
        this.selectedChip = 'Existing Material';
      } else {
        this.selectedChip = null;
      }
      // Update the dropdown flag based on the selected chip
      this.ismaterialdropdown = this.selectedChip === 'Existing Material';
    }
    this.material = ''
  }
  ngOnInit() {
    console.log('startted')
    this.keepbalancelive()
  }
  onPriceChange(newPrice: number): void {
    // Check if the new price is 0
    if (!this.isbilloncard) {
      if (newPrice === 0) {
        this.balance = this.originalBalance; // Reset to original balance
        console.log('Balance reset to original:', this.balance);
      } else if (newPrice > 0) {
        this.balance = this.originalBalance - newPrice; // Subtract from original balance
        console.log('New Price:', newPrice);
        console.log('Updated Balance:', this.balance);
      } else {
        this.balance = this.originalBalance;
        console.warn('Price cannot be negative');
      }
    }
  }
  addentry(data: any) {
    this.spinner.show()
    this.entry.form.patchValue({
      ...data,
      matname: this.material,
      balance: this.balance
    });
    const enteredvalues = {
      ...data.value,
      matname: (typeof this.material == 'string') ? this.material : this.material[0].item_text,
      balance: this.balance,
      iscreditcard: this.isoncard
    }

    console.log(data.value, enteredvalues, this.isbilloncard);
    if (this.isoncard) {
     this.fb.Loandataentry(enteredvalues).finally(() => {
        this.keepbalancelive()
        this.entry.resetForm()
        this.dateentry = new Date()
        this.spinner.hide()
      })
    }

    else if (this.isbilloncard) {
      this.fb.LendDataentry(enteredvalues).finally(() => {
        this.keepbalancelive()
        this.entry.resetForm()
        this.dateentry = new Date()
        this.spinner.hide()
      })
      console.log('enterisbilloncard');
    }
    else {
      this.fb.dataentry(enteredvalues).finally(() => {
        this.keepbalancelive()
        this.entry.resetForm()
        this.dateentry = new Date()
        this.spinner.hide()

      })
    }
  }

  onItemSelect(item: any) {
    console.log(item, 'item');
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  keepbalancelive() {
    this.fb.getBalance().subscribe((val: number) => {
      this.balance = val
      this.originalBalance = val; // Store the original balance

      console.log(val);
    })

  }

  onInputChange(event: any) {
    console.log(event);

    this.materialdropdown = []
    this.fb.getAllpreviousentries(event).subscribe((val: any) => {

      this.materialdropdown = this.getUniqueRecords(val);

      console.log(this.materialdropdown, 'materialdropdown');
    })

  }
  getUniqueRecords(arr: any) {
    const seen = new Set();
    return arr.filter((item: any) => {
      if (!seen.has(item.item_text)) {
        seen.add(item.item_text);
        return true; // Keep the item
      }
      return false; // Filter out duplicates
    });
  };
}
