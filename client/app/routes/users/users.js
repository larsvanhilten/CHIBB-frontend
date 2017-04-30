import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './users.html';
import './users.scss';

const controller = function(Users) {
  'ngInject';

  this.column = {
    field: 'name',
    reverse: false
  };

  this.setOrder = column => {
    if(this.column.field === column) {
      this.column.reverse = !this.column.reverse;
    } else {
      this.column = {
        field: column,
        reverse: false
      };
    }
  };

  Users.getAll()
  .then(users => {
    this.users = users;
  })
  .catch(error => {});

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
