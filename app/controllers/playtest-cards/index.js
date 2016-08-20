import Ember from 'ember';

export default Ember.Controller.extend({
  playtestCards: Ember.inject.controller(),
  decklistValidation: [{
    message: 'Bad Format',
    validate(input) {
      return true;
    }
  }]
});
