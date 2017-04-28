import angular from 'angular';
import template from './stdDropdown.html';
import './stdDropdown.scss';

const stdDropdownComponent = {
  bindings: {
    label: '@',
    help: '@',
    value: '=',
    data: '=',
    disabled: '='
  },
  template,
  controller: function() {
    'ngInject';
  },
  controllerAs: 'vm'
};

angular.module('app.components.stdDropdown', []).component('stdDropdown', stdDropdownComponent);
export default stdDropdownComponent;
