import angular from 'angular';
import template from './stdText.html';
import _ from 'lodash';

import './stdText.scss';

const stdTextComponent = {
  bindings: {
    name: '@',
    label: '@',
    type: '@',
    data: '=',
    readOnly: '='
  },
  template,
  controller: function() {
    'ngInject';

    this.$onInit = () => {
      this.name = _.kebabCase(this.label);
    };
  },
  controllerAs: 'vm'
};

angular.module('app.components.stdText', []).component('stdText', stdTextComponent);
export default stdTextComponent;
