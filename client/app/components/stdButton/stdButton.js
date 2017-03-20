import angular from 'angular';
import template from './stdButton.html';
import './stdButton.scss';

const stdButtonComponent = {
  bindings: {
    text: '@',
  },
  template,
  controller: function() {
    'ngInject';

  },
  controllerAs: 'vm'
};

angular.module('app.components.stdButton', []).component('stdButton', stdButtonComponent);
export default stdButtonComponent;
