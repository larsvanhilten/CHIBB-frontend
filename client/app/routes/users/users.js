import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './users.html';
import './users.scss';
import _ from 'lodash';

const controller = function(Users) {
  'ngInject';

  this.column = {
    field: 'name',
    reverse: false
  };


  this.editUser = {};
  this.roles = Users.roles;

  this.showUserModal = false;

  this.userModal = user => {
    this.editUser = _.clone(user);
    this.showUserModal = true;
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
  .catch(error => {
    this.error = error;
  });

  this.update = () => {
    this.editError = '';
    const originalUser = _.find(this.users, user => user._id === this.editUser._id);
    const updated = _.pickBy(this.editUser, (value, key) => value !== originalUser[key]);

    if(_.isEmpty(updated)) {
      this.showUserModal = false;
    } else {
      updated._id = originalUser._id;
      Users.update(updated)
      .then(user => {
        _.assign(originalUser, user);
        this.showUserModal = false;
      })
      .catch(error => {
        this.editError = error;
      });
    }
  };

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
