export const sortInOrder = (num, ...rest) => (num !== 0 ? num : rest.length ? sortInOrder(...rest) : 0);
export const sortByValue = (a, b) => (a > b ? 1 : a < b ? -1 : 0);
export const sortByIndex = array => (a, b) => sortByValue(array.indexOf(a), array.indexOf(b));
export const sortByTest = test => (a, b) => (test(a) ? (test(b) ? 0 : 1) : test(b) ? -1 : 0);
