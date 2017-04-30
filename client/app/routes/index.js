import angular from 'angular';

//IMPORTS
import './sensors/sensors';
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
  'app.routes.sensors',
]);

export default routes;
