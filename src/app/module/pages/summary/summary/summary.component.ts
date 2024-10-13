import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/shared/firebase.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  iscard: any = 'MARGIN'

  cardsdata: any = []
  data: any;
  groupeddata: any;
  ischart: boolean = false
  last1DaysDatainv: any = [];
  last7DaysDatainv: any = [];
  last30DaysDatainv: any = [];
  Spendreport: any = []
  Investreport: any = []
  totalinvest: number = 0;
  totalspend: number = 0;
  totalreport: any = [];
  investdata: any;
  griddata: any;
  TotalSpendreport: any = [];
  TotalInvestreport: any=[];
  creditgriddata: any=[];
  constructor(private fb: FirebaseService) { }
  ngOnInit() {
    this.fb.getAllspendItems().subscribe((res: any) => {
      this.data = res
      this.summarizespend(this.data)
    })
    this.fb.getAllinvestItems().subscribe((res: any) => {
      this.investdata = res
      this.summarizeinvest(this.investdata)
    })
    this.fb.getAllspendItemsgrid().subscribe((res: any) => {
      this.griddata = res
      // this.summarizespend(this.griddata)
    })

    this.fb.getAllcreditItems().subscribe((res: any) => {
      this.creditgriddata = res
      // this.summarizespend(this.griddata)
    })
  }



  summarizespend(data: any) {

    let last1DaysDatainv: any = []
    let last7DaysDatainv: any = []
    let last30DaysDatainv: any = []

    this.filterDataByDate(data, 1, last1DaysDatainv);
    if (last1DaysDatainv.length == 0) {
      last1DaysDatainv = [{ "matprice": "Nil" }]
    }
    this.Spendreport.push({ ..._.maxBy(last1DaysDatainv, 'matprice'), heading: 'MaxofToday' })
    this.TotalSpendreport.push({ matprice: _.sumBy(last1DaysDatainv, 'matprice'), heading: 'Totalof1day' })


    this.filterDataByDate(data, 7, last7DaysDatainv);
    if (last7DaysDatainv.length == 0) {
      last7DaysDatainv = [{ "matprice": "Nil" }]
    }
    this.Spendreport.push({ ..._.maxBy(last7DaysDatainv, 'matprice'), heading: 'Maxof7days' })
    this.TotalSpendreport.push({ matprice: _.sumBy(last7DaysDatainv, 'matprice'), heading: 'Totalof7days' })


    this.filterDataByDate(data, 30, last30DaysDatainv);
    if (last30DaysDatainv.length == 0) {
      last30DaysDatainv = [{ "matprice": "Nil" }]
    }
    this.Spendreport.push({ ..._.maxBy(last30DaysDatainv, 'matprice'), heading: 'Maxof30days' })
    this.TotalSpendreport.push({ matprice: _.sumBy(last30DaysDatainv, 'matprice'), heading: 'Totalof30days' })

    if (this.Spendreport.length == 0) {
      this.Spendreport = [{ "matprice": 0 }]
    }

    this.Spendreport.push({ ..._.maxBy(data, 'matprice'), heading: 'MaxofAlltime' })

    this.totalreport.push({ matprice: _.sumBy(data, 'matprice'), heading: 'Total Spend' })




    // this.totalinvest = _.sumBy(this.investdata, 'Price');


    // console.log(this.Spendreport);


  }

  summarizeinvest(data: any) {
    let last1DaysDatainv: any = []
    let last7DaysDatainv: any = []
    let last30DaysDatainv: any = []

    this.filterDataByDate(data, 1, last1DaysDatainv);
    if (last1DaysDatainv.length == 0) {
      last1DaysDatainv = [{ "matprice": "Nil" }]
    }
    this.Investreport.push({ ..._.maxBy(last1DaysDatainv, 'matprice'), heading: 'MaxofToday' })
    this.TotalInvestreport.push({ matprice: _.sumBy(last1DaysDatainv, 'matprice'), heading: 'Totalof1day' })


    this.filterDataByDate(data, 7, last7DaysDatainv);
    if (last7DaysDatainv.length == 0) {
      last7DaysDatainv = [{ "matprice": "Nil" }]
    }
    this.Investreport.push({ ..._.maxBy(last7DaysDatainv, 'matprice'), heading: 'Maxof7days' })
    this.TotalInvestreport.push({ matprice: _.sumBy(last7DaysDatainv, 'matprice'), heading: 'Totalof7days' })


    this.filterDataByDate(data, 30, last30DaysDatainv);
    if (last30DaysDatainv.length == 0) {
      last30DaysDatainv = [{ "matprice": "Nil" }]
    }
    this.Investreport.push({ ..._.maxBy(last30DaysDatainv, 'matprice'), heading: 'Maxof30days' })
    this.TotalInvestreport.push({ matprice: _.sumBy(last30DaysDatainv, 'matprice'), heading: 'Totalof30days' })

    if (this.Investreport.length == 0) {
      this.Investreport = [{ "matprice": 0 }]
    }

    this.Investreport.push({ ..._.maxBy(data, 'matprice'), heading: 'MaxofAlltime' })

    // this.totalinvest = _.maxBy(this.Investreport, 'matprice');
    this.totalreport.push({ matprice: _.sumBy(data, 'matprice'), heading: 'Total Invest' })

    // console.log(this.Investreport);


  }

  async filterDataByDate(data: any[], daysAgo: number, resultArray: any[]) {
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - daysAgo);
    // console.log(startDate);

    data.forEach(item => {
      const itemDate = new Date(item.date);
      if (itemDate >= startDate && itemDate <= currentDate) {
        // console.log(item);
        resultArray.push(item);
      }
    });

  }

}
