import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './register.html';
import './register.scss';

const controller = function($state, Users) {
  'ngInject';

  this.email = null;
  this.name = null;
  this.password = null;
  this.repeatPassword = null;

  this.passwordHelp =
  'Must be 8 characters long and contain a non-alphabetical character';

  this.back = () => $state.go('login');
  this.register = () => {
    this.error = '';

    if(this.password !== this.repeatPassword) {
      this.error = `The passwords don't match`;
    } else {

      const user = {
        email: this.email,
        name: this.name,
        password: this.password
      };

      Users.create(user)
      .then(() => {
        $state.go('login');
      })
      .catch(err => {
        this.error = err;
      });
    }
  };

};

const registerComponent = {
  bindings: {},
  routeOpts: {
    name: 'register',
    url: '/register',
    //componentBindings: [],
    resolve: ['resolveLogin'],
    pageTitle: 'Register',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.register', []).route('register', registerComponent);
export default registerComponent;
