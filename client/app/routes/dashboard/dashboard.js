import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './dashboard.html';
import _ from 'lodash';
import Chart from 'chart.js/src/chart.js';
import chartjs from 'angular-chart.js';
import './dashboard.scss';

const controller = function($scope, Sensors) {
  'ngInject';

  this.wind = {};
  this.wind.options = {
    title: {
      display: true,
      text: 'Wind'
    }
  };
  this.wind.x = [];
  this.wind.y = [];
  Sensors.get('wind')
  .then(readings => {
    _.map(readings, reading => {
      this.wind.y.push(reading.reading);
      this.wind.x.push(reading.timestamp);
    });
  });

  this.rainfall = {};
  this.rainfall.options = {
    title: {
      display: true,
      text: 'Rainfall'
    }
  };

  this.rainfall.x = [];
  this.rainfall.y = [];
  Sensors.get('rainfall')
  .then(readings => {
    _.map(readings, reading => {
      this.rainfall.y.push(reading.reading);
      this.rainfall.x.push(reading.timestamp);
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

routeWrap(angular).module('app.routes.dashboard', ['chart.js'])
.route('dashboard', dashboardComponent);
export default dashboardComponent;
