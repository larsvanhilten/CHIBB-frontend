import angular from 'angular';

const SessionService = function($http, $q) {
  'ngInject';

  this.auth = false;
  this.token = null;
  this.me = null;

  this.createSession = token => {
    this.auth = true;
    this.token = token;
    localStorage.setItem('token', token);
  };
  if(localStorage.token !== undefined) {this.createSession(localStorage.token);}

  this.destroySession = () => {
    this.auth = false;
    this.token = null;
    this.me = null;
    localStorage.removeItem('token');
  };

  this.check = init => {
    const defer = $q.defer();
    if(localStorage.token !== undefined && !init) {
      defer.resolve();
    } else {
      this.checkAuthorized().then(defer.resolve, defer.reject);
    }
    return defer.promise;
  };

  this.checkAuthorized = () => {
    const defer = $q.defer();
    $http.get('/auth')
    .then(me => {
      if(me.authorized === false) {
        return defer.reject(me);
      }
      this.me = me;
      defer.resolve(this.me);
      return null;
    }, res => {
      this.destroySession();
      defer.reject(res);
    });
    return defer.promise;
  };

  this.init = {};

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

  this.register = user => {
    const defer = $q.defer();
    $http.post('/users', user)
    .then(() => defer.resolve())
    .catch(err => defer.reject(err));
    return defer.promise;
  };

};

angular.module('app.services.Session', []).service('Session', SessionService);
export default SessionService;
