import angular from 'angular';

const SensorsService = function($http, $q) {
  'ngInject';

  this.get = type => {
    const defer = $q.defer();
    $http.get(`/sensors/${type}`)
    .then(readings => {
      defer.resolve(readings);
    })
    .catch(() =>
      defer.reject()
    );
    return defer.promise;
  };
};

angular.module('app.services.Sensors', []).service('Sensors', SensorsService);
export default SensorsService;
