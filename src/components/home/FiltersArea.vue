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
          :items="carNamesList"
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

          <v-btn v-if="filters.volume" icon text @click="resetFilter('volume')">
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
            v-if="filters.transmission"
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

          <v-btn v-if="filters.engine" icon text @click="resetFilter('engine')">
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

          <v-btn v-if="filters.body" icon text @click="resetFilter('body')">
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

export default {
  name: "filters-area",

  props: {
    brands: {
      type: Array,
      required: true,
    },

    carNamesList: {
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
      model: null,
      filters: {
        body: null,
        brand: null,
        engine: null,
        transmission: null,
        volume: null,
      },

      sendOpportunity: true,

      bodys: dbBodys,
      engines: dbEngines,
      transmissions: dbTransmissions,
      volumes: dbVolumes,

      filtered: false,
    };
  },

  computed: {
    isBrandFiltered() {
      return !!(this.filters.brand && (this.filtered || this.propFiltered));
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
      return checkIsFiltersEmpty(this.filters);
    },

    isFiltersEmptyExceptBrand() {
      return checkIsFiltersEmptyExceptBrand(this.filters) && this.filters.brand;
    },
  },

  watch: {
    brandRouteQuery: {
      immediate: true,
      handler() {
        this.filters.brand = this.brandRouteQuery.name;
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
          this.$emit("filterBrands", this.filters.brand);
        } else if (!this.isFiltersEmpty) {
          this.filtered = true;
          this.$emit("filterCars", this.filters);
        }
      }
    },

    loadCarNamesList(name) {
      if (this.sendOpportunity) {
        this.startSendTimer();
        this.$emit("loadCarNamesList", name);
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

    resetFilter(filter) {
      this.filters[filter] = null;

      this.search();
    },

    resetFilters() {
      this.filtered = false;

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

    button {
      margin: 0 10px 20px 10px;
    }
  }
}
</style>
