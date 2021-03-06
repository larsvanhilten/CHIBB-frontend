import angular from 'angular';
import template from './navBar.html';
import _ from 'lodash';
import './navBar.scss';

const navBarComponent = {
  bindings: {},
  template,
  controller: function($rootScope, Users, $state, Session) {
    'ngInject';

    this.expandProfileOptions = false;

    this.home = () => {
      $state.go(Users.me.home || 'dashboard');
    };

    // Show right options for different user roles
    const initializeMe = me => {
      me.profileOptions = [
        {name: 'Profile', action: () => $state.go('profile')},
        {name: 'Logout', action: () => Session.destroySession()},
      ];

      if(me.role === 'Admin') {
        me.menuOptions = [
          {name: 'Dashboard', active: true, action: () => $state.go('dashboard')},
          {name: 'Sensors', action: () => $state.go('sensors')},
          {name: 'Users', action: () => $state.go('users')}
        ];
      }else {
        me.menuOptions = [
          {name: 'Dashboard', active: true, action: () => $state.go('dashboard')},
          {name: 'Sensors', action: () => $state.go('sensors')}
        ];
      }
      return me;
    };

    // Remove navBar option active state of being selected
    const removeActiveState = () => {
      const oldActive = _.find(this.me.menuOptions, menu => menu.active);
      oldActive.active = false;
    };

    // set navBar option active state of being selected
    const setActiveState = state => {
      const newActive = _.find(this.me.menuOptions, menu => menu.name === state.pageTitle);
      if(!_.isNil(newActive)) {
        newActive.active = true;
      }
    };

    // Rerendering of navBar after state change
    $rootScope.$on('$stateChangeSuccess', (e, toState) => {
      $rootScope.showNavBar = Boolean(toState.showNavBar);
      if($rootScope.showNavBar && Users.me) {
        this.me = initializeMe(Users.me);
        this.name = _.capitalize(Users.me.name);
        removeActiveState();
        setActiveState(toState);
      }
    });
  },
  controllerAs: 'vm'
};

angular.module('app.components.navBar', []).component('navBar', navBarComponent);
export default navBarComponent;
