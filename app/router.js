import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('playtest-cards', function() {
    this.route('print');
  });
  this.route('stream-view');
  this.route('share');
});

export default Router;
