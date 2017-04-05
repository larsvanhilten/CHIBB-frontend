import angular from 'angular';

//Handle http specific errors here.
//HOnly return the error data, the app shouldn't handle status codes
const errorInterceptor = ($q, $log, $injector) => {
  'ngInject';

  return {
    responseError: config => {
      $log.info('Http error', config.status);
      const Session = $injector.get('Session');
      const $state = $injector.get('$state');

      if(config.status === 401) {
        Session.destroySession();
        $state.go('login');
      }

      return $q.reject(config.data);
    }
  };
};
angular.module('app.factories.errorInterceptor', []).factory('errorInterceptor', errorInterceptor);
export default errorInterceptor;
