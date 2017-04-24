import angular from 'angular';
import template from './lineChart.html';
import './lineChart.scss';
import Chart from 'chart.js/src/chart.js';

const lineChartComponent = {
  bindings: {
    config: '<'
  },
  template,
  controller: function($element) {
    'ngInject';

    this.$onInit = () => {
      const canvas = $element.find('canvas')[0];
      const info = {
        type: 'line',
        data: {
          labels: this.config.dataY,
          datasets: [{
            label: 'A test',
            backgroundColor: '#ffffff',
            borderColor: '#FF6520',
            pointBorderColor: '#23D7AC',
            data: this.config.dataX,
            fill: false,
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: this.config.title
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.config.labelX
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.config.labelY
              }
            }]
          }
        }
      };
      const ctx = document.getElementById('test3');
      new Chart(canvas, info);
    };
  },
  controllerAs: 'vm'
};

angular.module('app.components.lineChart', []).component('lineChart', lineChartComponent);
export default lineChartComponent;
