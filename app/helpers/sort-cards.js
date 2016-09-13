import Ember from 'ember';

const typeOrder = [
  'Creature',
  'Planeswalker',
  'Instant',
  'Sorcery',
  'Artifact',
  'Enchantment',
  'Land',
  'Conspiracy',
  'Plane',
  'Phenomenon',
  'Scheme',
  'Vanguard'
];

export function sortCards([cards]) {
  return cards.sort((a, b) => {
    const aPrinting = a.printings[0];
    const bPrinting = b.printings[0];
    const aSortType = aPrinting.types.find(x => typeOrder.contains(x));
    const bSortType = bPrinting.types.find(x => typeOrder.contains(x));
    if (aSortType !== bSortType) {
      return typeOrder.indexOf(aSortType) - typeOrder.indexOf(bSortType);
    }
    if (aPrinting.name < bPrinting.name) { return -1; }
    if (aPrinting.name > bPrinting.name) { return 1; }
    return 0;
  });
  return params;
}

export default Ember.Helper.helper(sortCards);
