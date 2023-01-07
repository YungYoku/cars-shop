<template>
  <div class="home">
    <filters-area />
    <brands-area v-if="!cars.length && !filtered" key="brand" />
    <cars-area v-else key="cars" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FiltersArea from "@/components/home/FiltersArea.vue";
import CarsArea from "@/components/home/CarsArea.vue";
import BrandsArea from "@/components/home/BrandsArea.vue";

export default {
  name: "home-view",

  components: { FiltersArea, CarsArea, BrandsArea },

  computed: {
    ...mapGetters({ cars: "filters/cars", filtered: "filters/filtered" }),
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template: auto / 200px 1fr;
  padding: 20px 0;

  @media (max-width: 768px) {
    grid-template: auto auto / 1fr;
  }
}
</style>
