import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './dashboard.html';
import './dashboard.scss';
import _ from 'lodash';

const controller = function(Sensors) {
  'ngInject';

  this.windConfig = {
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

  Sensors.get('wind')
  .then(readings => {
    _.map(readings, reading => {
      this.windConfig.datasets[0].dataY.push(reading.reading);
      this.windConfig.dataX.push(reading.timestamp);
      this.windConfig.loaded = true;
    });
  });

  this.temperatureConfig = {
    loaded: false,
    title: 'Temperature readings',
    labelY: 'Temperature',
    labelX: 'Time',
    dataX: [],
    datasets: [
      {
        label: 'Temperature',
        dataY: []
      }
    ]
  };

  Sensors.get('temperature')
  .then(readings => {
    _.map(readings, reading => {
      this.temperatureConfig.datasets[0].dataY.push(reading.reading);
      this.temperatureConfig.dataX.push(reading.timestamp);
      this.temperatureConfig.loaded = true;
    });
  });

  this.rainfallConfig = {
    loaded: false,
    title: 'Rainfall readings',
    labelY: 'Rainfall',
    labelX: 'Time',
    dataX: [],
    datasets: [
      {
        label: 'Rainfall',
        dataY: []
      }
    ]
  };

  Sensors.get('rainfall')
  .then(readings => {
    _.map(readings, reading => {
      this.rainfallConfig.datasets[0].dataY.push(reading.reading);
      this.rainfallConfig.dataX.push(reading.timestamp);
      this.rainfallConfig.loaded = true;
    });
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
