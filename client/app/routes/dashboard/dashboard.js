import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './dashboard.html';
import './dashboard.scss';
import _ from 'lodash';

const controller = function(Sensors, $scope) {
  'ngInject';

  this.sensors = [];
  this.chart = {};
  this.chart.loaded = true;

  Sensors.getStatusses()
  .then(sensors => {
    _.map(sensors, sensor => {
      this.sensors.push(_.capitalize(sensor.type));
    });
  })
  .catch(() => {});

  $scope.$watch('vm.sensorOne', () => {
    if(this.sensorOne) {
      Sensors.get()
      .then(data => {
        
      })
      .catch();
    }
  });

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
