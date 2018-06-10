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
const valueIn = _.curry((b, a) => _.includes(lowercaseIfString(a), lowercaseIfString(b)));
const contains = _.curry((b, a) => _.includes(lowercaseIfString(b), lowercaseIfString(a)));
const startsWith = _.curry((b, a) => _.startsWith(lowercaseIfString(b), lowercaseIfString(a)));

const comparators = {
  eq,
  gt,
  gte,
  lt,
  lte,
  valueIn,
  contains,
  startsWith
};

// Logical operators for array results
const all = _.all(Boolean);
const any = _.some(Boolean);
const none = _.all(val => !Boolean(val));

const operators = {
  all,
  any,
  none
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

const compare = _.curry((comparator, operator, swap, b, a) => {
  const comparator_func = comparator ? comparators[comparator] : comparators.eq;
  if (swap) {
    const temp = b;
    b = a;
    a = temp;
  }

  if (Array.isArray(a)) {
    const operator_func = operator ? operators[operator] : operators.any;
    const results = _.map(aValue => comparator_func(b, aValue), a);
    return operator_func(results);
  } else {
    return comparator_func(b, a);
  }
});

const invert = _.curry((inverted, value) => (inverted ? !value : value));
const getFilters = _.map(filter => getFilterFunc(filter));
const getFilterFunc = ({
  attribute,
  value: filter_value,
  comparator,
  operator,
  swap,
  invert: inverted
}) =>
  _.flow(
    entityValue(attribute), // Get the value of the key being examined
    compare(comparator, operator, swap, filter_value), // Get function for comparator and send filter value to it
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
  Object.entries(filterValues).reduce((accum, [key, { value, operator, swap }]) => {
    const { attribute, comparator } = splitComparator(key);
    const ret = accum.concat({ attribute, comparator, value, operator, swap });

    if (Array.isArray(value)) {
      return value.length > 0 ? ret : accum;
    } else {
      return value !== null && value !== undefined ? ret : accum;
    }
  }, []);

export default applyFilters;
export { splitComparator, transformValuesToFilters };
