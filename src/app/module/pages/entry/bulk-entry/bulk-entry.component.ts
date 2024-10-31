import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase.service';

@Component({
  selector: 'app-bulkentry',
  templateUrl: './bulk-entry.component.html',
  styleUrls: ['./bulk-entry.component.scss'],

})
export class BulkEntryComponent implements OnInit {
  allEntries: any[] = [];
  options: any[] = [];
  fulloptions: any[] = [];
  todo: string[] = [];
  done: string[] = [];
  filterTerm: string = '';
  dateentry: Date = new Date()
  creditcardlist: any = [];
  cardname: string = 'No'
  cardeventcatcher: boolean = true
  isselected: boolean = true
  isacceptable: boolean = false
  balance: number = 0;
  originalBalance: number = 0;
  pricelist: any = []
  balancelist: any = [];
  addingdata: any = []
  comments: string = ''
  constructor(private fb: FirebaseService) { }

  ngOnInit(): void {
    this.fb.getAllpreviousentries('Liability Get', "not-in",'Liability Give').subscribe((val: any) => {
      // console.log(val, 'values');

      this.allEntries = this.getUniqueRecords(val);
      this.allEntries.sort((a: any, b: any) => a.item_text.localeCompare(b.item_text)); // Ascending sort

      console.log(this.allEntries, 'materialdropdown');
      this.options = this.allEntries.map((element: any) => element.item_text + ' / ' + element.matgroup);
      console.log(this.options, 'materialdropdown');
      this.fulloptions = Array.from(new Set(this.options))
      this.todo = this.options; // Initialize todo with the options
    });
    this.fb.getAllCreditcards().subscribe((el: any) => {
      this.creditcardlist = el
      this.creditcardlist.push({ cardname: 'No' })
    })
    this.keepbalancelive()


  }

  onEnterPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission or default behavior
      this.getFilteredTodo()
    }
  }


  getFilteredTodo() {
    const filteredTodo = this.fulloptions.filter(item => item.toLowerCase().includes(this.filterTerm.toLowerCase()));
    // console.log(filteredTodo, this.filterTerm); // Log the filtered data to the console
    this.todo = filteredTodo
    return filteredTodo;
  }


  drop(event: CdkDragDrop<string[]>): void {
    // Check if the item is dropped in the same container
    if (event.previousContainer === event.container) {
      // If it's the same container, just move it to the last position
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      // Move to the last position
      const movedItem = event.container.data.pop() || ''; // Remove the last item
      event.container.data.push(movedItem); // Add it back to the end
    } else {
      // If it's a different container, transfer the item
      const item = event.previousContainer.data[event.previousIndex];

      // Remove the item from the previous container
      event.previousContainer.data.splice(event.previousIndex, 1);

      // Add the item to the last position of the target container
      event.container.data.push(item);
    }

    // Update your price and balance lists
    this.pricelist.push(0);
    this.balancelist.push(0);
  }

  private getUniqueRecords(arr: any[]): any[] {
    const seen = new Set();
    return arr.filter((item: any) => {
      if (!seen.has(item.item_text)) {
        seen.add(item.item_text);
        return true;
      }
      return false;
    });
  }



  selectedItems: boolean[] = Array(this.todo.length).fill(false);

  toggleSelectAll(isSelected: boolean) {
    this.selectedItems.fill(isSelected);
  }

  toggleSelect(index: number) {
    this.selectedItems[index] = !this.selectedItems[index];
    // If any item is selected, select all
    // if (this.selectedItems[index]) {
    //   this.toggleSelectAll(true);
    // }
  }

  keepbalancelive() {
    this.fb.getBalance().subscribe((val: number) => {
      this.balance = val
      this.originalBalance = val;

    })
  }

  upddatebalance() {
    this.balance = this.originalBalance
    this.balancelist = []
    this.pricelist.forEach((element: any) => {
      this.balance = this.balance - element
      this.balancelist.push(this.balance)
    });
  }


  addEntry() {
    this.addingdata = []
    this.done.forEach((el: any, i: any) => {
      const [before, after] = this.splitByLastBackslash(el)
      this.addingdata.push({
        matprice: this.pricelist[i], matbalance: this.balancelist[i], matname: before, matgroup: after,
        iscreditcard: (this.cardname === 'No') ? false : true, cardname: (this.cardname === 'No') ? '' : this.cardname,
        comments: this.comments, dateentry: this.dateentry
      })
    })
    this.isacceptable = true
    this.addingdata.forEach((el: any) => {
      if (el.matprice <= 0 || el.matbalance < 0 || this.comments == '') {
        this.isacceptable = false
      }
    });

    if (!this.isacceptable) {
      alert('fill all the details properly')
    } else {
      this.fb.dataentryBulk(this.addingdata).finally(() => {
        this.keepbalancelive()
        this.dateentry = new Date()
      })
    }
    console.log(this.addingdata, this.isacceptable);

  }

  splitByLastBackslash(str: any) {
    const lastIndex = str.lastIndexOf(' / ');

    if (lastIndex === -1) {
      return [str, ''];
    }
    const before = str.substring(0, lastIndex);
    const after = str.substring(lastIndex + 3);

    return [before, after];
  }





  evenPredicate(item: CdkDrag<number>) {
    return item.data % 2 === 0;
  }

  noReturnPredicate() {
    return false;
  }

}
