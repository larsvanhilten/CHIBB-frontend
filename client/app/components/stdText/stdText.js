import angular from 'angular';
import template from './stdText.html';
import './stdText.scss';

const stdTextComponent = {
  bindings: {
    name: '@',
    label: '@',
    type: '@',
    value: '&'
  },
  template,
  controller: function() {
    'ngInject';
  },
  controllerAs: 'vm'
};

angular.module('app.components.stdText', []).component('stdText', stdTextComponent);
export default stdTextComponent;
