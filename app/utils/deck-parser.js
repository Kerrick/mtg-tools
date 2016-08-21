const parseLines = (lines) => {
  return lines
    .reject(l => l === '' || l.match(/^Sideboard:?$/) || l.match(/^(#|\/\/)/))
    .map(l => {
      const matched = l.match(/^(?:(\d+)x?\w*)?(.+)$/);
      return {
        number: parseInt(matched[1] || 1, 10),
        name: matched[2].trim()
      };
    })
  ;
};

export const deckParser = (list) => {
  // Get rid of some unnecessary whitespace
  let lines = list.split('\n').map(l => l.trim());
  lines = lines.slice(lines.indexOf(lines.find(l => l !== '')));

  // Do we have a sideboard?
  const sideIndex = lines.indexOf('');
  let [mainboardLines, sideboardLines] = [lines, []];
  if (sideIndex > -1) {
    [mainboardLines, sideboardLines] = [lines.slice(0, sideIndex), lines.slice(sideIndex)];
  }

  return {
    cards: parseLines(mainboardLines),
    sideboard: parseLines(sideboardLines)
  };
};

export default deckParser;
