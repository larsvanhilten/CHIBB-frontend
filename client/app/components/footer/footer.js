import angular from 'angular';
import template from './footer.html';
import './footer.scss';

const footerComponent = {
  bindings: {},
  template,
  controller: function() {
    'ngInject';

  },
  controllerAs: 'vm'
};

angular.module('app.components.footer', []).component('footer', footerComponent);
export default footerComponent;
