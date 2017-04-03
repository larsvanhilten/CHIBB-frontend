import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './profile.html';
import './profile.scss';

const controller = function(Users) {
  'ngInject';

  this.passwordHelp =
  'Must be 8 characters long and contain a non-alphabetical character';

  this.adminNotice =
  'Only an admin can edit this field';

  //retrieve user from Users.me
  this.user = {};
  this.error = '';

  this.update = () => {
    this.error = '';
    Users.update(this.user)
    .then(() => {
      this.user = Users.me;
    })
    .catch(error => {
      this.error = error;
    });
  };
};

const profileComponent = {
  bindings: {},
  routeOpts: {
    name: 'profile',
    url: '/profile',
    showNavBar: true,
    resolve: ['resolveSession'],
    pageTitle: 'Profile',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.profile', []).route('profile', profileComponent);
export default profileComponent;
