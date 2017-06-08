import angular from 'angular';
import template from './lineChart.html';
import './lineChart.scss';
import _ from 'lodash';
import Chart from 'chart.js/src/chart.js';

const lineChartComponent = {
  bindings: {
    config: '<'
  },
  template,
  controller: function($element) {
    'ngInject';

    const standardDeviation = (values, average) => {

      const squareDiffs = values.map(value => {
        const diff = value - average;
        const sqrDiff = diff * diff;
        return sqrDiff;
      });

      const avgSquareDiff = _.mean(squareDiffs);

      const stdDev = Math.sqrt(avgSquareDiff);
      return stdDev;
    };

    const doughnutData = () => {
      const average = _.mean(this.config.datasets[0].dataY);
      const deviation = standardDeviation(this.config.datasets[0].dataY, average);

      const min = _.round(_.min(this.config.datasets[0].dataY));
      const minAvg = _.round(average - deviation);
      const maxAvg = _.round(average + deviation);
      const max = _.round(_.max(this.config.datasets[0].dataY));

      const labels = [`${min} - ${minAvg} `, `${minAvg} - ${maxAvg}`, `${maxAvg} - ${max}`];
      const counter = [0, 0, 0];
      _.map(this.config.datasets[0].dataY, reading => {
        if(reading < minAvg) {
          counter[0]++;
        } else if(reading >= minAvg && reading <= maxAvg) {
          counter[1]++;
        } else if (reading > maxAvg) {
          counter[2]++;
        }
      });

      this.config.datasets[0].backgroundColor = ['#23D7AC', '#cccccc', '#FF6520'];
      this.config.datasets[0].borderColor = '#FFFFFF';
      this.config.datasets[0].dataY = counter;
      this.config.dataX = labels;
    };

    this.$onInit = () => {
      if(this.config.type === 'pie') {
        doughnutData();
      }

      const canvas = $element.find('canvas')[0];
      const info = {
        type: this.config.type || 'line',
        data: {
          labels: this.config.dataX,
          datasets: []
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
              ticks: {
                autoSkip: true,
                maxTicksLimit: 20,
                maxRotation: 90,
                minRotation: 0
              },
              type: 'time',
              time: {
                displayFormats: {
                  millisecond: 'MM/DD HH',
                  second: 'MM/DD HH',
                  minute: 'MM/DD HH',
                  hour: 'MM/DD HH',
                  day: 'MM/DD HH',
                  week: 'MM/DD HH',
                  month: 'MM/DD HH',
                  quarter: 'MM/DD HH',
                  year: 'MM/DD HH',
                }
              },
              display: this.config.type !== 'pie',
              scaleLabel: {
                display: true,
                labelString: this.config.labelX
              }
            }],
            yAxes: [{
              display: this.config.type !== 'pie',
              scaleLabel: {
                display: true,
                labelString: this.config.labelY
              }
            }]
          }
        }
      };

      _.map(this.config.datasets, dataset => {

        const data = {
          label: dataset.label,
          backgroundColor: dataset.backgroundColor || '#23D7AC',
          borderColor: dataset.borderColor || '#FF6520',
          pointBorderColor: dataset.pointBorderColor || '#23D7AC',
          data: dataset.dataY,
          fill: false,
        };

        info.data.datasets.push(data);
      });

      new Chart(canvas, info);
    };
  },
  controllerAs: 'vm'
};

angular.module('app.components.lineChart', []).component('lineChart', lineChartComponent);
export default lineChartComponent;
