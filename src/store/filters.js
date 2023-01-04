import { getData } from "@/js/api.js";

export default {
  namespaced: true,

  state: {
    brands: [],

    cars: [],
    carPages: -1,

    carNamesList: [],

    filtered: false,
  },

  mutations: {
    setBrands(state, brands) {
      state.brands = brands;
    },

    setCars(state, cars) {
      state.cars = cars;
    },

    setCarPages(state, pagesAmount) {
      state.carPages = pagesAmount;
    },

    setCarNamesList(state, list) {
      if (list.length) {
        list = list.map((el) => ({
          text: el.model,
          value: el.id,
        }));
      }
      state.carNamesList = list;
    },

    resetCars(state) {
      state.cars = [];
    },

    setFiltered(state, condition) {
      state.filtered = condition;
    },

    reset(state) {
      state.brands = [];
      state.cars = [];
      state.myCars = [];
    },
  },

  getters: {
    brands: (state) => state.brands,

    cars: (state) => state.cars,

    carPages: (state) => state.carPages,

    carNamesList: (state) => state.carNamesList,

    filtered: (state) => state.filtered,
  },

  actions: {
    loadBrands({ commit }, brand) {
      let url = "car/brand-list";
      if (brand) {
        url += "?char=" + brand[0].toLowerCase();
      }

      getData(url, {}, true).then(({ brands }) => {
        commit("setBrands", brands);
        commit("resetCars");
      });
    },

    loadCars({ commit }, { brandId }) {
      getData(`car/model-list?brand=${brandId}`, {}, true).then(
        ({ models }) => {
          commit("setCars", models);
          commit("setCarPages", -1);
          commit("setFiltered", true);
        }
      );
    },

    loadCarNamesList({ commit }, { name }) {
      if (name !== "") {
        getData(`car/get-model-id?name=${name}`).then(({ ids: list }) => {
          list = list || [];
          commit("setCarNamesList", list);
        });
      } else {
        commit("setCarNamesList", []);
      }
    },

    filterCars({ commit }, filters) {
      let url = "car/model-list-filter?";
      const keys = Object.keys(filters);
      const brandName = filters.brand.text.toLowerCase();

      keys.forEach((key) =>
        filters[key].value !== ""
          ? (url += key + "=" + filters[key].value + "&")
          : ""
      );
      url = url.slice(0, -1);

      getData(url, {}, true).then(({ pagination, models }) => {
        if (brandName !== "") {
          models = models.filter((el) =>
            el.brand.toLowerCase().includes(brandName)
          );
        }
        commit("setCarPages", pagination.total_pages);
        commit("setCars", models);
        commit("setFiltered", true);
      });
    },
  },
};
