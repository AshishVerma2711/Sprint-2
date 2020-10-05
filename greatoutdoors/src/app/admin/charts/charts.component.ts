import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],

})
export class ChartsComponent implements OnInit {
  public barCharts = [];
  public pieCharts = [];
  public chart = {};

  today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  public pieChartOptions = { backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB", " #C4C91E", " #6CE91E", '#1EC97B', " #1EC9BF", " #1E47C9", "#430974", " #DC133D"] }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  lastDateMonthly = ["01-31", '02-28', '03-31', '04-30', '05-31', '06-30', '07-31', '08-31', '09-30', '10-31', '11-30', '12-31']
  months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'Spetember', 'October', 'November', 'December']
  constructor(private _service: RestService) {
    
  }

  ngOnInit(): void {
    this._service.orderSoldByCategory("2020-01-01", "2020-12-12").subscribe((data: any[]) => {
      // console.log(">>>",data.map(d=>d.category));
      this.chart = {
        ChartLabels: data.map(d => d.category),
        ChartData: data.map(d => d.val),
        ChartType: 'pie',
        ChartOptions: this.pieChartOptions,
        footer: "This year: Order sold by category."
      }
      this.pieCharts.push(this.chart);
    })

    this._service.orderCancelledByCategory("2020-01-01", "2020-12-12").subscribe((data: any[]) => {
      this.chart = {
        ChartLabels: data.map(d => d.category),
        ChartData: data.map(d => d.val),
        ChartType: 'pie',
        ChartOptions: this.pieChartOptions,
        footer: "This Year: Order Cancelled by category."
      }
      this.pieCharts.push(this.chart);
    })

    this._service.costOfOrderForStatue("2020-01-01", "2020-12-12", "Delivered").subscribe((data: any[]) => {
      this.chart = {
        ChartLabels: data.map(d => d.category),
        ChartData: data.map(d => d.val),
        ChartType: 'doughnut',
        ChartOptions: this.pieChartOptions,
        footer: "This Year: Revenue for Delivered oreders by category."
      }
      this.pieCharts.push(this.chart);
    })

    this._service.costOfOrderForStatue("2020-01-01", "2020-12-12", "Cancelled").subscribe((data: any[]) => {
      this.chart = {
        ChartLabels: data.map(d => d.category),
        ChartData: data.map(d => d.val),
        ChartType: 'doughnut',
        ChartOptions: this.pieChartOptions,
        footer: "This Year: Cost for Cancelled orders by category."
      }
      this.pieCharts.push(this.chart);
    })
    // Revenue generated last 12 months

    this.barCharts.push(this.monthlyRevenue());

    this.barCharts.push(this.monthlyOrderQuantity());

    this.demoCharts();
  }

  // events on slice click
  public chartClicked(e: any): void {
    // console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    // console.log(e);
  }

monthlyOrderQuantity(){
  let chart = {}
  let barChartData1 = []
  let barChartData2 = []
  let ChartData = [];
  let ChartLabel = [];
  for (let index = 0; index < 12; index++) {
    let lastdate = this.today.substr(0, 5) + this.lastDateMonthly[index];
    let startdate = this.today.substr(0, 5) + this.lastDateMonthly[index].substr(0, 2) + "-01";
    this._service.orderPlaced(startdate, lastdate).subscribe((data) => {
      barChartData1.push(data)
    })
    this._service.orderCancelled(startdate, lastdate).subscribe((data) => {
      barChartData2.push(data)
    })
    ChartLabel.push(this.months[index])
  }
  ChartData.push({data:barChartData1, label:'Delivered'})
  ChartData.push({data:barChartData2, label:'Cancelled'})
  chart = {
    ChartLabels: ChartLabel,
    ChartData: ChartData,
    ChartType: 'bar',
    ChartOptions: this.barChartOptions,
    footer: "Monthly(12) Delivered/Cancelled order",
  }
  return chart
}

monthlyRevenue(){
  let chart = {}
    let ChartLabel = [];
    let ChartData = [];
    for (let index = 0; index < 12; index++) {
      let lastdate = this.today.substr(0, 5) + this.lastDateMonthly[index];
      let startdate = this.today.substr(0, 5) + this.lastDateMonthly[index].substr(0, 2) + "-01";
      this._service.revenueGenerated(startdate, lastdate).subscribe((data) => {
        ChartLabel.push(this.months[index])
        ChartData.push(data)
      })
    }
    chart = {
      ChartLabels: ChartLabel,
      ChartData: [{data:ChartData, label: 'Revenue'}],
      ChartType: 'bar',
      ChartOptions: this.barChartOptions,
      footer: "Monthly Revenue",
    }
    return chart 
}

demoCharts(){
  this.chart = {
    ChartLabels: ["", "InProgress", "OnHold", "Complete", "Cancelled"],
    ChartData: [210, 39, 10, 14, 16],
    ChartType: 'pie',
    ChartOptions: this.pieChartOptions,
    footer: 'Random 1'
  }
  this.pieCharts.push(this.chart);

  this.chart = {
    ChartLabels: ["Pending", "InProgress", "OnHold", "Complete", "Cancelled"],
    ChartData: [21, 39, 10, 14, 160],
    ChartType: 'pie',
    ChartOptions: this.pieChartOptions,
    footer: 'Random 2'
  }
  this.pieCharts.push(this.chart);

  this.chart = {
    ChartLabels: ["Pending", "InProgress", "OnHold", "Complete", "Cancelled"],
    ChartData: [210, 390, 10, 14, 16],
    ChartType: 'pie',
    ChartOptions: this.pieChartOptions,
    footer: 'Random 3'
  }
  this.pieCharts.push(this.chart);
}
}
