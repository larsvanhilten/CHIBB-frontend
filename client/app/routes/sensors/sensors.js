import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './sensors.html';
import './sensors.scss';
import _ from 'lodash';

const controller = function(Sensors, Brokers) {
  'ngInject';

  this.statusses = [];

  Sensors.getStatusses()
  .then(statusses => {
    this.middle = statusses.length / 2;
    this.statusses = statusses;
  });

  this.editBroker = {};
  this.isEditMode = true;
  this.editError = null;

  this.brokerModal = broker => {
    if(broker) {
      this.isEditMode = true;
      this.editBroker = _.clone(broker);
    }else {
      this.isEditMode = false;
    }
    this.showSensorModal = true;
  };
  this.addBroker = () => {
    this.error = null;
    this.editError = null;

    this.editBroker.port = parseInt(this.editBroker.port, 10);

    Brokers.add(this.editBroker)
    .then(() => {
      this.brokers.push(this.editBroker);
      this.showSensorModal = false;
    })
    .catch(error => {
      this.editError = error;
    });
  };
  this.updateBroker = () => {
    this.editError = '';
    const originalBroker = _.find(this.brokers, broker => broker._id === this.editBroker._id);
    const updated = _.pickBy(this.editBroker, (value, key) => value !== originalBroker[key]);

    if(updated.port) {
      updated.port = parseInt(updated.port, 10);
    }

    if(_.isEmpty(updated)) {
      this.showSensorModal = false;
    } else {
      updated._id = originalBroker._id;
      Brokers.update(updated)
      .then(broker => {
        _.assign(originalBroker, broker);
        this.showSensorModal = false;
      })
      .catch(error => {
        this.editError = error;
      });
    }
  };

  this.showSensorModal = false;
  this.error = null;
  this.headers = ['name', 'url', 'port', 'channel'];
  this.brokers = [];
  this.column = {
    field: 'name',
    reverse: false
  };

  Brokers.getAll()
  .then(brokers => {
    this.brokers = brokers;
  })
  .catch(err => {
    this.error = err;
  });

  this.setOrder = column => {
    if(this.column.field === column) {
      this.column.reverse = !this.column.reverse;
    } else {
      this.column = {
        field: column,
        reverse: false
      };
    }
  };

  this.deleteBroker = broker => {
    if(confirm('Are you sure you want to delete this broker?')) {
      Brokers.delete(broker._id)
      .then(() => {
        const index = this.brokers.indexOf(broker);
        this.brokers.splice(index, 1);
      })
      .catch(err => {
        this.editError = err;
      });
    }
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
