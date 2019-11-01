import { copy } from '@ember/object/internals';
import { readOnly } from '@ember/object/computed';
import $ from 'jquery';
import { resolve } from 'rsvp';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
import ObjectProxy from '@ember/object/proxy';
import { computed } from '@ember/object';
import Service from '@ember/service';

const normalize = str =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace('’', "'");
const sortInOrder = (num, ...rest) => (num !== 0 ? num : rest.length ? sortInOrder(...rest) : 0);
const sortByValue = (a, b) => (a > b ? 1 : a < b ? -1 : 0);
const sortByIndex = array => (a, b) => sortByValue(array.indexOf(a), array.indexOf(b));
const sortByTest = test => (a, b) => (test(a) ? (test(b) ? 0 : 1) : test(b) ? -1 : 0);

const firstMatch = (allPrintings, test) => {
  const allSetCodes = Object.keys(allPrintings).reverse();
  let foundCard = null;
  // For performance, we want to break out of the loop as soon as a match is found.
  // So to do this, we're doing an old-fashioned for loop here.
  for (let i = 0; i < allSetCodes.length; i += 1) {
    if (foundCard) {
      break;
    }
    let cards = allPrintings[allSetCodes[i]].cards;
    for (let j = 0; j < cards.length; j += 1) {
      if (test(cards[j])) {
        foundCard = cards[j];
        break;
      }
    }
  }
  return foundCard;
};

const FRAME_VERSION_ORDER = ['2015', '2003', '1997', '1993', 'future'];
const SET_TYPE_ORDER = [
  'masters',
  'core',
  'expansion',
  'commander',
  'draft_innovation',
  'duel_deck',
  'box',
  'planechase',
  'archenemy',
  'vanguard',
  'starter',
  'treasure_chest',
  'from_the_vault',
  'premium_deck',
  'promo',
  'token',
  'funny',
  'memorabilia',
  'spellbook',
  'masterpiece'
];
const isUgly = card =>
  card.set.type === 'future' ||
  card.borderColor !== 'black' ||
  ['spellbook', 'masterpiece', 'premium_deck', 'from_the_vault'].includes(card.set.type);
const hasErrata = card => card.originalText !== card.text;
export const preferredPrinting = (a, b) =>
  sortInOrder(
    sortByTest(hasErrata)(a, b),
    sortByTest(isUgly)(a, b),
    sortByIndex(FRAME_VERSION_ORDER)(a.frameVersion, b.frameVersion),
    sortByIndex(SET_TYPE_ORDER)(a.set.type, b.set.type),
    sortByValue(new Date(b.set.releaseDate).getTime(), new Date(a.set.releaseDate).getTime()),
    sortByValue(a.multiverseId, b.multiverseId)
  );

const TYPE_ORDER = [
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
const firstType = card => card.types.find(x => TYPE_ORDER.includes(x));
export const decklistSort = (a, b) => {
  const [aPrinting] = a.printings;
  const [bPrinting] = b.printings;
  return sortInOrder(
    sortByIndex(TYPE_ORDER)(firstType(aPrinting), firstType(bPrinting)),
    sortByValue(parseInt(aPrinting.convertedManaCost), parseInt(bPrinting.convertedManaCost)),
    sortByValue(aPrinting.name, bPrinting.name)
  );
};

export default Service.extend({
  allPrintings: computed(function() {
    return ObjectProxy.extend(PromiseProxyMixin).create({
      promise: resolve(
        $.ajax({
          url: 'https://mtgjson.com/json/AllPrintings.json',
          dataType: 'json',
          cache: true
        })
      )
    });
  }),
  isLoading: readOnly('allPrintings.isPending'),
  cardsNamed(name) {
    const cards = [];
    Object.keys(this.get('allPrintings.content')).filter(setCode => {
      const found = this.get(`allPrintings.content.${setCode}.cards`).find(
        card => normalize(card.name) === normalize(name)
      );
      if (!found) {
        return false;
      }
      const card = copy(found, true);
      card.set = copy(this.get(`allPrintings.content.${setCode}`), false);
      delete card.set.cards;
      cards.push(card);
      return true;
    });
    return cards;
  },
  nameFormultiverseId(id) {
    const found = firstMatch(this.get('allPrintings.content'), card => card.multiverseId === id);
    return found ? found.name : null;
  }
});
