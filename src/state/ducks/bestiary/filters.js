import { last } from 'lodash/string';

export const defaultFilters = [
  {
    attribute: 'obtainable',
    value: true
  }
];

const splitComparator = attribute => {
  const split = attribute.split('__');
  return split.length > 1 ? { attribute: split[0], comparator: split[1] } : { attribute: split[0] };
};

export const transformValuesToFilters = filterValues => {
  // Values is an object with filter values with {name: value} format.
  // Convert this to an array of filter objects to feed into the filter.js service
  console.log({ filterValues, entries: Object.entries(filterValues) });
  const filters = Object.entries(filterValues).reduce((accum, [key, value]) => {
    console.log({ accum, key, value });
    const { attribute, comparator } = splitComparator(key);
    const ret = accum.concat({ attribute, comparator, value });
    if (Array.isArray(value)) {
      return value.length > 0 ? ret : accum;
    } else {
      return value ? ret : accum;
    }
  }, []);
  console.log(filters);
  return filters;
};

export default {
  defaultFilters,
  transformValuesToFilters
};
