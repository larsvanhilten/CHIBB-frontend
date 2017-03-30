import angular from 'angular';

//IMPORTS
import './Users';
import './Session';

const services = angular.module('app.services', [
  'app.services.Session',
  'app.services.Users',
]);

export default services;
