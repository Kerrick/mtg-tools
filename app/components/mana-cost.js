import Ember from 'ember';

export default Ember.Component.extend({
  //region Attributes
  cost: '',
  //endregion

  //region Ember Hooks
  tagName: '',
  //endregion

  //region Compted Properties
  symbols: Ember.computed('cost', function() {
    return (this.get('cost') || '').match(/\{.+?\}/g) || [];
  }),
  filenames: Ember.computed('symbols.[]', function() {
    return this.get('symbols').map(symbol => {
      return `${symbol.replace(/\W/g, '')}`;
    });
  })
  //endregion
});
