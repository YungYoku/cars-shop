import axios from "axios";
import store from "../store";

export async function postData(url, body = {}, loading) {
  if (loading) {
    store.commit("startLoading");
  }
  let response = {};
  await axios
    .post(`https://catalogauto.we-demonstrate2.ru/api/${url}`, { ...body })
    .then((data) => {
      response = data.content;
    });

  if (loading) {
    store.commit("endLoading");
  }
  return response;
}

export async function getData(url, params = {}, loading) {
  if (loading) {
    store.commit("startLoading");
  }

  let response = { models: [], brands: [], cars: [] };
  await axios
    .get(`https://catalogauto.we-demonstrate2.ru/api/${url}`, { params })
    .then((data) => {
      response = data.content;
    })
    .catch((error) => {
      console.log(error);
    });

  if (loading) {
    store.commit("endLoading");
  }
  return response;
}

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
