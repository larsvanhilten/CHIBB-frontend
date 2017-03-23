import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './login.html';
import './login.scss';

const controller = function(Session, $state) {
  'ngInject';

  this.email = null;
  this.password = null;
  this.error = null;

  this.submit = () => {
    Session.login({email: this.email, password: this.password})
    .then(() => {
      $state.go('dashboard');
    })
    .catch(err => {
      this.error = err.data.message;
    });
  };

  this.register = () => $state.go('register');
};

const loginComponent = {
  bindings: {},
  routeOpts: {
    name: 'login',
    url: '/login',
    //resolve: ['redirectLogin'],
    pageTitle: 'Login',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.login', []).route('login', loginComponent);
export default loginComponent;
