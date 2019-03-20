import { helper } from '@ember/component/helper';

export function sumCards([cards]) {
  return (cards || []).reduce((total, card) => total + card.count, 0);
}

export default helper(sumCards);
