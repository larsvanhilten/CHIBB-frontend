import angular from 'angular';

//This injector adds the authorization header
const sessionInjector = $injector => {
  'ngInject';

  return {
    request: config => {
      const Session = $injector.get('Session');
      if(Session.auth === true) {
        config.headers.Authorization = Session.token;
      }
      return config;
    },
  };
};

angular.module('app.factories.sessionInjector', []).factory('sessionInjector', sessionInjector);
export default sessionInjector;
