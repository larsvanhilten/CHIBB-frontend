import angular from 'angular';

//IMPORTS
import './users/users';
import './profile/profile';
import './dashboard/dashboard';
import './register/register';
import './login/login';

const routes = angular.module('app.routes', [

  'app.routes.login',
  'app.routes.register',
  'app.routes.dashboard',
  'app.routes.profile',
  'app.routes.users',
]);

export default routes;
