import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './login.html';
import './login.scss';

const controller = function(Session) {
  'ngInject';

  this.email = null;
  this.password = null;
  this.error = null;

  this.submit = () => {
    Session.login({email: this.email, password: this.password})
    .then(() => {})
    .catch(err => {
      this.error = err.data.message;
    });
  };

};

const loginComponent = {
  bindings: {},
  routeOpts: {
    name: 'login',
    url: '/login',
    //componentBindings: [],
    //resolve: [],
    pageTitle: 'Login',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.login', []).route('login', loginComponent);
export default loginComponent;
