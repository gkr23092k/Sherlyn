import { Component, OnChanges, OnDestroy, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { dataservice } from 'src/app/shared/data.service';
import { FirebaseService } from 'src/app/shared/firebase.service';
import * as _ from 'lodash';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnChanges, OnDestroy {
  private chart!: am4charts.XYChart;
  dataarrayobj: any[] = [];
  chartdiv: string = ''; // Initialize as empty

  constructor(private data: dataservice, private fb: FirebaseService) { }

  @Input('Spendlist') spendlist: any;
  @Input('Idtoken') Idtoken: any;
  @Input('colorcode') colorcode: any;

  ngOnChanges() {
    if (this.spendlist && this.Idtoken) {
      this.dataarrayobj = this.spendlist;
      this.chartdiv = 'chartdiv-' + this.Idtoken; // Create unique ID
      this.dataloaded();
    }
  }

  dataloaded() {
    this.disposeChart(); // Dispose of the existing chart

    // Ensure the chart div is ready before creating the chart
    setTimeout(() => {
      if (document.getElementById(this.chartdiv)) {
        this.chart = am4core.create(this.chartdiv, am4charts.XYChart);

        const groupedData = _.groupBy(this.dataarrayobj, 'date');

         this.dataarrayobj= _.map(groupedData, (items, date) => {
          return {
            date: date,
            matprice: _.sumBy(items, 'matprice'),
          };
        });console.log(this.dataarrayobj,'chart loader');

        this.chart.data = this.dataarrayobj;

        // Create date axis
        const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 25;
        dateAxis.renderer.labels.template.fontSize = 12;
        dateAxis.renderer.labels.template.rotation = 45;
        dateAxis.renderer.grid.template.location = 0;
        // Create value axis
        const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        const series = this.chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = 'date';
        series.dataFields.valueY = 'matprice';
        series.strokeWidth = 3;
        series.tooltipText = '{matprice} Rs in {date}';
        series.stroke = am4core.color(this.colorcode);

        // Enable chart cursor
        this.chart.cursor = new am4charts.XYCursor();
        this.chart.cursor.behavior = 'zoomX';

        // Enable scrollbar
        this.chart.scrollbarX = new am4core.Scrollbar();
        // this.chart.scrollbarX.marginBottom = 30;
        // this.chart.legend = new am4charts.Legend();
        // const screenWidth = window.innerWidth;
        // console.log(screenWidth, 'screenWidth')
        // if (screenWidth < 767) {
        //   this.chart.events.on('ready', () => {
        //     const currentDate = new Date();
        //     const startOfLast10Days = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
    
        //     dateAxis.zoomToDates(startOfLast10Days, currentDate, true);
        //     series.tooltipText = `{matprice} Rs 
        //      {date}`;
    
        //   });
    
        // }
        // else {
        //   this.chart.events.on('ready', () => {
        //     const currentDate = new Date();
        //     const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        //     const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
        //     dateAxis.zoomToDates(startOfMonth, endOfMonth, true);
        //     series.tooltipText = '{matprice} Rs in {date}';
        //   });
        // }

      } else {
        console.warn(`Chart container with id ${this.chartdiv} not found.`);
      }
    }, 100); // Wait to ensure the DOM is ready


  }

  ngOnDestroy() {
    this.disposeChart(); // Clean up when the component is destroyed
  }

  private disposeChart() {
    if (this.chart) {
      this.chart.dispose();
      console.log('Chart disposed successfully.');
    } else {
      console.warn('Chart was not initialized before disposal.');
    }
  }
}
