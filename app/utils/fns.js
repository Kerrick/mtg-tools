export const deepFreeze = obj => {
  Object.values(obj).filter(val => typeof val === 'object').forEach(val => deepFreeze(val));
  return Object.freeze(obj);
}