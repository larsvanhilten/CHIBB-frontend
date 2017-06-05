import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './dashboard.html';
import './dashboard.scss';
import _ from 'lodash';
import moment from 'moment';

const controller = function(Sensors, $scope) {
  'ngInject';

  this.sensors = [];
  this.charts = ['Line', 'Bar', 'Pie'];

  this.configOne = {
    loaded: false,
    type: 'line',
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
  this.configTwo = {
    loaded: false,
    type: 'line',
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
    ['vm.sensorOne',
      'vm.chartOne',
      'vm.dateFrom', 'vm.dateTo'],
    () => {
      if(this.sensorOne) {
        this.configOne.title = `${this.sensorOne} readings`;
        this.configOne.labelY = `${this.sensorOne}`;
        this.configOne.datasets[0].label = `${this.sensorOne}`;
        if(this.chartOne) {
          this.configOne.type = _.lowercase(this.chartOne);
          if(this.dateFrom && this.dateTo) {
            const type = _.lowercase(this.sensorOne);
            const fromUnix = moment(this.dateFrom, 'DD-MM-YYYY').valueOf() / 1000;
            const toUnix = moment(this.dateTo, 'DD-MM-YYYY').valueOf() / 1000;
            Sensors.getBetweenTime(type, fromUnix, toUnix)
            .then(data => {
              console.log(data);
              _.map(data, reading => {
                this.configOne.datasets[0].dataY.push(reading.reading);
                this.configOne.dataX.push(reading.timestamp);
              });
              this.configOne.loaded = true;
            })
            .catch(error => console.log(error));
          }
        }
      }
    });

  $scope.$watchGroup(
    ['vm.sensorTwo',
      'vm.chartTwo',
      'vm.dateFrom', 'vm.dateTo'],
    () => {
      if(this.sensorTwo) {
        this.configTwo.title = `${this.sensorTwo} readings`;
        this.configTwo.labelY = `${this.sensorTwo}`;
        this.configTwo.datasets[0].label = `${this.sensorTwo}`;
        if(this.chartTwo) {
          this.configTwo.type = _.lowercase(this.chartTwo);
          if(this.dateFrom && this.dateTo) {
            const type = _.lowercase(this.sensorTwo);
            const fromUnix = moment(this.dateFrom, 'DD-MM-YYYY').valueOf() / 1000;
            const toUnix = moment(this.dateTo, 'DD-MM-YYYY').valueOf() / 1000;
            Sensors.getBetweenTime(type, fromUnix, toUnix)
            .then(data => {
              _.map(data, reading => {
                this.configTwo.datasets[0].dataY.push(reading.reading);
                this.configTwo.dataX.push(reading.timestamp);
              });
              this.configTwo.loaded = true;
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
