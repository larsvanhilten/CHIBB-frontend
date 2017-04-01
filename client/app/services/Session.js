import angular from 'angular';

const SessionService = function($http, $q, Users, $state) {
  'ngInject';

  this.auth = false;
  this.token = null;

  this.createSession = token => {
    this.auth = true;
    this.token = token;
    localStorage.setItem('token', token);
    Users.getMe()
    .catch(() => this.destroySession());
  };
  if(localStorage.token !== undefined) {this.createSession(localStorage.token);}

  this.destroySession = () => {
    this.auth = false;
    this.token = null;
    Users.me = null;
    localStorage.removeItem('token');
    $state.go('login');
  };

  this.check = () => {
    const defer = $q.defer();
    if(localStorage.token) {
      defer.resolve();
    } else {
      defer.reject();
    }
    return defer.promise;
  };

  this.login = credentials => {
    const defer = $q.defer();
    $http.post('/auth', credentials)
    .then(result => {
      this.createSession(result.token);
      return defer.resolve();
    })
    .catch(err => defer.reject(err));
    return defer.promise;
  };

  this.logout = () => {
    this.destroySession();
  };

};

angular.module('app.services.Session', []).service('Session', SessionService);
export default SessionService;
