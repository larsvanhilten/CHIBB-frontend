/* global environment */
import angular from 'angular';
import {each} from 'lodash-es';

const config = ($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, $logProvider, $provide) => {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/login');

  // Add http interceptors
  each([
    'endpointInjector',
    'sessionInjector',
    'bodyCleaningInjector',
    'errorInterceptor'
  ], i => $httpProvider.interceptors.push(i));

  $provide.decorator('$log', ['$delegate', function ($delegate) {
    const hooks = ['info', 'debug', 'warn', 'error'];
    let level = hooks.indexOf(environment.log);
    //turn off all logs
    if(level === -1) {level = 1000;}
    hooks.forEach(hook => {
      $delegate[hook] = hook.indexOf(hook) >= level ? $delegate[hook] : angular.noop;
    });
    return $delegate;
  }]);
};

export default config;
