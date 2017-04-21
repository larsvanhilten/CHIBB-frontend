import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './dashboard.html';
import './dashboard.scss';

const controller = function() {
  'ngInject';

  this.config = {
    title: 'test',
    dataX: [1, 2, 3, 4],
    labelX: 'testX',
    dataY: [2, 4, 6, 8],
    labelY: 'testY'
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

routeWrap(angular).module('app.routes.dashboard', []).route('dashboard', dashboardComponent);
export default dashboardComponent;
