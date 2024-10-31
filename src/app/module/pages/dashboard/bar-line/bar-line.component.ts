import { Component, OnInit, OnDestroy, OnChanges, Input, AfterViewChecked, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { dataservice } from 'src/app/shared/data.service';
import { FirebaseService } from 'src/app/shared/firebase.service';
import { NgxSpinnerService } from 'ngx-spinner';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-bar-line',
  templateUrl: './bar-line.component.html',
  styleUrls: ['./bar-line.component.scss']
})
export class BarLineComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {
  private chart!: am4charts.XYChart;
  dataarrayobj: any[] = [];
  chartdiv: string = '';
  private chartCreated = false;

  constructor(private data: dataservice, private fb: FirebaseService, private ngZone: NgZone, private spinner: NgxSpinnerService) { }

  @Input('Spendlist') spendlist: any;
  @Input('Idtoken') Idtoken: any;
  @Input('colorcode') colorcode: any;
  @Input('zoomRange') zoomRange: string = 'days'; // 'days' or 'months'

  ngOnChanges() {
    if (this.spendlist && this.Idtoken) {
      this.dataarrayobj = this.spendlist;
      this.chartdiv = 'chartdiv-' + this.Idtoken; // Create unique ID
      // console.log(this.spendlist, this.Idtoken, this.chartdiv);
      this.chartCreated = false; // Reset to allow re-creation
      this.spinner.show(); // Show spinner on data change
    }
  }

  ngOnInit() {
    // Initialize chart only if data is ready
    if (this.spendlist && this.Idtoken) {
      this.spinner.show(); // Show spinner initially
      this.createChart();
    }
  }

  ngAfterViewChecked() {
    // Ensure the chart is created after the view has been checked and updated
    if (this.spendlist && this.Idtoken && !this.chartCreated) {
      this.createChart();
    }
  }

  createChart() {
    this.ngZone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose(); // Dispose of the existing chart instance to avoid multiple chart renders
      }

      // Ensure the container is present
      const element = document.getElementById(this.chartdiv);
      if (!element) {
        console.warn(`Element with id ${this.chartdiv} is missing in DOM.`);
        this.spinner.hide(); // Hide spinner if element is missing
        return;
      }

      // Create chart instance
      this.chart = am4core.create(this.chartdiv, am4charts.XYChart);
      this.chartCreated = true; // Mark as created

      // Assign data to chart
      this.chart.data = this.dataarrayobj;

      // Create date axis (x-axis)
      let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 25;
      dateAxis.renderer.labels.template.fontSize = 12; // Adjust the font size as needed
      dateAxis.renderer.labels.template.rotation = 45; // Adjust the rotation angle as needed
      dateAxis.renderer.grid.template.location = 0; // Adjust the grid location to center the labels

      // Create value axis (y-axis)
      let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

      // Create column series
      let columnSeries = this.chart.series.push(new am4charts.ColumnSeries());
      columnSeries.name = "matprice";
      columnSeries.fill = am4core.color(this.colorcode);
      columnSeries.dataFields.valueY = "matprice";
      columnSeries.dataFields.dateX = "date"; // Change to dateX for DateAxis
      columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
      columnSeries.columns.template.propertyFields.stroke = "stroke";
      columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
      columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";

      if (columnSeries.tooltip) {
        columnSeries.tooltip.label.textAlign = "middle";
      }

      // Create line series
      let lineSeries = this.chart.series.push(new am4charts.LineSeries());
      lineSeries.name = "Expenses";
      lineSeries.dataFields.valueY = "matprice";
      lineSeries.dataFields.dateX = "date"; // Change to dateX for DateAxis
      lineSeries.stroke = am4core.color(this.colorcode, 0.3);
      lineSeries.strokeWidth = 3;
      lineSeries.propertyFields.strokeDasharray = "lineDash";
      // lineSeries.smoothing = 'monotoneX'; // Use curveSmooth for smooth lines

      if (lineSeries.tooltip) {
        lineSeries.tooltip.label.textAlign = "middle";
      }

      let bullet = lineSeries.bullets.push(new am4charts.Bullet());
      bullet.fill = am4core.color("#fdd400");
      bullet.tooltipText = "[#fff font-size: 0.8rem]{name} \n {dateX}\n[/][#fff font-size: 1rem]{valueY}[/] [#fff]{additional}[/]";
      let circle = bullet.createChild(am4core.Circle);
      circle.radius = 4;
      circle.fill = am4core.color("#fff");
      circle.strokeWidth = 1;

      // Enable cursor for zooming
      this.chart.cursor = new am4charts.XYCursor();
      this.chart.cursor.behavior = "zoomX"; // Enable zooming in X direction
      this.chart.cursor.lineX.disabled = true;
      this.chart.cursor.lineY.disabled = true;

      // Enable scrollbar
      this.chart.scrollbarX = new am4core.Scrollbar();
      this.chart.scrollbarX.marginBottom = 30;

      // Hide spinner when the chart is fully ready
      this.chart.events.on('ready', () => {
        this.spinner.hide();
      });
    });

    // Add legend
    // this.chart.legend = new am4charts.Legend();

    // Set initial zoom based on input
    this.chart.events.on('ready', () => {
      const currentDate = new Date();
      let startDate: Date;

      if (this.zoomRange === 'days') {
        // Zoom to the last 7 days
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
        const dateAxis = this.chart.xAxes.getIndex(0) as am4charts.DateAxis;
        dateAxis.zoomToDates(startDate, currentDate, true);
      } else if (this.zoomRange === 'months') {
        // Zoom to the last 6 months, starting from the first of the month
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1);
        const nextMonthFirstDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const dateAxis = this.chart.xAxes.getIndex(0) as am4charts.DateAxis;
        dateAxis.zoomToDates(startDate, nextMonthFirstDate, true);
      }
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
    this.spinner.hide(); // Ensure spinner is hidden when component is destroyed
  }
}
