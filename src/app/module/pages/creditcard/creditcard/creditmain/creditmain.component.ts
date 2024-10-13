import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, map, switchMap } from 'rxjs';
import { FirebaseService } from 'src/app/shared/firebase.service';

@Component({
  selector: 'app-creditmain',
  templateUrl: './creditmain.component.html',
  styleUrls: ['./creditmain.component.scss']
})
export class CreditmainComponent implements OnInit {
  isnewentry: boolean = false
  cardnumber: any;
  data: any = []
  constructor(private fb: FirebaseService, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.refreshcarddata()
  }

  @ViewChild('creditcard') creditcard!: NgForm

  addentry(formdata: any) {
    console.log(formdata);
    this.spinner.show()
    this.creditcard.form.patchValue({
      ...formdata,
    });
    const enteredvalues = {
      ...formdata.value,

    }
    this.fb.CreditCards(enteredvalues).finally(() => {
      this.creditcard.resetForm()
      this.refreshcarddata()
      this.spinner.hide()
    })
  }


  refreshcarddata() {
    this.spinner.show(); // Show the spinner before making requests

    forkJoin({
      creditcards: this.fb.getAllCreditcards(),
      lendItems: this.fb.getAllLenditems(),
      repayeditems: this.fb.getAllCreditcardRepayments()

    })
      .subscribe(({ creditcards, lendItems, repayeditems }) => {
        // Assuming creditcards is an array

        lendItems = lendItems.map((lend: any) => {
          repayeditems.find((repaid: any) => {
            console.log(lend, repaid);

            if (repaid.cardname === lend.cardname) {
              lend.utilised = lend.utilised - repaid.repaidtotal
            }
          })
          return lend
        })
        // console.log(creditcards, lendItems, repayeditems);

        this.data = creditcards.map((card: any) => {

          // Find the matching lend item based on cardname
          let matchingLendItem = lendItems.find((item: any) => item.cardname === card.cardname);

          // If there's a match, merge the data
          card.utilised = card.utilised ? card.utilised : 0


          return matchingLendItem ? { ...card, ...matchingLendItem } : card;
        });

        console.log(this.data);
        this.spinner.hide(); // Hide the spinner after processing data

      }, (error: any) => {
        console.error('Error fetching data:', error);
        this.spinner.hide(); // Hide the spinner on error
      });


  }
}