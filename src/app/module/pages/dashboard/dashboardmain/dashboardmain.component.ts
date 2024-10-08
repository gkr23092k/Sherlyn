import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase.service';

@Component({
  selector: 'app-dashboardmain',
  templateUrl: './dashboardmain.component.html',
  styleUrls: ['./dashboardmain.component.scss']
})
export class DashboardmainComponent {
  data: any;
  groupeddata: any;
  ischart: any = 'SDAY'
  groupeddatamonthly: any;
  investdata: any;
  groupeddatamonthlyinv: any;
  constructor(private fb: FirebaseService) { }
  ngOnInit() {
    this.fb.getAllspendItems().subscribe((res: any) => {
      this.data = res
      // console.log(this.data, 'ssl')
    })
    this.fb.getmatgroupspendItems().subscribe((res: any) => {
      this.groupeddata = res

      // console.log(res);

    })
    this.fb.getAllSpendItemsMonthly().subscribe((res: any) => {
      this.groupeddatamonthly = res
      // console.log(res);

    })
    this.fb.getAllinvestItems().subscribe((res: any) => {
      this.investdata = res
      // console.log(this.data, 'ssl')
    })

    this.fb.getAllInvestItemsMonthly().subscribe((res: any) => {
      this.groupeddatamonthlyinv = res
      // console.log(res);

    })
  }
}
