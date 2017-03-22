import angular from 'angular';

//IMPORTS
import './register/register';
import './login/login';

const routes = angular.module('app.routes', [

  'app.routes.login',
  'app.routes.register',
]);

export default routes;
