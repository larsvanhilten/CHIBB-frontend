import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './dashboard.html';
import './dashboard.scss';
import _ from 'lodash';

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

  $scope.$watch('vm.sensorOne', () => {
    if(this.sensorOne) {
      Sensors.get(this.sensorOne)
      .then(data => {
        _.map(data, reading => {
          this.chart.config.datasets[0].dataY.push(reading.reading);
          this.chart.config.dataX.push(reading.timestamp);
          this.chart.config.loaded = true;
        });
      })
      .catch(error => console.log(error));
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
