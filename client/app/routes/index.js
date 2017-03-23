import angular from 'angular';

//IMPORTS
import './dashboard/dashboard';
import './register/register';
import './login/login';

const routes = angular.module('app.routes', [

  'app.routes.login',
  'app.routes.register',
  'app.routes.dashboard',
]);

export default routes;
