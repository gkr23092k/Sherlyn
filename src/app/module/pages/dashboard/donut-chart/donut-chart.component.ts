import { Component, OnInit, OnDestroy, Input, OnChanges, EventEmitter, Output, AfterViewInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as _ from 'lodash';
import { dataservice } from 'src/app/shared/data.service';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { subDays } from 'date-fns';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnChanges, OnInit, AfterViewInit {
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
  groupeddata: any;
  matnamedata: any;
  selectedgroup: any=false;
  showFiller = false;

  // daterange: MatDateRange<Date> | null = null;
  constructor(private data: dataservice, private fb: FirebaseService) { }

  @Input('Spendlist') spendlist: any
  @Output() dataEmitter = new EventEmitter<any>();
  ngOnChanges() {
    this.groupedData = this.spendlist

    console.log(this.spendlist)
    this.initializeChart()
  }

  ngAfterViewInit() {
    this.initializeChart();
  }
  ngOnInit() {
    // this.fb.getmatnamespendItems('Investment').subscribe((res: any) => {
    //   this.matnamedata = res
    //   console.log(res, 'group spend items');

    // })
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
    this.chart = am4core.create('donut-chartdiv', am4charts.PieChart3D); // Unique container ID
    // this.chart.innerRadius = am4core.percent(55);

    // Add data (replace this with your actual data)
    this.chart.data = this.groupedData

    // Add series
    const series = this.chart.series.push(new am4charts.PieSeries3D());
    this.chart.hiddenState.properties.opacity = 0;
    series.dataFields.value = 'totalPrice';
    series.dataFields.category = 'matgroup';
    series.labels.template.fontSize = 12;
    // Add labels
    // series.labels.template.text = `${series.dataFields.category}`;
    // series.labels.template.fill = am4core.color('red');
    // series.colors.list = this.colorlist

    this.chart.legend = new am4charts.Legend();
    this.chart.legend.scrollable = true;
    this.chart.legend.maxHeight = 80;
    this.chart.legend.fontSize = 14;


    // const colorList = this.generateAmChartsHexColors(this.spendlist.length);
    // series.colors.list = colorList.map(color => am4core.color(color));
    // console.log(this.chart.colors);


    this.matnamedata = undefined
    this.selectedgroup = undefined
    series.slices.template.events.on("hit", (ev: any) => {
      const clickedSlice = ev.target;

      // Deselect all slices
      series.slices.each((slice) => {
        slice.isActive = false; // Deselect
      });

      // Select the clicked slice
      // clickedSlice.isActive = true;
      console.log(ev.target.dataItem.category)
      this.selectedgroup = ev.target.dataItem.category
      this.fb.getmatnamespendItems(ev.target.dataItem.category, this.startdaterange, this.enddaterange).subscribe((res: any) => {
        this.matnamedata = res
        this.matnamedata = _.orderBy(this.matnamedata, 'totalPrice', 'desc')

        console.log(res, 'group spend items');
      })
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



  generateAmChartsHexColors(n: number): string[] {
    const colors: string[] = [];
    const hueStep = 360 / n;

    for (let i = 0; i < n; i++) {
      const hue = i * hueStep;
      const saturation = 70 + Math.random() * 20; // Vary saturation for contrast
      const lightness = 40 + Math.random() * 20;  // Vary lightness for contrast

      const color = this.hslToHex(hue, saturation, lightness);
      colors.push(color);
    }

    return colors;
  }

  hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }




}
