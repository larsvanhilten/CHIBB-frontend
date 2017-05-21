import angular from 'angular';

//IMPORTS
import './Brokers';
import './Sensors';
import './Users';
import './Session';

const services = angular.module('app.services', [
  'app.services.Session',
  'app.services.Users',
  'app.services.Sensors',
  'app.services.Brokers',
]);

export default services;
