import angular from 'angular';

// Service for broker REST API
const BrokersService = function($q, $http) {
  'ngInject';

  this.getAll = () => {
    const defer = $q.defer();

    $http.get('/brokers')
    .then(brokers => {
      defer.resolve(brokers);
    })
    .catch(err => defer.reject(err.message));

    return defer.promise;
  };

  this.add = broker => {
    const defer = $q.defer();

    $http.post('/brokers', broker)
    .then(() => {
      defer.resolve();
    })
    .catch(err => defer.reject(err.message));

    return defer.promise;
  };

  this.update = broker => {
    const defer = $q.defer();

    $http.put(`/brokers/${broker._id}`, broker)
    .then(updatedBroker => defer.resolve(updatedBroker))
    .catch(err => defer.reject(err));

    return defer.promise;
  };
  this.delete = id => {
    const defer = $q.defer();

    $http.delete(`/brokers/${id}`)
    .then(() => {
      defer.resolve();
    })
    .catch(err => defer.reject(err.message));

    return defer.promise;
  };
};

angular.module('app.services.Brokers', []).service('Brokers', BrokersService);
export default BrokersService;
