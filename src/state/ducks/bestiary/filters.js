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

export const transformValuesToFilters = filterValues =>
  Object.entries(filterValues).reduce((accum, [key, value]) => {
    const { attribute, comparator } = splitComparator(key);
    const ret = accum.concat({ attribute, comparator, value });
    if (Array.isArray(value)) {
      return value.length > 0 ? ret : accum;
    } else {
      return value !== null && value !== undefined ? ret : accum;
    }
  }, []);

export default {
  defaultFilters,
  transformValuesToFilters
};
