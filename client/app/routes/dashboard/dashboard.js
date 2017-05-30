import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './dashboard.html';
import './dashboard.scss';
import _ from 'lodash';
import moment from 'moment';

const controller = function(Sensors, $scope) {
  'ngInject';

  this.sensors = [];
  this.charts = ['Line-chart'];
  this.chart = {};
  this.chart.config = {
    loaded: false,
    title: 'Wind readings',
    labelY: 'Wind speed',
    labelX: 'Time',
    dataX: [],
    datasets: [
      {
        label: 'Wind',
        dataY: []
      }
    ]
  };

  Sensors.getStatusses()
  .then(sensors => {
    _.map(sensors, sensor => {
      this.sensors.push(_.capitalize(sensor.type));
    });
  })
  .catch(() => {});

  $scope.$watchGroup(
    ['vm.sensorOne', 'vm.sensorTwo',
      'vm.chartOne', 'vm.chartTwo',
      'vm.dateFrom', 'vm.dateTo'],
    () => {
      if(this.sensorOne && this.sensorTwo) {
        if(this.chartOne && this.chartTwo) {
          if(this.dateFrom && this.dateTo) {
            const type = _.lowercase(this.sensorOne);
            const fromUnix = moment(this.dateFrom, 'DD-MM-YYYY').valueOf() / 1000;
            const toUnix = moment(this.dateTo, 'DD-MM-YYYY').valueOf() / 1000;
            Sensors.getBetweenTime(type, fromUnix, toUnix)
            .then(data => {
              _.map(data, reading => {
                this.chart.config.datasets[0].dataY.push(reading.reading);
                this.chart.config.dataX.push(reading.timestamp);
              });
              this.chart.config.loaded = true;
            })
            .catch(error => console.log(error));
          }
        }
      }
    });

};

const dashboardComponent = {
  bindings: {},
  routeOpts: {
    name: 'dashboard',
    url: '/dashboard',
    showNavBar: true,
    resolve: ['resolveSession', 'me'],
    pageTitle: 'Dashboard',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.dashboard', [])
.route('dashboard', dashboardComponent);
export default dashboardComponent;
