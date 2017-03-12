import Ember from 'ember';

export function sumCards([cards]) {
  return (cards || []).reduce((total, card) => total + card.count, 0)
}

export default Ember.Helper.helper(sumCards);
