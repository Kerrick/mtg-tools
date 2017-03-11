const parseLines = (lines) => {
  return lines
    .reject(l => l === '' || l.match(/^Sideboard:?$/) || l.match(/^(#|\/\/)/) || l.match(/:$/))
    .map(l => {
      const matched = l.match(/^(?:(\d+)x?\w*)?(.+)$/);
      return {
        number: parseInt(matched[1] || 1, 10),
        name: matched[2].trim()
      };
    })
    .sortBy('name')
  ;
};

const matchesSideboardLabel = line => line.match(/^SB:/);
const matchesSideboardHeader = line => line.match(/^Sideboard/);

export const parse = (list) => {
  // Get rid of some unnecessary whitespace
  let lines = list.split('\n').map(l => l.trim());
  lines = lines.slice(lines.indexOf(lines.find(l => l !== '')));

  // Do we have a sideboard?
  const usesPerLineLabel = lines.some(matchesSideboardLabel);
  const usesHeader = lines.some(matchesSideboardHeader);
  const hasBlankLine = lines.some(line => line === '');

  let [mainboardLines, sideboardLines] = [[], []];
  if (usesPerLineLabel) {
    mainboardLines = lines.reject(matchesSideboardLabel);
    sideboardLines = lines.filter(matchesSideboardLabel).map(line => line.replace(/^SB: ?/, ''));
  }
  else if (usesHeader) {
    const labelIndex = lines.indexOf(lines.find(matchesSideboardHeader));
    [mainboardLines, sideboardLines] = [lines.slice(0, labelIndex), lines.slice(labelIndex + 1)];
  }
  else if (hasBlankLine) {
    const blankIndex = lines.indexOf('');
    [mainboardLines, sideboardLines] = [lines.slice(0, blankIndex), lines.slice(blankIndex)];
  }
  else {
    mainboardLines = lines;
  }

  return {
    cards: parseLines(mainboardLines),
    sideboard: parseLines(sideboardLines)
  };
};

export const unparse = (parsed) => {
  return [parsed.cards, parsed.sideboard].map(segment => {
    return segment.map(card => {
      if (!card.number || !card.name) { return null; }
      return `${card.number} ${card.name}`
    }).compact().join('\n');
  }).join('\n\n');
};

export default {
  parse,
  unparse
}
