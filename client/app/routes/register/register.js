import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './register.html';
import './register.scss';

const controller = function() {
  'ngInject';

  this.name = 'register';
};

const registerComponent = {
  bindings: {},
  routeOpts: {
    name: 'register',
    url: '/register',
    //componentBindings: [],
    //resolve: [],
    pageTitle: 'register',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.register', []).route('register', registerComponent);
export default registerComponent;
