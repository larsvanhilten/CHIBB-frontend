import angular from 'angular';

//IMPORTS
import './stdButton/stdButton';
import './stdText/stdText';

const components = angular.module('app.components', [
  'app.components.stdText',
  'app.components.stdButton',
]);

export default components;
