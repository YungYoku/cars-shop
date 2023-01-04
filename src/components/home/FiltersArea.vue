<template>
  <aside class="filters">
    <h4>Фильтры</h4>
    <v-form @submit.prevent="search">
      <v-autocomplete
        v-model="model"
        :clearable="true"
        :item-text="carNamesList.text"
        :item-value="carNamesList.value"
        :items="carNamesList"
        label="Модель"
        @keyup="loadCarNamesList($event.target.value)"
        @click:clear="loadCarNamesList('')"
      />

      <v-text-field
        v-model.trim="filters.brand.text"
        :disabled="!isFiltersEmptyExceptBrand"
        label="Бренд"
      />

      <div class="filter">
        <v-select
          v-model="filters.volume"
          :item-text="volumes.text"
          :item-value="volumes.value"
          :items="volumes"
          label="Объем двигателя"
          persistent-hint
          return-object
        />

        <v-btn
          v-if="filters.volume.value !== ''"
          icon
          text
          @click="resetFilter('volume')"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>

      <div class="filter">
        <v-select
          v-model="filters.transmission"
          :item-text="transmissions.text"
          :item-value="transmissions.value"
          :items="transmissions"
          label="Трансмиссия"
          persistent-hint
          return-object
        />

        <v-btn
          v-if="filters.transmission.value !== ''"
          icon
          text
          @click="resetFilter('transmission')"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>

      <div class="filter">
        <v-select
          v-model="filters.engine"
          :item-text="engines.text"
          :item-value="engines.value"
          :items="engines"
          label="Двигатель"
          persistent-hint
          return-object
        />

        <v-btn
          v-if="filters.engine.value !== ''"
          icon
          text
          @click="resetFilter('engine')"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>

      <div class="filter">
        <v-select
          v-model="filters.body"
          :item-text="bodys.text"
          :item-value="bodys.value"
          :items="bodys"
          label="Корпус"
          persistent-hint
          return-object
        />

        <v-btn
          v-if="filters.body.value !== ''"
          icon
          text
          @click="resetFilter('body')"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>

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
import { mapGetters } from "vuex";
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

  data() {
    return {
      model: 0,
      filters: {
        body: {
          text: "",
          value: "",
        },
        brand: {
          text: "",
          value: "",
        },
        engine: {
          text: "",
          value: "",
        },
        transmission: {
          text: "",
          value: "",
        },
        offset: {
          text: "",
          value: 1,
        },
        volume: {
          text: "",
          value: "",
        },
      },

      sendOpportunity: true,

      volumes: dbVolumes,
      transmissions: dbTransmissions,
      engines: dbEngines,
      bodys: dbBodys,
    };
  },

  computed: {
    ...mapGetters({ carNamesList: "filters/carNamesList" }),

    brandRoute() {
      const currentRoute = this.$route.query;
      let querys = { value: "", text: "" };
      if (currentRoute.brandId && currentRoute.brandName) {
        querys = {
          value: currentRoute.brandId,
          text: currentRoute.brandName,
        };
      }

      return querys;
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
        this.filters.brand = this.brandRoute;
      },
      deep: true,
    },

    filters: {
      immediate: false,
      handler() {
        if (this.isFiltersEmpty) {
          this.search();
          this.$store.dispatch("filters/loadBrands", this.filters.brand.text);
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
      this.$store.dispatch("filters/loadCars", {
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
          this.$store.commit("filters/setFiltered", false);
          this.$store.commit("filters/setCars", []);
        } else if (this.isFiltersEmptyExceptBrand) {
          this.$store.commit("filters/setFiltered", false);
          this.$store.dispatch("filters/loadBrands", this.filters.brand.text);
        } else if (!this.isFiltersEmpty) {
          this.filters.brand.value = "";
          this.filters.brand.text = "";

          this.$store.dispatch("filters/filterCars", this.filters);
        }
      }
    },

    loadCarNamesList(name) {
      if (this.sendOpportunity) {
        this.startSendTimer();
        this.$store.dispatch("filters/loadCarNamesList", { name });
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
      this.filters[filter] = {
        text: "",
        value: "",
      };

      this.search();
    },

    resetFilters() {
      const keys = Object.keys(this.filters);
      keys.forEach((key) => {
        this.filters[key] = {
          text: "",
          value: "",
        };
      });
      this.filters.offset = {
        text: "",
        value: 1,
      };

      this.$store.commit("filters/setFiltered", false);
    },

    reset() {
      const pathQuerys = this.$route.query;

      if (
        pathQuerys.brandId &&
        pathQuerys.brandName &&
        (pathQuerys.brandId !== "" || pathQuerys.brandName !== "")
      ) {
        this.$router.push("/");
      }
      this.resetFilters();
      this.$store.dispatch("filters/loadBrands", this.filters.brand.text);
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
