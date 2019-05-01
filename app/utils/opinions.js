import { sortInOrder, sortByValue, sortByIndex, sortByTest } from 'mtg-tools/utils/sorting';

// Prettiest frames first
const FRAME_VERSION_ORDER = ['2015', '2003', '1997', '1993', 'future'];

// Most-preferred set types first
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

// Generally, sort decklists in this order
export const TYPE_ORDER = [
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

// Some of these are actually beautiful, but they don't translate
// well with a hidden art box as playtest cards from a home printer.
const isUgly = card =>
  card.set.type === 'future' ||
  card.borderColor !== 'black' ||
  ['spellbook', 'masterpiece', 'premium_deck', 'from_the_vault'].includes(card.set.type);

// In general, cards printed with the correct oracle text are preferred
// ...except [[Liquid Fire]]. That has some TERRIBLE oracle text.
const hasErrata = card => card.originalText !== card.text;

// This is mostly to prevent Tempest Remastered basic lands
// from being chosen over the latest core set's basic lands.
const isOnlineOnly = card => card.set.isOnlineOnly;

// Watermarks make things harder to read on home printers.
const hasWatermark = card => !!card.watermark;

// Here's where we get opinionated about our opinions,
// and which opinions take priority over others.
export const preferredPrinting = (a, b) =>
  // Earlier is more important.
  sortInOrder(
    sortByTest(hasErrata)(a, b),
    sortByTest(isUgly)(a, b),
    sortByIndex(FRAME_VERSION_ORDER)(a.frameVersion, b.frameVersion),
    sortByTest(isOnlineOnly)(a, b),
    sortByTest(hasWatermark)(a, b),
    sortByIndex(SET_TYPE_ORDER)(a.set.type, b.set.type),
    sortByValue(new Date(b.set.releaseDate).getTime(), new Date(a.set.releaseDate).getTime()),
    sortByValue(a.multiverseId, b.multiverseId)
  );
