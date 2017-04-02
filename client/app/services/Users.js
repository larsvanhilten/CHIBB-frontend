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

    $http.put(`/users/${this.me._id}`, user)
    .then(updatedUser => {
      this.me = _.assign(this.me, updatedUser);
      defer.resolve(this.me);
    })
    .catch(err => defer.reject(err.data.message));
  };

  this.getMe = () => {
    const defer = $q.defer();
    $http.get('/auth')
    .then(me => {
      if(me.authorized === false) {
        return defer.reject();
      }
      this.me = me;
      defer.resolve(me);
      return null;
    }, () => {
      defer.reject();
    });
    return defer.promise;
  };
};

angular.module('app.services.Users', []).service('Users', UsersService);
export default UsersService;
