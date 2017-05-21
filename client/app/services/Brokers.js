import angular from 'angular';

const BrokersService = function($q, $http) {
  'ngInject';

  this.add = broker => {
    const defer = $q.defer();

    $http.post('/brokers', broker)
    .then(() => {
      defer.resolve();
    })
    .catch(err => defer.reject(err.message));

    return defer.promise;
  };

};

angular.module('app.services.Brokers', []).service('Brokers', BrokersService);
export default BrokersService;
