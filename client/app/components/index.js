import angular from 'angular';

//IMPORTS
import './footer/footer';
import './navBar/navBar';
import './stdButton/stdButton';
import './stdText/stdText';

const components = angular.module('app.components', [
  'app.components.stdText',
  'app.components.stdButton',
  'app.components.navBar',
  'app.components.footer',
]);

export default components;
