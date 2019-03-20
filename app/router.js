import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('playtest-cards', function() {
    this.route('print');
  });
  this.route('stream-view');
  this.route('share');
  this.route('triplets');
});

export default Router;
