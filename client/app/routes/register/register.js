import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './register.html';
import './register.scss';

const controller = function($state, Session) {
  'ngInject';

  this.email = null;
  this.name = null;
  this.password = null;
  this.repeatPassword = null;

  this.back = () => $state.go('login');
  this.register = () => {
    if(this.password !== this.repeatPassword) {
      this.error = `The passwords don't match.`;
      return;
    }

    const user = {
      email: this.email,
      password: this.password,
      name: this.name
    };

    Session.register(user)
    .then(() => {
      $state.go('login');
    })
    .catch(err => {
      this.error = err.data.message;
    });
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
