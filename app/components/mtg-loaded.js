import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  mtg: Ember.inject.service(),
  'show-spinner': true
});
