import { doc, getDoc } from "firebase/firestore";
import { db } from "@/main";
import { defineStore } from "pinia";

export const useFiltersStore = defineStore("filters", {
  state: () => ({
    brands: [],

    cars: [],
    carPages: -1,

    carNamesList: [],

    filtered: false,
  }),

  getters: {},

  actions: {
    setBrands(brands) {
      this.brands = brands;
    },

    setCars(cars) {
      this.cars = cars;
    },

    setCarPages(pagesAmount) {
      this.carPages = pagesAmount;
    },

    setCarNamesList(list) {
      if (list.length) {
        list = list.map((el) => ({
          text: el.model,
          value: el.id,
        }));
      }
      this.carNamesList = list;
    },

    resetCars() {
      this.cars = [];
    },

    setFiltered(condition) {
      this.filtered = condition;
    },

    reset() {
      this.brands = [];
      this.cars = [];
    },

    async loadBrands(brand = "") {
      const docRef = doc(db, "cars", "brands");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const brands = docSnap.data().brands;
        this.resetCars();

        this.setBrands(brands.filter((item) => item.name.startsWith(brand)));
      }
    },

    async loadCars(brandId) {
      const docRef = doc(db, "cars", "models");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const brandModels = docSnap.data();
        const models = brandModels[brandId];

        this.setCars(models);
        this.setCarPages(-1);
        this.setFiltered(true);
      }
    },

    loadCarNamesList({ name }) {
      // if (name !== "") {
      //   getData(`car/get-model-id?name=${name}`).then(({ ids: list }) => {
      //     list = list || [];
      //     this.setCarNamesList(list);
      //   });
      // } else {
      //   this.setCarNamesList([]);
      // }
    },

    filterCars(filters) {
      const filterKeys = Object.keys(filters);

      this.cars = this.cars.filter((car) => {
        let flag = true;

        filterKeys.forEach((key) => {
          if (filters[key] !== "" && key !== "brand") {
            if (car[key] !== filters[key]) {
              flag = false;
            }
          }
        });

        return flag;
      });
    },
  },
});
