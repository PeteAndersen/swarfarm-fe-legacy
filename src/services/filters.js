import _ from 'lodash/fp';

// Define curried comparator functions
const eq = _.curry((b, a) => a === b);
const gt = _.curry((b, a) => a > b);
const gte = _.curry((b, a) => a >= b);
const lt = _.curry((b, a) => a < b);
const lte = _.curry((b, a) => a <= b);
const value_in = _.some;
const contains = _.curry((b, a) => _.startsWith(a.toLowerCase(), b.toLowerCase()));

const comparators = {
  eq,
  gt,
  gte,
  lt,
  lte,
  value_in,
  contains
};

const get_comparator = comparator => {
  if (comparator === undefined) {
    return comparators.eq;
  } else {
    return comparators[comparator];
  }
};

const all_true = _.reduce((prev, value) => prev && value, true);

const get_filter_func = ({ attribute, value, comparator, inverted }) => {
  // Return a function that will:
  // 1. Grab the value from an object key ('attribute')
  // 2. Pass it to a comparator function primed with the value to compare it to
  // 3. Perform a NOT if requested to invert result.

  return _.flow(
    _.get(attribute), // Get the value of the attribute being examined
    get_comparator(comparator)(value), // Get function for comparator and send value to it
    result => (inverted ? !result : result) // Invert result if requested
  );
};

const applyFilters = (entities, filters) => {
  // Get filters with comparator function replacing the string
  const filter_funcs = filters.map(filter => get_filter_func(filter));

  return entities.filter(entity => all_true(_.over(filter_funcs)(entity)));
};

export default applyFilters;

/* Example filter objects
Object contains two keys: `skills` and `monsters`
Each entry is an array of filters to apply
Filters follow the following format:
{
  attribute: String or Array. Used with  _.get() so follow that format
  value: String, Number, or Array. Value to compare. Array defaults to an 'any' type match. 
  comparator: String. matches keys in `comparators` object. Default: `eq` unless value is Array, then `value_in`
  inverted: Boolean. If true, inverts filter matching
}

Example filter object
{
  monster: [
    {
      attribute: 'obtainable',
      value: true
    },
    {
      attribute: 'base_stars',
      value: 5,
      comparator: 'gte'
    }
  ]
}
*/
