import _ from 'lodash/fp';

// Define curried comparator functions
const eq = _.curry((b, a) => a === b);
const gt = _.curry((b, a) => a > b);
const gte = _.curry((b, a) => a >= b);
const lt = _.curry((b, a) => a < b);
const lte = _.curry((b, a) => a <= b);
const value_in = _.some;
const starts_with = _.curry((b, a) => _.startsWith(b.toLowerCase(), a.toLowerCase()));
const contains = _.curry((b, a) => _.contains(b.toLowerCase(), a.toLowerCase()));

const comparators = {
  eq,
  gt,
  gte,
  lt,
  lte,
  value_in,
  starts_with,
  contains
};

const entityValue = _.get;
const compare = comparator => (comparator ? comparators[comparator] : comparators.eq);
const invert = _.curry((inverted, value) => (inverted ? !value : value));
const getFilters = _.map(filter => getFilterFunc(filter));
const getFilterFunc = ({ attribute, value, comparator, invert: inverted }) =>
  _.flow(
    entityValue(attribute), // Get the value of the key being examined
    compare(comparator)(value), // Get function for comparator and send filter value to it
    invert(inverted) // Invert result if requested
  );
const checkEntity = _.allPass;
const applyFilters = (entities, filters) => {
  const filterFuncs = getFilters(filters);
  return entities.filter(entity => checkEntity(filterFuncs)(entity));
};

export default applyFilters;
