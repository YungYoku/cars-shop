export function checkIsFiltersEmpty(filters) {
  let result = true;
  let keys = Object.keys(filters);

  keys.forEach((el) => (result &= filters[el] === null));
  return !!result;
}

export function checkIsFiltersEmptyExceptBrand(filters) {
  let result = true;
  let keys = Object.keys(filters);

  keys = keys.filter((el) => el !== "brand");

  result |= filters.brand === null;
  keys.forEach((el) => (result &= filters[el] === null));

  return !!result;
}
