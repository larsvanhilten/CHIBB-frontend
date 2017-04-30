import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './sensors.html';
import './sensors.scss';

const controller = function() {
  'ngInject';

  this.name = 'sensors';
};

const sensorsComponent = {
  bindings: {},
  routeOpts: {
    name: 'sensors',
    url: '/sensors',
    showNavBar: true,
    resolve: ['resolveSession', 'me'],
    pageTitle: 'Sensors',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.sensors', []).route('sensors', sensorsComponent);
export default sensorsComponent;
