import {extend, has} from 'lodash-es';

const run = ($rootScope, $state, $stateParams, $log, Resolver) => {
  'ngInject';

  Resolver.add({
    resolveLogin: ['$q', 'Session', ($q, Session) => Session.check()
    .then(() => $q.reject({redirect: 'dashboard'}), $q.resolve)],
    resolveSession: ['$q', 'Session', ($q, Session) => Session.check()
    .then($q.resolve, () => $q.reject({redirect: 'login'}))]
  });

  $rootScope.$state = $state;

  const previous = (fromState, fromParams) => extraParams =>
    $state.go(fromState.name || 'home', extend(fromParams, extraParams || {}));

  $rootScope.$on('$stateChangeStart', (e, toState, toParams) => {
    $log.info('To state', toState.name);
    //eslint-disable-next-line no-param-reassign
    $stateParams = extend($stateParams, toParams);
  });

  $rootScope.$on('$stateChangeSuccess', (e, toState, toParams, fromState, fromParams) => {
    window.scroll(0, 0);
    $state.previous = previous(fromState, fromParams);
  });

  $rootScope.$on('$stateChangeError', (e, toState, toParams, fromState, fromParams, error) => {
    e.preventDefault();
    if(has(error, 'redirect')) {
      $log.info('Redirecting to', error.redirect);
      return $state.go(error.redirect, error.params || {});
    }
    return $log.error(error);
  });
};

export default run;
