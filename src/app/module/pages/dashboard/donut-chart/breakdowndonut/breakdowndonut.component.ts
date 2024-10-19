

import { Component, OnInit, OnDestroy, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as _ from 'lodash';
import { dataservice } from 'src/app/shared/data.service';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { subDays } from 'date-fns';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-breakdowndonut',
  templateUrl: './breakdowndonut.component.html',
  styleUrls: ['./breakdowndonut.component.scss']
})
export class BreakdowndonutComponent implements OnChanges {
  private chart!: am4charts.PieChart3D;
  dataarrayobj: any = [];
  content: string = '';
  groupedData: any = [];
  msg: any = '';
  grpcount: any = 0;
  dataforfilter: any = []
  colorlist: any = [];
  enddaterange: Date = new Date()
  startdaterange: Date = subDays(new Date(), 30);
  // daterange: MatDateRange<Date> | null = null;
  constructor(private data: dataservice, private fb: FirebaseService) { }

  @Input('Spendlist') spendlist: any
  @Input('Chosengroup') selectedgroup: any
  @Output() dataEmitter = new EventEmitter<any>();
  ngOnChanges() {
    this.groupedData = this.spendlist
    console.log(this.spendlist)
    this.initializeChart()
  }



  onDateRangeChanged() {
    console.log('Start Date:', this.startdaterange);
    console.log('End Date:', this.enddaterange);
    if (this.enddaterange) {
      this.dataEmitter.emit({ startdate: this.startdaterange, enddate: this.enddaterange });
    }
  }

  private initializeChart() {
    // Check if the chart is already initialized
    this.chart = am4core.create('subdonut-chartdiv', am4charts.PieChart3D); // Unique container ID
    this.chart.hiddenState.properties.opacity=0;

    // this.chart.innerRadius = am4core.percent(55);

    // Add data (replace this with your actual data)
    this.chart.data = this.groupedData

    // Add series
    const series = this.chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = 'totalPrice';
    series.dataFields.category = 'matgroup';

    // Add labels
    // series.labels.template.text = '';
    // series.labels.template.fill = am4core.color('red');

    // series.colors.list = this.colorlist

    this.chart.legend = new am4charts.Legend();

    series.slices.template.events.on("hit", (ev: any) => {
      console.log(ev.target.dataItem.category)
    });

  }


  disposeChart() {
    if (this.chart) {
      this.chart.dispose();
      console.log('Chart disposed successfully.');
    } else {
      console.warn('Chart was not initialized before disposal.');
    }
  }
}

