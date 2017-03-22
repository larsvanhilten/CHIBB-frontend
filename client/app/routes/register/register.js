import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './register.html';
import './register.scss';

const controller = function($state) {
  'ngInject';

  this.email = null;
  this.name = null;
  this.password = null;
  this.repeatPassword = null;

  this.back = () => $state.go('login');
  this.register = () => {

  };
};

const registerComponent = {
  bindings: {},
  routeOpts: {
    name: 'register',
    url: '/register',
    //componentBindings: [],
    //resolve: [],
    pageTitle: 'Register',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.register', []).route('register', registerComponent);
export default registerComponent;
