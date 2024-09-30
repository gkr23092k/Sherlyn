import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as _ from 'lodash';
import { dataservice } from 'src/app/shared/data.service';
import { FirebaseService } from 'src/app/shared/firebase.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnChanges{
  private chart!: am4charts.PieChart3D;
  dataarrayobj: any = [];
  content: string = '';
  groupedData: any = [];
  msg: any = '';
  grpcount: any = 0;
  dataforfilter: any = []
  colorlist: any = [];
  constructor(private data: dataservice, private fb: FirebaseService) { }

  @Input('Spendlist') spendlist: any
  ngOnChanges() {
    this.groupedData = this.spendlist
    console.log(this.spendlist)

this.initializeChart()
  }


  private initializeChart() {
  // Check if the chart is already initialized
  this.chart = am4core.create('donut-chartdiv', am4charts.PieChart3D); // Unique container ID
  this.chart.innerRadius = am4core.percent(55);

  // Add data (replace this with your actual data)
  this.chart.data = this.groupedData

  // Add series
  const series = this.chart.series.push(new am4charts.PieSeries3D());
  series.dataFields.value = 'totalPrice';
  series.dataFields.category = 'matgroup';

  // Add labels
  series.labels.template.text = '';
  // series.labels.template.fill = am4core.color('red');

  // series.colors.list = this.colorlist

  this.chart.legend = new am4charts.Legend();

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
