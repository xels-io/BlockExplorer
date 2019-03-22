import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class ChartComP implements OnInit {

   constructor() {
       this.options = {
           chart: {
               type: 'pie'
           },
           title : { text : 'PieChart' },
            series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Sogou Explorer',
            y: 1.64
        }, {
            name: 'Opera',
            y: 1.6
        }, {
            name: 'QQ',
            y: 1.2
        }, {
            name: 'Other',
            y: 2.61
        }]
      }]
       };
   }

   options: Object;
   chart: Object;
   theme: Object;
   saveChart(chart) {
    this.chart = chart;
  }

  ngOnInit() {

 }
   onPointSelect(point) {
    alert(`${point.y} is selected`);
  }
  onPointClick(point) {
    alert(`${point.myData} was clicked`);
  }


  // chart = new Chart({
  //   chart: {
  //     plotBackgroundColor: null,
  //     plotBorderWidth: null,
  //     plotShadow: false,
  //     type: 'pie'
  //   },
  //   title: {
  //     text: 'piechart'
  //   },
  //   tooltip: {
  //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  // },
  // plotOptions: {
  //     pie: {
  //         allowPointSelect: true,
  //         cursor: 'pointer',
  //         dataLabels: {
  //             enabled: false
  //         },
  //         showInLegend: true
  //     }
  // },
  //   credits: {
  //     enabled: false
  //   },
  //   series: [{
  //     name: 'Brands',
  //     // colorByPoint: true,
  //     data: [{
  //         name: 'Chrome',
  //         y: 61.41,
  //         sliced: true,
  //         // selected: true
  //     }, {
  //         name: 'Internet Explorer',
  //         y: 11.84
  //     }, {
  //         name: 'Firefox',
  //         y: 10.85
  //     }, {
  //         name: 'Edge',
  //         y: 4.67
  //     }, {
  //         name: 'Safari',
  //         y: 4.18
  //     }, {
  //         name: 'Other',
  //         y: 7.05
  //     }]
  // }]
  // });

  // constructor() { }

  // ngOnInit() {
  // }

}
