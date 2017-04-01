import angular from 'angular';
import template from './navBar.html';
import _ from 'lodash';
import './navBar.scss';

const navBarComponent = {
  bindings: {},
  template,
  controller: function($rootScope, Users, $state) {
    'ngInject';

    this.menuItems = [{name: 'Users', active: true}, {name: 'data'}, {name: 'profile'}];

    this.menuSelect = menu => {
      const oldActive = _.find(this.menuItems, menu => menu.active);
      oldActive.active = false;
      menu.active = true;

      //TODO: go to menu's state
    };

    this.home = () => {
      $state.go(Users.me.home || 'dashboard');
    };

    this.profile = () => {
      $state.go('profile');
    };

    $rootScope.$on('$stateChangeSuccess', (e, toState) => {
      $rootScope.showNavBar = Boolean(toState.showNavBar);
      if($rootScope.showNavBar) {
        this.name = Users.me.name;
      }
    });
  },
  controllerAs: 'vm'
};

angular.module('app.components.navBar', []).component('navBar', navBarComponent);
export default navBarComponent;
