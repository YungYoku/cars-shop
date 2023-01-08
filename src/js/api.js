export function checkIsFiltersEmpty(filters) {
  let result = true;
  let keys = Object.keys(filters);

  keys = keys.filter((el) => el !== "offset");

  keys.forEach((el) => (result &= filters[el].value === ""));
  keys.forEach((el) => (result &= filters[el].text === ""));

  return !!result;
}

export function checkIsFiltersEmptyExceptBrand(filters) {
  let result = true;
  let keys = Object.keys(filters);

  keys = keys.filter((el) => el !== "brand" && el !== "offset");

  result |= filters.brand.value === "";
  result |= filters.brand.text === "";
  keys.forEach((el) => (result &= filters[el].value === ""));

  return !!result;
}
