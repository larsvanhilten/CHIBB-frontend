import angular from 'angular';

const UsersService = function($q, $http, Session, $state) {
  'ngInject';

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
};

angular.module('app.services.Users', []).service('Users', UsersService);
export default UsersService;
