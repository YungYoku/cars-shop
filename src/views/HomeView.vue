<template>
  <div class="home">
    <filters-area
      :brands="brands"
      :car-names-list="carNamesList"
      :propFiltered="filtered"
      @filterBrands="filterBrands"
      @filterCars="filterCars"
      @loadCarNamesList="loadCarNamesList"
      @loadCars="loadCars"
      @reset="reset"
    />

    <brands-area
      v-if="brandsShowing"
      key="brand"
      :brands="filteredBrands"
      @loadCars="loadCars"
    />

    <cars-area
      v-else
      key="cars"
      :car-pages="carPage"
      :cars="filteredCars"
      @setPage="setCarPage"
    />
  </div>
</template>

<script>
import FiltersArea from "@/components/home/FiltersArea.vue";
import CarsArea from "@/components/home/CarsArea.vue";
import BrandsArea from "@/components/home/BrandsArea.vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/main";
import { sendAnalyticsRequest } from "@/js/api";

export default {
  name: "home-view",

  components: { FiltersArea, CarsArea, BrandsArea },

  data() {
    return {
      brands: [],
      filteredBrands: [],

      cars: [],
      filteredCars: [],
      carPage: -1,

      carNamesList: [],

      filtered: false,
    };
  },

  computed: {
    brandsShowing() {
      if (this.filteredCars) {
        return !this.filtered;
      }

      return true;
    },
  },

  mounted() {
    this.loadBrands();
  },

  methods: {
    setBrands(brands) {
      this.filteredBrands = brands;
    },

    setCars(cars) {
      this.filteredCars = cars;
    },

    reset() {
      this.cars = this.filteredCars = [];
      this.filteredBrands = this.brands;
      this.filtered = false;
    },

    setCarPage(pagesAmount) {
      this.carPage = pagesAmount;
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

    async loadBrands() {
      const docRef = doc(db, "cars", "brands");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const brands = docSnap.data().brands;

        this.brands = brands;
        this.setBrands(brands);

        sendAnalyticsRequest("loadBrands");
      }
    },

    filterBrands(brand = "") {
      this.setBrands(this.brands.filter((item) => item.name.startsWith(brand)));
      this.setCars(this.cars);
    },

    async loadCars(brandId) {
      const docRef = doc(db, "cars", "models");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const brandModels = docSnap.data();
        const models = brandModels[brandId];

        this.cars = models;
        this.setCars(models);
        this.setCarPage(-1);
        this.filtered = true;

        sendAnalyticsRequest("loadCars");
      }
    },

    loadCarNamesList(name) {
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

      const cars = this.cars.filter((car) => {
        let flag = true;

        filterKeys.forEach((key) => {
          if (filters[key] !== null && key !== "brand") {
            if (car[key] !== filters[key]) {
              flag = false;
            }
          }
        });

        return flag;
      });

      this.setCars(cars);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template: auto / 200px 1fr;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template: auto auto / 1fr;
  }
}
</style>
