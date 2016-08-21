const parseLines = (lines) => {
  return lines
    .reject(l => l === '')
    .reject(l => l.match(/^Sideboard:?$/))
    .reject(l => l.match(/^(#|\/\/)/))
    .map(l => {
      const matched = l.match(/^(?:(\d+)x?\w*)?(.+)$/);
      return {
        number: parseInt(matched[1], 10),
        name: matched[2].trim()
      };
    })
  ;
};

export const deckParser = (list) => {
  const lines = list.split('\n').map(l => l.trim());
  const sideIndex = lines.indexOf('');
  const [mainboardLines, sideboardLines] = [lines.slice(0, sideIndex), lines.slice(sideIndex)];

  return {
    cards: parseLines(mainboardLines),
    sideboard: parseLines(sideboardLines)
  };
};

export default deckParser;
