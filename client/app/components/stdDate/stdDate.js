import angular from 'angular';
import template from './stdDate.html';
import './stdDate.scss';
import datepicker from'angularjs-datepicker'; // eslint-disable-line

const stdDateComponent = {
  bindings: {
    label: '@',
    help: '@',
    value: '=',
    readOnly: '='
  },
  template,
  controller: function() {
    'ngInject';

  },
  controllerAs: 'vm'
};

angular.module('app.components.stdDate', ['720kb.datepicker'])
.component('stdDate', stdDateComponent);
export default stdDateComponent;
