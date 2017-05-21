import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './sensors.html';
import './sensors.scss';

const controller = function(Sensors, Brokers) {
  'ngInject';

  this.statusses = [];

  Sensors.getStatusses()
  .then(statusses => {
    this.middle = statusses.length / 2;
    this.statusses = statusses;

  });

  this.broker = {};
  this.error = null;
  this.info = null;

  this.addBroker = () => {
    this.error = null;
    this.info = null;

    this.broker.port = parseInt(this.broker.port, 10);

    Brokers.add(this.broker)
    .then(() => {
      const form = document.getElementsByClassName('broker-form')[0];
      form.reset();
      this.info = 'Broker has been added!';
    })
    .catch(error => {
      this.error = error;
    });
  };

};

const sensorsComponent = {
  bindings: {},
  routeOpts: {
    name: 'sensors',
    url: '/sensors',
    showNavBar: true,
    resolve: ['resolveSession', 'me'],
    pageTitle: 'Sensors',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('app.routes.sensors', []).route('sensors', sensorsComponent);
export default sensorsComponent;
