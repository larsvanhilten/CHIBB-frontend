import angular from 'angular';
import template from './navBar.html';
import _ from 'lodash';
import './navBar.scss';

const navBarComponent = {
  bindings: {},
  template,
  controller: function($rootScope, Users, $state) {
    'ngInject';

    this.expandProfileOptions = false;

    this.menuSelect = menu => {
      const oldActive = _.find(this.me.menuOptions, menu => menu.active);
      oldActive.active = false;
      menu.active = true;

      menu.action();
    };

    this.home = () => {
      $state.go(Users.me.home || 'dashboard');
    };

    $rootScope.$on('$stateChangeSuccess', (e, toState) => {
      this.me = Users.me;
      $rootScope.showNavBar = Boolean(toState.showNavBar);
      if($rootScope.showNavBar && Users.me) {
        this.name = Users.me.name;
      }
    });
  },
  controllerAs: 'vm'
};

angular.module('app.components.navBar', []).component('navBar', navBarComponent);
export default navBarComponent;
