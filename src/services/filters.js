import _ from 'lodash/fp';

const lowercaseIfString = value => (typeof value === 'string' ? value.toLowerCase() : value);

// Curried comparator functions
const eq = _.eq;
const gt = _.curry((b, a) => a > b);
const gte = _.curry((b, a) => a >= b);
const lt = _.curry((b, a) => a < b);
const lte = _.curry((b, a) => a <= b);
const value_in = _.curry((b, a) => _.some(_.eq(lowercaseIfString(a)), lowercaseIfString(b)));
const starts_with = _.curry((b, a) => _.startsWith(lowercaseIfString(b), lowercaseIfString(a)));
const contains = _.curry((b, a) => _.contains(lowercaseIfString(b), lowercaseIfString(a)));

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

// Logical operator functions
const and = (b, a) => a && b;
const or = (b, a) => a || b;
const xor = _.xor;

const operators = {
  and,
  or,
  xor
};

// Filtering functions
const entityValue = _.curry((path, entity) => {
  path = path.split('.');
  const len = path.length;
  let index = 0;

  const reducer = (accum, curr) => {
    const remaining_path = path.slice(index + 1).join('.');
    return accum.concat(entityValue(remaining_path, curr));
  };

  while (entity != null && index < len) {
    entity = entity[path[index]];

    if (Array.isArray(entity)) {
      // Recurse on the sub-objects, returning an array of flat values.
      return entity.reduce(reducer, []);
    }
    index++;
  }

  return index && index === len ? entity : undefined;
});

const compare = _.curry((comparator, operator, b, a) => {
  const comparator_func = comparator ? comparators[comparator] : comparators.eq;
  if (Array.isArray(a)) {
    // Apply comparator func to all values in array
    // Use logical operator to determine final result
    const test_result = a.reduce((accum, test_value) => {
      const operator_func = operator ? operators[operator] : operators.or;
      return accum === null
        ? comparator_func(b, test_value) // First result uses first result
        : operator_func(accum, comparator_func(b, test_value)); // Subsequent results use logical operator
    }, null);
    return test_result;
  } else {
    // Compare the two simple values
    return comparator_func(b, a);
  }
});

const invert = _.curry((inverted, value) => (inverted ? !value : value));
const getFilters = _.map(filter => getFilterFunc(filter));
const getFilterFunc = ({
  attribute,
  value: filter_value,
  comparator,
  invert: inverted,
  operator
}) =>
  _.flow(
    entityValue(attribute), // Get the value of the key being examined
    compare(comparator, operator, filter_value), // Get function for comparator and send filter value to it
    invert(inverted) // Invert result if requested
  );

const applyFilters = (entities, filters) => {
  const checkEntity = _.allPass(getFilters(filters));
  return entities.filter(checkEntity);
};

export default applyFilters;
