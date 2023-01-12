<template>
  <aside class="filters">
    <h4>Фильтры</h4>

    <v-form @submit.prevent="search">
      <v-autocomplete
        v-model="brand"
        :clearable="true"
        :disabled="isBrandFiltered"
        :items="brandNamesList"
        label="Бренд"
        @keyup="updateBrandNamesList($event.target.value)"
        @click:clear="updateBrandNamesList"
      />

      <template v-if="isBrandFiltered">
        <v-autocomplete
          v-model="model"
          :clearable="true"
          :items="carNamesList"
          label="Модель"
          @keyup="updateCarNamesList($event.target.value)"
          @click:clear="updateCarNamesList"
        />

        <div class="filter">
          <v-select
            v-model="filters.volume"
            :items="volumes"
            label="Объем двигателя"
            persistent-hint
            return-object
          />

          <v-btn
            v-if="filters.volume"
            icon="mdi-delete"
            text
            @click="resetFilter('volume')"
          />
        </div>

        <div class="filter">
          <v-select
            v-model="filters.transmission"
            :items="transmissions"
            label="Трансмиссия"
            persistent-hint
            return-object
          />

          <v-btn
            v-if="filters.transmission"
            icon="mdi-delete"
            text
            @click="resetFilter('transmission')"
          />
        </div>

        <div class="filter">
          <v-select
            v-model="filters.engine"
            :items="engines"
            label="Двигатель"
            persistent-hint
            return-object
          />

          <v-btn
            v-if="filters.engine"
            icon="mdi-delete"
            text
            @click="resetFilter('engine')"
          />
        </div>

        <div class="filter">
          <v-select
            v-model="filters.body"
            :items="bodys"
            label="Корпус"
            persistent-hint
            return-object
          />

          <v-btn
            v-if="filters.body"
            icon="mdi-delete"
            text
            @click="resetFilter('body')"
          />
        </div>
      </template>

      <v-btn :disabled="isFiltersEmpty" elevation="1" type="action">
        Искать
      </v-btn>
      <v-btn v-if="!isFiltersEmpty" class="mr-4" elevation="2" @click="reset">
        Сбросить
      </v-btn>
    </v-form>
  </aside>
</template>

<script>
import {
  checkIsFiltersEmpty,
  checkIsFiltersEmptyExceptBrand,
} from "@/js/api.js";
import {
  bodys as dbBodys,
  engines as dbEngines,
  transmissions as dbTransmissions,
  volumes as dbVolumes,
} from "@/js/filtersData.js";

export default {
  name: "filters-area",

  props: {
    brands: {
      type: Array,
      required: true,
    },

    cars: {
      type: Array,
      required: true,
    },

    propFiltered: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      brand: null,
      model: null,
      filters: {
        body: null,
        engine: null,
        transmission: null,
        volume: null,
      },

      sendOpportunity: true,

      carNamesList: [],
      brandNamesList: [],

      bodys: dbBodys,
      engines: dbEngines,
      transmissions: dbTransmissions,
      volumes: dbVolumes,

      filtered: false,
    };
  },

  computed: {
    isBrandFiltered() {
      return !!(this.brand && (this.filtered || this.propFiltered));
    },

    brandRouteQuery() {
      const brandId = this.$route.query.brandId;
      const brands = this.brands;

      if (brandId && brands.length) {
        const brand = brands.find((brand) => brand.id === brandId);

        if (brand) {
          return {
            id: brandId,
            name: brand.name,
          };
        }
      }

      return {
        id: brandId,
        name: null,
        routeName: this.$route.name,
      };
    },

    isFiltersEmpty() {
      return (
        checkIsFiltersEmpty(this.filters) &&
        this.brand === null &&
        this.model === null
      );
    },

    isFiltersEmptyExceptBrand() {
      return checkIsFiltersEmptyExceptBrand(this.filters) && this.brand;
    },
  },

  watch: {
    brandRouteQuery: {
      immediate: true,
      handler() {
        this.brand = this.brandRouteQuery.name;
        if (this.brandRouteQuery.id) {
          this.$emit("loadCars", this.brandRouteQuery.id);
        } else if (this.brandRouteQuery.routeName === "Home") {
          this.reset();
        }
      },
      deep: true,
    },

    filters: {
      immediate: false,
      handler() {
        if (this.isFiltersEmpty) {
          this.search();
        }
      },
      deep: true,
    },

    brand() {
      this.loadBrand();
    },

    model() {
      this.loadCar();
    },
  },

  created() {
    const brandId = this.$route.query.brandId;

    if (brandId) {
      this.filtered = true;
      this.$emit("loadCars", brandId);
    }
  },

  methods: {
    search() {
      if (this.sendOpportunity) {
        this.startSendTimer();

        if (this.isFiltersEmptyExceptBrand) {
          this.filtered = true;
          this.$emit("filterBrands", this.brand);
        } else if (!this.isFiltersEmpty) {
          this.filtered = true;
          this.$emit("filterCars", this.filters);
        }
      }
    },

    updateCarNamesList(name) {
      const cars = this.cars.filter((car) => car.model.startsWith(name));
      this.carNamesList = cars.map((car) => car.model);
    },

    updateBrandNamesList(name) {
      const brands = this.brands.filter((brand) => brand.name.startsWith(name));
      this.brandNamesList = brands.map((brand) => brand.name);
    },

    loadCar() {
      const car = this.cars.find((car) => car.model === this.model);
      if (car) {
        const brandId = this.$route.query.brandId;
        const query = {
          brandId,
          modelId: car.id,
        };
        this.$router.push({ path: "/car", query });
      }
    },

    loadBrand() {
      const brand = this.brands.find((brand) => brand.name === this.brand);
      if (brand) {
        const query = {
          brandId: brand.id,
        };

        this.$router.push({ path: "/", query });
        this.$emit("loadCars", brand.id);
      }
    },

    startSendTimer() {
      this.sendOpportunity = false;
      setTimeout(() => {
        this.sendOpportunity = true;
      }, 500);
    },

    resetFilter(filter) {
      this.filters[filter] = null;

      this.search();
    },

    resetFilters() {
      this.filtered = false;
      this.brand = null;
      this.model = null;

      const keys = Object.keys(this.filters);
      keys.forEach((key) => {
        this.filters[key] = null;
      });
    },

    async reset() {
      this.resetFilters();
      await this.$router.push("/");
      this.$emit("reset");
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  width: 100%;
  height: 100%;
  background-color: white;

  .filter {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    height: 40px;
  }

  form {
    width: 100%;
    padding: 10px;

    @media (max-width: 768px) {
      padding: 0;
    }

    button {
      margin: 0 10px 20px 10px;
    }
  }
}
</style>
