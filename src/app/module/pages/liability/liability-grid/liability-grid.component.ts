import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-liability-grid',
  templateUrl: './liability-grid.component.html',
  styleUrls: ['./liability-grid.component.scss']
})
export class LiabilityGridComponent implements OnInit {
  @Input() transactions: any = []; // Expecting an array of transaction objects
  displayedColumns = ['matname', 'getTotal', 'giveTotal']; // Columns to display

  ngOnInit(): void {
    this.transactions = [this.transactions]
    // console.log(this.transactions);
    
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.reduce((sum: number, transaction: any) => sum + transaction.getTotal, 0);
  }

  /** Gets the total give for all transactions. */
  getTotalGive() {
    return this.transactions.reduce((sum: number, transaction: any) => sum + transaction.giveTotal, 0);
  }

}
