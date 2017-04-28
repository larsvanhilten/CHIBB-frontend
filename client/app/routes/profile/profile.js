import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './profile.html';
import _ from 'lodash';
import './profile.scss';

const controller = function(Users, $state, Session) {
  'ngInject';

  this.isAdmin = Users.me.role === 'Admin';
  this.error = '';
  this.passwordHelp =
  'Must be 8 characters long and contain a non-alphabetical character';

  this.adminNotice =
  'Only an admin can edit this field';

  this.$onInit = () => {
    this.user = _.clone(Users.me);
  };

  this.update = () => {
    this.error = '';

    if(this.user.password !== this.user.repeatPassword) {
      return this.error = 'The passwords dont match.';
    }

    const updated = _.pickBy(this.user, (value, key) => value !== Users.me[key]);
    return Users.update(updated)
    .then(() => {
      Session.destroySession();
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
    resolve: ['resolveSession', 'me'],
    pageTitle: 'Profile',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.profile', []).route('profile', profileComponent);
export default profileComponent;
