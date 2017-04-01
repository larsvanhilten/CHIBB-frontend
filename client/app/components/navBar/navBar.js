import angular from 'angular';
import template from './navBar.html';
import './navBar.scss';

const navBarComponent = {
  bindings: {},
  template,
  controller: function($rootScope, Users) {
    'ngInject';

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
