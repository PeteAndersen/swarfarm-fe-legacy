import _ from 'lodash/fp';

const makeLowerCase = value => (typeof value === 'string' ? value.toLowerCase() : value);
const lowercaseIfString = value =>
  Array.isArray(value) ? value.map(makeLowerCase) : makeLowerCase(value);

// Value comparator functions
const eq = _.eq;
const gt = _.curry((b, a) => a > b);
const gte = _.curry((b, a) => a >= b);
const lt = _.curry((b, a) => a < b);
const lte = _.curry((b, a) => a <= b);
const valueIn = _.curry((b, a) => _.some(_.eq(lowercaseIfString(a)), lowercaseIfString(b)));

// Array comparitor functions
// Check if values of A are in B. Return array of booleans same length as A.
const inArray = (b, a) =>
  _.map(aValue => _.includes(aValue, lowercaseIfString(b)), lowercaseIfString(a));
const allInArray = _.curry((a, b) => {
  return _.all(Boolean, inArray(b, a));
});
const someInArray = _.curry((a, b) => {
  return _.some(Boolean, inArray(b, a));
});

// String comparitor functions
const startsWith = _.curry((b, a) => _.startsWith(lowercaseIfString(b), lowercaseIfString(a)));
const contains = _.curry((b, a) => _.contains(lowercaseIfString(b), lowercaseIfString(a)));

const comparators = {
  eq,
  gt,
  gte,
  lt,
  lte,
  valueIn,
  allInArray,
  someInArray,
  startsWith,
  contains
};

// Filtering functions
const entityValue = _.curry((path, entity) => {
  // path is a flat string as specified by _.get documentation
  if (typeof path === 'string') {
    path = path.split('.');
  }

  const len = path.length;
  let index = 0;

  const reducer = (accum, curr) => {
    const remaining_path = path.slice(index + 1).join('.');
    return accum.concat(entityValue(remaining_path, curr));
  };

  // Drill down into the object object properties specified in the path
  while (entity != null && index < len) {
    entity = entity[path[index]];

    if (Array.isArray(entity)) {
      // When an array is encountered, recurse and grab the individual
      // values of the objects in the array. Return value is an array.
      return entity.reduce(reducer, []);
    }
    index++;
  }

  return index && index === len ? entity : undefined;
});

const compare = _.curry((comparator, b, a) => {
  const comparator_func = comparator ? comparators[comparator] : comparators.eq;
  return comparator_func(b, a);
});

const invert = _.curry((inverted, value) => (inverted ? !value : value));
const getFilters = _.map(filter => getFilterFunc(filter));
const getFilterFunc = ({ attribute, value: filter_value, comparator, invert: inverted }) =>
  _.flow(
    entityValue(attribute), // Get the value of the key being examined
    compare(comparator, filter_value), // Get function for comparator and send filter value to it
    invert(inverted) // Invert result if requested
  );

const applyFilters = (entities, filters) => {
  const checkEntity = _.allPass(getFilters(filters));
  return entities.filter(checkEntity);
};

// Utility functions for code that works with setting/using filters
const splitComparator = attribute => {
  // Attribute names may tack on the desired comparator, separated
  // from the attribute by double underscore
  const split = attribute.split('__');
  if (split.length <= 1) {
    // No special handling required
    return { attribute: split };
  } else {
    // Check if last element separated by __ is a comparator or not
    const possibleComparator = split[split.length - 1];
    const attribute = _.slice(0, split.length - 1, split);

    if (_.contains(possibleComparator, Object.keys(comparators))) {
      return { attribute: attribute, comparator: possibleComparator };
    } else {
      return { attribute: split };
    }
  }
};

const transformValuesToFilters = filterValues =>
  // Transform an object with { key: value } pairs into an array of filter objects
  Object.entries(filterValues).reduce((accum, [key, value]) => {
    const { attribute, comparator } = splitComparator(key);
    const ret = accum.concat({ attribute, comparator, value });
    if (Array.isArray(value)) {
      return value.length > 0 ? ret : accum;
    } else {
      return value !== null && value !== undefined ? ret : accum;
    }
  }, []);

export default applyFilters;
export { splitComparator, transformValuesToFilters };
