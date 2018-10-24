import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  //region Attributes
  cost: '',
  //endregion

  //region Ember Hooks
  tagName: '',
  //endregion

  //region Compted Properties
  symbols: computed('cost', function() {
    return (this.get('cost') || '').match(/\{.+?\}/g) || [];
  }),
  filenames: computed('symbols.[]', function() {
    return this.get('symbols').map(symbol => {
      return `${symbol.replace(/\W/g, '')}`;
    });
  })
  //endregion
});
