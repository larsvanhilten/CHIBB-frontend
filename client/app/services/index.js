import angular from 'angular';

//IMPORTS
import './Session';

const services = angular.module('app.services', [
  'app.services.Session',
]);

export default services;
