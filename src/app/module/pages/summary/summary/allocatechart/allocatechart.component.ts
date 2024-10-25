import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { forkJoin } from 'rxjs';
import * as _ from 'lodash';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-allocate-chart',
  templateUrl: './allocatechart.component.html',
  styleUrls: ['./allocatechart.component.scss']
})

export class AllocateChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartdiv', { static: false }) chartDiv!: ElementRef;

  private chart!: am4charts.XYChart | any;
  data1: any[] = [];
  data2: any[] = [];
  formattedDate: any;
  lastDateOfMonth: any;
  startdateofmonth: any;
  icon: any = 'edit';
  startdate: any='';
  constructor(private fb: FirebaseService) { }

  monthNames: string[] = moment.monthsShort();
  currentYear: any = moment().year();
  selectedMonthval: any = moment().month();
  selectedMonth: any = moment().month();
  selectedYear: any = this.currentYear;
  iseditmode: boolean = false
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
    // Get the last date of the month
    const lastDate = moment().year(this.selectedYear).month(this.selectedMonth).endOf('month');
    this.lastDateOfMonth = lastDate.toDate();
    this.startdateofmonth = new Date(this.selectedYear, this.selectedMonth, 1)
    console.log('Selected Date:', 'pass', this.startdateofmonth, this.lastDateOfMonth);

    forkJoin({
      allocations: this.fb.getAllAllocation(this.startdateofmonth),
      materials: this.fb.getmatgroupAllItems(this.startdateofmonth, this.lastDateOfMonth)
    }).subscribe(({ allocations, materials }) => {
      // this.data1 = allocations;
      this.data1 = _.sortBy(allocations, 'category');
      this.data2 = materials;
      // console.log(materials,'from allocation');

      this.mergeData();
      this.createChart();
    });
  }

  ngOnInit(): void {
    const now = moment(); // Get current date and time
    this.selectedMonthval = this.monthNames[Number(now.month())]

    this.selectedYear = now.year(); // Current year
    this.startdateofmonth = new Date(this.selectedYear, this.selectedMonth, 1)
    const lastDate = moment().year(this.selectedYear).month(this.selectedMonth).endOf('month');
    this.lastDateOfMonth = lastDate.toDate();
    console.log(this.startdateofmonth, this.lastDateOfMonth, 'selectedmonth');


    forkJoin({
      allocations: this.fb.getAllAllocation(this.startdateofmonth),
      materials: this.fb.getmatgroupAllItems(this.startdateofmonth, this.lastDateOfMonth)
    }).subscribe(({ allocations, materials }) => {
      // this.data1 = allocations;
      this.data1 = _.sortBy(allocations, 'category');
      this.data2 = materials;
      // console.log(materials,'from allocation');

      this.mergeData();
      this.createChart();
    });
  }

  edimodefunction() {
    this.iseditmode = !this.iseditmode
    this.icon = (!this.iseditmode) ? 'edit' : 'exit_to_app'

    if (!this.iseditmode) {
      this.chart.dispose();
      setTimeout(() => {
        this.createChart()
      }, 10);
    }
  }

  private mergeData() {
    this.data1 = this.data1.map(el1 => {
      const matchedEl2 = this.data2.find(el2 => el1.category === el2.category);
      return matchedEl2 ? { ...el1, ...matchedEl2 } : el1;
    });
  }

  private createChart() {
    am4core.useTheme(am4themes_animated);

    this.chart = am4core.create(this.chartDiv.nativeElement, am4charts.XYChart);
    this.chart.colors.step = 2;

    this.chart.legend = new am4charts.Legend();
    this.chart.legend.position = 'bottom';
    this.chart.legend.paddingBottom = 20;
    this.chart.legend.labels.template.maxWidth = 95;

    const xAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = 'category';
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    const yAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    this.chart.data = this.data1;

    // Set default zoom to the first 50% of the categories
    this.chart.events.on("ready", () => {
      const totalDataPoints = this.chart.data.length;
      if (totalDataPoints > 0) {
        const midPoint = Math.floor(totalDataPoints * 0.5); // Get the midpoint for 50%
        xAxis.zoomToIndexes(0, 6); // Adjust for zero-indexing
      }
      console.log(this.chart.events, xAxis);

    });

    this.createSeries('first', 'Allocated');
    this.createSeries('second', 'Utilised');
  }


  private createSeries(value: string, name: string) {
    const series = this.chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = value;
    series.dataFields.categoryX = 'category';
    series.name = name;
    series
    // series.tooltipText = '{first}/{second} Rs in {valueY}';

    series.events.on('hidden', this.arrangeColumns.bind(this));
    series.events.on('shown', this.arrangeColumns.bind(this));

    const bullet = series.bullets.push(new am4charts.LabelBullet());
    bullet.interactionsEnabled = false;
    bullet.dy = -8;
    bullet.label.text = '{valueY}';
    bullet.label.fill = am4core.color('#000000');
  }

  private arrangeColumns() {
    const series = this.chart.series.getIndex(0);
    if (!series || series.dataItems.length <= 1) return;

    const xAxis = this.chart.xAxes.getIndex(0);
    if (!xAxis) return;

    const dataItem0 = series.dataItems.getIndex(0);
    const dataItem1 = series.dataItems.getIndex(1);
    if (!dataItem0 || !dataItem1) return; // Check for undefined data items

    const w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
    const x0 = xAxis.getX(dataItem0, 'categoryX');
    const x1 = xAxis.getX(dataItem1, 'categoryX');
    const delta = ((x1 - x0) / this.chart.series.length) * w;

    if (am4core.isNumber(delta)) {
      const middle = this.chart.series.length / 2;
      let newIndex = 0;

      this.chart.series.each((s: any) => {
        if (!s.isHidden && !s.isHiding) {
          s.dummyData = newIndex;
          newIndex++;
        } else {
          s.dummyData = this.chart.series.indexOf(s);
        }
      });

      const visibleCount = newIndex;
      const newMiddle = visibleCount / 2;

      // Enable cursor for zooming
      this.chart.cursor = new am4charts.XYCursor();
      this.chart.cursor.behavior = "zoomX"; // Enable zooming in X direction
      this.chart.cursor.lineX.disabled = true;
      this.chart.cursor.lineY.disabled = true;

      // Enable scrollbar
      this.chart.scrollbarX = new am4core.Scrollbar();
      this.chart.scrollbarX.marginBottom = 30;



      this.chart.series.each((s: any) => {
        const trueIndex = this.chart.series.indexOf(s);
        const newIndex = s.dummyData;
        const dx = (newIndex - trueIndex + middle - newMiddle) * delta;

        s.animate({ property: 'dx', to: dx }, s.interpolationDuration, s.interpolationEasing);
        s.bulletsContainer.animate({ property: 'dx', to: dx }, s.interpolationDuration, s.interpolationEasing);
      });
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
