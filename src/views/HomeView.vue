<template>
  <div class="home">
    <filters-area />
    <brands-area v-if="brandsShowing" key="brand" />
    <cars-area v-else key="cars" />
  </div>
</template>

<script>
import FiltersArea from "@/components/home/FiltersArea.vue";
import CarsArea from "@/components/home/CarsArea.vue";
import BrandsArea from "@/components/home/BrandsArea.vue";
import { useFiltersStore } from "@/store/filters";

export default {
  name: "home-view",

  components: { FiltersArea, CarsArea, BrandsArea },

  setup: () => ({ filtersStore: useFiltersStore() }),

  computed: {
    brandsShowing() {
      if (this.filtersStore.cars) {
        return !this.filtersStore.filtered;
      }

      return true;
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
