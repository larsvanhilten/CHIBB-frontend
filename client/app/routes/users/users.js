import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './users.html';
import './users.scss';

const controller = function() {
  'ngInject';

  this.name = 'users';
};

const usersComponent = {
  bindings: {},
  routeOpts: {
    name: 'users',
    url: '/users',
    showNavBar: true,
    resolve: ['resolveSession', 'me'],
    pageTitle: 'Users',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.users', []).route('users', usersComponent);
export default usersComponent;
