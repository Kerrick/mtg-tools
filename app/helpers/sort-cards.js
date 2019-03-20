import { helper } from '@ember/component/helper';
import { decklistSort } from 'mtg-tools/services/mtg';

export function sortCards([cards]) {
  return cards.sort(decklistSort);
}

export default helper(sortCards);
