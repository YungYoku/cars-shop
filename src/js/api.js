import Vue from "vue";
import store from "../store";

export async function postData(url, body = {}, loading) {
  if (loading) {
    store.commit("startLoading");
  }

  let response = {};
  await Vue.http
    .post(url, { ...body })
    .then((response) => response.json())
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
  await Vue.http
    .get(url, { params })
    .then((response) => response.json())
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
