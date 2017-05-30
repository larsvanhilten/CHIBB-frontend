import angular from 'angular';
import _ from 'lodash';

const SensorsService = function($http, $q) {
  'ngInject';

  this.get = type => {
    const defer = $q.defer();
    $http.get(`/sensors/${type}`)
    .then(readings => {
      if(readings[0].timestamp) {
        _.map(readings, reading => {
          reading.timestamp = new Date(reading.timestamp * 1000);
        });
      }
      defer.resolve(readings);
    })
    .catch(err =>
      defer.reject(err)
    );
    return defer.promise;
  };

  this.getBetweenTime = (type, from, to) => {
    const defer = $q.defer();
    $http.get(`/sensors/${type}/${from}/${to}`)
    .then(readings => {
      console.log(`/sensors/${type}/${from}/${to}`);
      console.log(readings);
      if(readings[0]) {
        _.map(readings, reading => {
          reading.timestamp = new Date(reading.timestamp * 1000);
        });
      }
      defer.resolve(readings);
    })
    .catch(err =>
      defer.reject(err)
    );
    return defer.promise;
  };

  this.getStatusses = () => {
    const defer = $q.defer();
    $http.get(`/sensors`)
    .then(readings => {
      if(readings[0].timestamp) {
        _.map(readings, reading => {
          reading.timestamp = new Date(reading.timestamp * 1000);
        });
      }
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
