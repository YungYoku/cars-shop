<template>
  <aside class="filters">
    <h4>Фильтры</h4>

    <v-form @submit.prevent="search">
      <v-text-field
        v-model.trim="filters.brand"
        :disabled="isBrandFiltered"
        label="Бренд"
      />

      <template v-if="isBrandFiltered">
        <v-autocomplete
          v-model="model"
          :clearable="true"
          :items="filtersStore.carNamesList"
          label="Модель"
          @keyup="loadCarNamesList($event.target.value)"
          @click:clear="loadCarNamesList('')"
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
            v-if="filters.volume !== ''"
            icon
            text
            @click="resetFilter('volume')"
          >
            <v-icon icon="mdi-delete" />
          </v-btn>
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
            v-if="filters.transmission !== ''"
            icon
            text
            @click="resetFilter('transmission')"
          >
            <v-icon icon="mdi-delete" />
          </v-btn>
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
            v-if="filters.engine !== ''"
            icon
            text
            @click="resetFilter('engine')"
          >
            <v-icon icon="mdi-delete" />
          </v-btn>
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
            v-if="filters.body !== ''"
            icon
            text
            @click="resetFilter('body')"
          >
            <v-icon icon="mdi-delete" />
          </v-btn>
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
import { useFiltersStore } from "@/store/filters";

export default {
  name: "filters-area",

  setup: () => ({
    filtersStore: useFiltersStore(),
  }),

  data() {
    return {
      model: "",
      filters: {
        body: "",
        brand: "",
        engine: "",
        transmission: "",
        volume: null,
      },

      sendOpportunity: true,

      bodys: dbBodys,
      engines: dbEngines,
      transmissions: dbTransmissions,
      volumes: dbVolumes,

      modelsShowing: false,
    };
  },

  computed: {
    isBrandFiltered() {
      return !!(this.filters.brand && this.filtersStore.filtered);
    },

    brandRoute() {
      const brandId = this.$route.query.brandId;
      const brands = this.filtersStore.brands;

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
        name: "",
      };
    },

    isFiltersEmpty() {
      return checkIsFiltersEmpty(this.filters);
    },

    isFiltersEmptyExceptBrand() {
      return checkIsFiltersEmptyExceptBrand(this.filters);
    },
  },

  watch: {
    brandRoute: {
      immediate: true,
      handler() {
        this.filters.brand = this.brandRoute.name;
        this.filtersStore.loadCars(this.brandRoute.id);
      },
      deep: true,
    },

    filters: {
      immediate: false,
      handler() {
        if (this.isFiltersEmpty) {
          this.search();
          this.filtersStore.loadBrands(this.filters.brand);
        }
      },
      deep: true,
    },

    model() {
      this.loadCar();
    },
  },

  created() {
    const brandName = this.$route.query.brandName;
    const brandId = this.$route.query.brandId;

    if (brandName && brandId) {
      this.filtersStore.loadCars({
        brandName,
        brandId,
      });
    } else {
      this.resetFilters();
    }
  },

  methods: {
    search() {
      if (this.sendOpportunity) {
        this.startSendTimer();

        if (this.isFiltersEmpty) {
          this.filtersStore.setFiltered(false);
          this.filtersStore.setCars([]);
        } else if (this.isFiltersEmptyExceptBrand) {
          this.filtersStore.setFiltered(false);
          this.filtersStore.loadBrands(this.filters.brand);
        } else if (!this.isFiltersEmpty) {
          this.filtersStore.filterCars(this.filters);
        }
      }
    },

    loadCarNamesList(name) {
      if (this.sendOpportunity) {
        this.startSendTimer();
        this.filtersStore.loadCarNamesList({ name });
      }
    },

    loadCar() {
      if (this.model !== null && this.model !== undefined && this.model > 0) {
        this.$router.push({ path: "/car", query: { id: this.model } });
      }
    },

    startSendTimer() {
      this.sendOpportunity = false;
      setTimeout(() => {
        this.sendOpportunity = true;
      }, 500);
    },

    isFilterEmpty({ value }) {
      return value === "" || value === null || value === undefined;
    },

    resetFilter(filter) {
      this.filters[filter] = "";

      this.search();
    },

    resetFilters() {
      const keys = Object.keys(this.filters);
      keys.forEach((key) => {
        this.filters[key] = "";
      });

      this.filtersStore.setFiltered(false);
    },

    reset() {
      this.$router.push("/");
      this.resetFilters();
      this.filtersStore.loadBrands(this.filters.brand);
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

    button {
      margin: 0 10px 20px 10px;
    }
  }
}
</style>
