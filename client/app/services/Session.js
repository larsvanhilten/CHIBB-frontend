import angular from 'angular';

const SessionService = function($http) {
  'ngInject';

  this.createSession = {};

  this.destroySession = {};

  this.checkSession = {};

  this.init = {};

  this.login = credentials => $http.post('/auth', credentials);


};

angular.module('app.services.Session', []).service('Session', SessionService);
export default SessionService;
