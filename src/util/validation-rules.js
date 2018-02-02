export const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const phone = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const digits = /^\d+$/;

export default (key, value, comparisonValue) => {
  const rules = {
    hasValue: value ? true : false,
    isLessThan: value < comparisonValue,
    isEqual: value === comparisonValue,
    doesMatch: String(value).match(comparisonValue)
  };
  return rules[key];
};