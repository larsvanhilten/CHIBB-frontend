import angular from 'angular';

//IMPORTS
import './bodyCleaningInjector';
import './endpointInjector';
import './sessionInjector';

const factories = angular.module('app.factories', [
  'app.factories.bodyCleaningInjector',
  'app.factories.endpointInjector',
  'app.factories.sessionInjector',
]);

export default factories;
