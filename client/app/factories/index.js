import angular from 'angular';

//IMPORTS
import './errorInterceptor';
import './bodyCleaningInjector';
import './endpointInjector';
import './sessionInjector';

const factories = angular.module('app.factories', [
  'app.factories.bodyCleaningInjector',
  'app.factories.endpointInjector',
  'app.factories.sessionInjector',
  'app.factories.errorInterceptor',
]);

export default factories;
