import angular from 'angular';

//IMPORTS
import './login/login';

const routes = angular.module('app.routes', [

  'app.routes.login',
]);

export default routes;
