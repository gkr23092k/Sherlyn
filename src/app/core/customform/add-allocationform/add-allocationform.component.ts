import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { FirebaseService } from 'src/app/shared/firebase.service';

@Component({
  selector: 'app-addallocationform',
  templateUrl: './add-allocationform.component.html',
  styleUrls: ['./add-allocationform.component.scss'],
  providers: [MessageService]
})
export class AddAllocationformComponent implements OnInit {
  availlimit: number = 1;
  constructor(private fb: FirebaseService, private messageService: MessageService, private formBuilder: FormBuilder) { }
  form: FormGroup = this.formBuilder.group({});

  matgroup: any = []
  selectedgroup: any = ''
  saveButtonEnabled: boolean = false
  monthNames: string[] = moment.monthsShort();
  currentYear: any = moment().year();
  selectedMonthval: any = moment().month();
  selectedMonth: any = moment().month();
  selectedYear: any = this.currentYear;
  allocatedvalue: number = 0
  ngOnInit(): void {
    this.form.addControl('Rangevalue', this.formBuilder.control(0));
    const now = moment(); // Get current date and time
    this.selectedMonthval = this.monthNames[Number(now.month())]
    this.fb.getAllMaterialGroup().subscribe((res: any) => {
      // console.log(res);
      this.matgroup = res[0].Groups
    })
    this.fb.getLoggedusersDetails().subscribe((res: any) => {
      // console.log(res[0].inflowM);
      this.availlimit = res[0].inflowM
    })
    this.form.get('Rangevalue')?.valueChanges.subscribe(value => {
      this.allocatedvalue = value
      this.saveButtonEnabled = value > 0 ? true : false
    });

    this.emitDate()

  }

  selectMonth(event: any) {
    this.selectedMonth = this.monthNames.indexOf(event);
    this.emitDate();
  }

  setYear(event: any) {
    // console.log(event, 'year changed', this.selectedMonth);
    this.selectedYear = Number(event);
    this.emitDate();
  }


  emitDate() {
    const datetoadd = new Date(this.selectedYear, this.selectedMonth, 1)
    this.fb.getLoggedusersDetails().subscribe((res: any) => {
      // console.log(res[0].inflowM);
      this.availlimit = res[0].inflowM
    })
    this.getAllallocation(datetoadd)
  }
  addAllocation() {
    if (this.selectedgroup == '') {
      alert('Please select group')
    }
    else {
      const datetoadd = new Date(this.selectedYear, this.selectedMonth, 1)
      const datatoaddfb = { category: this.selectedgroup, allocateddate: datetoadd, first: this.allocatedvalue, isupdated: false }
      console.log(datatoaddfb);

      this.fb.addAllocation(datatoaddfb).finally(() => {
        this.form.patchValue({ Rangevalue: 0 })
        this.selectedgroup = ''
        this.getAllallocation(datetoadd)

        this.showSuccess(`Allocation added Successfully`)
      })
    }
  }

  submit(event: any) {
    console.log(event, this.form.get('value'));

  }
  showSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  getAllallocation(datevalue: any) {
    this.fb.getAllAllocation(datevalue).subscribe((res) => {
      console.log(res);

      if (Array.isArray(res)) {
        const categoriesToRemove = res.map(item => item.category);

        this.matgroup = this.matgroup.filter((group: any) => !categoriesToRemove.includes(group));

        res.forEach(item => {
          this.availlimit -= item.first;
        });

      }
    });
  }

}
