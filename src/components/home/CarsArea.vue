<template>
  <div class="cars">
    <h4>Машины</h4>

    <span v-if="!pages.length">Пусто</span>

    <div v-if="pages.length" class="wrap">
      <cars-area-card
        v-for="(car, i) in pages[carPages >= 0 ? 0 : page - 1]"
        :key="car.id + i"
        :car="car"
      />
    </div>

    <v-pagination
      v-if="pagesAmount > 1"
      v-model="page"
      :length="pagesAmount"
      :total-visible="5"
      circle
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CarsAreaCard from "@/components/home/CarsAreaCard.vue";

export default {
  name: "cars-area",

  components: { CarsAreaCard },

  data() {
    return {
      model: 0,
      page: 1,
    };
  },

  computed: {
    ...mapGetters({ cars: "filters/cars", carPages: "filters/carPages" }),

    pages() {
      const _pages = [];
      let _page = [];

      this.cars.forEach((car) => {
        if (_page.length < 9) {
          _page.push(car);
        } else {
          _pages.push(_page);
          _page = [];
        }
      });
      if (this.cars.length < 9 && !_pages.length && _page.length) {
        _pages.push(_page);
        _page = [];
      }

      return _pages;
    },

    pagesAmount() {
      return this.carPages >= 0 ? this.carPages - 1 : this.pages.length;
    },
  },

  watch: {
    page() {
      if (this.carPages >= 0) {
        this.$store.commit("filters/setPage", this.page);
        this.$store.dispatch("filters/filterCars");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cars {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 0 20px 40px 20px;

  h4 {
    height: 40px;
  }

  .wrap {
    width: 100%;
    height: calc(100% - 40px);
    display: grid;
    grid-template: repeat(3, auto) / repeat(3, 1fr);
    grid-gap: 10px;
    padding: 0 20px 10px 20px;
  }

  @media (max-width: 1200px) {
    padding: 0 20px 50px 20px;

    .wrap {
      grid-template: repeat(5, auto) / repeat(2, 1fr);
      margin-bottom: 10px;
    }
  }

  @media (max-width: 880px) {
    .wrap {
      grid-template: repeat(9, auto) / 1fr;
    }
  }

  @media (max-width: 768px) {
    padding: 0 0 50px 0;
  }
}
</style>
