import angular from 'angular';

//IMPORTS
import './lineChart/lineChart';
import './lineChart/lineChart';
import './footer/footer';
import './navBar/navBar';
import './stdButton/stdButton';
import './stdText/stdText';

const components = angular.module('app.components', [
  'app.components.stdText',
  'app.components.stdButton',
  'app.components.navBar',
  'app.components.footer',
  'app.components.lineChart',
  'app.components.lineChart',
]);

export default components;
