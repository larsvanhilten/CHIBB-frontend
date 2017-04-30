import angular from 'angular';
import _ from 'lodash';

const UsersService = function($q, $http, $state) {
  'ngInject';

  this.me = null;

  this.create = user => {
    const defer = $q.defer();

    $http.post('/users', user)
    .then(() => {
      $state.go('login');
      defer.resolve();
    })
    .catch(err => defer.reject(err.data.message));

    return defer.promise;
  };

  this.update = user => {
    const defer = $q.defer();

    $http.put(`/users/${this.me.id}`, user)
    .then(updatedUser => {
      this.me = _.assign(this.me, updatedUser);
      defer.resolve(this.me);
    })
    .catch(err => defer.reject(err));

    return defer.promise;
  };

  this.getMe = () => {
    const defer = $q.defer();
    $http.get('/auth')
    .then(me => {
      if(me.authenticated === false) {
        return defer.reject();
      }
      this.me = me;
      return defer.resolve(this.me);
    })
    .catch(error => defer.reject(error));
    return defer.promise;
  };

  this.getAll = () => {
    const defer = $q.defer();
    $http.get('/users')
    .then(users => defer.resolve(users))
    .catch(error => defer.reject(error));
    return defer.promise;
  };
};

angular.module('app.services.Users', []).service('Users', UsersService);
export default UsersService;
