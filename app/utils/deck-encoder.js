export const encode = decklist => {
  const countsAndIds = card => [card.printings[0].multiverseid, card.count];
  const encode = arr => arr.map(x => x.join(':')).join(',');
  const maindeck = decklist.get('mtgJsonMaindeckCards').map(countsAndIds);
  const sideboard = decklist.get('mtgJsonSideboardCards').map(countsAndIds);
  return `${encode(maindeck)}|${encode(sideboard)}`;
};

export const decode = (encoded, findName) => {
  const [main, side] = encoded
    .split('|')
    .map(enc => {
      return enc
        .split(',')
        .map(pair => {
          return pair.split(':').map(x => parseInt(x, 10));
        })
      ;
    })
  ;
  const toParsedLine = ([multiverseid, count]) => {
    return {
      number: count,
      name: findName(multiverseid)
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
}
