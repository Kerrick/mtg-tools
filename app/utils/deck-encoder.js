export const encode = decklist => {
  const countsAndIds = card => [card.printings[0].multiverseId, card.count];
  const encode = arr => arr.map(x => x.join('x')).join('-');
  const maindeck = decklist.get('mtgJsonMaindeckCards').map(countsAndIds);
  const sideboard = decklist.get('mtgJsonSideboardCards').map(countsAndIds);
  if (maindeck.length === 0 && sideboard.length === 0) {
    return '';
  }
  return `${encode(maindeck)}_${encode(sideboard)}`;
};

export const decode = (encoded, findName) => {
  // Backwards Compatibility with old encoding characters
  encoded = encoded
    .replace(/:/g, 'x')
    .replace(/\|/g, '_')
    .replace(/,/g, '-');

  const [main, side] = encoded.split('_').map(enc => {
    return enc.split('-').map(pair => {
      return pair.split('x').map(x => parseInt(x, 10));
    });
  });
  const toParsedLine = ([multiverseId, count]) => {
    return {
      number: count,
      name: findName(multiverseId)
    };
  };
  return {
    cards: main.map(x => toParsedLine(x)),
    sideboard: side.map(x => toParsedLine(x))
  };
};

export default {
  encode,
  decode
};
